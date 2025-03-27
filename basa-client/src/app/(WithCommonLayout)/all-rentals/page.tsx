"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getAllHouses, updateHouse } from "@/services/house";
import { IHouse } from "@/types/house";
import { ImageSlider } from "@/components/modules/slider/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { FaStar } from "react-icons/fa6";

const AllRentals = () => {
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const router = useRouter();
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<IHouse[]>([]);
  const [maxRent, setMaxRent] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const housesPerPage = 6;

  const location = searchParams?.get("location") || "";
  const rentAmount = searchParams?.get("rentAmount") || "";
  const bedrooms = searchParams?.get("bedrooms") || "";

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      try {
        const response = await getAllHouses();
        if (response?.data) {
          setHouses(response.data);
          setMaxRent(Math.max(...response.data.map((house:IHouse) => house.rentAmount || 0)) || 5000);
        }
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const filtered = houses.filter((house) => {
      return (
        (!location || house.location.toLowerCase().includes(location.toLowerCase())) &&
        (!rentAmount || Number(house.rentAmount) <= Number(rentAmount)) &&
        (!bedrooms || Number(house.bedrooms) === Number(bedrooms))
      );
    });
    setFilteredHouses(filtered);
    setCurrentPage(1);
  }, [houses, location, rentAmount, bedrooms]);

  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);
  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearchQuery = (query: string, value: string | number) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(query, value.toString()) : params.delete(query);
    router.push(`/all-rentals/?${params.toString()}`, { scroll: false });
  };

  const handleRating = async (houseId: string, newRating: number) => {
      try {
        // Update the local state for the rating
        setRatings((prevRatings) => ({
          ...prevRatings,
          [houseId]: newRating,
        }));
        
        console.log(houseId);
        console.log(newRating);
        // Update the rating in the backend (assuming updateHouse sends the rating to the backend)
        // const res = await updateHouse(houseId,{ratingCount:newRating.toString()});
        // console.log(res);
        // if (res?.data) {
        //   console.log('Rating updated successfully');
        // }
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 -mx-28">
      <div className="hidden md:block w-1/4 p-4 bg-white shadow-md rounded-lg pl-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded w-full"
          value={location}
          onChange={(e) => handleSearchQuery("location", e.target.value)}
        />
        <div className="mt-4">
          <span className="text-gray-800">Max Rent: ${rentAmount || maxRent}</span>
          <Slider
            max={maxRent}
            step={100}
            value={[Number(rentAmount || maxRent)]}
            onValueChange={(value) => handleSearchQuery("rentAmount", value[0])}
          />
        </div>
        <input
          type="number"
          placeholder="Bedrooms"
          className="border p-2 rounded w-full mt-4"
          value={bedrooms}
          onChange={(e) => handleSearchQuery("bedrooms", e.target.value)}
        />
        <Button onClick={() => router.push("/all-rentals")} className="bg-[#FF4B27] text-white w-full mt-4 hover:bg-orange-500">
          Clear Filters
        </Button>
      </div>

      <div className="w-full md:w-3/4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: housesPerPage }).map((_, index) => (
            <Skeleton key={index} className="w-full h-40 rounded" />
          ))
        : currentHouses.map((house) => {
            const productRating = Number(ratings[house._id] || house.ratingCount || 0);
            return (
              <div key={house._id} className="border rounded-lg p-4 shadow-md">
                {house.images?.length > 1 ? (
                  <ImageSlider images={house.images} />
                ) : (
                  <img
                    src={house.images?.[0] || "/fallback-image.jpg"}
                    alt="House"
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h2 className="text-lg font-bold mt-2 truncate">
                  {house.description.length > 20
                    ? house.description.slice(0, 20) + "..."
                    : house.description}
                </h2>
                <p className="text-sm text-gray-500">{house.location}</p>
                <p className="text-md font-semibold mt-2">BDT {house.rentAmount}</p>
                <p className="text-sm">Bedrooms: {house.bedrooms}</p>

                {/* Rating Section */}
                <div className="flex gap-1 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={18}
                        className={`cursor-pointer ${star <= productRating ? "text-yellow-500" : "text-gray-300"}`}
                        onClick={() => handleRating(house._id, star)}
                      />
                    ))}
                  </div>
                  <div>reviews({house.ratingCount})</div>
                </div>

                <Button
                  className="bg-[#FF4B27] text-white w-full mt-4 hover:bg-orange-500"
                  onClick={() => router.push(`/view-details/${house._id}`)}
                >
                  View Details
                </Button>
              </div>
            );
          })}
    </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                {currentPage > 1 ? (
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  ) : (
                    <span className="opacity-50 pointer-events-none">Previous</span>
                  )}
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink isActive={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                {currentPage < totalPages ? (
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  ) : (
                    <span className="opacity-50 pointer-events-none">Next</span>
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRentals;
