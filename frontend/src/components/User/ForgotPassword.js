import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/auth/forgot-password?email=${email}`);
      toast.success("Reset link sent! Check your terminal/console.");
    } catch (err) {
      toast.error("Email not found.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleRequest} className="p-8 bg-white shadow-xl rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your email to receive a reset link.</p>
        <input 
          type="email" required placeholder="Email Address" 
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-bold">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};
export default ForgotPassword;