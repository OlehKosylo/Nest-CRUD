import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { CinemaModule } from './cinema/cinema.module';
import {
  configurationModuleOptions,
  typeORMConfigurations,
  HttpExceptionFilter,
} from './shared';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot(configurationModuleOptions),
    TypeOrmModule.forRootAsync({
      useFactory: typeORMConfigurations,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    CinemaModule,
    MovieModule,
  ],
  exports: [ConfigModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
