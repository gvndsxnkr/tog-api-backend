import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../database/models/category.model';
import { Product } from '../../database/models/product.model';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Check if category with same name exists
    const existing = await this.categoryModel.findOne({
      where: { name: createCategoryDto.name }
    });
    
    if (existing) {
      throw new BadRequestException('Category with this name already exists');
    }

    return this.categoryModel.create(createCategoryDto as any);
  }

  async findAll() {
    return this.categoryModel.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC'], ['name', 'ASC']],
    });
  }

  async findOne(categoryId: string) {
    const category = await this.categoryModel.findByPk(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findWithProducts(categoryId: string) {
    const category = await this.categoryModel.findByPk(categoryId, {
      include: [
        {
          model: Product,
          where: { isActive: true },
          required: false,
          attributes: ['id', 'name', 'price', 'sku'],
        }
      ]
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getHierarchy() {
    // Get all categories and build hierarchy manually
    const allCategories = await this.categoryModel.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC'], ['name', 'ASC']],
    });

    // Build hierarchy
    const categoryMap = new Map();
    const rootCategories = [];

    // First pass: create map of all categories
    allCategories.forEach(category => {
      categoryMap.set(category.id, {
        ...category.toJSON(),
        children: []
      });
    });

    // Second pass: build hierarchy
    allCategories.forEach(category => {
      const categoryData = categoryMap.get(category.id);
      
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(categoryData);
        }
      } else {
        rootCategories.push(categoryData);
      }
    });

    return rootCategories;
  }

  async update(categoryId: string, updateDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(categoryId);
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check name uniqueness if name is being updated
    if (updateDto.name && updateDto.name !== category.name) {
      const existing = await this.categoryModel.findOne({
        where: { name: updateDto.name }
      });
      
      if (existing) {
        throw new BadRequestException('Category with this name already exists');
      }
    }

    await category.update(updateDto);
    return category;
  }

  async remove(categoryId: string) {
    const category = await this.categoryModel.findByPk(categoryId);
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check if category has products
    const productCount = await this.productModel.count({
      where: { categoryId, isActive: true }
    });

    if (productCount > 0) {
      throw new BadRequestException('Cannot delete category with active products');
    }

    // Soft delete
    await category.update({ isActive: false });
    return { deleted: true };
  }

  async getProductCount(categoryId: string) {
    return this.productModel.count({
      where: { categoryId, isActive: true }
    });
  }
}
