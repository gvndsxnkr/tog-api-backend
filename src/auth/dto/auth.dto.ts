import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    description: 'User email address', 
    example: 'john@example.com' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ 
    description: 'User password', 
    example: 'password123' 
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ 
    description: 'User full name', 
    example: 'John Doe' 
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @ApiProperty({ 
    description: 'User email address', 
    example: 'john@example.com' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ 
    description: 'User password (minimum 6 characters)', 
    example: 'password123' 
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  password: string;
}

export class ChangePasswordDto {
  @ApiProperty({ 
    description: 'Current password', 
    example: 'currentPassword123' 
  })
  @IsString({ message: 'Current password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  oldPassword: string;

  @ApiProperty({ 
    description: 'New password (minimum 6 characters)', 
    example: 'newPassword123' 
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  @MaxLength(100, { message: 'New password must not exceed 100 characters' })
  newPassword: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ 
    description: 'Email address for password reset', 
    example: 'john@example.com' 
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ 
    description: 'Password reset token', 
    example: 'reset_token_here' 
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Reset token is required' })
  token: string;

  @ApiProperty({ 
    description: 'New password (minimum 6 characters)', 
    example: 'newPassword123' 
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  @MaxLength(100, { message: 'New password must not exceed 100 characters' })
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({ 
    description: 'Refresh token', 
    example: 'refresh_token_here' 
  })
  @IsString({ message: 'Refresh token must be a string' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  refresh_token: string;
}
