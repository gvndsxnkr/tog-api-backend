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

@Table({ paranoid: true, timestamps: true })
export class Notification extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string; // 'order_confirmed', 'order_shipped', 'payment_failed', 'stock_alert'

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRead: boolean;

  @Column({ type: DataType.STRING })
  relatedEntityType: string; // 'order', 'product', 'payment'

  @Column({ type: DataType.STRING })
  relatedEntityId: string;

  @Column({ type: DataType.JSON })
  data: object; // Additional notification data

  @BelongsTo(() => User)
  user: User;
}
