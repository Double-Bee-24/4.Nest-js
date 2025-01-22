import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class FilmsDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the film',
  })
  id!: number;

  @Expose()
  @ApiProperty({
    example: 'Revenge of the Sith',
    description: 'The title of the film',
  })
  title: string = '';

  @Expose()
  @ApiProperty({
    example: 3,
    description: 'The episode number of the film',
  })
  episodeId!: number;

  @Expose()
  @ApiProperty({
    example: 'George Lucas',
    description: 'The director of the film',
  })
  director: string = '';

  @ApiProperty({
    example: 'Rick McCallum',
    description: 'The producer of the film',
  })
  producer: string = '';

  @ApiProperty({
    example: 'War! The Republic is crumbling...',
    description: 'The opening crawl of the film',
  })
  openingCrawl: string = '';

  @ApiProperty({
    example: '2005-05-19',
    description: 'The release date of the film',
  })
  releaseDate: string = '';

  @ApiProperty({
    example: '2025-01-06T01:13:23.553Z',
    description: 'The creation date of the film entry in the database',
  })
  created: string = '';

  @ApiProperty({
    example: '2025-01-06T01:13:23.553Z',
    description: 'The last edited date of the film entry in the database',
  })
  edited: string = '';

  @ApiProperty({
    example: 'A Star Wars Film',
    description: 'A short description of the film',
  })
  description: string = '';

  @Exclude()
  charactersIds?: number[]; // Array of character IDs

  @Exclude()
  planetsIds?: number[]; // Array of planet IDs

  @Exclude()
  starshipsIds?: number[]; // Array of starship IDs

  @Exclude()
  vehiclesIds?: number[]; // Array of vehicle IDs

  @Exclude()
  speciesIds?: number[]; // Array of species IDs
}
