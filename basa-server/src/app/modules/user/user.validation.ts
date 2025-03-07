import { z } from "zod";

export const userCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }).trim(),
    email: z.string({ required_error: "Email is required." }).email(),
    phoneNumber: z
      .string({ required_error: "Provide the phone number" })
      .length(11, { message: "Phone number must be exactly 11 digits." })
      .regex(/^01\d{9}$/, { message: "Invalid phone number format." }),
    password: z
      .string({ required_error: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters long." }),
    role: z.enum(["admin", "landlord", "tenant"]).default("tenant"),
    deactive: z.boolean().default(false),
  }),
});

