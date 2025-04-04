import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";

interface TableBodyProps<T> {
  table: Table<T>;
}

export default function TableBody<T>({
  table,
}: TableBodyProps<T>): JSX.Element {
  const { tableName } = useParams();

  const navigate = useNavigate();

  const handelNavigate = (id: string): void => {
    navigate(`/table/${tableName}/${id}`); // Go to a certain entity
  };

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} onClick={() => handelNavigate(row.id)}>
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
