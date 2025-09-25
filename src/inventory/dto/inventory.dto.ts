import { IsNotEmpty, IsOptional, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-product-id' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Warehouse ID', example: 'uuid-warehouse-id' })
  @IsNotEmpty()
  @IsUUID()
  warehouseId: string;

  @ApiProperty({ description: 'Available quantity', example: 100, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ description: 'Reserved quantity', example: 10, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  reservedQuantity?: number;

  @ApiPropertyOptional({ description: 'Minimum stock level', example: 5, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minStockLevel?: number;
}

export class UpdateInventoryDto {
  @ApiPropertyOptional({ description: 'Available quantity', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity?: number;

  @ApiPropertyOptional({ description: 'Reserved quantity', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  reservedQuantity?: number;

  @ApiPropertyOptional({ description: 'Minimum stock level', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minStockLevel?: number;
}

export class StockAdjustmentDto {
  @ApiProperty({ description: 'Adjustment quantity (positive for increase, negative for decrease)', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  adjustment: number;

  @ApiPropertyOptional({ description: 'Reason for adjustment', example: 'Stock replenishment' })
  @IsOptional()
  reason?: string;
}
