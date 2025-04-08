'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllUsers, updateUserRole } from "@/services/adminService";  // Importing updateUserRole
import { toggleStatus } from "@/services/adminService";
import { IUserrr } from "@/types/userrr";
import { Skeleton } from "@/components/ui/skeleton"

const UserManagement = () => {
  const [users, setUsers] = useState<IUserrr[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
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

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle toggling user status (Activate/Deactivate)
  const toggleActivation = async (userId: string) => {
    try {
      const res = await toggleStatus(userId);
      fetchUsers();
      console.log(res);
    } catch (error) {
      console.error("Error toggling user status", error);
    }
  };

  // Function to handle role update
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const userData = { role: newRole };
      const updatedUser = await updateUserRole(userId, userData);
      //console.log("User updated:", updatedUser);
      fetchUsers();
    } catch (error) {
      console.error("Error updating role", error);
    }
  };

  if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

  return (
    <div className="py-20 md:p-6">
      <h2 className="text-3xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Role</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((manus) => (
              <tr key={manus._id} className="text-center sm:text-left">
                <td className="border border-gray-300 p-2">{manus.name}</td>
                <td className="border border-gray-300 p-2">{manus.email}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={manus.role}
                    onChange={(e) => handleRoleChange(manus._id, e.target.value)}
                    className="border rounded p-1 w-full sm:w-auto"
                  >
                    <option value="landlord">landlord</option>
                    <option value="admin">admin</option>
                    <option value="tenant">tenant</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <Button className='bg-[#FF4B27] hover:bg-orange-500' onClick={() => toggleActivation(manus._id)}>
                    {manus.deactive ? "Activate" : "Deactivate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default UserManagement;
