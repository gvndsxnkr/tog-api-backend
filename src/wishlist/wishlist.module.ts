import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from 'database/models/wishlist.model';
import { WishlistItem } from 'database/models/wishlist-item.model';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist, WishlistItem])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
