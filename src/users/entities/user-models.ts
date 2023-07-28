import { Column, Table, Model } from 'sequelize-typescript';

export type ListAttributes = {
  id: string;
  nome: string;
  email: string;
  password: string;
};

@Table
export class UserModel extends Model<ListAttributes> {
  @Column
  nome: string;
  @Column
  email: string;
  @Column
  password: string;
}
