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
  hairColor: string;

  @IsString()
  skinColor: string;

  @IsString()
  eyePolor: string;

  @IsString()
  birthYear: string;

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
