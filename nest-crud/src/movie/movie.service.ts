import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateMovieDto, UpdateMovieDto } from './dto';
import { mapDtoToEntity } from './mappers';
import { Movie } from './entities';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(data: CreateMovieDto): Promise<Movie> {
    const movie: Movie = this.movieRepository.create(mapDtoToEntity(data));

    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['cinema'],
    });
  }

  async findOneById(id: string): Promise<Movie | null> {
    return this.movieRepository.findOne({
      where: { id },
      relations: ['cinema'],
    });
  }

  async findOneByName(name: string): Promise<Movie | null> {
    return this.movieRepository.findOneBy({ name });
  }

  async updateById(id: string, data: UpdateMovieDto): Promise<UpdateResult> {
    const movie: Partial<Movie> = mapDtoToEntity(data);

    return this.movieRepository.update({ id }, movie);
  }

  async removeById(id: string): Promise<void> {
    await this.movieRepository.delete({ id });
  }
}
