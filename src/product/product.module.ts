import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'database/models/product.model';
import { ProductImage } from 'database/models/product-image.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductImage])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
