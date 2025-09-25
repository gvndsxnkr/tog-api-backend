import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../../database/models/order.model';
import { OrderItem } from '../../database/models/order-item.model';
import { OrderStatusHistory } from '../../database/models/order-status-history.model';
import { Product } from '../../database/models/product.model';
import { User } from '../../database/models/user.model';
import { Address } from '../../database/models/address.model';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    @InjectModel(OrderStatusHistory) private orderStatusHistoryModel: typeof OrderStatusHistory,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Address) private addressModel: typeof Address,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Validate user exists
    const user = await this.userModel.findByPk(createOrderDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate addresses
    if (createOrderDto.shippingAddressId) {
      const shippingAddress = await this.addressModel.findByPk(createOrderDto.shippingAddressId);
      if (!shippingAddress) {
        throw new NotFoundException('Shipping address not found');
      }
    }

    if (createOrderDto.billingAddressId) {
      const billingAddress = await this.addressModel.findByPk(createOrderDto.billingAddressId);
      if (!billingAddress) {
        throw new NotFoundException('Billing address not found');
      }
    }

    // Validate products and calculate totals
    let calculatedSubtotal = 0;
    for (const item of createOrderDto.items) {
      const product = await this.productModel.findByPk(item.productId);
      if (!product || !product.isActive) {
        throw new BadRequestException(`Product ${item.productId} not found or inactive`);
      }
      calculatedSubtotal += parseFloat(product.price.toString()) * item.quantity;
    }

    // Create order
    const order = await this.orderModel.create({
      ...createOrderDto,
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      status: 'pending',
      subtotal: calculatedSubtotal,
    } as any);

    // Create order items
    for (const item of createOrderDto.items) {
      const product = await this.productModel.findByPk(item.productId);
      await this.orderItemModel.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: parseFloat(product.price.toString()) * item.quantity,
      } as any);
    }

    // Create initial status history
    await this.orderStatusHistoryModel.create({
      orderId: order.id,
      status: 'pending',
      notes: 'Order created successfully',
    } as any);

    return this.findOne(order.id);
  }

  async findByUserId(userId: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.orderModel.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'sku', 'price'],
            }
          ]
        },
        {
          model: Address,
          as: 'shippingAddress',
        },
        {
          model: Address,
          as: 'billingAddress',
        }
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findByPk(id, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'sku', 'price'],
            }
          ]
        },
        {
          model: Address,
          as: 'shippingAddress',
        },
        {
          model: Address,
          as: 'billingAddress',
        },
        {
          model: OrderStatusHistory,
          order: [['createdAt', 'DESC']],
        }
      ],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    
    return this.orderModel.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: OrderItem,
          include: [Product],
        }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
  }

  async updateStatus(id: string, status: string, notes?: string) {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid order status');
    }

    await order.update({ status });

    // Create status history
    await this.orderStatusHistoryModel.create({
      orderId: id,
      status,
      notes: notes || `Status updated to ${status}`,
    } as any);

    return this.findOne(id);
  }

  async cancel(id: string, reason?: string) {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      throw new BadRequestException(`Cannot cancel order with status: ${order.status}`);
    }

    return this.updateStatus(id, 'cancelled', reason || 'Order cancelled by user');
  }

  async getOrderStats(userId?: string) {
    const whereClause = userId ? { userId } : {};
    
    const [total, pending, confirmed, shipped, delivered, cancelled] = await Promise.all([
      this.orderModel.count({ where: whereClause }),
      this.orderModel.count({ where: { ...whereClause, status: 'pending' } }),
      this.orderModel.count({ where: { ...whereClause, status: 'confirmed' } }),
      this.orderModel.count({ where: { ...whereClause, status: 'shipped' } }),
      this.orderModel.count({ where: { ...whereClause, status: 'delivered' } }),
      this.orderModel.count({ where: { ...whereClause, status: 'cancelled' } }),
    ]);

    return {
      total,
      pending,
      confirmed,
      shipped,
      delivered,
      cancelled,
    };
  }
}
