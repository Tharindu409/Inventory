import { useState } from "react";
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
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const { fullName, email, password, phone } = user;

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9]{10}$/.test(phone);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "email")
      setErrors({ ...errors, email: validateEmail(value) ? "" : "Invalid email" });

    if (name === "phone")
      setErrors({ ...errors, phone: validatePhone(value) ? "" : "10 digits only" });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/user", user);
    
    // IMPORTANT: Save data to localStorage so Navbar sees you are logged in
    if (response.data.id) {
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("userRole", response.data.role);
      window.dispatchEvent(new Event("storage")); 
      navigate('/home');
      
      setMessage("Registered successfully!");

      // Small delay to show the success message before moving
      setTimeout(() => {
        if (onClose) onClose();
        navigate("/home"); // Move to home page
        window.dispatchEvent(new Event("storage")); // Force Navbar to update
      }, 1000);
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Registration failed";
    setMessage(`Error: ${errorMsg}`);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-2xl bg-white/80 dark:bg-slate-900/80 
                   backdrop-blur-xl shadow-2xl p-6"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          Create Account
        </h2>

        {message && (
          <p className="text-center text-green-600 text-sm mb-3">{message}</p>
        )}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={onInputChange}
          required
          className="input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onInputChange}
          required
          className="input mt-3"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="relative mt-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={onInputChange}
            required
            className="input pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={onInputChange}
          required
          className="input mt-3"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <button
          type="submit"
          className="w-full mt-5 rounded-xl bg-green-600 py-2 text-white text-sm font-semibold hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
