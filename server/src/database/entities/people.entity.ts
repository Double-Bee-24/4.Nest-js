import {
  Film,
  Planet,
  Vehicle,
  Species,
  Starship,
} from 'src/database/entities';
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
  avatar: string = '';

  @Column()
  homeworldId!: number;

  // Relationships
  @ManyToOne(() => Planet, (planet) => planet.people)
  planet!: Planet;

  @ManyToOne(() => Species, (species) => species.people)
  species!: Species;

  @ManyToOne(() => Starship, (starship) => starship.pilots)
  starship!: Starship;

  @ManyToMany(() => Film, (film) => film.characters)
  films!: Film[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  vehicles!: Vehicle[];
}
