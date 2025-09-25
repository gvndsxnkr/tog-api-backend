import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from 'database/models/address.model';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  // Create a new address
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressModel.create({
      userId: createAddressDto.userId,
      label: createAddressDto.label,
      line1: createAddressDto.line1,
      line2: createAddressDto.line2,
      city: createAddressDto.city,
      state: createAddressDto.state,
      zip: createAddressDto.zip,
      country: createAddressDto.country,
    });
  }

  // Find all addresses
  async findAll(): Promise<Address[]> {
    return await this.addressModel.findAll();
  }

  // Find one address by id
  async findOne(id: string): Promise<Address> {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return address;
  }

  // Update address by id
  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id); // throws if not found
    await address.update(updateAddressDto);
    return address;
  }

  // Remove address by id (soft delete because `paranoid` is true in model)
  async remove(id: string): Promise<void> {
    const address = await this.findOne(id);
    await address.destroy();
  }
}
