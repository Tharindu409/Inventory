 import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
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
//delete function
  const deleteItem = async (id) => {
   //display confirmation message
   const confirmDelete = window.confirm("Are you sure you want to delete this item?"

   );
   if(confirmDelete){
    try{
      await axios.delete(`http://localhost:8080/inventory/${id}`);
      //reload items after deletion
      loadItems();  

    }catch(error){
      console.error("Failed to delete item", error);
    }
   }
  };

  const editItem = (id) => {
    setSelectedItemId(id);
    setEditModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Item Management</h2>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add Item
        </button>
      </div>

      {/* TABLE */}
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-white-100 text-black">
          <tr>
            <th className="px-4 py-2">DB ID</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">
                <img
                  src={`http://localhost:8080/uploads/${item.itemImage}`}
                  alt=""
                  className="w-14 h-14 rounded object-cover"
                />
              </td>
              <td className="px-4 py-2">{item.itemName}</td>
              <td className="px-4 py-2">{item.itemCategory}</td>
              <td className="px-4 py-2">{item.itemQty}</td>
              <td className="px-4 py-2">{item.itemDetails}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => editItem(item.id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL */}
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

      {/* EDIT MODAL */}
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
