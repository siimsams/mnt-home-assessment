import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runMigrations } from './typeorm.config';
import { ValidationPipe } from '@nestjs/common';

async function runApplication() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
  });

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      transform: true,
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}

async function bootstrap() {
  await runMigrations();
  
  await runApplication();
}

bootstrap();
