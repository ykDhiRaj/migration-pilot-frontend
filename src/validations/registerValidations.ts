import { z } from "zod";

// Removed password, confirmPassword fields, register is now email only
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    agreed: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.agreed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must accept the Terms and Privacy Policy",
        path: ["agreed"],
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
