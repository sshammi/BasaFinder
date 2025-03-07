'use client'

import { ImageSlider } from '@/components/modules/slider/slider';
import { Button } from '@/components/ui/button';
import { getSingleHouse } from '@/services/house';
import { IHouse } from '@/types/house';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewDetails = () => {
  const { houseId } = useParams<{ houseId: string }>();
  const [house, setHouse] = useState<IHouse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router=useRouter();

  useEffect(() => {
    if (houseId) {
      const fetchHouseDetails = async () => {
        try {
          const res = await getSingleHouse(houseId);
          if (res instanceof Error) {
            setError(res.message);
          } else {
            setHouse(res?.data);
          }
        } catch (error) {
          setError('Error fetching house details');
        }
      };

      fetchHouseDetails();
    }
  }, [houseId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!house) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[350px] mx-auto p-6">
      <div className="mb-4">
        {house && house.images && house.images.length > 1 ? (
          <ImageSlider images={house.images} />
        ) : (
          house && house.images && house.images[0] ? (
            <img
              src={house.images[0]}
              alt="house-renter"
              className="w-full h-auto max-h-[300px] object-cover rounded-lg"
            />
          ) : (
            <p>No images available</p>
          )
        )}
      </div>

      <h2 className="text-2xl font-bold">Description: {house.description}</h2>
      <p className="text-lg text-gray-600 mt-2">Location: {house.location}</p>
      <p className="text-xl font-semibold mt-4">${house.rentAmount}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Additional Details: {house.amenities}</h3>
        <p className="text-gray-700 mt-2">House ID: {house._id}</p>
        <Button className='bg-gray-700 py-4 m-5' onClick={() => router.push(`/rental-request/${house._id}`)}>Rental Request</Button>
      </div>
    </div>
  );
};

export default ViewDetails;
