import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new category (Admin only)' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get('hierarchy')
  @ApiOperation({ summary: 'Get category hierarchy tree' })
  @ApiResponse({ status: 200, description: 'Category hierarchy retrieved' })
  async getHierarchy() {
    return this.categoryService.getHierarchy();
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category found' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('categoryId') categoryId: string) {
    return this.categoryService.findOne(categoryId);
  }

  @Get(':categoryId/products')
  @ApiOperation({ summary: 'Get category with its products' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category with products' })
  async findWithProducts(@Param('categoryId') categoryId: string) {
    return this.categoryService.findWithProducts(categoryId);
  }

  @Get(':categoryId/product-count')
  @ApiOperation({ summary: 'Get product count for category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Product count retrieved' })
  async getProductCount(@Param('categoryId') categoryId: string) {
    const count = await this.categoryService.getProductCount(categoryId);
    return { categoryId, productCount: count };
  }

  @Patch(':categoryId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update category (Admin only)' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async update(@Param('categoryId') categoryId: string, @Body() updateDto: UpdateCategoryDto) {
    return this.categoryService.update(categoryId, updateDto);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete category (Admin only)' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  async remove(@Param('categoryId') categoryId: string) {
    return this.categoryService.remove(categoryId);
  }
}
