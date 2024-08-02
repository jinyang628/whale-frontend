import { z } from "zod";
import { applicationContentSchema } from "./base";

export const selectApplicationRequestSchema = z.object({
  user_id: z.string().nullable(),
  new_application_name: z.string().min(1, "Name is required"),
  all_application_names: z.array(z.string().min(1, "Name is required")),
});

export type SelectApplicationRequest = z.infer<
  typeof selectApplicationRequestSchema
>;

export const selectApplicationResponseSchema = z
  .object({
    application: applicationContentSchema,
  })
  .strict();

export type SelectApplicationResponse = z.infer<
  typeof selectApplicationResponseSchema
>;
