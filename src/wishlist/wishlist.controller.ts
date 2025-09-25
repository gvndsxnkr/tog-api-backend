import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('user/:userId')
  async getUserWishlist(@Param('userId') userId: string) {
    return this.wishlistService.findByUserId(userId);
  }

  @Post('user/:userId/product/:productId')
  async addToWishlist(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.wishlistService.addItem(userId, productId);
  }

  @Delete('user/:userId/product/:productId')
  async removeFromWishlist(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.wishlistService.removeItem(userId, productId);
  }
}
