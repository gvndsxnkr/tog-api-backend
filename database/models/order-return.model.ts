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
import { Order } from './order.model';
import { User } from './user.model';

@Table({ paranoid: true, timestamps: true })
export class OrderReturn extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, unique: true })
  returnNumber: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  reason: string; // 'defective', 'wrong_item', 'not_satisfied', 'damaged'

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING, defaultValue: 'requested' })
  status: string; // 'requested', 'approved', 'rejected', 'received', 'refunded'

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  refundAmount: number;

  @Column({ type: DataType.DATE })
  approvedAt: Date;

  @Column({ type: DataType.DATE })
  refundedAt: Date;

  @Column({ type: DataType.TEXT })
  adminNotes: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => User)
  user: User;
}
