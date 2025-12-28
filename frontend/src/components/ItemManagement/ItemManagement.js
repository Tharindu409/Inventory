 import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaExclamationCircle } from "react-icons/fa"; // Added Alert Icon
import AddItem from "../AddItem/AddItem";
import UpdateItem from "./UpdateItem";
import Modal from "../../components/ItemManagement/Model";

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to load items", error);
    }
  };

  const deleteItem = async (id, itemName) => { // Added itemName as parameter
    const confirmDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);
    if (confirmDelete) {
      try {
        // 1. Delete the item
        await axios.delete(`http://localhost:8080/inventory/${id}`);
        
        // 2. LOG THE ACTION (New Code)
        await axios.post("http://localhost:8080/log", {
          action: "DELETE_ITEM",
          performedBy: "Admin", // You can change this to a dynamic name later
          details: `Removed item: ${itemName} (ID: ${id}) from inventory.`
        });

        loadItems();
      } catch (error) {
        console.error("Failed to delete item", error);
      }
    }
  };

  const editItem = (id) => {
    setSelectedItemId(id);
    setEditModalOpen(true);
  };

  return (
    <div className="overflow-x-auto p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Item Management</h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <FaPlus /> Add New Item
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-5 py-3 text-center">Image</th>
              <th className="px-5 py-3">Item Details</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Qty</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 text-center">
                  <img
                    src={`http://localhost:8080/uploads/${item.itemImage}`}
                    alt={item.itemName}
                    className="w-16 h-16 rounded-md object-cover border mx-auto"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/64")}
                  />
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm font-bold text-gray-900">{item.itemName}</div>
                  <div className="text-xs text-gray-500">{item.itemCategory}</div>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-green-700">
                  ${item.itemPrice?.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  {/* Stock Logic: If Qty <= Limit, show Red alert */}
                  <div className={`text-sm font-medium flex items-center gap-1 ${
                    Number(item.itemQty) <= item.minStockLimit ? "text-red-600 font-bold" : "text-gray-700"
                  }`}>
                    {item.itemQty}
                    {Number(item.itemQty) <= item.minStockLimit && <FaExclamationCircle title="Low Stock!" />}
                  </div>
                  <div className="text-[10px] text-gray-400">Limit: {item.minStockLimit}</div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {item.location || "N/A"}
                </td>
                <td className="px-5 py-4 text-center space-x-2">
                  <button
                    onClick={() => editItem(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-md transition shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition shadow-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS remain the same */}
      {isAddModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)}>
          <AddItem
            onItemAdded={() => {
              loadItems();
              setAddModalOpen(false);
            }}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <UpdateItem
            itemId={selectedItemId}
            onUpdated={() => {
              loadItems();
              setEditModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default ItemManagement;