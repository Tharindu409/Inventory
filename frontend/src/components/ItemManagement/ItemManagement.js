import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaExclamationCircle, FaBell, FaPercent } from "react-icons/fa"; 
import AddItem from "../AddItem/AddItem";
import UpdateItem from "./UpdateItem";
import Modal from "../../components/ItemManagement/Model";
import { toast, Toaster } from "react-hot-toast";

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const lowStockCount = items.filter(item => Number(item.itemQty) <= item.minStockLimit).length;

  const displayedItems = showLowStockOnly 
    ? items.filter(item => Number(item.itemQty) <= item.minStockLimit)
    : items;

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      const inventoryData = res.data;
      setItems(inventoryData);
      
      inventoryData.forEach(item => {
        if (Number(item.itemQty) <= item.minStockLimit) {
          toast.error(`Low Stock: ${item.itemName}`, { id: item.id });
        }
      });
    } catch (error) {
      console.error("Failed to load items", error);
    }
  };

  // UPDATED FEATURE: Mass Price Updater (Connecting to your new Backend)
  const massUpdatePrices = async () => {
    const percentage = window.prompt("Enter percentage to change all prices (e.g. 10 for +10%, -5 for -5%):");
    
    if (percentage !== null && !isNaN(percentage)) {
      const confirmed = window.confirm(`Update ALL database prices by ${percentage}%?`);
      if (confirmed) {
        try {
          // 1. Call your new Spring Boot endpoint
         await axios.put(`http://localhost:8080/inventory/action/mass-update-price?percentage=${percentage}`);          
          // 2. Log the action (Optional, if you have a logging endpoint)
          await axios.post("http://localhost:8080/log", {
            action: "MASS_PRICE_UPDATE",
            performedBy: "Admin",
            details: `Adjusted all prices by ${percentage}% via backend`
          });

          // 3. Refresh the data from the database to see the new prices
          loadItems();
          toast.success(`Prices updated permanently by ${percentage}%`);
        } catch (error) {
          console.error("Mass update error:", error);
          toast.error("Backend update failed. Check console.");
        }
      }
    }
  };

  const deleteItem = async (id) => {
    const itemToDelete = items.find(item => item.id === id);
    if (window.confirm(`Delete "${itemToDelete?.itemName}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/inventory/${id}`);
        loadItems();
        toast.success("Item deleted");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const editItem = (id) => {
    setSelectedItemId(id);
    setEditModalOpen(true);
  };

  return (
    <div className="overflow-x-auto p-4">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Item Management</h2>
          
          <button 
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            className={`relative p-3 rounded-full transition-all duration-300 border ${
              showLowStockOnly ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
            }`}
          >
            <FaBell size={18} className={lowStockCount > 0 && !showLowStockOnly ? "animate-pulse text-red-500" : ""} />
            {lowStockCount > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 border-2 rounded-full text-[10px] flex items-center justify-center font-bold ${
                showLowStockOnly ? "bg-white text-blue-600 border-blue-600" : "bg-red-500 text-white border-white"
              }`}>
                {lowStockCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={massUpdatePrices}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-semibold text-sm border border-gray-300"
          >
            <FaPercent /> Mass Price Update
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition shadow-md font-semibold"
          >
            <FaPlus /> Add New Item
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-5 py-3 text-center">Image</th>
              <th className="px-5 py-3 text-left">Item Details</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-left">Inventory & Analytics</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {displayedItems.map((item) => {
              const isLow = Number(item.itemQty) <= item.minStockLimit;
              
              // 1. REAL PREDICTIVE ANALYTICS
              const dailySalesAvg = 2; // In the future, this can be a real value from your DB
              const daysRemaining = Math.floor(item.itemQty / dailySalesAvg);

              // 2. REAL AGING REPORT (Using your new createdAt field from backend)
              const createdDate = item.createdAt ? new Date(item.createdAt) : new Date();
              const ageInDays = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
              const isAging = ageInDays > 60;

              return (
                <tr key={item.id} className={`hover:bg-gray-50 transition ${isAging ? 'bg-orange-50/40' : ''}`}>
                  <td className="px-5 py-4 text-center">
                    <img
                      src={`http://localhost:8080/uploads/${item.itemImage}`}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover border mx-auto shadow-sm"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/64")}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-gray-900">{item.itemName}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">{item.itemCategory}</div>
                    {isAging && (
                      <span className="text-[9px] bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-bold">
                        AGING: {ageInDays} Days
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-green-700">
                    ${item.itemPrice?.toFixed(2)}
                  </td>
                  <td className="px-5 py-4">
                    <div className={`text-sm font-bold flex items-center gap-1 ${isLow ? "text-red-600" : "text-gray-700"}`}>
                      {item.itemQty} Units
                      {isLow && <FaExclamationCircle />}
                    </div>
                    <div className={`text-[10px] font-bold ${daysRemaining < 7 ? 'text-red-500' : 'text-gray-500'}`}>
                       ~ {daysRemaining} days left
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center space-x-2">
                    <button onClick={() => editItem(item.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-[10px] px-3 py-1.5 rounded uppercase font-bold transition">Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded uppercase font-bold transition">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {isAddModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)}>
          <AddItem onItemAdded={() => { loadItems(); setAddModalOpen(false); }} />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <UpdateItem itemId={selectedItemId} onUpdated={() => { loadItems(); setEditModalOpen(false); }} />
        </Modal>
      )}
    </div>
  );
};

export default ItemManagement;