import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column()
  description: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  average_lifespan: string;

  @Column()
  hair_colors: string;

  @Column()
  skin_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  homeworld: string;

  @Column()
  language: string;

  @Column()
  people: string[];
  // 'https://www.swapi.tech/api/people/2',
  // 'https://www.swapi.tech/api/people/3',
  // 'https://www.swapi.tech/api/people/8',
  // 'https://www.swapi.tech/api/people/23',

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  name: string;

  @Column()
  url: string;
}
