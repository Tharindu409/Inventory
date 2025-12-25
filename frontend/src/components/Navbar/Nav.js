import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { HiMenu, HiX } from "react-icons/hi";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa"; // Added User Icon
import { motion, AnimatePresence } from "framer-motion";
import Register from "../../components/User/Register/Register";
import Login from "../../components/User/Login/Login";
 
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // This ensures the navbar updates immediately when localStorage changes
  useEffect(() => {
    const checkUser = () => {
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", checkUser); // Listen for changes in other tabs
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // Update userId whenever the route changes (helps after login redirect)
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName"); // Clean up name too
    setUserId(null);
    setMenuOpen(false);
    navigate("/"); // Redirect to landing page
  };

  const links = [
    { name: "Home", path: "/home" },
    { name: "Items", path: "/items", protected: true },
    { name: "Orders", path: "/order", protected: true },
    { name: "Users", path: "/users", protected: true },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <nav className="sticky top-0 z-50 bg-green-700 dark:bg-slate-900/80 backdrop-blur border-b border-black/10 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-2xl font-bold cursor-pointer text-white"
          >
            <FaBoxOpen className="text-yellow-400" /> Area52
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
            {links.map(({ name, path, protected: isProtected }) => (
              // Only show protected links if userId exists
              (!isProtected || userId) && (
                <li
                  key={name}
                  onClick={() => navigate(path)}
                  className={`cursor-pointer hover:text-green-200 transition-colors ${
                    location.pathname === path ? "text-yellow-400 border-b-2 border-yellow-400" : ""
                  }`}
                >
                  {name}
                </li>
              )
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4 items-center text-white">
            {userId ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-green-800 px-3 py-1 rounded-lg">
                  <FaUserCircle />
                  <span className="text-xs">User Active</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="hover:text-red-300 font-semibold transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button className="hover:text-green-200 transition" onClick={() => setModal("login")}>Login</button>
                <button
                  onClick={() => setModal("signup")}
                  className="bg-white text-green-700 px-5 py-2 rounded-full font-bold hover:bg-green-50 transition shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
            
            <button
              onClick={() => setDark(!dark)}
              className="ml-2 p-2 rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-white"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-green-800 dark:bg-slate-900 px-6 pb-8 space-y-4 text-white border-t border-green-600"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {links.map(({ name, path, protected: isProtected }) => (
                (!isProtected || userId) && (
                  <button 
                    key={name} 
                    className="block w-full text-left py-2 border-b border-green-700" 
                    onClick={() => { navigate(path); setMenuOpen(false); }}
                  >
                    {name}
                  </button>
                )
              ))}
              <div className="pt-4 flex flex-col gap-4">
                {userId ? (
                  <button className="text-left text-red-300 font-bold" onClick={handleLogout}>Logout</button>
                ) : (
                  <>
                    <button className="text-left" onClick={() => {setModal("login"); setMenuOpen(false)}}>Login</button>
                    <button className="bg-white text-green-700 px-4 py-2 rounded-lg font-bold" onClick={() => {setModal("signup"); setMenuOpen(false)}}>Sign Up</button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal === "signup" ? (
                <Register onClose={() => setModal(null)} />
              ) : (
                <Login onClose={() => {
                  setModal(null);
                  setUserId(localStorage.getItem("userId")); // Sync after login
                }} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;