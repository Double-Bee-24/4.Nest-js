import { ApiProperty } from '@nestjs/swagger';

export class StarshipsDto {
  @ApiProperty({
    description: 'Unique identifier of the starship',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'The model of the starship',
    example: 'X-Wing',
  })
  model: string = '';

  @ApiProperty({
    description: 'The class of the starship',
    example: 'Starfighter',
  })
  starshipClass: string = '';

  @ApiProperty({
    description: 'The manufacturer of the starship',
    example: 'Incom Corporation',
  })
  manufacturer: string = '';

  @ApiProperty({
    description: 'The cost of the starship in credits',
    example: '150000',
  })
  costInCredits: string = '';

  @ApiProperty({
    description: 'The length of the starship in meters',
    example: '12.5',
  })
  length: string = '';

  @ApiProperty({
    description: 'The number of crew members required to operate the starship',
    example: '1',
  })
  crew: string = '';

  @ApiProperty({
    description: 'The number of passengers the starship can carry',
    example: '0',
  })
  passengers: string = '';

  @ApiProperty({
    description: 'The maximum atmospheric speed of the starship',
    example: '1050',
  })
  maxAtmospheringSpeed: string = '';

  @ApiProperty({
    description: 'The hyperdrive rating of the starship',
    example: '1.0',
  })
  hyperdriveRating: string = '';

  @ApiProperty({
    description: 'Megalights per hour, a measure of speed in space',
    example: '75',
  })
  MGLT: string = '';

  @ApiProperty({
    description: 'The cargo capacity of the starship in kilograms',
    example: '110',
  })
  cargoCapacity: string = '';

  @ApiProperty({
    description:
      'Consumable supplies the starship can carry (e.g., food, water)',
    example: '1 week',
  })
  consumables: string = '';

  @ApiProperty({
    description: 'A list of pilots associated with the starship',
    example: '["Luke Skywalker", "Wedge Antilles"]',
  })
  pilots: string = '';

  @ApiProperty({
    description: 'The date when the starship record was created',
    example: '2025-01-01T12:00:00Z',
  })
  created: string = '';

  @ApiProperty({
    description: 'The date when the starship record was last updated',
    example: '2025-01-02T15:00:00Z',
  })
  edited: string = '';

  @ApiProperty({
    description: 'The name of the starship',
    example: 'X-Wing',
  })
  name: string = '';

  @ApiProperty({
    description: 'A detailed description of the starship',
    example: 'A nimble starfighter used by the Rebel Alliance.',
  })
  description: string = '';
}
