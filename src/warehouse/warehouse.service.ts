import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Warehouse } from '../../database/models/warehouse.model';
import { Inventory } from '../../database/models/inventory.model';


@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(Warehouse) private warehouseModel: typeof Warehouse,
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
  ) {}

  async create(createWarehouseDto: any) {
    return this.warehouseModel.create(createWarehouseDto);
  }

  async findAll() {
    return this.warehouseModel.findAll();
  }

  async findOne(id: string) {
    const warehouse = await this.warehouseModel.findByPk(id, {
      include: [{ model: Inventory, as: 'inventory' }],
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');
    return warehouse;
  }

  async update(id: string, updateDto: any) {
    const warehouse = await this.findOne(id);
    return warehouse.update(updateDto);
  }

  async remove(id: string) {
    const deletedCount = await this.warehouseModel.destroy({ where: { id } });
    return { deleted: deletedCount > 0 };
  }

  async addProduct(warehouseId: string, productId: string, quantity: number) {
    return this.inventoryModel.create({
      warehouseId,
      productId,
      quantity,
    });
  }

  async updateProductQuantity(warehouseId: string, productId: string, quantity: number) {
    const inventory = await this.inventoryModel.findOne({
      where: { warehouseId, productId },
    });
    
    if (!inventory) {
      throw new NotFoundException('Product not found in warehouse');
    }
    
    return inventory.update({ quantity });
  }
}
