import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Address } from './address.model';
import { Cart } from './cart.model';
import { Wishlist } from './wishlist.model';
import { Review } from './review.model';

@Table({ paranoid: true, timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.DATE })
  dateOfBirth: Date;

  @Column({ type: DataType.ENUM('male', 'female', 'other') })
  gender: string;

  @Column({ type: DataType.STRING })
  avatar: string;

  @Column({ type: DataType.ENUM('user', 'admin', 'vendor'), defaultValue: 'user' })
  role: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isEmailVerified: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.DATE })
  lastLoginAt: Date;

  // Essential auth fields only
  @Column({ type: DataType.STRING })
  emailVerificationToken: string;

  @Column({ type: DataType.STRING })
  passwordResetToken: string;

  @Column({ type: DataType.DATE })
  passwordResetExpires: Date;

  // Relationships
  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(() => Wishlist)
  wishlists: Wishlist[];

  @HasMany(() => Review)
  reviews: Review[];
}
