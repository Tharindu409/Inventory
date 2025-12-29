import React, { useState } from "react";
import axios from "axios";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // POSTing to your non-JWT login endpoint
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password 
      });

      const data = response.data;

      // 1. In a non-JWT setup, success is usually indicated by receiving 
      // the user object or a success status.
      if (data && data.id) {
        // 2. Save user info to LocalStorage (No token needed)
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("fullName", data.fullName || "User");
        localStorage.setItem("isLoggedIn", "true"); // Helper flag

        // 3. Notify other components (Navbar/Sidebar)
        window.dispatchEvent(new Event("storage"));

        setMessage("Login successful!");

        // 4. Navigate based on Role
        setTimeout(() => {
          if (onClose) onClose();
          
          if (data.role === "ADMIN") {
            navigate("/AdminDashboard");
          } else {
            navigate("/home");
          }
        }, 1000);
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (err) {
      // Handles 401 Unauthorized or 404 Not Found
      const errorMsg = err.response?.data?.message || "Login failed. Check backend connectivity.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-2xl p-8 border border-gray-100"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to manage your inventory</p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-center text-xs font-bold mb-4 ${
            message.includes("successful") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-slate-900 py-3 text-white font-bold hover:bg-green-600 transition-all shadow-lg disabled:opacity-50 active:scale-95"
        >
          {loading ? "Verifying..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;