import { useParams } from "react-router-dom";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import styles from "./TablePage.module.scss";

import TableHead from "../../components/TableHead/TableHead";
import TableBody from "../../components/TableBody/TableBody";

import { useFetch } from "../../hooks/useFetch";
import { TableType } from "../../types/table.type";
import Header from "../../components/Header/Header";
import { getTableConfig } from "../../utils/table-config";

export default function TablePage(): JSX.Element {
  const { tableName } = useParams<{ tableName?: string }>();
  const defaultTableName = tableName || "people";

  const tableConfig = getTableConfig();

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
    getRowId: (row) => row.id.toString(),
  });

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h1 className="table-name">
          {defaultTableName.charAt(0).toUpperCase() + defaultTableName.slice(1)}{" "}
          Table
        </h1>
        <table>
          <TableHead table={table} />
          <TableBody table={table} />
        </table>
      </div>
    </>
  );
}
