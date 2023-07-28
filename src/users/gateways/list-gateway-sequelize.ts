import { Injectable } from '@nestjs/common';
import { User } from './../entities/user.entity';
import { InjectModel } from '@nestjs/sequelize/dist';
import { ListGatewayInterfacePort } from './list-gatewat-interface';
import { UserModel } from '../entities/user-models';

@Injectable()
export class ListGatewaySequelize implements ListGatewayInterfacePort {
  constructor(
    @InjectModel(UserModel)
    private usuarioModel: typeof UserModel,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.usuarioModel.create(user);
    user.id = newUser.id;
    user.nome = newUser.nome;
    user.email = newUser.email;
    user.password = newUser.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const usuarioModels = await this.usuarioModel.findAll();
    return usuarioModels.map(
      (usuarioModels) =>
        new User(
          usuarioModels.id,
          usuarioModels.nome,
          usuarioModels.email,
          usuarioModels.password,
        ),
    );
  }
  async findById(id: number): Promise<User> {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) {
      throw new Error('Usuario not found');
    }
    return new User(usuario.id, usuario.nome, usuario.email, usuario.password);
  }
}
