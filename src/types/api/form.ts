import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    description: z.string().min(1, "Description is required"),
})

export type FormValues = z.infer<typeof formSchema>