'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { getAllHouses } from '@/services/house';
import { IHouse } from '@/types/house';
import { ImageSlider } from '../slider/slider';

const HeroSection = () => {
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;
  const router = useRouter();
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<IHouse[]>([]);
  const [maxRent, setMaxRent] = useState(5000);

  // Get search parameters only on client side
  const location = searchParams?.get('location') || '';
  const rentAmount = searchParams?.get('rentAmount') || '';
  const bedrooms = searchParams?.get('bedrooms') || '';

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getAllHouses();
        if (response?.data) {
          setHouses(response.data);
          const maxRentAmount = Math.max(...response.data.map((house: IHouse) => house.rentAmount || 0));
          setMaxRent(maxRentAmount || 5000);
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const filtered = houses.filter((house) => {
      const matchesLocation = location
        ? house.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesRentAmount = rentAmount
        ? Number(house.rentAmount) <= Number(rentAmount)
        : true;
      const matchesBedrooms = bedrooms
        ? Number(house.bedrooms) === Number(bedrooms)
        : true;
      return matchesLocation && matchesRentAmount && matchesBedrooms;
    });
    setFilteredHouses(filtered);
  }, [houses, location, rentAmount, bedrooms]);

  const handleSearchQuery = (query: string, value: string | number) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(query, value.toString()) : params.delete(query);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-6 items-center">
      <div className="text-center mb-6 py-7">
        <h1 className="text-3xl font-bold h-[150px] py-8">Find Your Perfect Rental House Today!</h1>
        <Button className="mt-4 bg-gray-700" onClick={() => router.push('/create-rental-house')}>
          Post Rental House Info
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded w-full"
            value={location}
            onChange={(e) => handleSearchQuery('location', e.target.value)}
          />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Max Rent: ${rentAmount || maxRent}</span>
            </div>
            <Slider
              max={maxRent}
              step={100}
              value={[Number(rentAmount || maxRent)]}
              onValueChange={(value) => handleSearchQuery('rentAmount', value[0])}
            />
          </div>

          <input
            type="number"
            placeholder="Bedrooms"
            className="border p-2 rounded w-full"
            value={bedrooms}
            onChange={(e) => handleSearchQuery('bedrooms', e.target.value)}
          />
        </div>
        <Button
          onClick={() => router.push('/')}
          className=" bg-gray-300 hover:bg-gray-300 text-black"
        >
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {filteredHouses.length > 0 ? (
             filteredHouses.slice(0, 6).map((house) => (
              <div key={house._id} className="border rounded-lg p-4 shadow-lg">
                {house.images?.length > 1 ? (
                  <ImageSlider images={house.images} />
                ) : (
                  <img src={house.images?.[0] || '/fallback-image.jpg'} alt="House" className="w-full h-40 object-cover rounded" />
                )}
                <h2 className="text-lg font-bold mt-2">{house.description}</h2>
                <p className="text-sm text-gray-500">{house.location}</p>
                <p className="text-md font-semibold mt-2">${house.rentAmount}</p>
                <p className="text-sm">Bedrooms: {house.bedrooms}</p>
                <Button className="mt-2 bg-slate-700" onClick={() => router.push(`/view-details/${house._id}`)}>
                  View Details
                </Button>
              </div>
            ))
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
