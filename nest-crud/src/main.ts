import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  VALIDATION_PIPE_OPTIONS,
  ConfigVariables,
  GLOBAL_PREFIX,
} from './shared';

(async function () {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>(ConfigVariables.PORT);

  await app.listen(port);

  console.log(`Nest.JS is listening on ${port} port`);
})();
