import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiPropertyOptional({ description: 'User ID', example: 'uuid-user-id' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Address type', enum: ['shipping', 'billing'], example: 'shipping' })
  @IsNotEmpty()
  @IsEnum(['shipping', 'billing'])
  type: string;

  @ApiPropertyOptional({ description: 'Address label', example: 'Home' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ description: 'First name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ description: 'Company name', example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ description: 'Address line 1', example: '123 Main Street' })
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiProperty({ description: 'Address line 1 (alias)', example: '123 Main Street' })
  @IsNotEmpty()
  @IsString()
  line1: string;

  @ApiPropertyOptional({ description: 'Address line 2', example: 'Apt 4B' })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiPropertyOptional({ description: 'Address line 2 (alias)', example: 'Apt 4B' })
  @IsOptional()
  @IsString()
  line2?: string;

  @ApiProperty({ description: 'City', example: 'New York' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State', example: 'NY' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Postal code', example: '10001' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({ description: 'Postal code (alias)', example: '10001' })
  @IsNotEmpty()
  @IsString()
  zip: string;

  @ApiProperty({ description: 'Country', example: 'USA' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Is default address', example: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto {
  @ApiPropertyOptional({ description: 'First name' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Company name' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ description: 'Address line 1' })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiPropertyOptional({ description: 'Address line 2' })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Is default address' })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
