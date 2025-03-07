"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// get all products
export const getAllUsers= async () => {
    const token = await getValidToken();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/admin/all-users`,
        {
          headers: {
                Authorization:token,
              },
          next: {
            tags: ["USER"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
};

// active deactive 
export const toggleStatus = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/block/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("USER");
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};


//update house
export const updateUserRole = async (id: string, userData: any) => {
    console.log(id,userData);
    const token = await getValidToken();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/role-change/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userData),
      });
      revalidateTag("USER");
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
};
