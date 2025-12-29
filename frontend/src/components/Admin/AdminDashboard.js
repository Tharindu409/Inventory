import { useState, useEffect } from "react";
import { 
  FaUser, FaUsers, FaBoxes, FaClipboardList, 
  FaChartBar, FaShieldAlt, FaHistory, FaMoon, FaSun, FaBell 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ItemManagement from "../ItemManagement/ItemManagement";
import UsersManagement from "../../components/UserManagement/UserMAnagement";
import AdminLogs from "../../components/Admin/AdminLogs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync theme with document body
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const stats = [
    { title: "Total Users", value: "1,284", icon: <FaUsers />, color: "from-blue-500 to-indigo-600", trend: "+12%" },
    { title: "Active Items", value: "452", icon: <FaBoxes />, color: "from-emerald-500 to-teal-600", trend: "+3%" },
    { title: "Pending Orders", value: "12", icon: <FaClipboardList />, color: "from-orange-400 to-red-500", trend: "-2%" },
    { title: "Monthly Revenue", value: "$14k", icon: <FaChartBar />, color: "from-purple-500 to-pink-600", trend: "+18%" },
  ];

  return (
    <div className="flex h-screen bg-[#FDFDFF] dark:bg-[#020617] transition-colors duration-500 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-80 bg-white dark:bg-[#0F172A] border-r border-gray-100 dark:border-slate-800/50 flex flex-col shadow-xl z-20">
        <div className="p-10">
          <div className="flex items-center gap-3 text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
                <FaShieldAlt size={22} />
            </div>
            AREA52
          </div>
          <div className="flex items-center gap-2 mt-4 px-1">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <p className="text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest">Core Secured</p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <SidebarItem icon={<FaChartBar />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarItem icon={<FaBoxes />} label="Inventory" active={activeTab === "item"} onClick={() => setActiveTab("item")} />
          <SidebarItem icon={<FaUser />} label="User Access" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
          <SidebarItem icon={<FaHistory />} label="Audit Logs" active={activeTab === "logs"} onClick={() => setActiveTab("logs")} />
        </nav>

        <div className="p-8">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all hover:border-emerald-500"
          >
            <span className="text-xs font-bold dark:text-gray-300">Theme</span>
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-400" />}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-24 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-12 z-10">
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Navigation / {activeTab}</p>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white capitalize tracking-tight">
                    {activeTab === "item" ? "Inventory Management" : activeTab}
                </h2>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="relative p-3 bg-gray-50 dark:bg-slate-800 rounded-full text-gray-400 cursor-pointer hover:text-emerald-500 transition-all">
                    <FaBell size={18} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                </div>
                <div className="h-10 w-[1px] bg-gray-100 dark:bg-slate-800"></div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-black text-slate-800 dark:text-white">Admin Root</p>
                        <p className="text-[10px] font-bold text-emerald-500">Super Access</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black shadow-lg">A</div>
                </div>
            </div>
        </header>

        {/* Dynamic Viewport */}
        <section className="p-12 overflow-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((s, i) => (
                    <div key={i} className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:border-emerald-500 transition-all duration-500">
                        <div className={`w-14 h-14 bg-gradient-to-br ${s.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100 dark:shadow-none transform group-hover:scale-110 transition-transform`}>
                            {s.icon}
                        </div>
                        <p className="text-gray-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{s.title}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-black dark:text-white tracking-tighter">{s.value}</h3>
                            <div className={`px-2 py-1 rounded-lg text-[10px] font-black ${s.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {s.trend}
                            </div>
                        </div>
                    </div>
                  ))}
                </div>

                {/* Banner */}
                <div className="relative bg-slate-900 dark:bg-emerald-900/20 rounded-[3rem] p-12 text-white shadow-2xl overflow-hidden border border-white/5">
                    <div className="relative z-10">
                        <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">System Status: Optimal</span>
                        <h1 className="text-4xl font-black mt-6 mb-4 tracking-tighter">Terminal Operational.</h1>
                        <p className="text-slate-400 dark:text-emerald-200/60 max-w-lg font-medium leading-relaxed">
                          Your system is synced with 4 worldwide nodes. No security breaches detected in the last 24 hours.
                        </p>
                        <button 
                          onClick={() => setActiveTab("logs")}
                          className="mt-8 px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-400 hover:text-white transition-all active:scale-95"
                        >
                          Review Activity Logs
                        </button>
                    </div>
                    <FaShieldAlt size={300} className="absolute -right-20 -bottom-20 text-white/5 pointer-events-none" />
                </div>
              </motion.div>
            )}

            {activeTab === "item" && (
              <motion.div key="item" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-slate-800">
                <ItemManagement />
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-slate-800">
                <UsersManagement />
              </motion.div>
            )}

            {activeTab === "logs" && (
              <motion.div key="logs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <AdminLogs />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-500 group ${
      active 
        ? "bg-emerald-600 text-white shadow-2xl shadow-emerald-200 dark:shadow-none" 
        : "text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-emerald-400"
    }`}
  >
    <span className={`${active ? "text-white" : "text-slate-300 dark:text-slate-600 group-hover:text-emerald-500"} transition-colors`}>{icon}</span>
    {label}
  </button>
);

export default AdminDashboard;