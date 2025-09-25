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

@Table({ paranoid: true, timestamps: true })
export class Address extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @Column({ type: DataType.ENUM('shipping', 'billing'), allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING })
  company: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address1: string;

  @Column({ type: DataType.STRING })
  address2: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  state: string;

  @Column({ type: DataType.STRING, allowNull: false })
  postalCode: string;

  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDefault: boolean;

  // Relationships
  @BelongsTo(() => User)
  user: User;
}
