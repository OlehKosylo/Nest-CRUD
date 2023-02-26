import * as httpStatus from 'http-status';
import { UpdateResult } from 'typeorm';
import {
  Controller,
  HttpCode,
  Delete,
  Patch,
  Param,
  Body,
  Post,
  Get,
  BadRequestException,
} from '@nestjs/common';

import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieService } from './movie.service';
import { ERRORS_MESSAGES } from '../shared';
import { Movie } from './entities';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = await this.movieService.findOneByName(
      createMovieDto.name,
    );

    if (movie) {
      throw new BadRequestException(ERRORS_MESSAGES.MOVIE_ALREADY_EXISTS);
    }

    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Movie | null> {
    return this.movieService.findOneById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<UpdateResult> {
    return this.movieService.updateById(id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(httpStatus.NO_CONTENT)
  async removeById(@Param('id') id: string): Promise<void> {
    await this.movieService.removeById(id);
  }
}
