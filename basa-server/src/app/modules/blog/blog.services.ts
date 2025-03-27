/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/queryBuilder";
import { IListing } from "./blog.interface";
import Listing from "./blog.model";

// Existing services
const createBikeIntoDB = async (payload : IListing) => {
    const bike = await Listing.create(payload);
    const populatedBike = await Listing.findById(bike._id);
    return populatedBike;
};

const updateBike = async (id: string, updateData:Partial<IListing>) => {
    const updatedBike = await Listing.findByIdAndUpdate(id, updateData, { new: true }); // `new: true` returns the updated bike
    return updatedBike;
};

const getAllBikes = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
      Listing.find(), 
      query,
    )
    .search(['location','rentAmount','bedrooms']) // Enable search by location
    .filter() // Enable filtering by price and number of bedrooms
    .sort() 
    .paginate() 
    .fields(); 
  
    const meta = await productQuery.countTotal(); 
    const result = await productQuery.modelQuery; 
  
    return {
      meta,
      result
    }
};
// get own
const getMyhouses = async (landlordId: string) => {
    const houses = await Listing.find({ landlordId });
    console.log(landlordId);
    console.log(houses);
    if (!houses) {
        throw new AppError(StatusCodes.NOT_FOUND,"Bike not found");
    }
    return houses;
};

const getSingleBike = async (id: string) => {
    const bike = await Listing.findById(id); // Finds the bike by ID
    if (!bike) {
        throw new AppError(StatusCodes.NOT_FOUND,"Bike not found");
    }
    return bike;
};

// New deleteBike service
const deleteBike = async (id: string) => {
    const deletedBike = await Listing.findByIdAndDelete(id); // Deletes the bike by ID
    return deletedBike;
};

const getListingsByCategory = async (category: string) => {

    const listings = await Listing.find({ category });
    return listings;
};

export const getListingsByLocation = async (location: string) => {
      //console.log(location);
      const listings = await Listing.find({ location });
      return listings;
  };
export const BlogServices = {
    createBikeIntoDB,
    getAllBikes,
    updateBike,
    deleteBike,
    getSingleBike ,
    getMyhouses,
    getListingsByCategory,
    getListingsByLocation,
};
