import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryColumn()
  id: number;

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
}
