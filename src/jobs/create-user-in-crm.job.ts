import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';

//@Processor()
export class CreateUserInCrmJob {
//  constructor(
//    @Inject('ListIntegrationGateway')
//    private listIntegrationGateway: ListIntegrationGateway,
//  ) {}
//
//  @Process('list.created')
//  async handle(job: Job<UserCreatedEvent>) {
//    console.log('job processando...');
//    console.log(job.data);
//    const event = job.data;
//    await this.listIntegrationGateway.create(event.list);
//  }
//
//  @OnQueueFailed({ name: 'list.created' })
//  handleError(error: Error) {
//    console.log('CreateListInCrmJob', error);
//  }
}