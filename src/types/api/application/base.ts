import { z } from "zod";

const DataType = z.enum([
  "string",
  "integer",
  "float",
  "boolean",
  "date",
  "datetime",
  "uuid",
  "enum",
]);

const primaryKeySchema = z.enum(["auto_increment", "uuid"]);

const ForeignKey = z.object({
  table: z.string(),
  column: z.string(),
});

const columnSchema = z
  .object({
    name: z
      .string()
      .refine(
        (name) =>
          name.length > 0 && name === name.toLowerCase() && !name.includes(" "),
        {
          message:
            "Column name must be non-empty, lowercase, and without spaces",
        },
      ),
    data_type: DataType,
    enum_values: z.array(z.any()).nullable(),
    nullable: z.boolean().default(false),
    default_value: z.any().optional(),
    unique: z.boolean().optional(),
    foreign_key: z.union([ForeignKey, z.null()]).optional(),
  })
  .refine((data) => {
    if (data.data_type === "enum") {
      if (!data.enum_values) {
        return false;
      }
      const firstElementType = typeof data.enum_values[0];
      const allSameType = data.enum_values.every(
        (value) => typeof value === firstElementType,
      );

      return (
        data.enum_values &&
        data.enum_values.length > 0 &&
        new Set(data.enum_values).size === data.enum_values.length &&
        data.default_value &&
        data.enum_values.includes(data.default_value) &&
        allSameType
      );
    }
    return true;
  });

export type Column = z.infer<typeof columnSchema>;

export const tableSchema = z.object({
  name: z
    .string()
    .refine(
      (name) =>
        name.length > 0 && name === name.toLowerCase() && !name.includes(" "),
      {
        message: "Table name must be non-empty, lowercase, and without spaces",
      },
    ),
  description: z.string().optional(),
  columns: z.array(columnSchema),
  primary_key: primaryKeySchema,
  enable_created_at_timestamp: z.boolean().optional(),
  enable_updated_at_timestamp: z.boolean().optional(),
});

export type Table = z.infer<typeof tableSchema>;

export const applicationContentSchema = z
  .object({
    name: z.string(),
    tables: z.array(tableSchema),
  })
  .strict();

export type ApplicationContent = z.infer<typeof applicationContentSchema>;
