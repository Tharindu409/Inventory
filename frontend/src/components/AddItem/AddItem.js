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
    itemPrice: "",       // New Field
    minStockLimit: "",   // New Field
    location: ""         // New Field
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

    // 1️⃣ Upload image
    const formData = new FormData();
    formData.append("file", inventory.itemImage);

    let imageName = "";
    try {
      const response = await axios.post(
        "http://localhost:8080/inventory/itemImg",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      imageName = response.data;
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
      return;
    }

    // 2️⃣ Save item (Mapping to your updated InventModel)
    const updatedInventory = {
      itemName: inventory.itemName,
      itemCategory: inventory.itemCategory,
      itemQty: inventory.itemQty,
      itemDetails: inventory.itemDetails,
      itemImage: imageName,
      itemPrice: parseFloat(inventory.itemPrice),      // New Field
      minStockLimit: parseInt(inventory.minStockLimit), // New Field
      location: inventory.location                      // New Field
    };

    try {
      await axios.post("http://localhost:8080/inventory", updatedInventory);
      alert("Item added successfully");

      setInventory({
        itemImage: null,
        itemName: "",
        itemCategory: "",
        itemQty: "",
        itemDetails: "",
        itemPrice: "",
        minStockLimit: "",
        location: ""
      });

      navigate("/home");
      
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-6 p-5 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Add Item
      </h2>

      {/* Item Image */}
      <div className="flex items-center border rounded-md p-2 cursor-pointer">
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

      {/* NEW: Price */}
      <div className="flex items-center border rounded-md p-2">
        <FaDollarSign className="text-gray-400 mr-2" />
        <input
          type="number"
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

      {/* NEW: Min Stock Limit */}
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

      {/* NEW: Location */}
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
        className="w-full border rounded-md p-2 text-sm resize-none"
        rows={3}
      />

      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-700 text-white font-medium py-2 rounded-md transition"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItem;