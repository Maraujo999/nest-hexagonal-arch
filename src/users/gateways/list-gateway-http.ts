import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User } from '../entities/user.entity';
import { ListGatewayInterfacePort } from './list-gatewat-interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListGatewayIntegrationHttpPort
  implements ListGatewayInterfacePort
{
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}
  ccreate(list: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async create(user: User): Promise<User> {
    await lastValueFrom(
      this.httpService.post('lists', {
        id: user.id,
        nome: user.nome,
        email: user.email,
        password: user.password,
      }),
    );
    return user;
  }
  async findAll(): Promise<User[]> {
    const { data } = await lastValueFrom(this.httpService.get<any[]>(`lists`));
    return data.map((d) => new User(d.id, d.nome, d.email, d.password));
  }

  async findById(id: number): Promise<User> {
    const { data } = await lastValueFrom(
      this.httpService.get<any>(`lists/${id}`),
    );
    return data.map((d) => new User(d.id, d.nome, d.email, d.password));
  }
}
