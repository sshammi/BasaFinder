'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteHouse, getAllHouses, getMyHouses } from "@/services/house";
import { IHouse } from "@/types/house";
import { useUser } from "@/context/UserContext";
import { ImageSlider } from "@/components/modules/slider/slider";

const ManageHouses = () => {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  //console.log(user);

  useEffect(() => {
    if (!user?.id) return; // Ensure user is available before making the request

    const fetchHouses = async () => {
      setIsLoading(true); // Show loading state (if applicable)
      try {
        //console.log(user.id);
        const response = await getAllHouses();
        console.log(response);
        if (response?.data) {
          setHouses(response.data);
        } else {
          setHouses([]);
        }
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setIsLoading(false); // Stop loading state
      }
    };

    fetchHouses();
  }, [user?.id]);


  //console.log(houses);

  const handleEdit = (id: string) => {
    router.push(`/admin/edit-house/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this house?")) {
      try {
        const response = await deleteHouse(id);
        if (response.success) {
          setHouses((prevHouses) => prevHouses.filter((house) => house._id !== id));
        } else {
          console.error("Failed to delete house:", response.message);
        }
      } catch (error) {
        console.error("Error deleting house:", error);
      }
    }
  };

  return (
    <div className="p-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Listing Houses</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house) => (
          <div key={house._id} className="border rounded-lg p-3 shadow-md">
            {house.images.length > 1 ? (
              <ImageSlider images={house.images} /> // Show slider if multiple images
            ) : (
              <img
                src={house.images[0]}
                alt="house-renter"
                className="w-full h-36 object-cover rounded"
              />
            )}
            <h2 className="text-base font-bold mt-2">{house.description}</h2>
            <p className="text-sm text-gray-500">{house.location}</p>
            <p className="text-md font-semibold mt-2">${house.rentAmount}</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => handleEdit(house._id)}>Edit</Button>
              <Button onClick={() => handleDelete(house._id)} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ManageHouses;
