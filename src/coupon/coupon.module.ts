import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { Coupon } from '../../database/models/coupon.model';

@Module({
  imports: [SequelizeModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
