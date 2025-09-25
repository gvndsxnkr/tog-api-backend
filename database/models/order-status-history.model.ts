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
export class OrderStatusHistory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string;

  @Column({ type: DataType.TEXT })
  notes: string;

  @Column({ type: DataType.STRING })
  updatedBy: string;

  @BelongsTo(() => Order)
  order: Order;
}
