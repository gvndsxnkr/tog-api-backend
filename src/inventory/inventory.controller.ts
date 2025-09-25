import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('inventory')
@ApiTags('Inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.inventoryService.findAll();
  }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.inventoryService.findByProduct(productId);
  }

  @Get('warehouse/:warehouseId')
  findByWarehouse(@Param('warehouseId') warehouseId: string) {
    return this.inventoryService.findByWarehouse(warehouseId);
  }

  @Patch(':productId/:warehouseId')
  updateStock(
    @Param('productId') productId: string,
    @Param('warehouseId') warehouseId: string,
    @Body() updateDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.updateStock(productId, warehouseId, updateDto);
  }

  @Get('check/:productId/:warehouseId')
  checkStock(
    @Param('productId') productId: string,
    @Param('warehouseId') warehouseId: string,
  ) {
    return this.inventoryService.checkStock(productId, warehouseId);
  }
}
