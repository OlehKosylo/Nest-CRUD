import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  NestMiddleware,
  Injectable,
} from '@nestjs/common';

import { CinemaService } from '../cinema.service';
import { ERRORS_MESSAGES } from '../../shared';
import { UpdateCinemaDto } from '../dto';
import { Cinema } from '../entities';

@Injectable()
export class ValidateUpdateCinemaInputMiddleware implements NestMiddleware {
  constructor(private readonly cinemaService: CinemaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name }: UpdateCinemaDto = req.body;

    if (name) {
      const cinema: Cinema = await this.cinemaService.findOneByName(name);

      if (cinema && cinema.id !== id) {
        throw new BadRequestException(ERRORS_MESSAGES.CINEMA_ALREADY_EXISTS);
      }
    }

    next();
  }
}
