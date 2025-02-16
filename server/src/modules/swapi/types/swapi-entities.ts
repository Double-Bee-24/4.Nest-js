import { Film } from 'src/modules/films/entities/films.entity';
import { Person } from 'src/modules/people/entities/people.entity';
import { Planet } from 'src/modules/planets/entities/planets.entity';
import { Species } from 'src/modules/species/entities/species.entity';
import { Starship } from 'src/modules/starships/entities/starships.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicles.entity';

export type EntityName = Person | Planet | Vehicle | Starship | Species | Film;
