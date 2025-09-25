import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from 'database/models/address.model';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('address')
@ApiTags('Addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.addressService.remove(id);
    return { message: `Address with id ${id} removed.` };
  }
}
