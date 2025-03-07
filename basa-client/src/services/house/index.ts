"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const craeteHouse = async (data: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/house`, {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
      body:JSON.stringify(data),
    });
    revalidateTag("PRODUCT");
    const result = await res.json();
    //console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get all products
export const getAllHouses = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/house`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get my products
export const getMyHouses = async (id:string) => {
  //console.log(id);
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/house/my/${id}`,
      {
        headers: {
          Authorization:token,
        },
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    //console.log(data)
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleHouse = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/house/${id}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
//update house
export const updateHouse = async (id: string, houseData: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/house/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(houseData),
    });
    revalidateTag("PRODUCT");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// delete house
export const deleteHouse = async (id: string): Promise<any> => {
  const token=await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/house/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization:token,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};