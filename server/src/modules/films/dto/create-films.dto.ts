import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmsDto {
  @ApiProperty({
    example: 'Revenge of the Sith',
    description: 'The title of the film',
  })
  title!: string;

  @ApiProperty({
    example: 3,
    description: 'The episode number of the film',
  })
  episodeId!: number;

  @ApiProperty({
    example: 'George Lucas',
    description: 'The director of the film',
  })
  director!: string;

  @ApiProperty({
    example: 'Rick McCallum',
    description: 'The producer of the film',
  })
  producer!: string;

  @ApiProperty({
    example: 'War! The Republic is crumbling...',
    description: 'The opening crawl of the film',
  })
  openingCrawl!: string;

  @ApiProperty({
    example: '2005-05-19',
    description: 'The release date of the film',
  })
  releaseDate!: string;

  @ApiProperty({
    example: 'A Star Wars Film',
    description: 'A short description of the film',
  })
  description!: string;
}
