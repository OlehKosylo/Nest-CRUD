import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
  Module,
} from '@nestjs/common';

import { ValidateUpdateMovieInputMiddleware } from './middlewares';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUpdateMovieInputMiddleware)
      .forRoutes({ path: 'movie/:id', method: RequestMethod.PATCH });
  }
}
