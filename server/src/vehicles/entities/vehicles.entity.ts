import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Vehicles {
  @PrimaryColumn()
  id: number;

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

  @Column()
  films: string;

  pilots: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
