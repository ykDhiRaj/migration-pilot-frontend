import { z } from "zod";

// Converted manual validation function into a Zod schema for register form
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreed: z.boolean(),
  })
  // Cross-field validation for matching passwords, done via superRefine since Zod object() alone cannot compare sibling fields
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// Type inferred directly from the schema, used by React Hook Form
export type RegisterFormValues = z.infer<typeof registerSchema>;
