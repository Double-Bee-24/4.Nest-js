import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Person } from 'src/database/entities/people.entity';
import { Planet } from 'src/database/entities/planets.entity';
import { Starship } from 'src/database/entities/starships.entity';
import { Vehicle } from 'src/database/entities/vehicles.entity';
import { Species } from 'src/database/entities/species.entity';

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
  avatar: string = '';

  @Column()
  description: string = '';

  // Ids to set relationships
  @Column('text', { array: true })
  charactersIds?: string[];
  @Column('text', { array: true })
  planetsIds?: string[];
  @Column('text', { array: true })
  starshipsIds?: string[];
  @Column('text', { array: true })
  vehiclesIds?: string[];
  @Column('text', { array: true })
  speciesIds?: string[];

  // Relationships
  @ManyToMany(() => Person, (person) => person.films, { cascade: true })
  @JoinTable({
    name: 'filmspeople',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'peopleId', referencedColumnName: 'id' },
  })
  characters?: Person[];

  @ManyToMany(() => Planet, (planet) => planet.films, { cascade: true })
  @JoinTable({
    name: 'filmsplanets',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'planetsId', referencedColumnName: 'id' },
  })
  planets?: Planet[];

  @ManyToMany(() => Starship, (starships) => starships.films, {
    cascade: true,
  })
  @JoinTable({
    name: 'filmsstarships',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'starshipsId', referencedColumnName: 'id' },
  })
  starships?: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, { cascade: true })
  @JoinTable({
    name: 'filmsvehicles',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'vehiclesId', referencedColumnName: 'id' },
  })
  vehicles?: Vehicle[];

  @ManyToMany(() => Species, (species) => species.films, { cascade: true })
  @JoinTable({
    name: 'filmsspecies',
    joinColumn: { name: 'filmsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'speciesId', referencedColumnName: 'id' },
  })
  species?: Species[];
}
