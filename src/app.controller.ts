import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  testPureResponse(@Res({ passthrough: true }) response): void {
    console.log('testPureResponse called', response);
    response.setHeader('X-Custom-Header', 'CustomValue');
    response.status(200).send('ok!');
  }
}
