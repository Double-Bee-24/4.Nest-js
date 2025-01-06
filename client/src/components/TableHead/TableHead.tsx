import { Table } from "@tanstack/react-table";

interface TableHeadProps<T> {
  table: Table<T>;
}

export default function TableHead<T>({
  table,
}: TableHeadProps<T>): JSX.Element {
  return (
    <thead>
      <tr>
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <th key={header.id}>{String(header.column.columnDef.header)}</th>
            ))
          )}
      </tr>
    </thead>
  );
}
