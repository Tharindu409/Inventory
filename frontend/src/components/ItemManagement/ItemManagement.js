import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddItem from '../AddItem/AddItem'; // make sure this path is correct

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // modal state

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

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:8080/inventory/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const editItem = (id) => {
     window.location.href=`/updateitem/${id}`;
     
  };

  return (
    <div className="overflow">
      {/* Header with Add Item button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Item Management</h2>

        <button
          onClick={() => setAddModalOpen(true)} // open modal instead of navigate
          className="flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
        >
          <FaPlus /> Add Item
        </button>
      </div>

      {/* Items Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Quantity</th>
            <th className="py-2 px-4 text-left">Details</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No items found.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{item.itemId}</td>
                <td className="py-2 px-4">
                  <img
                    src={`http://localhost:8080/uploads/${item.itemImage}`}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                </td>
                <td className="py-2 px-4">{item.itemName}</td>
                <td className="py-2 px-4">{item.itemCategory}</td>
                <td className="py-2 px-4">{item.itemQty}</td>
                <td className="py-2 px-4">{item.itemDetails}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => editItem(item.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <AddItem
              onItemAdded={() => {
                loadItems(); // refresh table
                setAddModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemManagement;
