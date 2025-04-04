import { IEntityResponse } from "../interfaces/IEntityResponse";
import { getAllFilms, getFilm } from "../services/filmsService";
import { getAllPeople, getPerson } from "../services/peopleService";
import { getAllPlanets, getPlanet } from "../services/planetsService";
import { getAllSpecies, getSpecies } from "../services/speciesService";
import { getAllStarships, getStarship } from "../services/starshipsService";
import { getAllVehicles, getVehicle } from "../services/vehiclesService";
import { TableType } from "../types/table.type";

/**
 *
 * @returns object where key is an entity name and value is an object of table headers and getData function
 */
const getTableConfig = (): Record<
  string,
  {
    headers: string[];
    getData: (
      page?: number,
      limit?: number
    ) => Promise<IEntityResponse<TableType> | null>;
  }
> => {
  const tableConfig = {
    people: {
      headers: ["Name", "Gender", "Homeworld"],
      getData: getAllPeople,
    },
    starships: {
      headers: ["Name", "Model", "StarshipClass"],
      getData: getAllStarships,
    },
    planets: {
      headers: ["Name", "Climate", "Diameter"],
      getData: getAllPlanets,
    },
    species: {
      headers: ["Name", "Classification", "Homeworld"],
      getData: getAllSpecies,
    },
    vehicles: {
      headers: ["Name", "Model", "VehicleClass"],
      getData: getAllVehicles,
    },
    films: {
      headers: ["Title", "Director", "Producer"],
      getData: getAllFilms,
    },
  };

  return tableConfig;
};

/**
 *
 * @returns an object where the keys represent entity names
 * and the values are functions to fetch data for a specific entity.
 */
const getEntityConfig = (): Record<
  string,
  (id: number) => Promise<TableType>
> => {
  const entityConfig = {
    people: getPerson,

    starships: getStarship,

    planets: getPlanet,

    species: getSpecies,

    vehicles: getVehicle,

    films: getFilm,
  };

  return entityConfig;
};

export { getTableConfig, getEntityConfig };
