import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize/dist';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserModel } from './entities/user-models';
import { ListGatewayInterfacePort } from './gateways/list-gatewat-interface';
import { User } from './entities/user.entity';
import { ListGatewayIntegrationHttpPort } from './gateways/list-gateway-http';
import EventEmitter from 'events';
import { UserCreatedEvent } from './events/list-created.events';

//PORTS AND ADAPTERS
@Injectable()
export class UsersService {
  constructor(
    @Inject('ListPersistenceGatewayPort')
    private listGatewayInterfacePort: ListGatewayInterfacePort, //PORTA
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const usuario = new User(
      createUserDto.id,
      createUserDto.nome,
      createUserDto.email,
      createUserDto.password,
    );
    await this.listGatewayInterfacePort.create(usuario);
    this.eventEmitter.emit('list.create', new UserCreatedEvent(usuario)); //SE EU FIZER DESSA FORMA
    //O MÉTODO NÃO TEM TANTAS RESPONSABILIDADES O QUE FACILITA OS TESTES E MANUTENÇÃO DE CÓDIGO
    return usuario;
  }

  findAll() {
    return this.listGatewayInterfacePort.findAll();
  }

  async findOne(id: number) {
    const list = await this.listGatewayInterfacePort.findById(id);
    if (!list) {
      throw new Error('List not found');
    }
    return list;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
