import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/list-created.events';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class PublishUserCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    await this.queue.add('user.created', event);
  }
}
