import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { People } from 'src/people/entities/people.entity';
import { Planets } from 'src/planets/entities/planets.entity';
import { Starships } from 'src/starships/entities/starships.entity';
import { Vehicles } from 'src/vehicles/entities/vehicles.entity';
import { Species } from 'src/species/entities/species.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string = '';

  @Column()
  episodeId!: number;

  @Column()
  director: string = '';

  @Column()
  producer: string = '';

  @Column('text')
  openingCrawl: string = '';

  @Column()
  releaseDate: string = '';

  @Column()
  created: string = '';

  @Column()
  edited: string = '';

  @Column()
  description: string = '';

  @ManyToMany(() => People)
  @JoinTable()
  characters!: People[];

  @ManyToMany(() => Planets)
  @JoinTable()
  planets!: Planets[];

  @ManyToMany(() => Starships)
  @JoinTable()
  starships!: Starships[];

  @ManyToMany(() => Vehicles)
  @JoinTable()
  vehicles!: Vehicles[];

  @ManyToMany(() => Species)
  @JoinTable()
  species!: Species[];
}
