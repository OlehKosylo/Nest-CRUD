import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateCinemaDto, UpdateCinemaDto } from './dto';
import { Cinema } from './entities';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>,
  ) {}

  async create(createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    const cinema: Cinema = this.cinemaRepository.create(createCinemaDto);

    return this.cinemaRepository.save(cinema);
  }

  async findAll(): Promise<Cinema[]> {
    return this.cinemaRepository.find();
  }

  async findOneById(id: string): Promise<Cinema | null> {
    return this.cinemaRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Cinema | null> {
    return this.cinemaRepository.findOneBy({ name });
  }

  async updateById(
    id: string,
    updateCinemaDto: UpdateCinemaDto,
  ): Promise<UpdateResult> {
    return this.cinemaRepository.update({ id }, updateCinemaDto);
  }

  async removeById(id: string): Promise<void> {
    await this.cinemaRepository.delete({ id });
  }
}
