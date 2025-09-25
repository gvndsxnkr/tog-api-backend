import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'iPhone 15 Pro' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Product description', example: 'Latest iPhone with advanced features' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Product SKU', example: 'IPH15PRO001' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: 'Compare price', example: 1099.99 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  comparePrice?: number;

  @ApiPropertyOptional({ description: 'Cost price', example: 800.00 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costPrice?: number;

  @ApiProperty({ description: 'Category ID', example: 'uuid-category-id' })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({ description: 'Brand ID', example: 'uuid-brand-id' })
  @IsNotEmpty()
  @IsUUID()
  brandId: string;

  @ApiPropertyOptional({ description: 'Product weight in kg', example: 0.2 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  weight?: number;

  @ApiPropertyOptional({ 
    description: 'Product dimensions', 
    example: { length: 15, width: 7, height: 1 } 
  })
  @IsOptional()
  dimensions?: object;

  @ApiPropertyOptional({ description: 'Product tags', example: ['electronics', 'smartphone'] })
  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Product name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Product price' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ description: 'Compare price' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  comparePrice?: number;

  @ApiPropertyOptional({ description: 'Is product active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Is product featured' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
