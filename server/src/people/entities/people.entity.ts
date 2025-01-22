import { Films } from 'src/films/entities/films.entity';
import { Planets } from 'src/planets/entities/planets.entity';
import { Vehicles } from 'src/vehicles/entities/vehicles.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class People {
  @PrimaryColumn()
  id!: number;

  @Column()
  description: string = '';

  @Column()
  height: string = '';

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

  @Column()
  created: string = '';

  @Column()
  edited: string = '';

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
