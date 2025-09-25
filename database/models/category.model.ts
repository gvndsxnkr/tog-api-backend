import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ paranoid: true, timestamps: true })
export class Category extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID })
  parentId: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder: number;

  // Relationships
  @BelongsTo(() => Category, 'parentId')
  parent: Category;

  @HasMany(() => Category, 'parentId')
  children: Category[];

  @HasMany(() => Product)
  products: Product[];
}
