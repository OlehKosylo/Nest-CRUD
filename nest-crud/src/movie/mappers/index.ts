import { UpdateMovieDto } from '../dto';
import { Movie } from '../entities';

export const mapDtoToEntity = (dto: UpdateMovieDto): Partial<Movie> => ({
  cinema: dto.cinema,
  name: dto.name,
});
