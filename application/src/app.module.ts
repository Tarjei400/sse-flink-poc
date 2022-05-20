import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlinkFunctionsModule } from './flink/flink-functions.installer';

@Module({
  imports: [FlinkFunctionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
