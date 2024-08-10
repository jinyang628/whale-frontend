import { z } from "zod";

export const validateRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(
      /^[a-z0-9_]+$/,
      "Name must contain only lowercase alphanumeric characters or underscores",
    )
    .refine(
      (value) => value === value.toLowerCase(),
      "Name must be in lowercase",
    ),
});

export type ValidateRequest = z.infer<typeof validateRequestSchema>;

export const validateResponseSchema = z.object({
  is_unique: z.boolean(),
});

export type ValidateResponse = z.infer<typeof validateResponseSchema>;
