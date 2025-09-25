import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  // app.useGlobalFilters(new GlobalExceptionFilter());

  // Global response interceptor
  //app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable CORS
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription(
      'Complete e-commerce application API with user management, products, orders, and payments',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Coupons', 'Discount coupons')
    .addTag('Users', 'User management')
    .addTag('Addresses', 'User addresses')
    .addTag('Delivery Partner', 'Delivery Partner details')
    .addTag('Warehouse', 'Warehouse management')
    .addTag('Categories', 'Product categories')
    .addTag('Brands', 'Product brands')
    .addTag('Products', 'Product catalog')
    .addTag('Wishlist', 'User wishlist')
    .addTag('Cart', 'Shopping cart')
    .addTag('Orders', 'Order management')
    .addTag('Payments', 'Payment processing')
    .addTag('Reviews', 'Product reviews')
    .addTag('Inventory', 'Stock management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });


  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
console.log(`Application is running on: http://localhost:${port}`);
  //await app.listen(port, '0.0.0.0');
//  console.log(`Application is running on: http://0.0.0.0:${port}`);
  //console.log(`Local access: http://localhost:${port}`);
  //console.log(`Network access: http://192.168.1.215:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
