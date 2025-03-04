import { Film } from 'src/database/entities/films.entity';
import { Person } from 'src/database/entities/people.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Species } from './species.entity';

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

  @Column()
  avatar: string = '';

  @OneToMany(() => Person, (people) => people.planet)
  people!: Person[];

  @OneToMany(() => Species, (species) => species.planet)
  species!: Species[];

  @ManyToMany(() => Film, (film) => film.planets)
  films!: Film[];
}
