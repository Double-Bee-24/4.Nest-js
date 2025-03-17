import { z } from 'zod';
import { PlanetSchema } from './planets.schema';
import { FilmSchema } from './films.schema';
import { SpeciesSchema } from './species.schema';
import { StarshipSchema } from './starships.schema';
import { VehicleSchema } from './vehicles.schema';

export const PersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hairColor: z.string(),
  skinColor: z.string(),
  eyeColor: z.string(),
  birthYear: z.string(),
  gender: z.string(),
  homeworldId: z.string(),
  description: z.string(),
  created: z.string().datetime(),
  edited: z.string().datetime(),
});

export type PersonType = z.infer<typeof PersonSchema>;

export const Schemas = z.union([
  PersonSchema,
  PlanetSchema,
  FilmSchema,
  SpeciesSchema,
  StarshipSchema,
  VehicleSchema,
]);
export type SchemasType = z.infer<typeof Schemas>;
