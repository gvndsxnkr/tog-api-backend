import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { DeliveryPartnerModule } from './delivery-partner/delivery-partner.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { CouponModule } from './coupon/coupon.module';
import { BrandModule } from './brand/brand.module';
import { InventoryModule } from './inventory/inventory.module';
import { SharedModule } from './shared/shared.module';
import { HealthController } from './shared/controllers/health.controller';

// Import all models
import { User } from '../database/models/user.model';
import { Product } from '../database/models/product.model';
import { Order } from '../database/models/order.model';
import { OrderItem } from '../database/models/order-item.model';
import { Address } from '../database/models/address.model';
import { Cart } from '../database/models/cart.model';
import { CartItem } from '../database/models/cart-item.model';
import { Wishlist } from '../database/models/wishlist.model';
import { WishlistItem } from '../database/models/wishlist-item.model';
import { Warehouse } from '../database/models/warehouse.model';

import { Payment } from '../database/models/payment.model';
import { DeliveryPartner } from '../database/models/delivery-partner.model';
import { Category } from '../database/models/category.model';
import { Brand } from '../database/models/brand.model';
import { Review } from '../database/models/review.model';
import { Coupon } from '../database/models/coupon.model';
import { CouponUsage } from '../database/models/coupon-usage.model';
import { ProductImage } from '../database/models/product-image.model';
import { Inventory } from '../database/models/inventory.model';
import { OrderStatusHistory } from '../database/models/order-status-history.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env'],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        uri: configService.get<string>('DB_URI'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        autoLoadModels: configService.get<boolean>('DB_AUTO_LOAD_MODELS'),
        models: [
          User,
          Product,
          Order,
          OrderItem,
          Address,
          Cart,
          CartItem,
          Wishlist,
          WishlistItem,
          Warehouse,
          Payment,
          DeliveryPartner,
          Category,
          Brand,
          Review,
          Coupon,
          CouponUsage,
          ProductImage,
          Inventory,
          OrderStatusHistory,
        ],
      }),
    }),

    SharedModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    CartModule,
    WishlistModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    CouponModule,
    AddressModule,
    WarehouseModule,
    InventoryModule,
    DeliveryPartnerModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
