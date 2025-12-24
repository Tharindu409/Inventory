import { useState } from "react";
import axios from "axios";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onLoginSuccess }) => {
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
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.id) {
        localStorage.setItem("userId", response.data.id);
        setMessage("Login successful!");
        
        // Call parent function to update Navbar state
        if (onLoginSuccess) onLoginSuccess();

        setTimeout(() => {
          if (onClose) onClose();
          navigate("/home");
        }, 800);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-2xl bg-white/90 dark:bg-slate-900/90 
                   backdrop-blur-xl shadow-2xl p-6"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          Login
        </h2>

        {message && (
          <p
            className={`text-center text-sm mb-3 ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 rounded-xl bg-green-600 py-2 text-white text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
