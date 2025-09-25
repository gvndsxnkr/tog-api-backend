import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy', schema: {
    example: { status: 'ok', timestamp: '2025-09-18T15:25:18.672Z' }
  }})
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'E-Commerce API',
      version: '1.0.0'
    };
  }
}
