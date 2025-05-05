'use client'

import { getAllHouses } from '@/services/house';
import { IHouse } from '@/types/house';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

const PlaceService = () => {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getAllHouses();
        if (response?.data) {
          const houseData = response.data as IHouse[];
          setHouses(houseData);
          
          // Extract unique locations
          const uniqueLocations = Array.from(
            new Set(houseData.map((house) => house.location))
          );
          setLocations(uniqueLocations);
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };
    fetchHouses();
  }, []);

  const handleLocationClick = (location: string) => {
    router.push(`/location/${encodeURIComponent(location)}`);
  };
  console.log(location);
  return (
    <div className="p-0 md:p-4 flex flex-col items-center text-center py-16 my-20">
  <h1 className="text-4xl md:text-6xl font-bold mb-4">Your next house could be here</h1>
  
  <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {locations.map((location) => (
      <li
        key={location}
        className=" p-4 text-2xl cursor-pointer text-center text-orange-500 hover:font-bold"
        onClick={() => handleLocationClick(location)}
      >
        {location}
      </li>
    ))}
  </ul>

  <div className="flex justify-center mt-6">
    <CldImage
      src="Screenshot_2025-03-26_103741_wy7cfr"
      alt="Location's Photo"
      width={600}
      height={400}
    />
  </div>
  <p className='text-4xl md:text-6xl font-extrabold w-full text-center pt-7 pb-8 md:pb-5'>150+ CITIES</p>
  <p className='text-2xl md:text-3xl'>50,000+ homes advertised by real landlords</p>
</div>

  );
};

export default PlaceService;
