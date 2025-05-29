import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runMigrations } from './typeorm.config';
import { ValidationPipe } from '@nestjs/common';

async function runApplication() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

async function bootstrap() {
  await runMigrations();
  
  await runApplication();
}

bootstrap();
