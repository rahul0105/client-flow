import { z } from "zod";

const optionalString = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;

      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z.string().max(maxLength, "This field is too long.").optional(),
  );

export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters.")
    .max(100, "Client name is too long."),

  company: optionalString(100),

  email: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;

      const trimmed = value.trim().toLowerCase();
      return trimmed === "" ? undefined : trimmed;
    },
    z.string().email("Please enter a valid email address.").max(254).optional(),
  ),

  phone: optionalString(30),

  address: optionalString(500),

  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type ClientInput = z.infer<typeof clientSchema>;