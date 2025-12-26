import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaBoxOpen, FaUserCircle, FaSignOutAlt } from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";
import Register from "../../components/User/Register/Register";
import Login from "../../components/User/Login/Login";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState(null);

  
  // Track state for reactivity
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [fullName, setFullName] = useState(localStorage.getItem("fullName"));

  useEffect(() => {
    const syncUser = () => {
      setUserId(localStorage.getItem("userId"));
      setFullName(localStorage.getItem("fullName"));
    };
    
    
    syncUser(); // Run on location change
    window.addEventListener("storage", syncUser); 
    return () => window.removeEventListener("storage", syncUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    setUserId(null);
    setFullName(null);
    setMenuOpen(false);
    navigate("/");
  };

  const links = [
    { name: "Home", path: "/home" },
    { name: "Items", path: "/items", protected: true },
    { name: "Orders", path: "/order", protected: true },
    { name: "Users", path: "/users", protected: true },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <nav className="sticky top-0 z-50 bg-green-700 dark:bg-slate-900 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-2xl font-black cursor-pointer text-white tracking-tighter"
          >
            <FaBoxOpen className="text-yellow-400" /> AREA52
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm font-bold text-white/80">
            {links.map(({ name, path, protected: isProtected }) => (
              (!isProtected || userId) && (
                <li
                  key={name}
                  onClick={() => navigate(path)}
                  className={`cursor-pointer hover:text-white transition-all ${
                    location.pathname === path ? "text-yellow-400 border-b-2 border-yellow-400" : ""
                  }`}
                >
                  {name}
                </li>
              )
            ))}
          </ul>

          {/* Desktop User Section */}
          <div className="hidden md:flex gap-4 items-center">
            {userId ? (
              <div className="flex items-center gap-4">
                {/* User Profile Badge */}
                <div 
                  onClick={() => navigate("/profile")}
                  className="group flex items-center gap-3 cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-1 
                  rounded-full transition-all border border-white/20 shadow-inner"
                >
                  <div className="flex flex-col items-end -space-y-1">
                    <span className="text-[9px] uppercase tracking-tighter text-green-300 font-black">Active User</span>
                    <span className="text-sm font-bold text-white">
                      {fullName ? fullName.split(" ")[0] : "Agent"}
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 group-hover:rotate-12 
                  transition-transform shadow-lg">
                    <FaUserCircle size={20} />
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-white/60 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button className="text-sm font-bold text-white hover:text-yellow-400 transition" onClick={() => setModal("login")}>
                  LOGIN 
                </button>

                <button
                  onClick={() => setModal("signup")}
                  className="bg-white text-green-700 px-6 py-2 rounded-full text-sm font-black hover:bg-yellow-400 hover:text-green-900 transition-all shadow-xl"
                >
                  JOIN
                </button>
              </div>
            )}
            
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-white">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-green-800 dark:bg-slate-900 px-6 pb-8 space-y-4 text-white border-t border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}

            >
              {/* User Info for Mobile */}
              {userId && (
                <div className="py-4 border-b border-white/10 flex items-center gap-3 text-yellow-400 font-bold">
                  <FaUserCircle size={24} /> { fullName ? fullName : "Agent"}
                </div>
              )}
              {links.map(({ name, path, protected: isProtected }) => (
                (!isProtected || userId) && (
                  <button key={name} className="block w-full text-left py-2 font-medium" onClick={() => { navigate(path); setMenuOpen(false); }}>
                    {name}
                  </button>
                )
              ))}
              <div className="pt-4">
                {userId ? (
                  <button className="w-full bg-red-600 py-3 rounded-xl font-bold" onClick={handleLogout}>Logout</button>
                ) : (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white/10 py-3 rounded-xl" onClick={() => setModal("login")}>Login</button>
                    <button className="flex-1 bg-white text-green-700 py-3 rounded-xl font-bold" onClick={() => setModal("signup")}>Sign Up</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals for Login/Register */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal === "signup" ? (
                <Register onClose={() => setModal(null)} />
              ) : (
                <Login onClose={() => {
                  setModal(null);
                  setUserId(localStorage.getItem("userId"));
                  setFullName(localStorage.getItem("fullName"));
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