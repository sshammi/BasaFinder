import { model, Schema, Types } from "mongoose";
import { IListing } from "./blog.interface";

const ListingSchema = new Schema<IListing>(
  {
    landlordId: {
      type: Types.ObjectId, 
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: {
      type: String,
      required: true,
      trim: true,
    },
    rentAmount: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bike = model<IListing>("Bike", ListingSchema);

export default Bike;
