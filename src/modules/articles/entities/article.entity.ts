import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Article extends Model<Article> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;
}
