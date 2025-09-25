import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({ paranoid: true, timestamps: true })
export class Payment extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string; // 'pending', 'completed', 'failed', 'refunded'

  @Column({ type: DataType.STRING, allowNull: false })
  method: string; // 'card', 'upi', 'netbanking', 'wallet', 'cod'

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.STRING })
  transactionId: string;

  @Column({ type: DataType.TEXT })
  gatewayResponse: string;

  @Column({ type: DataType.STRING, defaultValue: 'INR' })
  currency: string;

  @Column({ type: DataType.DATE })
  paidAt: Date;

  @Column({ type: DataType.TEXT })
  failureReason: string;

  // Essential payment fields only
  @Column({ type: DataType.STRING })
  paymentGateway: string; // 'razorpay', 'stripe', 'paypal'

  @Column({ type: DataType.STRING })
  gatewayTransactionId: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  refundedAmount: number;

  @Column({ type: DataType.DATE })
  refundedAt: Date;

  // Relationships
  @BelongsTo(() => Order)
  order: Order;
}
