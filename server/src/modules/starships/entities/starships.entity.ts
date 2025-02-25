import { Film } from 'src/modules/films/entities/films.entity';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Film, (film) => film.starships)
  films!: Film[];

  @Column('int', { array: true, default: [] })
  pilotsIds: number[] = [];

  @Column()
  avatar: string = '';

  @Column()
  url?: string;
}
