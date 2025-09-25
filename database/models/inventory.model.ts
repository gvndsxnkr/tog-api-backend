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
import { Warehouse } from './warehouse.model';

@Table({ paranoid: true, timestamps: true })
export class Inventory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @ForeignKey(() => Warehouse)
  @Column({ type: DataType.UUID, allowNull: false })
  warehouseId: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  quantity: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  reservedQuantity: number;

  @Column({ type: DataType.INTEGER, defaultValue: 5 })
  minStockLevel: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;
}
