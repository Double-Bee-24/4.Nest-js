import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PeopleDto {
  @ApiProperty({
    description: 'Unique identifier for the person',
    example: '1',
  })
  @IsNumber()
  id!: number;

  @ApiProperty({
    description: 'Short description of the person',
    example: 'Jedi Master and hero of the Clone Wars',
  })
  @IsString()
  description: string = '';

  @ApiProperty({
    description: 'Height of the person in centimeters',
    example: '180',
  })
  @IsString()
  height: string = '';

  @ApiProperty({
    description: 'Mass of the person in kilograms',
    example: '75',
  })
  @IsString()
  mass: string = '';

  @ApiProperty({ description: 'Hair color of the person', example: 'Blond' })
  @IsString()
  hairColor: string = '';

  @ApiProperty({ description: 'Skin color of the person', example: 'Fair' })
  @IsString()
  skinColor: string = '';

  @ApiProperty({ description: 'Eye color of the person', example: 'Blue' })
  @IsString()
  eyeColor: string = '';

  @ApiProperty({
    description: 'Birth year of the person (e.g., BBY or ABY)',
    example: '19BBY',
  })
  @IsString()
  birthYear: string = '';

  @ApiProperty({ description: 'Gender of the person', example: 'Male' })
  @IsString()
  gender: string = '';

  @ApiProperty({
    description: 'Date when the record was created',
    example: '2023-12-01T12:00:00Z',
  })
  @IsDateString()
  created: string = '';

  @ApiProperty({
    description: 'Date when the record was last edited',
    example: '2023-12-02T15:30:00Z',
  })
  @IsDateString()
  edited: string = '';

  @ApiProperty({ description: 'Name of the person', example: 'Luke Skywalker' })
  @IsString()
  name: string = '';

  @ApiProperty({
    description: 'Homeworld URL of the person',
    example: 'https://swapi.dev/api/planets/1/',
  })
  @IsString()
  homeworld!: number;
}
