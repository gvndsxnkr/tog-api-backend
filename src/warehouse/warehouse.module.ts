import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Warehouse } from 'database/models/warehouse.model';
import { Inventory } from 'database/models/inventory.model';


@Module({
  imports: [SequelizeModule.forFeature([Warehouse, Inventory])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
