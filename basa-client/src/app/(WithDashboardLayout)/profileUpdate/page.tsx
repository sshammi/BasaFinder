"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IUser } from "@/types/user";
import { getMe, updateProfile } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";

const EditUserProfile = () => {
  const router = useRouter();
  const { user } = useUser();
  const [User, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "tenant", // Default role
    deactive: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) {
        console.error("User ID is not available");
        return; // Don't call the API if user ID is not available
      }

      try {
        console.log("Sending user ID:", user.id);
        const response = await getMe(user.id); // Ensure userId is defined
        console.log("Fetched user data:", response);
        if (response?.success) {
          setUser(response.data); // Populate form with existing data
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user?.id) { // Only fetch the user profile if user ID is available
      fetchUserProfile();
    }
  }, [user?.id]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if `user` is null or `user.id` is missing before proceeding.
    if (!user || !user.id) {
      toast.error("User information is missing.");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await updateProfile(user.id, {
        name: User.name,
        email: User.email,
        phoneNumber: User.phoneNumber,
      });
      console.log(res);
      if (res?.success) {
        toast.success("Profile updated successfully!");
        router.push("/"); 
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-14">
      <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={User.name || ""} // Ensure value is never undefined
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={User.email || ""} // Ensure value is never undefined
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          name="phoneNumber"
          value={User.phoneNumber || ""} // Ensure value is never undefined
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-[#FF4B27] hover:bg-orange-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditUserProfile;
