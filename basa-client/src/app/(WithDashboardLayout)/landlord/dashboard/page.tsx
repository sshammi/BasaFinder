"use client";

import { useUser } from "@/context/UserContext";
import { getMyHouses } from "@/services/house";
import { getMyOwn } from "@/services/requestRental";
import { RentalRequest } from "@/types";
import { IHouse } from "@/types/house";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function LandlordDashboard() {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const { user, setIsLoading } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const fetchHouses = async () => {
      setIsLoading(true);
      try {
        const response = await getMyHouses(user.id);
        setHouses(response?.data || []);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
      try {
        const response = await getMyOwn(user.id);
        setRequests(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
        toast.error("Error fetching requests");
      }
    };

    fetchRequests();
  }, [user?.id]);

  // Chart Data
  const chartData = [
    { name: "Houses", value: houses.length },
    { name: "Requests", value: requests.length },
  ];

  const pieColors = ["#f97316", "#1d4ed8"]; // Orange and Blue

  return (
    <div className="py-20 md:p-6">
      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total Houses */}
        <div className="p-6 bg-green-50 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Houses</h3>
          <p className="text-3xl font-bold text-orange-500">{houses.length}</p>
        </div>

        {/* Total Rental Requests */}
        <div className="p-6 bg-orange-100 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Rental Requests</h3>
          <p className="text-3xl font-bold text-blue-500">{requests.length}</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        {/* Bar Chart */}
        <div className="bg-orange-100 shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Houses vs. Requests</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-green-50 shadow-md rounded-lg p-4 flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
