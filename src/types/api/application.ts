import { z } from 'zod';

const DataType = z.enum([
  'string',
  'integer',
  'float',
  'boolean',
  'date',
  'datetime',
  'uuid',
]);

const PrimaryKey = z.enum([
  'none',
  'auto_increment',
  'uuid',
]);

const ForeignKey = z.object({
  table: z.string(),
  column: z.string(),
});

const Column = z.object({
  name: z.string().refine(
    (name) => name.length > 0 && name === name.toLowerCase() && !name.includes(' '),
    { message: "Column name must be non-empty, lowercase, and without spaces" }
  ),
  data_type: DataType,
  primary_key: PrimaryKey.default('none'),
  nullable: z.boolean().default(false),
  default_value: z.any().optional(),
  unique: z.boolean().optional(),
  foreign_key: z.union([ForeignKey, z.null()]).optional()
}).refine((data) => {
  if (data.primary_key === 'auto_increment') {
    return data.data_type === 'integer' && !data.nullable && data.default_value === 0 && data.unique === true && data.foreign_key === null;
  }
  if (data.primary_key === 'uuid') {
    return data.data_type === 'string' && !data.nullable && data.default_value === "" && data.unique === true && data.foreign_key === null;
  }
  return true;
}, {
  message: "Invalid primary key configuration",
});

export type Column = z.infer<typeof Column>;

export const tableSchema = z.object({
  name: z.string().refine(
    (name) => name.length > 0 && name === name.toLowerCase() && !name.includes(' '),
    { message: "Table name must be non-empty, lowercase, and without spaces" }
  ),
  description: z.string().optional(),
  columns: z.array(Column).refine(
    (columns) => columns.filter(col => col.primary_key !== 'none').length === 1,
    { message: "Exactly one column must be set as primary key" }
  ),
});

export type Table = z.infer<typeof tableSchema>;

const ApplicationContent = z.object({
  name: z.string(),
  tables: z.array(tableSchema),
}).strict();

export type ApplicationContent = z.infer<typeof ApplicationContent>;

export const selectApplicationRequestSchema = z.object({
  name: z.string().min(1, "Name is required")
});

export type SelectApplicationRequest = z.infer<typeof selectApplicationRequestSchema>;

export const selectApplicationResponseSchema = z.object({
    application: ApplicationContent
}).strict()

export type SelectApplicationResponse = z.infer<typeof selectApplicationResponseSchema>;

// export type DataType = z.infer<typeof DataType>;
// export type PrimaryKey = z.infer<typeof PrimaryKey>;
// export type ForeignKey = z.infer<typeof ForeignKey>;
