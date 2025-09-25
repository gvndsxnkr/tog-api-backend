import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DeliveryPartnerService } from './delivery-partner.service';
import {
  CreateDeliveryPartnerDto,
  UpdateDeliveryPartnerDto,
} from './dto/delivery-partner.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('delivery-partner')
@ApiTags('Delivery Partner')
export class DeliveryPartnerController {
  constructor(private readonly service: DeliveryPartnerService) {}

  @Post()
  async create(@Body() createDto: CreateDeliveryPartnerDto) {
    return this.service.create(createDto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':deliveryPartnerId')
  async findOne(@Param('deliveryPartnerId') deliveryPartnerId: string) {
    return this.service.findOne(deliveryPartnerId);
  }

  @Patch(':deliveryPartnerId')
  async update(
    @Param('deliveryPartnerId') deliveryPartnerId: string,
    @Body() updateDto: UpdateDeliveryPartnerDto,
  ) {
    return this.service.update(deliveryPartnerId, updateDto);
  }

  @Delete(':deliveryPartnerId')
  async remove(@Param('deliveryPartnerId') deliveryPartnerId: string) {
    return this.service.remove(deliveryPartnerId);
  }
}
