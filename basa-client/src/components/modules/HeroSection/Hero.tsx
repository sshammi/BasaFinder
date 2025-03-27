'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getAllHouses, updateHouse } from '@/services/house';
import { IHouse } from '@/types/house';
import { ImageSlider } from '../slider/slider';
import { FaStar } from 'react-icons/fa6';

const HeroSection = () => {
  const router = useRouter();
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getAllHouses();
        if (response?.data) {
          setHouses(response.data);
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };
    fetchHouses();
  }, []);

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
      const res = await updateHouse(houseId,{ratingCount:newRating.toString()});
      console.log(res);
      if (res?.data) {
        console.log('Rating updated successfully');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className="p-6 items-center">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {houses.length > 0 ? (
            houses.slice(0, 6).map((house) => {
              const productRating =Number(ratings[house._id] || house.ratingCount || 0); // Default to house rating if no local rating exists
              return (
                <div key={house._id} className="border rounded-lg p-4 shadow-lg">
                  {house.images?.length > 1 ? (
                    <ImageSlider images={house.images} />
                  ) : (
                    <img
                      src={house.images?.[0] || '/fallback-image.jpg'}
                      alt="House"
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <h2 className="text-lg font-bold mt-2">{house.description}</h2>
                  <p className="text-sm text-gray-500">{house.location}</p>
                  <p className="text-md font-semibold mt-2">BDT {house.rentAmount}</p>
                  <p className="text-sm">Bedrooms: {house.bedrooms}</p>
                  <p className="text-sm">Category: {house.category}</p>

                  {/* Rating Section */}
                  <div className='flex gap-1'>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={18}
                        className={`cursor-pointer ${star <= productRating ? "text-yellow-500" : "text-gray-300"}`}
                        onClick={() => handleRating(house._id, star)}
                      />
                    ))}
                  </div>
                  <div className='pt-1'>reviews({house.ratingCount})</div>
                  </div>

                  <Button className="mt-2 bg-slate-700 w-full" onClick={() => router.push(`/view-details/${house._id}`)}>
                    View Details
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="text-center w-full">No houses match your search criteria.</p>
          )}
        </div>
        <Button className="mt-6 bg-gray-700" onClick={() => router.push("/all-rentals")}>
          All Rentals
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
