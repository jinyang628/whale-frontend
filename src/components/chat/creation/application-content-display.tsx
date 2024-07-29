import {
  ApplicationContent,
  Table as TableType,
  Column,
} from "@/types/api/application/base";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ApplicationContentDisplayProps = {
  applicationContent: ApplicationContent;
};

export default function ApplicationContentDisplay({
  applicationContent,
}: ApplicationContentDisplayProps) {
  const renderDefaultValue = (value: any) => {
    if (value === undefined) return "N/A";
    if (value === "") return '""'; // Represent empty string
    if (value === null) return "null";
    return String(value);
  };

  const renderColumnTable = (columns: Column[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Data Type</TableHead>
          <TableHead>Nullable</TableHead>
          <TableHead>Default Value</TableHead>
          <TableHead>Unique</TableHead>
          <TableHead>Foreign Key</TableHead>
          <TableHead>Enum Values</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {columns.map((column, index) => (
          <TableRow key={index}>
            <TableCell>{column.name}</TableCell>
            <TableCell>{column.data_type}</TableCell>
            <TableCell>{column.nullable ? "Yes" : "No"}</TableCell>
            <TableCell>{renderDefaultValue(column.default_value)}</TableCell>
            <TableCell>{column.unique ? "Yes" : "No"}</TableCell>
            <TableCell>
              {column.foreign_key
                ? `${column.foreign_key.table}.${column.foreign_key.column}`
                : "N/A"}
            </TableCell>
            <TableCell>
              {column.enum_values ? column.enum_values.join(", ") : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderTableDetails = (table: TableType, index: number) => (
    <div key={table.name} className="mb-8">
      <h3 className="text-xl font-bold mb-2">
        Table {index + 1}: {table.name}
      </h3>
      <p className="mb-2">
        <strong>Description:</strong> {table.description || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Primary Key:</strong> {table.primary_key}
      </p>
      <p className="mb-2">
        <strong>Created At Timestamp:</strong>{" "}
        {table.enable_created_at_timestamp ? "Enabled" : "Disabled"}
      </p>
      <p className="mb-2">
        <strong>Updated At Timestamp:</strong>{" "}
        {table.enable_updated_at_timestamp ? "Enabled" : "Disabled"}
      </p>
      <h4 className="text-lg font-semibold mb-2">Columns</h4>
      {renderColumnTable(table.columns)}
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Application: {applicationContent.name}
      </h1>
      {applicationContent.tables.map((table, index) =>
        renderTableDetails(table, index),
      )}
    </div>
  );
}
