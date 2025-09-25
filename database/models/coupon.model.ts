import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class Coupon extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string; // 'percentage' or 'fixed'

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  value: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  minOrderAmount: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  maxDiscountAmount: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  usageLimit: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  usedCount: number;

  @Column({ type: DataType.DATE })
  validFrom: Date;

  @Column({ type: DataType.DATE })
  validUntil: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
