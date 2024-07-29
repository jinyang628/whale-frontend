import { z } from "zod";
import { roleSchema } from "./shared";
import { applicationContentSchema } from "../application/base";

const createMessageSchema = z.object({
  role: roleSchema,
  content: z.string(),
  application_content: applicationContentSchema.nullable(),
});

export type CreateMessage = z.infer<typeof createMessageSchema>;

export const createRequestSchema = z.object({
  message: z.string(),
  chat_history: z.array(createMessageSchema),
});

export type CreateRequest = z.infer<typeof createRequestSchema>;

export const createResponseSchema = z.object({
  message: createMessageSchema,
  chat_history: z.array(createMessageSchema),
  is_finished: z.boolean(),
});

export type CreateResponse = z.infer<typeof createResponseSchema>;
