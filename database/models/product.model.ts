import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Warehouse } from './warehouse.model';
import { Inventory } from './inventory.model';
import { OrderItem } from './order-item.model';
import { Category } from './category.model';
import { Brand } from './brand.model';
import { Review } from './review.model';
import { ProductImage } from './product-image.model';

@Table({ paranoid: true, timestamps: true })
export class Product extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING, unique: true })
  sku: string;

  @Column({ type: DataType.STRING, unique: true })
  slug: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  comparePrice: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID })
  categoryId: string;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.UUID })
  brandId: string;

  @Column({ type: DataType.DECIMAL(8, 2) })
  weight: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFeatured: boolean;

  @Column({ type: DataType.JSON })
  tags: string[];

  // Essential e-commerce fields only
  @Column({ type: DataType.JSON })
  attributes: object; // Color, Size, Material, etc.

  @Column({ type: DataType.DECIMAL(3, 2), defaultValue: 0 })
  averageRating: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  reviewCount: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  trackInventory: boolean; // Whether to track stock for this product

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  allowBackorder: boolean; // Allow orders when out of stock

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Brand)
  brand: Brand;

  @HasMany(() => Inventory)
  inventory: Inventory[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => ProductImage)
  images: ProductImage[];
}
