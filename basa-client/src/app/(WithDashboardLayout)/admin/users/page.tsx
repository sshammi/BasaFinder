'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllUsers, updateUserRole } from "@/services/adminService";  // Importing updateUserRole
import { toggleStatus } from "@/services/adminService";
import { IUserrr } from "@/types/userrr";

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
      const res=await toggleStatus(userId);
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

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((manus) => (
            <tr key={manus._id} className="text-center">
              <td className="border border-gray-300 p-2">{manus.name}</td>
              <td className="border border-gray-300 p-2">{manus.email}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={manus.role}
                  onChange={(e) => handleRoleChange(manus._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="landlord">landlord</option>
                  <option value="admin">admin</option>
                  <option value="tenant">tenant</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                <Button onClick={() => toggleActivation(manus._id)}>
                  {manus.deactive ? "Activate" : "Deactivate"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
