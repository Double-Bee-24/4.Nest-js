import { Film } from 'src/modules/films/entities/films.entity';
import { Person } from 'src/modules/people/entities/people.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('planets')
export class Planet {
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @OneToMany(() => Person, (people) => people.planet)
  people!: Person[];

  @ManyToMany(() => Film, (film) => film.planets)
  films!: Film[];

  @Column()
  avatar: string = '';

  @Column()
  url?: string;
}
