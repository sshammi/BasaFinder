import { z } from "zod";

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

const RentalRequestCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    email: z.string({ required_error: "Email is required." })
      .email("Invalid email address."),
    phoneNumber: z
      .string({ required_error: "Provide the phone number" })
      .length(11, { message: "Phone number must be exactly 11 digits." })
      .regex(/^01\d{9}$/, { message: "Invalid phone number format." }),
    landlordId: z.string({ required_error: "landlord ID is required." })
    .regex(ObjectIdRegex, "Invalid landlord ID format."),
    listingId: z.string({ required_error: "Listing ID is required." })
      .regex(ObjectIdRegex, "Invalid listing ID format."),
    tenantId: z.string({ required_error: "Tenant ID is required." })
      .regex(ObjectIdRegex, "Invalid tenant ID format."),
    message: z.string().optional(),
  }),
});

const RentalRequestUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }).optional(),
    email: z.string({ required_error: "Email is required." })
      .email("Invalid email address.").optional(),
    phoneNumber: z
      .string({ required_error: "Provide the phone number" })
      .length(11, { message: "Phone number must be exactly 11 digits." })
      .regex(/^01\d{9}$/, { message: "Invalid phone number format." }),
    listingId: z.string({ required_error: "Listing ID is required." })
      .regex(ObjectIdRegex, "Invalid listing ID format.").optional(),
    tenantId: z.string({ required_error: "Tenant ID is required." })
      .regex(ObjectIdRegex, "Invalid tenant ID format.").optional(),
    message: z.string().optional().optional(),
  }),
});

export const RentalRequestValidation = {
  RentalRequestCreateValidationSchema,
  RentalRequestUpdateValidationSchema,
};