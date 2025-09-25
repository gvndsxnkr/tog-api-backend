import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  HasMany,
  PrimaryKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { User } from './user.model';
import { WishlistItem } from './wishlist-item.model';

@Table({ paranoid: true, timestamps: true })
export class Wishlist extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column({ type: DataType.STRING, defaultValue: 'My Wishlist' })
  name: string;

  // Relationships
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => WishlistItem)
  wishlistItems: WishlistItem[];
}
