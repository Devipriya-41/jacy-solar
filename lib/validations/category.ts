import { z } from "zod";

export const categorySchema = z.object({
  name: z.string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must not exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s&-]+$/, "Category name can only contain letters, numbers, spaces, &, and hyphens"),
});

// Export the type
export type CategoryFormData = z.infer<typeof categorySchema>;