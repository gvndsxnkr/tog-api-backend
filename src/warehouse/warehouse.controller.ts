import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@Body() createWarehouseDto: any) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.warehouseService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(id);
  }

  @Post(':warehouseId/products/:productId')
  addProduct(
    @Param('warehouseId') warehouseId: string,
    @Param('productId') productId: string,
    @Body() body: { quantity: number },
  ) {
    return this.warehouseService.addProduct(warehouseId, productId, body.quantity);
  }

  @Patch(':warehouseId/products/:productId')
  updateProductQuantity(
    @Param('warehouseId') warehouseId: string,
    @Param('productId') productId: string,
    @Body() body: { quantity: number },
  ) {
    return this.warehouseService.updateProductQuantity(warehouseId, productId, body.quantity);
  }
}
