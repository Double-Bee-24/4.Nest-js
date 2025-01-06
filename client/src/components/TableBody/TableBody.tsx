import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

interface TableBodyProps<T> {
  table: Table<T>;
}

export default function TableBody<T>({
  table,
}: TableBodyProps<T>): JSX.Element {
  return (
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
  );
}
