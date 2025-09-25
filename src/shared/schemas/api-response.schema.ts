import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseSchema<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty()
  data: T;

  @ApiProperty({ required: false })
  message?: string;
}

export class PaginationSchema {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class ProductImageSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'https://example.com/product.jpg' })
  url: string;

  @ApiProperty({ example: 'Product image' })
  altText?: string;

  @ApiProperty({ example: true })
  isPrimary: boolean;
}

export class CategoryResponseSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Electronics' })
  name: string;

  @ApiProperty({ example: 'Electronic devices and gadgets' })
  description?: string;

  @ApiProperty({ example: 'electronics' })
  slug: string;

  @ApiProperty({ example: 'https://example.com/category.jpg' })
  image?: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}

export class BrandResponseSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Apple' })
  name: string;

  @ApiProperty({ example: 'Technology company' })
  description?: string;

  @ApiProperty({ example: 'https://example.com/logo.jpg' })
  logo?: string;

  @ApiProperty({ example: 'https://apple.com' })
  website?: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}

export class ProductResponseSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'iPhone 15 Pro' })
  name: string;

  @ApiProperty({ example: 'Latest iPhone with advanced features' })
  description?: string;

  @ApiProperty({ example: 'IPH15PRO001' })
  sku?: string;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiProperty({ example: 1099.99 })
  comparePrice?: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: false })
  isFeatured: boolean;

  @ApiProperty()
  category?: CategoryResponseSchema;

  @ApiProperty()
  brand?: BrandResponseSchema;

  @ApiProperty({ type: [ProductImageSchema] })
  images?: ProductImageSchema[];
}

export class UserResponseSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'user' })
  role: string;

  @ApiProperty({ example: '+1234567890' })
  phone?: string;

  @ApiProperty({ example: '1990-01-01' })
  dateOfBirth?: string;

  @ApiProperty({ example: 'male' })
  gender?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatar?: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: string;
}

export class OrderItemSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 999.99 })
  unitPrice: number;

  @ApiProperty({ example: 1999.98 })
  totalPrice: number;

  @ApiProperty()
  product?: ProductResponseSchema;
}

export class OrderResponseSchema {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'ORD-2023-001' })
  orderNumber: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: 999.99 })
  subtotal: number;

  @ApiProperty({ example: 99.99 })
  taxAmount: number;

  @ApiProperty({ example: 19.99 })
  shippingAmount: number;

  @ApiProperty({ example: 50.00 })
  discountAmount: number;

  @ApiProperty({ example: 1069.97 })
  totalAmount: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: string;

  @ApiProperty({ type: [OrderItemSchema] })
  orderItems?: OrderItemSchema[];
}

export class ErrorResponseSchema {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Error message' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  timestamp: string;
}
