import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
import { loggerWithTrace } from './logger';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const logger = loggerWithTrace();
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
  
      logger.info(`Incoming request: ${method} ${url}`);
      return next.handle().pipe(
        tap(() => logger.info(`Response sent for: ${method} ${url}`)),
      );
    }
  }
  