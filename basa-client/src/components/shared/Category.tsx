"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Building2, HomeIcon } from "lucide-react";

const categories = [
  { name: "Family", icon: Home },
  { name: "Bachelor", icon: HomeIcon },
  { name: "Office", icon: Building2 },
  { name: "Sublet", icon: Home },
  { name: "Hostel", icon: Home },
];

export default function CategoriesPage() {
  const router = useRouter();

  const handleNavigate = (category: string) => {
    router.push(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 my-3">
      {categories.map(({ name, icon: Icon }) => (
        <Button
          key={name}
          variant="outline"
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-lg border border-orange-500"
          onClick={() => handleNavigate(name)}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">{name}</span>
        </Button>
      ))}
    </div>
  );
}
