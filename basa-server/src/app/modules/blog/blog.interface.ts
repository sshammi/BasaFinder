import { ObjectId } from "mongoose";

export interface IListing {
  landlordId: ObjectId;
  location: string;
  description: string;
  amenities: string;
  rentAmount: string;
  bedrooms: string;
  images: string[];
  category: "family" | "bachelor" | "office" | "sublet" | "hostel";
  ratingCount: string;   
}
