import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from '../../database/models/review.model';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  async create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto as any);
  }

  async findByProductId(productId: string) {
    return this.reviewModel.findAll({
      where: { productId },
      include: ['user'],
      order: [['createdAt', 'DESC']],
    });
  }

  async findByUserId(userId: string) {
    return this.reviewModel.findAll({
      where: { userId },
      include: ['product'],
      order: [['createdAt', 'DESC']],
    });
  }

  async update(reviewId: string, updateDto: UpdateReviewDto) {
    await this.reviewModel.update(updateDto, { where: { id: reviewId } });
    return this.reviewModel.findByPk(reviewId);
  }

  async remove(reviewId: string) {
    return this.reviewModel.destroy({ where: { id: reviewId } });
  }
}
