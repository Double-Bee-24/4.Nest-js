import { Films } from 'src/films/entities/films.entity';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';

@Entity()
export class Species {
  @PrimaryColumn()
  id!: number;

  @Column()
  description: string = '';

  @Column()
  classification: string = '';

  @Column()
  designation: string = '';

  @Column()
  averageHeight: string = '';

  @Column()
  averageLifespan: string = '';

  @Column()
  hairColors: string = '';

  @Column()
  skinColors: string = '';

  @Column()
  eyeColors: string = '';

  @Column()
  homeworld!: number;

  @Column()
  language: string = '';

  @Column()
  created: string = '';

  @Column()
  edited: string = '';

  @Column()
  name: string = '';

  @ManyToMany(() => Films, (films) => films.species)
  films!: Films[];

  @Column('simple-array', { nullable: true })
  peopleIds: number[] = [];

  @Column()
  avatar: string = '';
}
