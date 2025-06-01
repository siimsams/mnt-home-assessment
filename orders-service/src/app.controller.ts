import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/constants';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly jwtService: JwtService) {}

  @Public()
  @Get()
  getHealth(): string {
    return 'Healthy';
  }

  /**
   * This endpoint is used to generate a token for testing purposes.
   * In a real application, this would be done by auth service.
   */
  @Public()
  @Get('auth-token')
  getAuthToken(): string {
    const payload = { sub: 'test-user', email: 'test@example.com' };
    return this.jwtService.sign(payload);
  }
}
