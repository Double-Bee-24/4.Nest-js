import { Film } from 'src/modules/films/entities/films.entity';
import { Person } from 'src/modules/people/entities/people.entity';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryColumn()
  id!: number;

  @Column()
  model: string = '';

  @Column()
  vehicleClass: string = '';

  @Column()
  manufacturer: string = '';

  @Column()
  costInCredits: string = '';

  @Column()
  length: string = '';

  @Column()
  crew: string = '';

  @Column()
  passengers: string = '';

  @Column()
  maxAtmospheringSpeed: string = '';

  @Column()
  cargoCapacity: string = '';

  @Column()
  consumables: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited!: Date;

  @Column()
  name: string = '';

  @Column()
  description: string = '';

  @ManyToMany(() => Person, (person) => person.vehicles, { cascade: true })
  @JoinTable({
    name: 'vehiclespeople',
    joinColumn: { name: 'vehiclesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'peopleId', referencedColumnName: 'id' },
  })
  pilots!: Person[];

  @ManyToMany(() => Film, (film) => film.vehicles)
  films!: Film[];

  @Column('simple-array', { nullable: true })
  pilotsIds: number[] = [];

  @Column('simple-array', { nullable: true })
  filmsIds: number[] = [];

  @Column()
  avatar: string = '';
}
