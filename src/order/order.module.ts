import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from 'database/models/order.model';
import { OrderItem } from 'database/models/order-item.model';
import { OrderStatusHistory } from 'database/models/order-status-history.model';
import { Product } from 'database/models/product.model';
import { User } from 'database/models/user.model';
import { Address } from 'database/models/address.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Order,
      OrderItem,
      OrderStatusHistory,
      Product,
      User,
      Address,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
