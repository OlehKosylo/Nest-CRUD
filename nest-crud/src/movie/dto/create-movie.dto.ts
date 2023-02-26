import { IsNotEmpty, IsString } from 'class-validator';
import { Cinema } from '../../cinema/entities';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  cinema: Cinema;
}
