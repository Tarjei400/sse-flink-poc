import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { StateFun } from 'apache-flink-statefun';

@Controller('flink')
export class FlinkController {
  constructor(private readonly stateFun: StateFun) {}

  @Get()
  async get(@Req() request, @Res() response) {
    console.log('request Get');

    return await this.stateFun.handle(request, response);
  }

  @Post()
  async post(@Req() request, @Res() response) {
    console.log('request Post');

    const res = await this.stateFun.handle(request, response);
    console.log('request res', res, response.data);

    return res;
  }

  @Put()
  async put(@Req() request, @Res() response) {
    console.log('request put');

    const res = await this.stateFun.handle(request, response);

    console.log('Response');
    console.log(res);
    return res;
  }

  @Delete()
  async delete(@Req() request, @Res() response) {
    console.log('request Delete');

    return await this.stateFun.handle(request, response);
  }
}
