import { useParams } from "react-router-dom";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import styles from "./Table.module.scss";

import TableHead from "../TableHead/TableHead";
import TableBody from "../TableBody/TableBody";

import useFetch from "../../hooks/useFetch";
import { getAllPeople } from "../../services/peopleService";
import { getAllStarships } from "../../services/starshipsService";

import IPerson from "../../interfaces/IPerson";
import IStarship from "../../interfaces/IStarships";
import { getAllPlanets } from "../../services/planetsService";
import { IPlanet } from "../../interfaces/IPlanet";
import { ISpecies } from "../../interfaces/ISpecies";
import { getAllSpecies } from "../../services/speciesService";
import { getAllVehicles } from "../../services/vehiclesService";
import { IVehicle } from "../../interfaces/IVehicles";
import { IFilms } from "../../interfaces/IFilms";
import { getAllFilms } from "../../services/filmsService";

type TableType = IPerson | IStarship | IPlanet | ISpecies | IVehicle | IFilms;

export default function Table(): JSX.Element {
  const { tableName } = useParams<{ tableName?: string }>();
  const defaultTableName = tableName || "people";

  const tableConfig: Record<
    string,
    {
      headers: string[];
      getData: () => Promise<TableType[]>;
    }
  > = {
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

  const { headers, getData } = tableConfig[defaultTableName];

  // Create columns with certain names for tanstack table
  const columns = headers.map((item) => ({
    accessorKey: item.charAt(0).toLowerCase() + item.slice(1),
    header: item,
    cell: ({ getValue }: { getValue: () => string | number }) => (
      <p>{getValue()}</p>
    ),
  }));

  const tableData = useFetch(getData);

  const table = useReactTable<TableType>({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="starwars-page">
      <h1 className="table-name">
        {defaultTableName.charAt(0).toUpperCase() + defaultTableName.slice(1)}
      </h1>
      <div className={styles.wrapper}>
        <table>
          <TableHead table={table} />
          <TableBody table={table} />
        </table>
      </div>
    </div>
  );
}
