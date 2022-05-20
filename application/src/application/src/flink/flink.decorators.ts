import { makeInjectableDecorator } from '@golevelup/nestjs-common';
import 'reflect-metadata';
import { SetMetadata } from '@nestjs/common';

import {
  FLINK_CONFIG_TOKEN,
  FLINK_HANDLER,
  FlinkFunctionConfig,
} from './flink.contsnts';

export const FlinkHandler =
  (config: FlinkFunctionConfig) => (target, key, descriptor) =>
    SetMetadata(FLINK_HANDLER, config)(target, key, descriptor);

export const InjectFlinkConfig = makeInjectableDecorator(FLINK_CONFIG_TOKEN);
