import { useState } from "react";
import { 
  FaUser, 
  FaUsers, 
  FaBoxes, 
  FaClipboardList, 
  FaChartBar, 
  FaShieldAlt, 
  FaHistory 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ItemManagement from "../ItemManagement/ItemManagement";
import UsersManagement from "../../components/UserManagement/UserMAnagement";
import AdminLogs from "../../components/Admin/AdminLogs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Stats Data
  const stats = [
    { title: "Total Users", value: "1,284", icon: <FaUsers />, color: "bg-blue-500", trend: "+12%" },
    { title: "Active Items", value: "452", icon: <FaBoxes />, color: "bg-green-500", trend: "+3%" },
    { title: "Pending Orders", value: "12", icon: <FaClipboardList />, color: "bg-orange-500", trend: "-2%" },
    { title: "Monthly Revenue", value: "$14k", icon: <FaChartBar />, color: "bg-purple-500", trend: "+18%" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col shadow-sm">
        <div className="p-8">
          <div className="flex items-center gap-3 text-2xl font-black text-green-600 tracking-tighter">
            <div className="p-2 bg-green-600 text-white rounded-lg">
                <FaShieldAlt size={20} />
            </div>
            AREA52
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 px-1">Control Center</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem 
            icon={<FaChartBar />} 
            label="Overview" 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <SidebarItem 
            icon={<FaBoxes />} 
            label="Item Management" 
            active={activeTab === "item"} 
            onClick={() => setActiveTab("item")} 
          />
          <SidebarItem 
            icon={<FaUser />} 
            label="User Access" 
            active={activeTab === "users"} 
            onClick={() => setActiveTab("users")} 
          />
          {/* NEW LOGS TAB */}
          <SidebarItem 
            icon={<FaHistory />} 
            label="System Logs" 
            active={activeTab === "logs"} 
            onClick={() => setActiveTab("logs")} 
          />
        </nav>

        <div className="p-6 mt-auto border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">A</div>
             <div>
                <p className="text-xs font-bold dark:text-white">Admin User</p>
                <p className="text-[10px] text-gray-500">System Administrator</p>
             </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
                {activeTab.replace('-', ' ')}
            </h2>
            <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">System Live</span>
            </div>
        </header>

        {/* Dynamic Viewport */}
        <section className="p-10 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className={`w-12 h-12 ${s.color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                            {s.icon}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{s.title}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold dark:text-white">{s.value}</h3>
                            <span className={`text-xs font-bold ${s.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {s.trend}
                            </span>
                        </div>
                    </div>
                  ))}
                </div>

                {/* Welcome Graphic */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-10 text-white shadow-xl flex items-center justify-between overflow-hidden relative">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Welcome back, Administrator.</h1>
                        <p className="text-green-100 max-w-md">Everything is running smoothly. There are new system activities to review.</p>
                        <button 
                          onClick={() => setActiveTab("logs")} // Now functional
                          className="mt-6 px-6 py-2 bg-white text-green-700 rounded-full font-bold text-sm shadow-lg hover:bg-green-50 transition"
                        >
                          View Activity Logs
                        </button>
                    </div>
                    <FaHistory size={180} className="absolute -right-10 -bottom-10 text-white/10" />
                </div>
              </motion.div>
            )}

            {activeTab === "item" && (
              <motion.div key="item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl">
                <ItemManagement />
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl">
                <UsersManagement />
              </motion.div>
            )}

            {/* NEW LOGS VIEW */}
            {activeTab === "logs" && (
              <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
      active 
        ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-none" 
        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-400"
    }`}
  >
    <span className={active ? "text-white" : "text-gray-400"}>{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

export default AdminDashboard;