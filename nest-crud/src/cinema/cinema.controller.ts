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

import { UpdateCinemaDto, CreateCinemaDto } from './dto';
import { CinemaService } from './cinema.service';
import { ERRORS_MESSAGES } from '../shared';
import { Cinema } from './entities';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  async create(@Body() createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    const cinema: Cinema = await this.cinemaService.findOneByName(
      createCinemaDto.name,
    );

    if (cinema) {
      throw new BadRequestException(ERRORS_MESSAGES.CINEMA_ALREADY_EXISTS);
    }

    return this.cinemaService.create(createCinemaDto);
  }

  @Get()
  async findAll(): Promise<Cinema[]> {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Cinema | null> {
    return this.cinemaService.findOneById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCinemaDto: UpdateCinemaDto,
  ): Promise<UpdateResult> {
    return this.cinemaService.updateById(id, updateCinemaDto);
  }

  @Delete(':id')
  @HttpCode(httpStatus.NO_CONTENT)
  async removeById(@Param('id') id: string): Promise<void> {
    await this.cinemaService.removeById(id);
  }
}
