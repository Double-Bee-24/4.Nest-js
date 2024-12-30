import { IsString, IsDateString, IsUrl } from 'class-validator';

export class CreatePlanetDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  diameter: string;

  @IsString()
  rotation_period: string;

  @IsString()
  orbital_period: string;

  @IsString()
  gravity: string;

  @IsString()
  population: string;

  @IsString()
  climate: string;

  @IsString()
  terrain: string;

  @IsString()
  surface_water: string;

  @IsDateString()
  created: string;

  @IsDateString()
  edited: string;

  @IsString()
  name: string;

  @IsUrl()
  url: string;
}
