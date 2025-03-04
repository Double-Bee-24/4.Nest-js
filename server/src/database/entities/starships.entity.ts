import { Film, Person } from 'src/database/entities';
import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';

@Entity('starships')
export class Starship {
  @PrimaryColumn()
  id!: number;

  @Column()
  model: string = '';

  @Column()
  starshipClass: string = '';

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
  hyperdriveRating: string = '';

  @Column()
  MGLT: string = '';

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

  // Relationships
  @ManyToMany(() => Film, (film) => film.starships)
  films!: Film[];

  @OneToMany(() => Person, (people) => people.starship)
  pilots!: Person[];
}
