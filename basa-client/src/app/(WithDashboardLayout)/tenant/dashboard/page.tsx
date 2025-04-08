'use client';
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";
import { getMyRequest } from "@/services/requestRental";
import { RentalRequest } from "@/types";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export default function TenantDashboard() {
  const { user } = useUser();
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return;
      try {
        const data = await getMyRequest(user.id);
        setRequests(Array.isArray(data?.data) ? data?.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user]);

  if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  const approvedRequests = requests.filter((req) => req.status === "approved");

  const chartData = [
    { name: "Requests", value: requests.length },
    { name: "Approved", value: approvedRequests.length },
  ];

  const pieColors = ["#f97316", "#1d4ed8"]; // Orange and Blue

  return (
    <div className="py-20 md:p-6">
      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total Requests */}
        <div className="p-6 bg-orange-100 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Rental Requests</h3>
          <p className="text-3xl font-bold text-orange-500">{requests.length}</p>
        </div>

        {/* Approved Requests */}
        <div className="p-6 bg-green-50 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Approved Requests</h3>
          <p className="text-3xl font-bold text-green-600">{approvedRequests.length}</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        {/* Bar Chart */}
        <div className="bg-orange-100 shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Requests VS Approved</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-green-50 shadow-md rounded-lg p-4 flex justify-center items-center">
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
