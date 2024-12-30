import { Species } from 'src/species/entities/species.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class People {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column()
  description: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hairColor: string;

  @Column()
  skinColor: string;

  @Column()
  eyeColor: string;

  @Column()
  birthYear: string;

  @Column()
  gender: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  name: string;

  @Column()
  homeworld: string;

  @Column()
  url: string;

  @ManyToOne(() => Species, (species) => species.people)
  species: Species;
}
