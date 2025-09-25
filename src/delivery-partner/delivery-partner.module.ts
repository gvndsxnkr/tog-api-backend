import { Module } from '@nestjs/common';
import { DeliveryPartnerController } from './delivery-partner.controller';
import { DeliveryPartnerService } from './delivery-partner.service';
import { DeliveryPartner } from 'database/models/delivery-partner.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([DeliveryPartner])],
  controllers: [DeliveryPartnerController],
  providers: [DeliveryPartnerService],
})
export class DeliveryPartnerModule {}
