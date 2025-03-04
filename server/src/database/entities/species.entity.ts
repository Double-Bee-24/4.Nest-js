import { Film, Planet, Person } from 'src/database/entities';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Species {
  @PrimaryColumn()
  id!: number;

  @Column()
  description: string = '';

  @Column()
  classification: string = '';

  @Column()
  designation: string = '';

  @Column()
  averageHeight: string = '';

  @Column()
  averageLifespan: string = '';

  @Column()
  hairColors: string = '';

  @Column()
  skinColors: string = '';

  @Column()
  eyeColors: string = '';

  @Column()
  language: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @Column()
  avatar: string = '';

  // Ids to set relationships
  @Column()
  homeworldId!: number;

  @Column('text', { array: true })
  peopleIds?: string[];

  // Relationships
  @ManyToMany(() => Film, (film) => film.species)
  films?: Film[];

  @ManyToOne(() => Planet, (planet) => planet.species)
  planet?: Planet;

  @OneToMany(() => Person, (person) => person.species)
  people?: Person[];
}
