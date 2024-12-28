import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('starships')
export class Starship {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column()
  model: string;

  @Column()
  starship_class: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column('text', { array: true })
  pilots: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  description: string;
}
