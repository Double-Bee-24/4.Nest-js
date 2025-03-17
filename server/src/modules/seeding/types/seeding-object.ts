import { z } from 'zod';
import {
  FilmSchema,
  PersonSchema,
  PlanetSchema,
  SpeciesSchema,
  StarshipSchema,
  VehicleSchema,
} from '../schemas';

// export type SeedingObjectType =
//   | PersonType
//   | FilmType
//   | PlanetType
//   | SpeciesType
//   | StarshipType
//   | VehicleType;

export const SeedingObjectSchema = z.union([
  PersonSchema,
  PlanetSchema,
  FilmSchema,
  SpeciesSchema,
  StarshipSchema,
  VehicleSchema,
]);

export type SeedingObjectType = z.infer<typeof SeedingObjectSchema>;
