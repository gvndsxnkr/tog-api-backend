import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ paranoid: true, timestamps: true })
export class Brand extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING })
  logo: string;

  @Column({ type: DataType.STRING })
  website: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  // Relationships
  @HasMany(() => Product)
  products: Product[];
}
