import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users/entities/user-models';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    UsersModule,
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      autoLoadModels: true,
      models: [UserModel],
    }),
    BullModule.forRoot({
      redis: {
        host:'redis',
        port: 6379
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
