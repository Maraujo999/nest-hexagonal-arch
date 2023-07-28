import { OnEvent } from '@nestjs/event-emitter';
import { ListGatewayIntegrationHttpPort } from './../gateways/list-gateway-http';
import { UserCreatedEvent } from '../events/list-created.events';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreatedUserCrmListener {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegration: ListGatewayIntegrationHttpPort,
  ) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    this.listIntegration.create(event.user);
  }
}
