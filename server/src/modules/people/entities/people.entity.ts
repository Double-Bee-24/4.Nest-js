import { Film } from 'src/modules/films/entities/films.entity';
import { Planet } from 'src/modules/planets/entities/planets.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description: string = '';

  @Column()
  height!: string;

  @Column()
  mass: string = '';

  @Column()
  hairColor: string = '';

  @Column()
  skinColor: string = '';

  @Column()
  eyeColor: string = '';

  @Column()
  birthYear: string = '';

  @Column()
  gender: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @Column()
  homeworld!: number;

  @ManyToOne(() => Planet, (planet) => planet.people)
  planet!: Planet;

  @ManyToMany(() => Film, (film) => film.characters)
  films!: Film[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  vehicles!: Vehicle[];

  @Column()
  avatar: string = '';

  @Column()
  url?: string;
}
