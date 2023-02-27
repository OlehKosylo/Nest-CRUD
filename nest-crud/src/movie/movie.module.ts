import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
  Module,
} from '@nestjs/common';

import { ValidateMovieInputMiddleware } from './middlewares';
import { CinemaModule } from '../cinema/cinema.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), CinemaModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateMovieInputMiddleware)
      .forRoutes({ path: 'movie/:id', method: RequestMethod.PATCH });

    consumer
      .apply(ValidateMovieInputMiddleware)
      .forRoutes({ path: 'movie', method: RequestMethod.POST });
  }
}
