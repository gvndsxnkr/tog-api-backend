import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Product } from './product.model';
import { Warehouse } from './warehouse.model';

@Table({ paranoid: true, timestamps: true })
export class OrderItem extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @ForeignKey(() => Warehouse)
  @Column({ type: DataType.UUID, allowNull: false })
  warehouseId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  unitPrice: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalPrice: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;
}
