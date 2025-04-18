import { Film } from 'src/database/entities/films.entity';
import { Person } from 'src/database/entities/people.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model: string = '';

  @Column()
  vehicleClass: string = '';

  @Column()
  manufacturer: string = '';

  @Column()
  costInCredits: string = '';

  @Column()
  length: string = '';

  @Column()
  crew: string = '';

  @Column()
  passengers: string = '';

  @Column()
  maxAtmospheringSpeed: string = '';

  @Column()
  cargoCapacity: string = '';

  @Column()
  consumables: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @Column()
  description: string = '';

  @Column()
  avatar: string = '';

  // Ids to set relationships
  @Column('text', { array: true })
  pilotsIds!: string[];

  @Column('text', { array: true })
  filmsIds!: string[];

  // Relationships
  @OneToMany(() => Person, (person) => person.vehicle, { cascade: true })
  pilots!: Person[];

  @ManyToMany(() => Film, (film) => film.vehicles)
  films!: Film[];
}
