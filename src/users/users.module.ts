import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { UserModel } from './entities/user-models';
import { ListGatewayIntegrationHttpPort } from './gateways/list-gateway-http';
//import { CreatedUserCrmListener } from './listerens/created-list-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { PublishUserCreatedListener } from './listerens/publish-user-created.listener';
import { CreateUserInCrmJob } from 'src/jobs/create-user-in-crm.job';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),

    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: {attempts: 1}
    })
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ListGatewaySequelize,
    ListGatewayIntegrationHttpPort,
    PublishUserCreatedListener,
    CreateUserInCrmJob,
    //CreatedUserCrmListener,
    {
      provide: 'ListPersistenceGatewayPort',
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayIntegrationHttpPort,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class UsersModule {}
