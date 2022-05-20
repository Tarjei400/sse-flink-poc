import { Injectable } from '@nestjs/common';
import { FlinkHandler } from './flink/flink.decorators';
import { messageBuilder, StateFun } from 'apache-flink-statefun';

const GreetRequestType = StateFun.jsonType('example/GreetRequest');

@Injectable()
export class AppService {
  // @ts-ignore
  @FlinkHandler({
    name: 'example/person',
    specs: [
      {
        name: 'visits',
        type: StateFun.intType(),
      },
    ],
  })
  test(context: any, message: any, something: any) {
    let request = message.as(GreetRequestType);
    let visits = context.storage.visits;
    console.log('test function', JSON.stringify(context), message, something);

    if (request.idle) {
      if (visits < 10) {
        console.log('You are idle man');
      }
      return;
    }

    visits += 1;
    context.storage.visits = visits;

    // enrich the request with the number of vists.
    request.visits = visits;
    console.log(context, request);
    // next, we will forward a message to a special greeter function,
    // that will compute a super-doper-personalized greeting based on the
    // number of visits that this person has.
    context.sendAfter(
      10000,
      messageBuilder({
        typename: 'example/person',
        id: request.name,
        value: {
          idle: true,
          ...request,
        },
        valueType: GreetRequestType,
      }),
    );

    return context.storage;
  }

  getHello() {
    return 'asd';
  }
}
