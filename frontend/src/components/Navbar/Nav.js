import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added Link
import { HiMenu, HiX } from "react-icons/hi";
import { FaBoxOpen, FaUserCircle, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";
import Register from "../../components/User/Register/Register";
import Login from "../../components/User/Login/Login";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState(null);
  
  // State for user data
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [fullName, setFullName] = useState(localStorage.getItem("fullName"));

  const refreshUserStatus = () => {
    setUserId(localStorage.getItem("userId"));
    setFullName(localStorage.getItem("fullName"));
    setRole(localStorage.getItem("userRole"));
  };

  useEffect(() => {
    refreshUserStatus();
    window.addEventListener("storage", refreshUserStatus);
    return () => window.removeEventListener("storage", refreshUserStatus);
  }, [location]); 

  const handleLogout = () => {
    localStorage.clear();
    refreshUserStatus();
    setMenuOpen(false);
    navigate("/");
  };

  const links = [
    { name: "Home", path: "/home" },
    { name: "Items", path: "/items", protected: true },
    { name: "Orders", path: "/order", protected: true },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <nav className="sticky top-0 z-50 bg-green-700 dark:bg-slate-900 shadow-lg border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-2xl font-black cursor-pointer text-white tracking-tighter"
          >
            <FaBoxOpen className="text-yellow-400" /> AREA52
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 text-sm font-bold text-white/80">
              {links.map(({ name, path, protected: isProtected }) => (
                (!isProtected || userId) && (
                  <li
                    key={name}
                    onClick={() => navigate(path)}
                    className={`cursor-pointer hover:text-white transition-all py-1 border-b-2 ${
                      location.pathname === path ? "text-yellow-400 border-yellow-400" : "border-transparent"
                    }`}
                  >
                    {name}
                  </li>
                )
              ))}

              {/* Change this line in Nav.js */}
{(role && role.toUpperCase() === "ADMIN") && (
    <li 
      onClick={() => navigate("/AdminDashBoard")}
      className="cursor-pointer bg-red-500/20 text-red-100 px-3 py-1 rounded-full text-[10px] border border-red-500/50 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"
    >
      🛡️ ADMIN PANEL
    </li>
)}
            </ul>
          </div>
          
          {/* Action Icons */}
          <div className="hidden md:flex gap-4 items-center">
             <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              {dark ? <FaSun /> : <FaMoon />}
            </button>

            {userId ? (
              <div className="flex items-center gap-2">
                <div 
                   onClick={() => navigate(`/profile`)}
                   className="group flex items-center gap-3 cursor-pointer bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/20"
                >
                  <div className="text-right">
                    <p className="text-[8px] uppercase text-green-300 font-bold">Logged In</p>
                    <p className="text-sm font-bold text-white leading-tight">{fullName || "User"}</p>
                  </div>
                  <FaUserCircle size={28} className="text-yellow-400" />
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-white/60 hover:text-red-400 transition-transform hover:scale-110"
                  title="Logout"
                >
                  <FaSignOutAlt size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button className="text-sm font-bold text-white hover:text-yellow-400" onClick={() => setModal("login")}>
                  LOGIN 
                </button>
                <button
                  onClick={() => setModal("signup")}
                  className="bg-yellow-400 text-green-900 px-6 py-2 rounded-full text-sm font-black hover:bg-white transition-all shadow-lg"
                >
                  JOIN
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-white">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-green-800 dark:bg-slate-900 px-6 pb-8 space-y-4 text-white border-t border-white/5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {links.map(({ name, path, protected: isProtected }) => (
                (!isProtected || userId) && (
                  <button key={name} className="block w-full text-left py-4 border-b border-white/5 font-bold" 
                    onClick={() => { navigate(path); setMenuOpen(false); }}>
                    {name}
                  </button>
                )
              ))}

              {/* ADMIN LINK - Mobile */}
              {role === "ADMIN" && (
                <button 
                  className="block w-full text-left py-4 border-b border-red-500/20 text-red-300 font-bold" 
                  onClick={() => { navigate("/AdminDashBoard"); setMenuOpen(false); }}>
                  🛡️ Admin Dashboard
                </button>
              )}

              {userId ? (
                <div className="pt-4 space-y-3">
                  <button className="w-full bg-white/10 py-3 rounded-xl font-bold" onClick={() => {navigate('/profile'); setMenuOpen(false);}}>My Profile</button>
                  <button className="w-full bg-red-600/20 text-red-400 py-3 rounded-xl font-bold border border-red-600/30" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-white/10 py-3 rounded-xl" onClick={() => setModal("login")}>Login</button>
                  <button className="flex-1 bg-yellow-400 text-green-900 py-3 rounded-xl font-bold" onClick={() => setModal("signup")}>Join</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modals */}
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
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal === "signup" ? (
                <Register 
                  onClose={() => { 
                    setModal(null); 
                    refreshUserStatus();
                  }} 
                />
              ) : (
                <Login 
                  onClose={() => { 
                    setModal(null); 
                    refreshUserStatus();
                  }} 
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;