import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  NestMiddleware,
  Injectable,
} from '@nestjs/common';

import { CinemaService } from '../../cinema/cinema.service';
import { MovieService } from '../movie.service';
import { Cinema } from '../../cinema/entities';
import { ERRORS_MESSAGES } from '../../shared';
import { UpdateMovieDto } from '../dto';
import { Movie } from '../entities';

@Injectable()
export class ValidateMovieInputMiddleware implements NestMiddleware {
  constructor(
    private readonly cinemaService: CinemaService,
    private readonly movieService: MovieService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, cinemaId }: UpdateMovieDto = req.body;

    if (name) {
      const movie: Movie = await this.movieService.findOneByName(name);

      if (movie && movie.id !== id) {
        throw new BadRequestException(ERRORS_MESSAGES.MOVIE_ALREADY_EXISTS);
      }
    }

    if (cinemaId) {
      const cinema: Cinema = await this.cinemaService.findOneById(cinemaId);

      if (!cinema) {
        throw new BadRequestException(ERRORS_MESSAGES.CINEMA_NOT_EXISTS);
      }

      req.body.cinema = cinema;
    }

    next();
  }
}
