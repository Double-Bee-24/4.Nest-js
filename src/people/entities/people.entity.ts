import { Entity, Column, PrimaryColumn } from 'typeorm';

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
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

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
}
