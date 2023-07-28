import { User } from '../entities/user.entity';

export interface ListGatewayInterfacePort {
  create(list: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
}
