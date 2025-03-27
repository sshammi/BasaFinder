export interface IHouse {
    _id: string;
    landlordId: string;
    location: string;
    description: string;
    amenities: string;
    rentAmount: string;
    bedrooms: string;
    images: string[];
    category: "Family" | "Bachelor" | "Office" | "Sublet" | "Hostel";
    ratingCount: string;
    reviews?: string;
    createdAt: string;
    updatedAt: string;
}
