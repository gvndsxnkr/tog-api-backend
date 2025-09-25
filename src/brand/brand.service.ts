import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from '../../database/models/brand.model';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async create(createBrandDto: CreateBrandDto) {
    return this.brandModel.create(createBrandDto as any);
  }

  async findAll() {
    return this.brandModel.findAll({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.brandModel.findByPk(id);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.brandModel.update(updateBrandDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.brandModel.update({ isActive: false }, { where: { id } });
  }
}
