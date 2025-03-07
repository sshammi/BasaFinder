"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSingleHouse, updateHouse } from "@/services/house";
import { toast } from "sonner";
import NMImageUploader from "@/components/ui/core/NMImageUploader"; // Ensure you import this component
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreview"; // Ensure this is also imported

const EditHouse = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [house, setHouse] = useState({
    location: "",
    description: "",
    rentAmount: "",
    bedrooms: "",
    images: [], // Updated to hold image URLs
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchHouse = async () => {
      try {
        const response = await getSingleHouse(id);
        if (response?.success) {
          setHouse(response.data); // Populate form with existing data
          setImagePreview(response.data.images || []); // Populate image preview
        }
      } catch (error) {
        console.error("Error fetching house:", error);
      }
    };

    fetchHouse();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHouse((prevHouse) => ({ ...prevHouse, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Upload images if any
    const uploadImages = async () => {
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("key", "8d2b56eb726d92e77c483dbf69cbd97c");

        try {
          const res = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.success) {
            uploadedUrls.push(data.data.url);
          }
        } catch (err) {
          console.error("Image upload failed", err);
        }
      }
      return uploadedUrls;
    };

    try {
      const imageUrls = await uploadImages();
      const updatedHouseData = { ...house, images: imageUrls.length > 0 ? imageUrls : house.images };
      const res = await updateHouse(id, updatedHouseData);

      if (res?.success) {
        toast.success("House updated successfully!");
        router.push("/landlord/my-listings");
      } else {
        toast.error("Failed to update house.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit House</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="location"
          value={house.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={house.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="rentAmount"
          value={house.rentAmount}
          onChange={handleChange}
          placeholder="Rent Amount"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="bedrooms"
          value={house.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          className="w-full p-2 border rounded"
        />

        <div className="mt-4">
          {/* Image Preview and Upload */}
          <ImagePreviewer
            setImageFiles={setImageFiles}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
          <NMImageUploader
            setImageFiles={setImageFiles}
            setImagePreview={setImagePreview}
            label="Upload Images"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update House"}
        </button>
      </form>
    </div>
  );
};

export default EditHouse;
