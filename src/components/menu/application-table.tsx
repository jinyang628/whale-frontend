import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table, Column } from "@/types/api/application/base";

interface ApplicationTablesProps {
  visibleTable: string;
  allTables: Table[];
}

export default function ApplicationTables({
  visibleTable,
  allTables,
}: ApplicationTablesProps) {
  const table: Table | null = allTables.filter(
    (table) => table.name === visibleTable,
  )[0];
  const header = (
    <TableHeader>
      <TableRow>
        <TableHead className="font-bold">Name</TableHead>
        {table?.columns.map((column: Column) => (
          <TableHead key={column.name}>{column.name}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );

  const body = (
    <TableBody>
      <TableRow>
        <TableCell className="font-bold">Data Type</TableCell>
        {table?.columns.map((column: Column, index: number) => (
          <TableCell key={index}>{column.data_type}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-bold">Optional</TableCell>
        {table?.columns.map((column: Column, index: number) => (
          <TableCell key={index}>
            {column.nullable ? "True" : "False"}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );

  return (
    <div className="h-[12vh] flex items-center justify-center">
      {visibleTable !== "" ? (
        <div className="w-full h-full overflow-auto">
          <UITable>
            {header}
            {body}
          </UITable>
        </div>
      ) : (
        <p className="text-lg text-gray-500">No table selected</p>
      )}
    </div>
  );
}
