import { IsNotEmpty, IsOptional, IsString, IsUUID, IsArray, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-product-id' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Quantity', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ description: 'Warehouse ID', example: 'uuid-warehouse-id' })
  @IsNotEmpty()
  @IsUUID()
  warehouseId: string;
}

export class CreateOrderDto {
  @ApiPropertyOptional({ description: 'User ID', example: 'uuid-user-id' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Shipping address ID', example: 'uuid-address-id' })
  @IsNotEmpty()
  @IsUUID()
  shippingAddressId: string;

  @ApiPropertyOptional({ description: 'Billing address ID', example: 'uuid-address-id' })
  @IsOptional()
  @IsUUID()
  billingAddressId?: string;

  @ApiProperty({ description: 'Order items', type: [OrderItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({ description: 'Coupon code', example: 'SAVE20' })
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiPropertyOptional({ description: 'Order notes', example: 'Please deliver after 6 PM' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ 
    description: 'Order status', 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    example: 'confirmed'
  })
  @IsNotEmpty()
  @IsEnum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
  status: string;

  @ApiPropertyOptional({ description: 'Status update notes', example: 'Order confirmed and processing' })
  @IsOptional()
  @IsString()
  notes?: string;
}
