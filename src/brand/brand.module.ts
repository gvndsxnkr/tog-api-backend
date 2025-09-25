import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from '../../database/models/brand.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
