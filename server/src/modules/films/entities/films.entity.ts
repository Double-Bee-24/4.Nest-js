import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Person } from 'src/modules/people/entities/people.entity';
import { Planet } from 'src/modules/planets/entities/planets.entity';
import { Starship } from 'src/modules/starships/entities/starships.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicles.entity';
import { Species } from 'src/modules/species/entities/species.entity';

@Entity('films')
export class Film {
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  description: string = '';

  @ManyToMany(() => Person, (person) => person.films, { cascade: true })
  @JoinTable({
    name: 'filmspeople',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'peopleId', referencedColumnName: 'id' },
  })
  characters!: Person[];

  @ManyToMany(() => Planet, (planet) => planet.films, { cascade: true })
  @JoinTable({
    name: 'filmsplanets',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'planetsId', referencedColumnName: 'id' },
  })
  planets!: Planet[];

  @ManyToMany(() => Starship, (starships) => starships.films, {
    cascade: true,
  })
  @JoinTable({
    name: 'filmsstarships',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'starshipsId', referencedColumnName: 'id' },
  })
  starships!: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, { cascade: true })
  @JoinTable({
    name: 'filmsvehicles',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'vehiclesId', referencedColumnName: 'id' },
  })
  vehicles!: Vehicle[];

  @ManyToMany(() => Species, (species) => species.films, { cascade: true })
  @JoinTable({
    name: 'filmsspecies',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'speciesId', referencedColumnName: 'id' },
  })
  species!: Species[];

  @Column('simple-array', { nullable: true })
  charactersIds?: number[]; // Array of character IDs

  @Column('simple-array', { nullable: true })
  planetsIds?: number[]; // Array of planet IDs

  @Column('simple-array', { nullable: true })
  starshipsIds?: number[]; // Array of starship IDs

  @Column('simple-array', { nullable: true })
  vehiclesIds?: number[]; // Array of vehicle IDs

  @Column('simple-array', { nullable: true })
  speciesIds?: number[]; // Array of species IDs

  @Column()
  avatar: string = '';
}
