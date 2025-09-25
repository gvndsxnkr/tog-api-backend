import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryPartner } from '../../database/models/delivery-partner.model';
import {
  CreateDeliveryPartnerDto,
  UpdateDeliveryPartnerDto,
} from './dto/delivery-partner.dto';

@Injectable()
export class DeliveryPartnerService {
  constructor(
    @InjectModel(DeliveryPartner)
    private deliveryPartnerModel: typeof DeliveryPartner,
  ) {}

  async create(createDto: CreateDeliveryPartnerDto): Promise<DeliveryPartner> {
    return this.deliveryPartnerModel.create({
      name: createDto.name,
      contactInfo: createDto.contactInfo,
    });
  }

  async findAll(): Promise<DeliveryPartner[]> {
    return this.deliveryPartnerModel.findAll();
  }

  async findOne(deliveryPartnerId: string): Promise<DeliveryPartner> {
    const partner = await this.deliveryPartnerModel.findByPk(deliveryPartnerId);
    if (!partner) throw new NotFoundException('Delivery Partner not found');
    return partner;
  }

  async update(
    deliveryPartnerId: string,
    updateDto: UpdateDeliveryPartnerDto,
  ): Promise<DeliveryPartner> {
    const partner = await this.findOne(deliveryPartnerId);
    return partner.update(updateDto);
  }

  async remove(deliveryPartnerId: string): Promise<{ deleted: boolean }> {
    const deletedCount = await this.deliveryPartnerModel.destroy({
      where: { deliveryPartnerId },
    });
    return { deleted: deletedCount > 0 };
  }
}
