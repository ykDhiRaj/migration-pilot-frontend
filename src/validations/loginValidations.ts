import { z } from "zod";

// Removed password field, login is now email only
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;