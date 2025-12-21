import   { useState } from "react";
import { FaPlus, FaUser, FaTimes } from "react-icons/fa";
import ItemManagement from "../ItemManagement/ItemManagement";
import UpdateItem from "../ItemManagement/UpdateItem";


import UsersManagement from "../../components/UseManagement/USerManagement"; // Import UsersManagement component
 
const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);  

  const renderModalContent = () => {
    switch (activeModal) {
       
      case "item":
        return <ItemManagement />;
      case "users":
        return <UsersManagement />;
      case "updateitem/:id":
        return <UpdateItem/>
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">Admin Dashboard</div>
        <nav className="flex-1">
          <ul className="space-y-4">
             
            <li>
              <button
                onClick={() => setActiveModal("item")}
                className="flex items-center px-6 py-3 hover:bg-blue-500 rounded w-full text-left"
              >
                <FaPlus className="mr-3" /> Item Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("users")}
                className="flex items-center px-6 py-3 hover:bg-blue-500 rounded w-full text-left"
              >
                <FaUser className="mr-3" /> Users Management
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-6 text-sm">© 2025 MyInventory</div>
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
          <div className="text-gray-700 text-xl">
            Select an option from the sidebar to manage.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
