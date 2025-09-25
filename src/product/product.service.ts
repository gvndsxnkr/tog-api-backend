import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from '../../database/models/product.model';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async create(createDto: CreateProductDto) {
    const product = await this.productModel.create(createDto as any);
    return product;
  }

  async findAll(query?: any) {
    const { page = 1, limit = 10, search, category } = query || {};
    const offset = (page - 1) * limit;
    
    const whereClause: any = { isActive: true };
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }
    
    if (category) {
      whereClause.categoryId = category;
    }

    const { rows: products, count } = await this.productModel.findAndCountAll({
      where: whereClause,
      include: ['category', 'brand', 'images', 'reviews'],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      products,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async search(searchTerm: string) {
    const products = await this.productModel.findAll({
      where: {
        [Op.and]: [
          { isActive: true },
          {
            [Op.or]: [
              { name: { [Op.iLike]: `%${searchTerm}%` } },
              { description: { [Op.iLike]: `%${searchTerm}%` } },
            ],
          },
        ],
      },
      include: ['category', 'brand'],
    });
    return products;
  }

  async findByCategory(categoryId: string) {
    const products = await this.productModel.findAll({
      where: { categoryId, isActive: true },
      include: ['category', 'brand', 'images'],
    });
    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findByPk(id, {
      include: ['category', 'brand', 'images', 'reviews'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateDto: UpdateProductDto) {
    const product = await this.findOne(id);
    await product.update(updateDto);
    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }
}
