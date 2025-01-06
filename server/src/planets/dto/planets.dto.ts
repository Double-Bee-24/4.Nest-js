import { IsString, IsDateString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { People } from 'src/people/entities/people.entity';

export class PlanetsDto {
  @ApiProperty({
    description: 'Unique identifier of the planet',
    example: '1',
  })
  @IsNumber()
  id!: number;

  @ApiProperty({
    description: 'A detailed description of the planet',
    example: 'A terrestrial planet with an extensive desert landscape.',
  })
  @IsString()
  description: string = '';

  @ApiProperty({
    description: 'The diameter of the planet in kilometers',
    example: '12742',
  })
  @IsString()
  diameter: string = '';

  @ApiProperty({
    description: 'The rotation period of the planet in hours',
    example: '24',
  })
  @IsString()
  rotationPeriod: string = '';

  @ApiProperty({
    description: 'The orbital period of the planet in days',
    example: '365',
  })
  @IsString()
  orbitalPeriod: string = '';

  @ApiProperty({
    description: 'The gravity on the planet, relative to standard gravity',
    example: '1 standard',
  })
  @IsString()
  gravity: string = '';

  @ApiProperty({
    description: 'The population of the planet',
    example: '7000000000',
  })
  @IsString()
  population: string = '';

  @ApiProperty({
    description: 'The climate of the planet',
    example: 'Arid, Temperate',
  })
  @IsString()
  climate: string = '';

  @ApiProperty({
    description: 'The terrain of the planet',
    example: 'Desert, Mountains',
  })
  @IsString()
  terrain: string = '';

  @ApiProperty({
    description: "The percentage of the planet's surface covered by water",
    example: '30',
  })
  @IsString()
  surfaceWater: string = '';

  @ApiProperty({
    description: 'The date when the planet was created',
    example: '2025-01-01T12:00:00Z',
  })
  @IsDateString()
  created: string = '';

  @ApiProperty({
    description: 'The date when the planet was last updated',
    example: '2025-01-02T15:00:00Z',
  })
  @IsDateString()
  edited: string = '';

  @ApiProperty({
    description: 'The name of the planet',
    example: 'Tatooine',
  })
  @IsString()
  name: string = '';

  @ApiProperty({
    description: 'Array of people associated with this planet',
    example: ['Luke Skywalker', 'Leia Organa'],
  })
  @IsArray()
  @IsString({ each: true })
  people: People[] = [];
}
