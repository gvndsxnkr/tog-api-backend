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
import { Product } from './product.model';

@Table({ paranoid: true, timestamps: true })
export class Review extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number; // 1-5

  @Column({ type: DataType.TEXT })
  comment: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isVerified: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
