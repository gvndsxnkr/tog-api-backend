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
import { Product } from './product.model';
import { Order } from './order.model';
import { Warehouse } from './warehouse.model';

@Table({ paranoid: true, timestamps: true })
export class StockReservation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @ForeignKey(() => Warehouse)
  @Column({ type: DataType.UUID, allowNull: false })
  warehouseId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.STRING, defaultValue: 'reserved' })
  status: string; // 'reserved', 'fulfilled', 'cancelled', 'expired'

  @Column({ type: DataType.DATE })
  expiresAt: Date; // Auto-release after 30 minutes

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;
}
