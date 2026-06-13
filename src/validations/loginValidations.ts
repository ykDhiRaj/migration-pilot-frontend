import { z } from "zod";

// Replaced manual validation function with a Zod schema for login form
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Type inferred directly from the schema, used by React Hook Form
export type LoginFormValues = z.infer<typeof loginSchema>;
