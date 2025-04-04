import { useParams } from "react-router-dom";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import styles from "./TablePage.module.scss";

import TableHead from "../../components/TableHead/TableHead";
import TableBody from "../../components/TableBody/TableBody";

import { TableType } from "../../types/table.type";
import Header from "../../components/Header/Header";
import { getTableConfig } from "../../utils/table-config";
import { useEffect, useState } from "react";
import { IEntityResponse } from "../../interfaces/IEntityResponse";

export default function TablePage(): JSX.Element {
  const [entityResponse, setEntityResponse] = useState<
    IEntityResponse<TableType>
  >({
    entityData: [],
    limit: "",
    page: "",
    total: 0,
    totalPages: 0,
  });

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

  useEffect(() => {
    (async function () {
      const data = await getData();

      if (!data) return;
      setEntityResponse(data);
    })();
  }, []);

  const table = useReactTable<TableType>({
    data: entityResponse.entityData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  const handleNextPage = async () => {
    const nextPage = Number(entityResponse.page) + 1;
    const data = await getData(nextPage);

    if (!data) return;
    setEntityResponse(data);
  };

  const handlePrevPage = async () => {
    const prevPage = Number(entityResponse.page) - 1;
    const data = await getData(prevPage);

    if (!data) return;
    setEntityResponse(data);
  };

  // Disable navigation buttons if there are no data received
  const prevButtonStyle =
    entityResponse.total === 0 || entityResponse.page === "1"
      ? styles["invisible"]
      : styles["navigation-button"];

  const nextButtonStyle =
    entityResponse.total === 0 ||
    entityResponse.page === String(entityResponse.totalPages)
      ? styles["invisible"]
      : styles["navigation-button"];

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
        <div className={styles["pagination-container"]}>
          <button className={prevButtonStyle} onClick={handlePrevPage}>
            Previous page
          </button>
          <button className={nextButtonStyle} onClick={handleNextPage}>
            Next page
          </button>
        </div>
      </div>
    </>
  );
}
