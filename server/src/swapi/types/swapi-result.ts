import {
  PeopleResult,
  PlanetsResult,
  VehiclesResult,
  StarshipsResult,
  SpeciesResult,
  FilmsResult,
} from '../schemas';

export type SwapiResult =
  | PeopleResult
  | PlanetsResult
  | VehiclesResult
  | StarshipsResult
  | SpeciesResult
  | FilmsResult;
