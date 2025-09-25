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

@Table({ paranoid: true, timestamps: true })
export class ProductImage extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.STRING })
  altText: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPrimary: boolean;

  @BelongsTo(() => Product)
  product: Product;
}
