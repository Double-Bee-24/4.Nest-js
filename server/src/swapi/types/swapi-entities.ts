import { Films } from 'src/films/entities/films.entity';
import { People } from 'src/people/entities/people.entity';
import { Planets } from 'src/planets/entities/planets.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starships.entity';
import { Vehicles } from 'src/vehicles/entities/vehicles.entity';

export type EntityName =
  | People
  | Planets
  | Vehicles
  | Starships
  | Species
  | Films;
