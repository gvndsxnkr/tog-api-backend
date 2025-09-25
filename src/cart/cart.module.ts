import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from 'database/models/cart.model';
import { CartItem } from 'database/models/cart-item.model';
import { Product } from 'database/models/product.model';
import { User } from 'database/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Cart, CartItem, Product, User])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
