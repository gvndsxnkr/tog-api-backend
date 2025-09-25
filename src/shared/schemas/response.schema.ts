import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseSchema<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty()
  data: T;

  @ApiProperty({ example: '2025-09-18T15:25:18.672Z' })
  timestamp: string;
}

export class ApiErrorSchema {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiProperty({ example: '2025-09-18T15:25:18.672Z' })
  timestamp: string;
}
