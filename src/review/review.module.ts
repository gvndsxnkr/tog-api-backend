import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from '../../database/models/review.model';

@Module({
  imports: [SequelizeModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
