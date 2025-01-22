import { IFilms } from "../interfaces/IFilms";
import IPerson from "../interfaces/IPerson";
import { IPlanet } from "../interfaces/IPlanet";
import { ISpecies } from "../interfaces/ISpecies";
import IStarship from "../interfaces/IStarships";
import { IVehicle } from "../interfaces/IVehicles";

export type TableType =
  | IPerson
  | IStarship
  | IPlanet
  | ISpecies
  | IVehicle
  | IFilms;
