import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cookie parser
  app.use(cookieParser());

  // enable CORS
  app.enableCors({
    // origin: process.env.CORS_ORIGIN,
    origin: true,
    credentials: true,
  });

  // enable validations
  app.useGlobalPipes(new ValidationPipe());

  // server port
  await app.listen(Number(process.env.PORT));
}

bootstrap();
