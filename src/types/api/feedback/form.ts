import { z } from "zod";

export const feedbackRequestSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  feedback: z.string().min(1, "Feedback is required"),
});

export type FeedbackRequest = z.infer<typeof feedbackRequestSchema>;
