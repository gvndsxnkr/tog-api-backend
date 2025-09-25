import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coupon } from '../../database/models/coupon.model';
import { CouponUsage } from '../../database/models/coupon-usage.model';
import { CreateCouponDto } from './dto/coupon.dto';
import { Op } from 'sequelize';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon) private couponModel: typeof Coupon,
    @InjectModel(CouponUsage) private couponUsageModel: typeof CouponUsage,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    return this.couponModel.create(createCouponDto as any);
  }

  async validateCoupon(code: string, userId: string, orderAmount: number) {
    const coupon = await this.couponModel.findOne({
      where: {
        code,
        isActive: true,
        validFrom: { [Op.lte]: new Date() },
        validUntil: { [Op.gte]: new Date() },
        usedCount: { [Op.lt]: this.couponModel.sequelize.col('usageLimit') },
      },
    });

    if (!coupon) return { valid: false, message: 'Invalid or expired coupon' };
    
    // Check per-user usage limit
    const userUsageCount = await this.couponUsageModel.count({
      where: { couponId: coupon.id, userId }
    });
    
    if (coupon.userUsageLimit && userUsageCount >= coupon.userUsageLimit) {
      return { valid: false, message: 'Coupon usage limit exceeded for this user' };
    }

    if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
      return { valid: false, message: `Minimum order amount is ${coupon.minOrderAmount}` };
    }

    let discount = coupon.type === 'percentage' ? (orderAmount * coupon.value) / 100 : coupon.value;
    if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
      discount = coupon.maxDiscountAmount;
    }

    return { valid: true, discount, discountType: coupon.type };
  }

  async applyCoupon(code: string, orderId: string, userId: string) {
    const coupon = await this.couponModel.findOne({ where: { code } });
    if (coupon) {
      await coupon.increment('usedCount');
      
      // Track per-user usage
      await this.couponUsageModel.create({
        couponId: coupon.id,
        userId,
        orderId,
      } as any);
      
      return { applied: true, couponId: coupon.id };
    }
    return { applied: false };
  }

  async getUserCoupons(userId: string) {
    return this.couponModel.findAll({
      where: {
        isActive: true,
        validFrom: { [Op.lte]: new Date() },
        validUntil: { [Op.gte]: new Date() },
      },
    });
  }
}
