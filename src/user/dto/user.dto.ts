import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsNotEmpty({ message: 'Name should not be empty.' })
  name: string;

  @ApiProperty({ description: 'User email address', example: 'john@example.com' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsNotEmpty({ message: 'Password should not be empty.' })
  password: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Date of birth', example: '1990-01-01' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'Gender', enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'User full name' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'User email address' })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email?: string;

  @ApiPropertyOptional({ description: 'User password' })
  @IsOptional()
  @IsNotEmpty({ message: 'Password should not be empty if provided.' })
  password?: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Date of birth' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'Gender', enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ description: 'Avatar URL' })
  @IsOptional()
  @IsString()
  avatar?: string;
}
