import React, { useState } from "react";
import axios from "axios";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Register = ({ onClose }) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const { fullName, email, password, phone } = user;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) ? "" : "Invalid email format" }));
    }
    if (name === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) ? "" : "Must be 10 digits" }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (errors.email || errors.phone) return;
    setLoading(true);

    try {
      // 1. Create the user
      const response = await axios.post("http://localhost:8080/user", user);

      // 2. Logging (Defensive - won't break registration if log fails)
      try {
        await axios.post("http://localhost:8080/log", {
          action: "REGISTER_USER",
          performedBy: user.fullName,
          details: `New user registered: ${user.fullName} (${user.email})`
        });
      } catch (logErr) {
        console.warn("Audit log failed, but registration continued.");
      }

      if (response.data.id) {
        // 3. Auto-Login: Save to localStorage
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("fullName", response.data.fullName);
        localStorage.setItem("userRole", response.data.role || "USER");
        localStorage.setItem("isLoggedIn", "true");

        // 4. Update UI state across the app
        window.dispatchEvent(new Event("storage")); 
        setMessage("Registration successful!");

        setTimeout(() => {
          if (onClose) onClose();
          navigate('/home');
        }, 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed. Email might already exist.";
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 shadow-2xl p-8 border border-gray-100"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">Join our inventory system</p>

        {message && (
          <div className={`p-3 rounded-lg text-center text-xs font-bold mb-4 ${
            message.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={onInputChange}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none dark:bg-slate-800 dark:text-white"
          />

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={onInputChange}
              required
              className={`w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none dark:bg-slate-800 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={onInputChange}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 outline-none dark:bg-slate-800 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (10 digits)"
              value={phone}
              onChange={onInputChange}
              required
              className={`w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none dark:bg-slate-800 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
            />
            {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.phone}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-slate-900 py-3 text-white font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;