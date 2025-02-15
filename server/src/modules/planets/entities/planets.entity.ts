import { Films } from 'src/modules/films/entities/films.entity';
import { People } from 'src/modules/people/entities/people.entity';
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @ManyToMany(() => People, (people) => people.planets)
  people!: People[];

  @ManyToMany(() => Films, (films) => films.planets)
  films!: Films[];

  @Column()
  avatar: string = '';
}
