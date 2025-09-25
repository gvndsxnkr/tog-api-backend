import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import {
  CreateCartDto,
  AddCartItemDto,
  UpdateCartItemDto,
} from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'Cart created successfully' })
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get('my-cart')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  async getMyCart(@Request() req) {
    return this.cartService.findByUserId(req.user.sub);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get cart by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async getCartByUser(@Param('userId') userId: string) {
    return this.cartService.findByUserId(userId);
  }

  @Post(':cartId/items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiParam({ name: 'cartId', description: 'Cart ID' })
  @ApiResponse({ status: 201, description: 'Item added to cart' })
  async addCartItem(
    @Param('cartId') cartId: string,
    @Body() addCartItemDto: AddCartItemDto,
  ) {
    return this.cartService.addItem(cartId, addCartItemDto);
  }

  @Post('my-cart/items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add item to current user cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart' })
  async addToMyCart(
    @Request() req,
    @Body() addCartItemDto: AddCartItemDto,
  ) {
    const cart = await this.cartService.findByUserId(req.user.sub);
    return this.cartService.addItem(cart.id, addCartItemDto);
  }

  @Patch('items/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Cart item updated' })
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(id, updateDto);
  }

  @Delete('items/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Item removed from cart' })
  async removeCartItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  @Delete(':cartId/items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Clear all items from cart' })
  @ApiParam({ name: 'cartId', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  async clearCart(@Param('cartId') cartId: string) {
    await this.cartService.clearCart(cartId);
    return { message: 'Cart cleared successfully' };
  }

  @Delete('my-cart/items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Clear current user cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  async clearMyCart(@Request() req) {
    const cart = await this.cartService.findByUserId(req.user.sub);
    await this.cartService.clearCart(cart.id);
    return { message: 'Cart cleared successfully' };
  }

  @Get(':cartId/total')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get cart total' })
  @ApiParam({ name: 'cartId', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart total calculated' })
  async getCartTotal(@Param('cartId') cartId: string) {
    return this.cartService.getCartTotal(cartId);
  }

  @Get('my-cart/total')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user cart total' })
  @ApiResponse({ status: 200, description: 'Cart total calculated' })
  async getMyCartTotal(@Request() req) {
    const cart = await this.cartService.findByUserId(req.user.sub);
    return this.cartService.getCartTotal(cart.id);
  }

  @Post(':fromCartId/merge/:toCartId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Merge two carts' })
  @ApiParam({ name: 'fromCartId', description: 'Source cart ID' })
  @ApiParam({ name: 'toCartId', description: 'Target cart ID' })
  @ApiResponse({ status: 200, description: 'Carts merged successfully' })
  async mergeCarts(
    @Param('fromCartId') fromCartId: string,
    @Param('toCartId') toCartId: string,
  ) {
    await this.cartService.mergeCarts(fromCartId, toCartId);
    return { message: 'Carts merged successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({ status: 200, description: 'Cart deleted' })
  async removeCart(@Param('id') id: string) {
    return this.cartService.removeCart(id);
  }
}
