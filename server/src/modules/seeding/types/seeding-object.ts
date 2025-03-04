import {
  FilmType,
  PersonType,
  PlanetType,
  SpeciesType,
  StarshipType,
  VehicleType,
} from '../schemas';

export type SeedingObjectType =
  | PersonType
  | FilmType
  | PlanetType
  | SpeciesType
  | StarshipType
  | VehicleType;
