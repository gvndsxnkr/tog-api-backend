import { IsNotEmpty, IsNumber, IsUUID, Min, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCartDto {
  @ApiProperty({ description: 'User ID', example: 'uuid-user-id' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ description: 'Session ID', example: 'session-id' })
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class AddCartItemDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-product-id' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Quantity to add', example: 2, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ description: 'Price override', example: 99.99 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;
}

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-product-id' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Quantity to add', example: 2, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({ description: 'New quantity', example: 3, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class RemoveFromCartDto {
  @ApiProperty({ description: 'Cart item ID', example: 'uuid-cart-item-id' })
  @IsNotEmpty()
  @IsUUID()
  cartItemId: string;
}
