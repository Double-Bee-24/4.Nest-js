import { IsDateString, IsString, IsUrl } from 'class-validator';

export class PeopleDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  height: string;

  @IsString()
  mass: string;

  @IsString()
  hair_color: string;

  @IsString()
  skin_color: string;

  @IsString()
  eye_color: string;

  @IsString()
  birth_year: string;

  @IsString()
  gender: string;

  @IsDateString()
  created: string;

  @IsDateString()
  edited: string;

  @IsString()
  name: string;

  @IsString()
  homeworld: string;

  @IsUrl()
  url: string;
}
