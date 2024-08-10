import { z } from "zod";

export const integrationEnum = z.enum([
  "Linear",
  "Google Calendar"
]);

export type Integration = z.infer<typeof integrationEnum>;