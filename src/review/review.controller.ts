import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: any) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('product/:productId')
  async getProductReviews(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Get('user/:userId')
  async getUserReviews(@Param('userId') userId: string) {
    return this.reviewService.findByUserId(userId);
  }

  @Delete(':reviewId')
  async remove(@Param('reviewId') reviewId: string) {
    return this.reviewService.remove(reviewId);
  }
}
