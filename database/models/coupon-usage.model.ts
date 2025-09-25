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
import { User } from './user.model';
import { Order } from './order.model';
import { Coupon } from './coupon.model';

@Table({ paranoid: true, timestamps: true })
export class CouponUsage extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @ForeignKey(() => Coupon)
  @Column({ type: DataType.UUID, allowNull: false })
  couponId: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  discountAmount: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Coupon)
  coupon: Coupon;
}
