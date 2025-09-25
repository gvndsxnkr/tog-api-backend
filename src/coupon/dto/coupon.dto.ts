import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCouponDto {
  @ApiProperty({ description: 'Coupon code', example: 'SAVE20' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Coupon type', enum: ['percentage', 'fixed'], example: 'percentage' })
  @IsNotEmpty()
  @IsEnum(['percentage', 'fixed'])
  type: string;

  @ApiProperty({ description: 'Discount value', example: 20 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  value: number;

  @ApiPropertyOptional({ description: 'Minimum order amount', example: 100 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minOrderAmount?: number;

  @ApiPropertyOptional({ description: 'Maximum discount amount', example: 50 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxDiscountAmount?: number;

  @ApiPropertyOptional({ description: 'Usage limit', example: 100 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usageLimit?: number;

  @ApiPropertyOptional({ description: 'Valid from date', example: '2023-01-01' })
  @IsOptional()
  @IsDateString()
  validFrom?: string;

  @ApiPropertyOptional({ description: 'Valid until date', example: '2023-12-31' })
  @IsOptional()
  @IsDateString()
  validUntil?: string;
}

export class UpdateCouponDto {
  @ApiPropertyOptional({ description: 'Discount value' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  value?: number;

  @ApiPropertyOptional({ description: 'Minimum order amount' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minOrderAmount?: number;

  @ApiPropertyOptional({ description: 'Maximum discount amount' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxDiscountAmount?: number;

  @ApiPropertyOptional({ description: 'Usage limit' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usageLimit?: number;

  @ApiPropertyOptional({ description: 'Valid from date' })
  @IsOptional()
  @IsDateString()
  validFrom?: string;

  @ApiPropertyOptional({ description: 'Valid until date' })
  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @ApiPropertyOptional({ description: 'Is coupon active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ValidateCouponDto {
  @ApiProperty({ description: 'Coupon code to validate', example: 'SAVE20' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Order amount', example: 150 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  orderAmount: number;
}
