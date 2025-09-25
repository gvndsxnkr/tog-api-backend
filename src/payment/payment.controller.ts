import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('Payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process')
  async processPayment(@Body() paymentDto: any) {
    return this.paymentService.processPayment(paymentDto);
  }

  @Get('order/:orderId')
  async getPaymentByOrder(@Param('orderId') orderId: string) {
    return this.paymentService.findByOrderId(orderId);
  }

  @Post('refund/:paymentId')
  async refund(@Param('paymentId') paymentId: string) {
    return this.paymentService.refund(paymentId);
  }
}
