import   { useState } from "react";
import { FaPlus, FaUser, FaTimes } from "react-icons/fa";
import ItemManagement from "../ItemManagement/ItemManagement";
import { motion } from "framer-motion";
import { FaUsers, FaBoxes, FaClipboardList, FaChartBar } from "react-icons/fa";

 

import UsersManagement from "../../components/UseManagement/USerManagement";  
const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);  

  const renderModalContent = () => {
    switch (activeModal) {
       
      case "item":
        return <ItemManagement />;
      case "users":
        return <UsersManagement />;
       
        
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">

  {/* Header */}
  <div className="p-6 text-xl font-bold text-green-600 border-b">
    Admin Dashboard
  </div>

  {/* Navigation */}
  <nav className="flex-1 p-4">
    <ul className="space-y-2">

      {/* Item Management */}
      <li>
        <button
          onClick={() => setActiveModal("item")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left
            transition-all duration-200
            ${
              activeModal === "item"
                ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
            }
          `}
        >
          <FaPlus className="text-lg" />
          <span className="font-medium">Item Management</span>
        </button>
      </li>

      {/* Users Management */}
      <li>
        <button
          onClick={() => setActiveModal("users")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left
            transition-all duration-200
            ${
              activeModal === "users"
                ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
            }
          `}
        >
          <FaUser className="text-lg" />
          <span className="font-medium">Users Management</span>
        </button>
      </li>

    </ul>
  </nav>

  {/* Footer */}
  <div className="p-4 text-xs text-gray-400 border-t">
    © 2025 MyInventory
  </div>

</div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto relative">
        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
              {renderModalContent()}
            </div>
          </div>
        )}

   {!activeModal && (
  <div className="h-full flex flex-col items-center justify-center px-6">

    {/* Role-based title */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-2xl font-semibold text-gray-800 mb-2"
    >
      Admin Dashboard
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="text-gray-500 mb-10 text-center max-w-md"
    >
      Choose a module from the sidebar to manage inventory, users, orders, and reports.
    </motion.p>

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">

      {[
        { title: "Users", icon: <FaUsers />, color: "green" },
        { title: "Items",  icon: <FaBoxes />, color: "emerald" },
        { title: "Orders", icon: <FaClipboardList />, color: "lime" },
        { title: "Reports", icon: <FaChartBar />, color: "teal" },
      ].map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + index * 0.15 }}
          className="bg-white border border-green-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          {/* Floating Icon */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center text-green-600 text-xl"
          >
            {card.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-gray-800 font-semibold mb-2">
            {card.title}
          </h3>

          {/* Shimmer / Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Footer hint */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-sm text-gray-400 mt-10"
    >
      Dashboard modules will appear here once selected
    </motion.p>

  </div>
)}

 


      </div>
    </div>
  );
};

export default AdminDashboard;
