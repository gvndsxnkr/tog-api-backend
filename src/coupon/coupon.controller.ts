import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('coupons')
@ApiTags('Coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('validate')
  async validateCoupon(
    @Body() body: { code: string; userId: string; orderAmount: number },
  ) {
    return this.couponService.validateCoupon(
      body.code,
      body.userId,
      body.orderAmount,
    );
  }

  @Post('apply')
  async applyCoupon(@Body() body: { code: string; orderId: string; userId: string }) {
    return this.couponService.applyCoupon(body.code, body.orderId, body.userId);
  }

  @Get('user/:userId')
  async getUserCoupons(@Param('userId') userId: string) {
    return this.couponService.getUserCoupons(userId);
  }
}
