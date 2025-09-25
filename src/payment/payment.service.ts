import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from '../../database/models/payment.model';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async processPayment(paymentDto: any) {
    return this.paymentModel.create({
      ...paymentDto,
      status: 'pending',
      transactionId: `TXN-${Date.now()}`,
    });
  }

  async findByOrderId(orderId: string) {
    return this.paymentModel.findAll({
      where: { orderId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async updateStatus(id: string, status: string, gatewayResponse?: string) {
    const payment = await this.findOne(id);
    const updateData: any = { status };
    
    if (status === 'completed') {
      updateData.paidAt = new Date();
    }
    if (gatewayResponse) {
      updateData.gatewayResponse = gatewayResponse;
    }

    return payment.update(updateData);
  }

  async refund(id: string) {
    return this.updateStatus(id, 'refunded');
  }
}
