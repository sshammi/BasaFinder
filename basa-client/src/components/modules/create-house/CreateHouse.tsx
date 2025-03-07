"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreview";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { craeteHouse } from "@/services/house";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function CreateListingForm() {
  const { user, isLoading } = useUser(); // Assuming `loading` is available in `useUser` context
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // Default form values
  const form = useForm({
    defaultValues: {
      location: "",
      description: "",
      amenities:"",
      rentAmount: "",
      bedrooms: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Handle the loading state of the user asynchronously
  useEffect(() => {
    if (!isLoading && user) {
      setIsUserLoaded(true); // Only proceed once the user is loaded
    }
  }, [user, isLoading]);

  // If user is still loading, show loading message
  if (!isUserLoaded) return <p>Loading user data...</p>;

  const landlordId = user?.id;
  console.log(user)

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const imageUrls = await uploadImages();
      const listingData = {
        landlordId,
        location: data.location,
        description: data.description,
        amenities: data.amenities,
        rentAmount: data.rentAmount,
        bedrooms: data.bedrooms,
        images: imageUrls,
      };
      console.log(listingData);
      const res = await craeteHouse(listingData);
      if (res.success) {
        toast.success("Listing created successfully!");
        router.push("/landlord/my-listings");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl p-5 my-5 w-[500px]">
      <h1 className="text-xl font-semibold mb-4">Create Rental Listing</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} className="h-36" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Bedrooms</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
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

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? "Submitting..." : "Post Listing"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
