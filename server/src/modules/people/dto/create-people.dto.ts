import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePeopleDto {
  @ApiProperty({
    description: 'Short description of the person',
    example: 'Jedi Master and hero of the Clone Wars',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Height of the person in centimeters',
    example: '180',
  })
  @IsString()
  height!: string;

  @ApiProperty({
    description: 'Mass of the person in kilograms',
    example: '75',
  })
  @IsString()
  mass!: string;

  @ApiProperty({ description: 'Hair color of the person', example: 'Blond' })
  @IsString()
  hairColor!: string;

  @ApiProperty({ description: 'Skin color of the person', example: 'Fair' })
  @IsString()
  skinColor!: string;

  @ApiProperty({ description: 'Eye color of the person', example: 'Blue' })
  @IsString()
  eyeColor!: string;

  @ApiProperty({
    description: 'Birth year of the person (e.g., BBY or ABY)',
    example: '17BBY',
  })
  @IsString()
  birthYear!: string;

  @ApiProperty({ description: 'Gender of the person', example: 'Male' })
  @IsString()
  gender!: string;

  @ApiProperty({ description: 'Name of the person', example: 'Luke Skywalker' })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Homeworld URL of the person',
    example: '123',
  })
  @IsNumber()
  homeworld!: number;
}
