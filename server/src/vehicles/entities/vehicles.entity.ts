import { Films } from 'src/films/entities/films.entity';
import { People } from 'src/people/entities/people.entity';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Vehicles {
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

  @Column()
  created: string = '';

  @Column()
  edited: string = '';

  @Column()
  name: string = '';

  @Column()
  description: string = '';

  @ManyToMany(() => People, (people) => people.vehicles, { cascade: true })
  @JoinTable({
    name: 'vehiclespeople',
    joinColumn: { name: 'vehiclesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'peopleId', referencedColumnName: 'id' },
  })
  pilots!: People[];

  @ManyToMany(() => Films, (films) => films.vehicles)
  films!: Films[];

  @Column('simple-array', { nullable: true })
  pilotsIds: number[] = [];

  @Column('simple-array', { nullable: true })
  filmsIds: number[] = [];

  @Column()
  avatar: string = '';
}
