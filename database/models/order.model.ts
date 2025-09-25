import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { User } from './user.model';
import { DeliveryPartner } from './delivery-partner.model';
import { OrderItem } from './order-item.model';
import { Payment } from './payment.model';
import { Address } from './address.model';
import { OrderStatusHistory } from './order-status-history.model';

@Table({ paranoid: true, timestamps: true })
export class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, unique: true })
  orderNumber: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => DeliveryPartner)
  @Column({ type: DataType.UUID })
  deliveryPartnerId: string;

  @ForeignKey(() => Address)
  @Column({ type: DataType.UUID, allowNull: false })
  shippingAddressId: string;

  @ForeignKey(() => Address)
  @Column({ type: DataType.UUID })
  billingAddressId: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  status: string; // 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  subtotal: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  taxAmount: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  shippingAmount: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  discountAmount: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalAmount: number;

  @Column({ type: DataType.STRING })
  couponCode: string;

  @Column({ type: DataType.TEXT })
  notes: string;

  @Column({ type: DataType.DATE })
  shippedAt: Date;

  @Column({ type: DataType.DATE })
  deliveredAt: Date;

  // Essential business fields only
  @Column({ type: DataType.STRING })
  paymentStatus: string; // 'pending', 'paid', 'failed', 'refunded'

  @Column({ type: DataType.STRING, defaultValue: 'unfulfilled' })
  fulfillmentStatus: string; // 'unfulfilled', 'partial', 'fulfilled'

  @Column({ type: DataType.STRING })
  trackingNumber: string;

  @Column({ type: DataType.TEXT })
  cancellationReason: string;

  @Column({ type: DataType.DATE })
  cancelledAt: Date;

  // Relationships
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => DeliveryPartner)
  deliveryPartner: DeliveryPartner;

  @BelongsTo(() => Address, 'shippingAddressId')
  shippingAddress: Address;

  @BelongsTo(() => Address, 'billingAddressId')
  billingAddress: Address;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => OrderStatusHistory)
  statusHistory: OrderStatusHistory[];
}
