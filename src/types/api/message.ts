import { z } from 'zod';
import { reverseActionWrapperSchema } from './reverse';

export const roleSchema = z.enum(["user", "assistant"]);

export type Role = z.infer<typeof roleSchema>;

export const messageSchema = z.object({
    role: roleSchema,
    content: z.string()
});

export type Message = z.infer<typeof messageSchema>;

export const sendMessageRequestSchema = z.object({
    message: z.string(),
    chat_history: z.array(messageSchema),
    reverse_stack: z.array(reverseActionWrapperSchema),
    application_names: z.array(z.string())
});

export type SendMessageRequest = z.infer<typeof sendMessageRequestSchema>;

export const sendMessageResponseSchema = z.object({
    message_lst: z.array(messageSchema),
    chat_history: z.array(messageSchema),
    reverse_stack: z.array(reverseActionWrapperSchema),
});

export type SendMessageResponse = z.infer<typeof sendMessageResponseSchema>;