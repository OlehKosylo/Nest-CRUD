import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  suburb: string;
}
