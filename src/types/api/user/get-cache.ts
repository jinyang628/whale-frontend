import { z } from "zod";
import { selectApplicationResponseSchema } from "../application";

export const getCacheRequestSchema = z.object({
    user_id: z.string(),
    user_email: z.string().email(),
});
  
export type GetCacheRequest = z.infer<typeof getCacheRequestSchema>;

export const getCacheResponseSchema = z.object({
    applications: z.array(selectApplicationResponseSchema)
});

export type GetCacheResponse = z.infer<typeof getCacheResponseSchema>;
  