import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'ハローワールド' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: { text: { example: 'Hello World!' } },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
