import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Planets {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column()
  description: string;

  @Column()
  diameter: string;

  @Column()
  rotationPeriod: string;

  @Column()
  orbitalPeriod: string;

  @Column()
  gravity: string;

  @Column()
  population: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @Column()
  surfaceWater: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  name: string;

  @Column()
  url: string;
}
