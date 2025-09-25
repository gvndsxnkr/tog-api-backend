import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({ paranoid: true, timestamps: true })
export class DeliveryPartner extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  contactInfo: string;

  @HasMany(() => Order)
  orders: Order[];
}
