import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });

  const handleReset = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error("Passwords mismatch!");

    try {
      await axios.post(`http://localhost:8080/auth/reset-password?token=${token}&newPassword=${passwords.new}`);
      toast.success("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Link expired or invalid.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleReset} className="p-8 bg-white shadow-xl rounded-2xl w-96 border">
        <h2 className="text-2xl font-bold mb-6">Create New Password</h2>
        <input 
          type="password" placeholder="New Password" required
          className="w-full border p-3 rounded-lg mb-3"
          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
        />
        <input 
          type="password" placeholder="Confirm New Password" required
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;