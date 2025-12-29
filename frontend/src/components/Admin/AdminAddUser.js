import { useState } from "react";
import axios from "axios";

const AdminAddUser = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    
    role: "USER" // Admin can choose the starting role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", formData);
      await axios.post("http://localhost:8080/log", {
        action: "ADD_USER",
        performedBy: "Admin",
        details: `Created new user account for: ${formData.fullName} with role: ${formData.role}`
    });
      alert("User created successfully!");
      onClose(); // Close modal and refresh list
    } catch (err) {
      alert("Error creating user: " + err.response?.data?.message);
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New System User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <input
          type="password"
          placeholder="Initial Password"
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        
        {/* Role Selection - Only available to Admins */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Assign Role</label>
          <select 
            className="w-full p-2 border rounded-lg mt-1"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="USER">Standard User</option>
            <option value="ADMIN">Administrator</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
          Create User account
        </button>
      </form>
    </div>
  );
};

export default AdminAddUser;