import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Vehicles {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column()
  model: string;

  @Column()
  vehicleClass: string;

  @Column()
  manufacturer: string;

  @Column()
  costInCredits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  maxAtmospheringSpeed: string;

  @Column()
  cargoCapacity: string;

  @Column()
  consumables: string;

  @Column('text', { array: true })
  films: string[];

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
