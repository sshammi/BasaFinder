import { z } from "zod";

const ListingCreateValidationSchema = z.object({
  body: z.object({
    landlordId: z.string({ required_error: "Landlord ID is required." }), // This would be a string (ObjectId) reference
    location: z.string({ required_error: "Location is required." }),
    description: z.string({ required_error: "Description is required." }),
    amenities: z.string({ required_error: "Amenities is required." }),
    rentAmount: z.string({ required_error: "Rent amount is required." }), // Number for rent amount
    bedrooms: z.string({ required_error: "Number of bedrooms is required." }), // Number for bedrooms
    images: z.array(z.string(), { required_error: "At least one image URL is required." }), // Array of strings for images
  }),
});

const ListingUpdateValidationSchema = z.object({
  body: z.object({
    landlordId: z.string().optional(), // Optional if not updating
    location: z.string().optional(),
    description: z.string().optional(),
    amenities: z.string().optional(),
    rentAmount: z.string().optional(),
    bedrooms: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const ListingValidation = {
  ListingCreateValidationSchema,
  ListingUpdateValidationSchema,
};

