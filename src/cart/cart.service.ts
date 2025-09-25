import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '../../database/models/cart.model';
import { CartItem } from '../../database/models/cart-item.model';
import { Product } from '../../database/models/product.model';
import { User } from '../../database/models/user.model';
import { Inventory } from '../../database/models/inventory.model';
import {
  CreateCartDto,
  AddCartItemDto,
  UpdateCartItemDto,
} from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartModel: typeof Cart,
    @InjectModel(CartItem) private cartItemModel: typeof CartItem,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    // Check if user exists
    const user = await this.userModel.findByPk(createCartDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if cart already exists for user
    const existingCart = await this.cartModel.findOne({
      where: { userId: createCartDto.userId },
    });

    if (existingCart) {
      return existingCart;
    }

    return this.cartModel.create(createCartDto as any);
  }

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'price', 'sku', 'isActive'],
            },
          ],
        },
      ],
    });

    if (!cart) {
      // Create cart if it doesn't exist
      return this.create({ userId });
    }

    return cart;
  }

  async addItem(cartId: string, addCartItemDto: AddCartItemDto): Promise<CartItem> {
    // Verify cart exists
    const cart = await this.cartModel.findByPk(cartId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Verify product exists and is active
    const product = await this.productModel.findByPk(addCartItemDto.productId);
    if (!product || !product.isActive) {
      throw new BadRequestException('Product not found or inactive');
    }

    // Check inventory if tracking is enabled
    if (product.trackInventory) {
      const inventory = await this.inventoryModel.findOne({
        where: { productId: addCartItemDto.productId }
      });
      
      if (!inventory || inventory.quantity < addCartItemDto.quantity) {
        if (!product.allowBackorder) {
          throw new BadRequestException(`Only ${inventory?.quantity || 0} items available in stock`);
        }
      }
    }

    // Check if item already exists in cart
    const existingItem = await this.cartItemModel.findOne({
      where: { cartId, productId: addCartItemDto.productId },
    });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += addCartItemDto.quantity;
      existingItem.price = product.price;
      return existingItem.save();
    }

    // Create new cart item
    return this.cartItemModel.create({
      cartId,
      productId: addCartItemDto.productId,
      quantity: addCartItemDto.quantity,
      price: product.price,
    } as any);
  }

  async updateItem(id: string, updateDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartItemModel.findByPk(id, {
      include: [Product],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (updateDto.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    return cartItem.update(updateDto);
  }

  async removeItem(id: string): Promise<{ deleted: boolean }> {
    const cartItem = await this.cartItemModel.findByPk(id);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    const deletedCount = await this.cartItemModel.destroy({ where: { id } });
    return { deleted: deletedCount > 0 };
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = await this.cartModel.findByPk(cartId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartItemModel.destroy({ where: { cartId } });
  }

  async removeCart(id: string): Promise<{ deleted: boolean }> {
    const cart = await this.cartModel.findByPk(id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Remove all cart items first
    await this.cartItemModel.destroy({ where: { cartId: id } });
    
    // Remove cart
    const deletedCount = await this.cartModel.destroy({ where: { id } });
    return { deleted: deletedCount > 0 };
  }

  async getCartTotal(cartId: string): Promise<{ subtotal: number; itemCount: number }> {
    const cartItems = await this.cartItemModel.findAll({
      where: { cartId },
      include: [Product],
    });

    const subtotal = cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);

    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return { subtotal, itemCount };
  }

  async mergeCarts(fromCartId: string, toCartId: string): Promise<void> {
    const fromItems = await this.cartItemModel.findAll({
      where: { cartId: fromCartId },
    });

    for (const item of fromItems) {
      await this.addItem(toCartId, {
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    // Remove the old cart
    await this.removeCart(fromCartId);
  }
}
