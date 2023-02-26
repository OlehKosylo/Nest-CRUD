import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
  Module,
} from '@nestjs/common';

import { ValidateUpdateCinemaInputMiddleware } from './middlewares';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { Cinema } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUpdateCinemaInputMiddleware)
      .forRoutes({ path: 'cinema/:id', method: RequestMethod.PATCH });
  }
}
