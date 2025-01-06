import { ApiProperty } from '@nestjs/swagger';

export class SpeciesDto {
  @ApiProperty({
    description: 'Unique identifier of the species',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'A detailed description of the species',
    example: 'Tall, humanoid species with green skin.',
  })
  description: string = '';

  @ApiProperty({
    description: 'The biological classification of the species',
    example: 'Mammal',
  })
  classification: string = '';

  @ApiProperty({
    description: 'The species designation (e.g., sentient, non-sentient)',
    example: 'Sentient',
  })
  designation: string = '';

  @ApiProperty({
    description: 'The average height of the species in centimeters',
    example: '180',
  })
  averageHeight: string = '';

  @ApiProperty({
    description: 'The average lifespan of the species in years',
    example: '120',
  })
  averageLifespan: string = '';

  @ApiProperty({
    description: 'The common hair colors for the species',
    example: 'Black, Brown, Blonde',
  })
  hairColors: string = '';

  @ApiProperty({
    description: 'The common skin colors for the species',
    example: 'Green, Blue, Red',
  })
  skinColors: string = '';

  @ApiProperty({
    description: 'The common eye colors for the species',
    example: 'Yellow, Green, Blue',
  })
  eyeColors: string = '';

  @ApiProperty({
    description: 'The name of the homeworld of the species',
    example: 'Naboo',
  })
  homeworld: string = '';

  @ApiProperty({
    description: 'The primary language spoken by the species',
    example: 'Galactic Basic',
  })
  language: string = '';

  @ApiProperty({
    description: 'The date when the species record was created',
    example: '2025-01-01T12:00:00Z',
  })
  created: string = '';

  @ApiProperty({
    description: 'The date when the species record was last updated',
    example: '2025-01-02T15:00:00Z',
  })
  edited: string = '';

  @ApiProperty({
    description: 'The name of the species',
    example: "Twi'lek",
  })
  name: string = '';
}
