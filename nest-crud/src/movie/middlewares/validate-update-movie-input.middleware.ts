import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  NestMiddleware,
  Injectable,
} from '@nestjs/common';

import { MovieService } from '../movie.service';
import { ERRORS_MESSAGES } from '../../shared';
import { UpdateMovieDto } from '../dto';
import { Movie } from '../entities';

@Injectable()
export class ValidateUpdateMovieInputMiddleware implements NestMiddleware {
  constructor(private readonly movieService: MovieService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name }: UpdateMovieDto = req.body;

    if (name) {
      const movie: Movie = await this.movieService.findOneByName(name);

      if (movie && movie.id !== id) {
        throw new BadRequestException(ERRORS_MESSAGES.MOVIE_ALREADY_EXISTS);
      }
    }

    next();
  }
}
