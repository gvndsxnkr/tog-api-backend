import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  PrimaryKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { User } from './user.model';
import { CartItem } from './cart-item.model';

@Table({ paranoid: true, timestamps: true })
export class Cart extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column({ type: DataType.STRING })
  sessionId: string;

  @Column({ type: DataType.DATE })
  expiresAt: Date; // Cart expiry for cleanup

  // Relationships
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
