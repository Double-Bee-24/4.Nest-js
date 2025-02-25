import { Film } from 'src/modules/films/entities/films.entity';
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @ManyToMany(() => Film, (film) => film.species)
  films!: Film[];

  @Column('simple-array', { nullable: true })
  peopleIds: number[] = [];

  @Column()
  avatar: string = '';

  @Column()
  url?: string;
}
