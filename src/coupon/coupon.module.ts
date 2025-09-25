import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon } from '../../database/models/coupon.model';
import { CouponUsage } from '../../database/models/coupon-usage.model';

@Module({
  imports: [SequelizeModule.forFeature([Coupon, CouponUsage])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
