import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  phoneNumber: z
    .string({ required_error: "Mobile number is required" })
    .min(11, "Mobile number must be at least 11 digits")
    .regex(/^\d+$/, "Mobile number must contain only numbers"), 
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: z
    .string({ required_error: "Password Confirmation is required" })
    .min(1).optional(),
  role:z.string({required_error:'select a role'}),
});