import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from '../../database/models/inventory.model';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Inventory) private inventoryModel: typeof Inventory) {}

  async findAll() {
    return this.inventoryModel.findAll();
  }

  async create(createInventoryDto: CreateInventoryDto) {
    return this.inventoryModel.create(createInventoryDto as any);
  }

  async findByProduct(productId: string) {
    return this.inventoryModel.findAll({ where: { productId } });
  }

  async findByWarehouse(warehouseId: string) {
    return this.inventoryModel.findAll({ where: { warehouseId } });
  }

  async updateStock(productId: string, warehouseId: string, updateDto: UpdateInventoryDto) {
    await this.inventoryModel.update(updateDto, { where: { productId, warehouseId } });
    return this.inventoryModel.findOne({ where: { productId, warehouseId } });
  }

  async checkStock(productId: string, warehouseId: string) {
    return this.inventoryModel.findOne({ where: { productId, warehouseId } });
  }
}
