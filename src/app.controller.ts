import { Controller, Get, Ip, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  testPureResponse(@Res({ passthrough: true }) response: Response): void {
    console.log('testPureResponse called', response);
    response.setHeader('X-Custom-Header', 'CustomValue');
    response.status(200).send('ok!');
  }

  @Get('log-req')
  logRequest(@Req() request: Request): string {
    console.log('Request:', request);
    return request.headers['user-agent'] || 'No User-Agent header';
    // return user's IP address
    // return request.ip || 'No IP address';
  }

  @Get('log-ip')
  logIp(@Ip() ip: string): string {
    console.log('Client IP:', ip);
    return ip;
  }
}
