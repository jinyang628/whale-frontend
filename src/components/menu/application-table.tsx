import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table, Column } from "@/types/api/application/base";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fragment } from "react";

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

  const formatEnumValues = (values: string[]) => {
    if (values.length === 1) return <strong>{values[0]}</strong>;
    if (values.length === 2)
      return (
        <>
          <strong>{values[0]}</strong> or <strong>{values[1]}</strong>
        </>
      );
    return (
      <>
        {values.slice(0, -1).map((value, index) => (
          <Fragment key={index}>
            <strong>{value}</strong>
            {index < values.length - 2 ? ", " : " "}
          </Fragment>
        ))}
        or <strong>{values[values.length - 1]}</strong>
      </>
    );
  };

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
          <TableCell key={index}>
            <div className="flex flex-row items-center">
              {column.data_type}
              {column.data_type === "enum" && (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="ml-[15px] h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The value must be{" "}
                        {formatEnumValues(column.enum_values || [])}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </TableCell>
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
    <div className="h-[15vh] flex items-center justify-center">
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
