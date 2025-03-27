'use client';

import { useEffect, useState } from 'react';
import { getHousesByLocation } from '@/services/house';
import { useParams, useRouter } from 'next/navigation';
import { IHouse } from '@/types/house';
import { ImageSlider } from '@/components/modules/slider/slider';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';
import { Skeleton } from "@/components/ui/skeleton"

const LocationPage = () => {
  const { location } = useParams<{ location: string }>();
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      try {
        const res = await getHousesByLocation(location);
        if (res?.success) {
          setHouses(res?.data);
        }
      } catch (error) {
        console.error('Failed to fetch houses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchHouses();
    }
  }, [location]);

  const housesPerPage = 3;
  const totalPages = Math.ceil(houses.length / housesPerPage);
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-center capitalize">{location} Houses</h1>
      {loading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentHouses.length > 0 ? (
              currentHouses.map((house) => (
                <div key={house._id} className="border rounded-lg p-4 shadow-lg">
                  {house.images?.length > 1 ? (
                    <ImageSlider images={house.images} />
                  ) : (
                    <img
                      src={house.images?.[0] || "/fallback-image.jpg"}
                      alt="House"
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <p>{house.description.length > 15 ? house.description.slice(0, 15) + "..." : house.description}</p>
                  <p className="text-sm text-gray-500">{house.location}</p>
                  <p className="text-md font-semibold mt-2">${house.rentAmount}</p>
                  <p className="text-sm">Bedrooms: {house.bedrooms}</p>
                  <Button
                    className="mt-2 bg-[#FF4B27] text-white hover:bg-orange-500 w-full"
                    onClick={() => router.push(`/view-details/${house._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center w-full">No houses available in this location.</p>
            )}
          </div>

          {/* ShadCN Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent className="flex justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPage;
