import { ApiProperty } from '@nestjs/swagger';

export class CreateVehiclesDto {
  @ApiProperty({ example: 'Speeder', description: 'Model of the vehicle' })
  model!: string;

  @ApiProperty({
    example: 'Repulsorcraft',
    description: 'Class of the vehicle',
  })
  vehicleClass!: string;

  @ApiProperty({
    example: 'SoroSuub Corporation',
    description: 'Manufacturer of the vehicle',
  })
  manufacturer!: string;

  @ApiProperty({
    example: '150000',
    description: 'Cost of the vehicle in credits',
  })
  costInCredits!: string;

  @ApiProperty({
    example: '3.4',
    description: 'Length of the vehicle in meters',
  })
  length!: string;

  @ApiProperty({ example: '1', description: 'Crew capacity of the vehicle' })
  crew!: string;

  @ApiProperty({
    example: '2',
    description: 'Passenger capacity of the vehicle',
  })
  passengers!: string;

  @ApiProperty({
    example: '650',
    description: 'Maximum speed of the vehicle in the atmosphere',
  })
  maxAtmospheringSpeed!: string;

  @ApiProperty({
    example: '50',
    description: 'Cargo capacity of the vehicle in kilograms',
  })
  cargoCapacity!: string;

  @ApiProperty({
    example: '1 day',
    description: 'Consumables period of the vehicle',
  })
  consumables!: string;

  @ApiProperty({ example: 'TIE Fighter', description: 'Name of the vehicle' })
  name!: string;

  @ApiProperty({
    example: 'A fast and maneuverable combat vehicle.',
    description: 'Description of the vehicle',
  })
  description!: string;
}
