import { IFilm } from "../interfaces/IFilm";
import { IPerson } from "../interfaces/IPerson";
import { IPlanet } from "../interfaces/IPlanet";
import { ISpecies } from "../interfaces/ISpecies";
import { IStarship } from "../interfaces/IStarship";
import { IVehicle } from "../interfaces/IVehicle";

export type TableType =
  | IPerson
  | IStarship
  | IPlanet
  | ISpecies
  | IVehicle
  | IFilm;

export type TableName =
  | "people"
  | "planets"
  | "starships"
  | "vehicles"
  | "films"
  | "species";
