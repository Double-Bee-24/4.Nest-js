import { getAllPeople } from "../../services/peopleService";
import { useEffect, useState } from "react";
import IPerson from "../../interfaces/IPerson";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./StarwarsPage.module.scss";

export default function StarwarsPage(): JSX.Element {
  const [allPeopleData, setAllPeopleData] = useState<IPerson[]>([]);
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }: { getValue: () => string | number }) => (
        <p>{getValue()}</p>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }: { getValue: () => string | number }) => (
        <p>{getValue()}</p>
      ),
    },
    {
      accessorKey: "homeworld",
      header: "Homeworld",
      cell: ({ getValue }: { getValue: () => string | number }) => (
        <p>{getValue()}</p>
      ),
    },
  ];

  const table = useReactTable({
    data: allPeopleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    (async function () {
      const receivedPeopleData = await getAllPeople();
      setAllPeopleData(receivedPeopleData);
    })();
  }, []);

  return (
    <div className="starwars-page">
      <h1 className="table-name">People</h1>
      <div className={styles.wrapper}>
        <table>
          <thead>
            <tr>
              {table
                .getHeaderGroups()
                .map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {String(header.column.columnDef.header)}
                    </th>
                  ))
                )}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
