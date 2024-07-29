import { z } from "zod";

export const roleSchema = z.enum(["user", "assistant"]);

export type Role = z.infer<typeof roleSchema>;
