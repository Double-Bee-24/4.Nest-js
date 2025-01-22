import { Films } from 'src/films/entities/films.entity';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Starships {
  @PrimaryColumn()
  id!: number;

  @Column({ default: '' })
  model: string = '';

  @Column({ default: '' })
  starshipClass: string = '';

  @Column({ default: '' })
  manufacturer: string = '';

  @Column({ default: '' })
  costInCredits: string = '';

  @Column({ default: '' })
  length: string = '';

  @Column({ default: '' })
  crew: string = '';

  @Column({ default: '' })
  passengers: string = '';

  @Column({ default: '' })
  maxAtmospheringSpeed: string = '';

  @Column({ default: '' })
  hyperdriveRating: string = '';

  @Column({ default: '' })
  MGLT: string = '';

  @Column({ default: '' })
  cargoCapacity: string = '';

  @Column({ default: '' })
  consumables: string = '';

  @Column({ default: '' })
  created: string = '';

  @Column({ default: '' })
  edited: string = '';

  @Column({ default: '' })
  name: string = '';

  @Column({ default: '' })
  description: string = '';

  @ManyToMany(() => Films, (films) => films.starships)
  films!: Films[];

  @Column('simple-array', { nullable: true })
  pilotsIds: number[] = [];
}
