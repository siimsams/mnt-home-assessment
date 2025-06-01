import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/auth/constants';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHealth(): string {
    return 'Healthy';
  }
}
