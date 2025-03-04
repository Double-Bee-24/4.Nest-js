import { Film } from 'src/database/entities/films.entity';
import { Person } from 'src/database/entities/people.entity';
import { Planet } from 'src/database/entities/planets.entity';
import { Species } from 'src/database/entities/species.entity';
import { Starship } from 'src/database/entities/starships.entity';
import { Vehicle } from 'src/database/entities/vehicles.entity';

export type EntityName = Person | Planet | Vehicle | Starship | Species | Film;
