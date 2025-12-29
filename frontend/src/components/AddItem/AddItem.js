import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaImage, FaTag, FaBox, FaList, FaDollarSign, FaExclamationTriangle, FaMapMarkerAlt } from "react-icons/fa";

const AddItem = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
    itemImage: null,
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemPrice: "",        
    minStockLimit: "",   
    location: ""         
  });

  const onInputChange = (e) => {
    if (e.target.name === "itemImage") {
      setInventory({ ...inventory, itemImage: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };




 const onSubmit = async (e) => {
  e.preventDefault();

  if (!inventory.itemImage) {
    alert("Please select an image");
    return;
  }

   const imageFormData = new FormData();
   imageFormData.append("file", inventory.itemImage);

  let imageName = "";
  try {
    const response = await axios.post(
      "http://localhost:8080/inventory/itemImg",
      imageFormData,
      { 
        headers: { 
          "Content-Type": "multipart/form-data" 
        } 
      }
    );
    
    imageName = response.data;

  } catch (err) {
     console.error("Upload Error Details:", err.response);
    alert(`Error uploading image: ${err.response?.status || "Server Offline"}`);
    return;
  }

   const updatedInventory = {
    ...inventory,  
    itemImage: imageName,
    itemPrice: parseFloat(inventory.itemPrice) || 0,
    minStockLimit: parseInt(inventory.minStockLimit) || 0,
    itemQty: inventory.itemQty.toString()
  };

  try {
    await axios.post("http://localhost:8080/inventory", updatedInventory);
    
     await axios.post("http://localhost:8080/log", {
      action: "ADD_ITEM",
      performedBy: "Admin",
      details: `Added ${updatedInventory.itemName}`
    });

    alert("Item added successfully");
    navigate("/home");
  } catch (err) {
    console.error("Final Save Error:", err);
    alert("Image uploaded, but item details failed to save.");
  }
};

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-6 p-5 bg-white rounded-xl shadow-md space-y-4 border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center uppercase tracking-tight">
        Add New Item
      </h2>

      {/* Item Image */}
      <div className="flex items-center border rounded-md p-2 bg-gray-50">
        <FaImage className="text-gray-400 mr-2" />
        <input
          type="file"
          name="itemImage"
          onChange={onInputChange}
          accept="image/*"
          className="w-full outline-none text-sm cursor-pointer"
        />
      </div>

      {/* Item Name */}
      <div className="flex items-center border rounded-md p-2">
        <FaBox className="text-gray-400 mr-2" />
        <input
          name="itemName"
          value={inventory.itemName}
          onChange={onInputChange}
          placeholder="Item Name"
          className="w-full outline-none text-sm"
          required
        />
      </div>

      {/* Category */}
      <div className="flex items-center border rounded-md p-2">
        <FaTag className="text-gray-400 mr-2" />
        <input
          name="itemCategory"
          value={inventory.itemCategory}
          onChange={onInputChange}
          placeholder="Category"
          className="w-full outline-none text-sm"
          required
        />
      </div>

      {/* Price */}
      <div className="flex items-center border rounded-md p-2">
        <FaDollarSign className="text-gray-400 mr-2" />
        <input
          type="number"
          step="0.01"
          name="itemPrice"
          value={inventory.itemPrice}
          onChange={onInputChange}
          placeholder="Price"
          className="w-full outline-none text-sm"
          required
        />
      </div>

      {/* Quantity */}
      <div className="flex items-center border rounded-md p-2">
        <FaList className="text-gray-400 mr-2" />
        <input
          type="number"
          name="itemQty"
          value={inventory.itemQty}
          onChange={onInputChange}
          placeholder="Quantity"
          className="w-full outline-none text-sm"
          required
        />
      </div>

      {/* Min Stock Limit */}
      <div className="flex items-center border rounded-md p-2">
        <FaExclamationTriangle className="text-gray-400 mr-2" />
        <input
          type="number"
          name="minStockLimit"
          value={inventory.minStockLimit}
          onChange={onInputChange}
          placeholder="Low Stock Alert Limit"
          className="w-full outline-none text-sm"
          required
        />
      </div>

      {/* Location */}
      <div className="flex items-center border rounded-md p-2">
        <FaMapMarkerAlt className="text-gray-400 mr-2" />
        <input
          name="location"
          value={inventory.location}
          onChange={onInputChange}
          placeholder="Storage Location"
          className="w-full outline-none text-sm"
          required
        />
      </div>

      {/* Details */}
      <textarea
        name="itemDetails"
        value={inventory.itemDetails}
        onChange={onInputChange}
        placeholder="Details"
        className="w-full border rounded-md p-2 text-sm resize-none h-20 outline-none"
      />

      <button
        type="submit"
        className="w-full bg-black hover:bg-green-700 text-white font-bold py-3 rounded-md transition shadow-lg active:scale-95"
      >
        CONFIRM ADDITION
      </button>
    </form>
  );
};

export default AddItem;