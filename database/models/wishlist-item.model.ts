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
import { Wishlist } from './wishlist.model';
import { Product } from './product.model';

@Table({ paranoid: true, timestamps: true })
export class WishlistItem extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => Wishlist)
  @Column({ type: DataType.UUID, allowNull: false })
  wishlistId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @BelongsTo(() => Wishlist)
  wishlist: Wishlist;

  @BelongsTo(() => Product)
  product: Product;
}
