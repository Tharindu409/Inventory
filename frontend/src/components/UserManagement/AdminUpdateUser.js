import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaSave } from "react-icons/fa";

const AdminUpdateUser = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",

    role: ""
  });
  const [loading, setLoading] = useState(true);

  // 1. Load existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${userId}`);
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          phone: res.data.phone,
          role: res.data.role
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit updated data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${userId}`, formData);
      alert("User updated successfully!");
      onClose(); // This will close the modal and refresh the table in UserManagement
    } catch (error) {
      alert("Update failed. Please check the backend.");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading user data...</div>;

  return (
    <div className="bg-white p-2">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <FaUserShield size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Edit User Permissions</h2>
          <p className="text-xs text-gray-400">Modifying User ID: #{userId}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            required
          />
        </div>
        {/* Phone Field */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>


        {/* Role Selection - Crucial for Admins */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">System Access Level</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="USER">USER (Standard Access)</option>
            <option value="ADMIN">ADMIN (Full System Control)</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2"
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpdateUser;