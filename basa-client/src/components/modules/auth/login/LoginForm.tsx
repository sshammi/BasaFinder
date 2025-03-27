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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useState } from "react";
import { loginSchema } from "./LognValidation";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const demoUsers = {
  admin: { email: "admin@gmail.com", password: "admin12" },
  landlord: { email: "shammisuraiya26@gmail.com", password: "123456" },
  tenant: { email: "nabila@gmail.com", password: "nabila" },
};

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { setIsLoading } = useUser();
  const router = useRouter();
  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDemoLogin = (role: keyof typeof demoUsers) => {
    setValue("email", demoUsers[role].email);
    setValue("password", demoUsers[role].password);
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-6 bg-white shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="font-light text-gray-600">Welcome back! Please login to continue.</p>
      </div>
      <div className="flex justify-between mt-4 space-x-2 mb-3">
        <Button variant="outline" size="lg" className="text-[#FF4B27] hover:bg-[#FF4B27] hover:text-white" onClick={() => handleDemoLogin("admin")}>Admin</Button>
        <Button variant="outline" size="lg" className="text-[#FF4B27] hover:bg-[#FF4B27] hover:text-white" onClick={() => handleDemoLogin("landlord")}>Landlord</Button>
        <Button variant="outline" size="lg" className="text-[#FF4B27] hover:bg-[#FF4B27] hover:text-white" onClick={() => handleDemoLogin("tenant")}>Tenant</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 w-full bg-[#FF4B27] text-white hover:bg-orange-600" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center mt-3">
        Don't have an account?
        <Link href="/register" className="text-primary ml-1 hover:text-[#FF4B27]">Register</Link>
      </p>
    </div>
  );
}