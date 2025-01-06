import { People } from 'src/people/entities/people.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Planets {
  @PrimaryColumn()
  id!: number;

  @Column()
  description: string = '';

  @Column()
  diameter: string = '';

  @Column()
  rotationPeriod: string = '';

  @Column()
  orbitalPeriod: string = '';

  @Column()
  gravity: string = '';

  @Column()
  population: string = '';

  @Column()
  climate: string = '';

  @Column()
  terrain: string = '';

  @Column()
  surfaceWater: string = '';

  @Column()
  created: string = '';

  @Column()
  edited: string = '';

  @Column()
  name: string = '';

  @ManyToMany(() => People, (people) => people.planets)
  people!: People[];
}
