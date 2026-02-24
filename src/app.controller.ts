import { Controller, Get, Ip, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';
import { User } from './param-decorators/user.decorator';

// fake user entity for demonstration purposes
interface UserEntity {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('log-response')
  logResponse(@Res({ passthrough: true }) response: Response): void {
    /**
     * Note：当注入 response 对象时，相当于强迫 Nest 将这条 handler 进入了平台相关的模式（在这个例子中是 Express）。
     * 并且需要导入对应的类型（在这个例子中是 express 的 Response 类型）。与此同时带来的好处可能是更大的灵活性，坏处是失去了平台无关的特性。
     * 也就是说，使用了 @Res() 注入 response 对象的 handler 将无法在 Fastify 平台上运行。另外，手动注入 response 给我们 AI 应用
     * 的流式数据返回提供了可能性，并且如果你没有手动调用 res.json() 或 res.send()，本轮请求会挂起
     */
    console.log('log-response called', response);
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

  @Get('log-user')
  logUser(@User() user: UserEntity): string {
    console.log('User:', user);
    return user ? JSON.stringify(user) : 'No user information';
  }

  @Get('log-user-detail')
  logUserDetail(@User('firstName') firstName: string): string {
    console.log('User Detail:', firstName);
    return firstName ? `User First Name: ${firstName}` : 'No user information';
  }

  @Get('log-ip')
  logIp(@Ip() ip: string): string {
    console.log('Client IP:', ip);
    return ip;
  }
}
