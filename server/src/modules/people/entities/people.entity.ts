import { Films } from 'src/modules/films/entities/films.entity';
import { Planets } from 'src/modules/planets/entities/planets.entity';
import { Vehicles } from 'src/modules/vehicles/entities/vehicles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description: string = '';

  @Column()
  height!: string;

  @Column()
  mass: string = '';

  @Column()
  hairColor: string = '';

  @Column()
  skinColor: string = '';

  @Column()
  eyeColor: string = '';

  @Column()
  birthYear: string = '';

  @Column()
  gender: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @Column()
  homeworld!: number;

  @ManyToMany(() => Planets, (planets) => planets.people, { cascade: true })
  @JoinTable({
    name: 'peopleplanets',
    joinColumn: { name: 'peopleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'planetsId', referencedColumnName: 'id' },
  })
  planets!: Planets[];

  @ManyToMany(() => Films, (films) => films.characters)
  films!: Films[];

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.pilots)
  vehicles!: Vehicles[];

  @Column()
  avatar: string = '';
}
