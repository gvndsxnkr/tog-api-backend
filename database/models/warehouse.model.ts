import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Inventory } from './inventory.model';

@Table({ paranoid: true, timestamps: true })
export class Warehouse extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  location: string;

  @HasMany(() => Inventory)
  inventory: Inventory[];
}
