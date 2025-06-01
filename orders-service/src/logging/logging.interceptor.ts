import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { loggerWithTrace } from './logger';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const logger = loggerWithTrace();
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url } = request;

    logger.info(`Incoming request: ${method} ${url}`);
    return next.handle().pipe(
      tap(() => {
        const statusCode = response.statusCode;
        logger.info(
          `Response sent for: ${method} ${url} - Status: ${statusCode}`,
        );
      }),
    );
  }
}
