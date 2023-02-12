import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import * as yaml from 'yaml';

import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './filters/all-exceptions.filter';
import exceptionFactory from './utils/exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const document = yaml.parse(await readFile(resolve(__dirname, '..', 'openapi.yaml'), 'utf8'));
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
