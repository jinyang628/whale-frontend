import { z } from "zod";
import { reverseActionWrapperSchema } from "./reverse";
import { roleSchema } from "./shared";

const useMessageSchema = z.object({
  role: roleSchema,
  content: z.string(),
  rows: z.array(z.record(z.any())).optional().nullable(),
});

export type UseMessage = z.infer<typeof useMessageSchema>;

export const useRequestSchema = z.object({
  message: z.string(),
  chat_history: z.array(useMessageSchema),
  reverse_stack: z.array(reverseActionWrapperSchema),
  application_names: z.array(z.string()),
  user_id: z.string(),
});

export type UseRequest = z.infer<typeof useRequestSchema>;

export const useResponseSchema = z.object({
  message_lst: z.array(useMessageSchema),
  chat_history: z.array(useMessageSchema),
  reverse_stack: z.array(reverseActionWrapperSchema),
});

export type UseResponse = z.infer<typeof useResponseSchema>;
