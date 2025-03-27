"use client";

import { useUser } from "@/context/UserContext";
import { getAllUsers } from "@/services/adminService";
import { getAllHouses } from "@/services/house";
import { IHouse } from "@/types/house";
import { IUserrr } from "@/types/userrr";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const { user, setIsLoading } = useUser();
  const [users, setUsers] = useState<IUserrr[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch houses data
  useEffect(() => {
    if (!user?.id) return;

    const fetchHouses = async () => {
      setIsLoading(true);
      try {
        const response = await getAllHouses();
        if (response?.data) {
          setHouses(response.data);
        } else {
          setHouses([]);
        }
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, [user?.id]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response?.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

   const chartData = [
      { name: "Houses", value: houses.length },
      { name: "Users", value: users.length },
    ];
  
    const pieColors = ["#f97316", "#1d4ed8"]; // Orange and Blue
  return (
    <div className="p-14">
          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Total Houses */}
            <div className="p-6 bg-green-50 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-700">Total Houses</h3>
              <p className="text-3xl font-bold text-orange-500">{houses.length}</p>
            </div>
    
            {/* Total Rental Requests */}
            <div className="p-6 bg-orange-100 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-700">Users</h3>
              <p className="text-3xl font-bold text-blue-500">{users.length}</p>
            </div>
          </div>
    
          {/* Graphs */}
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            {/* Bar Chart */}
            <div className="bg-orange-100 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Houses vs. Users</h3>
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
