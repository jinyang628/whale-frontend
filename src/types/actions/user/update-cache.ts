import { z } from "zod";

export const updateCacheRequestSchema = z.object({
  user_id: z.string(),
  all_application_names: z.array(z.string()),
});

export type UpdateCacheRequest = z.infer<typeof updateCacheRequestSchema>;
