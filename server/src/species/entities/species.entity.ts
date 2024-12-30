import { People } from 'src/people/entities/people.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Species {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column()
  description: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  averageHeight: string;

  @Column()
  averageLifespan: string;

  @Column()
  hairColors: string;

  @Column()
  skinColors: string;

  @Column()
  eyeColors: string;

  @Column()
  homeworld: string;

  @Column()
  language: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @OneToMany(() => People, (people) => people.species)
  people: People[];
}
