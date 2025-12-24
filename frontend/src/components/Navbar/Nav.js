 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaBoxOpen, FaBoxes, FaClipboardList, FaUsers } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Register from "../../components/User/Register/Register";
import Login from "../../components/User/Login/Login";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <nav className="sticky top-0 z-50 bg-green-700 dark:bg-slate-900/80 backdrop-blur border-b border-black dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xl font-semibold cursor-pointer text-white"
          >
            <FaBoxOpen /> Area52
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm font-medium text-white">
            {[
              { name: "Home", icon: <FaBoxes />, path: "/" },
              { name: "Items", icon: <FaClipboardList />, path: "/items" },
              { name: "Orders", icon: <FaClipboardList />, path: "/orders" },
              { name: "Users", icon: <FaUsers />, path: "/users" },
            ].map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-1 cursor-pointer relative group"
              >
                {item.icon} {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-300 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            {userId ? (
              <button
                onClick={handleLogout}
                className="bg-white text-green-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="text-white font-medium hover:text-green-200"
                >
                  Login
                </button>

                <button
                  onClick={() => setOpenSignup(true)}
                  className="bg-white text-green-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-100 transition"
                >
                  Sign Up
                </button>
              </>
            )}

            <button
              onClick={() => setDark(!dark)}
              className="border px-3 py-1 rounded-full text-sm text-white hover:bg-white hover:text-green-700 transition"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-white"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-4 text-sm text-white">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/items")}>Items</button>
            <button onClick={() => navigate("/orders")}>Orders</button>
            <button onClick={() => navigate("/users")}>Users</button>

            {userId ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button onClick={() => setOpenLogin(true)}>Login</button>
                <button onClick={() => setOpenSignup(true)}>Sign Up</button>
              </>
            )}

            <button onClick={() => setDark(!dark)}>Toggle Theme</button>
          </div>
        )}
      </nav>

      {/* SIGN UP MODAL */}
      <AnimatePresence>
        {openSignup && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSignup(false)}
          >
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Register onClose={() => setOpenSignup(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {openLogin && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenLogin(false)}
          >
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Login
                onClose={() => setOpenLogin(false)}
                onLoginSuccess={() =>
                  setUserId(localStorage.getItem("userId"))
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
