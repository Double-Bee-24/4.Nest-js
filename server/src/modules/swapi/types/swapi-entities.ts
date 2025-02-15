import { Films } from 'src/modules/films/entities/films.entity';
import { People } from 'src/modules/people/entities/people.entity';
import { Planets } from 'src/modules/planets/entities/planets.entity';
import { Species } from 'src/modules/species/entities/species.entity';
import { Starships } from 'src/modules/starships/entities/starships.entity';
import { Vehicles } from 'src/modules/vehicles/entities/vehicles.entity';

export type EntityName =
  | People
  | Planets
  | Vehicles
  | Starships
  | Species
  | Films;
