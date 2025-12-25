import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateItem = ({ itemId, onUpdated }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemPrice: "",       // New Field
    minStockLimit: "",   // New Field
    location: "",         // New Field
    itemImage: null
  });

  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/inventory/${itemId}`);
        setFormData({
          itemName: res.data.itemName,
          itemCategory: res.data.itemCategory,
          itemQty: res.data.itemQty,
          itemDetails: res.data.itemDetails,
          itemPrice: res.data.itemPrice || "",      // Load New Field
          minStockLimit: res.data.minStockLimit || "", // Load New Field
          location: res.data.location || "",         // Load New Field
          itemImage: null
        });
      } catch (err) {
        console.error("Error loading item for update", err);
      }
    };
    loadItem();
  }, [itemId]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Prepare the JSON object to match your Spring Boot InventModel
    data.append(
      "itemDetails",
      JSON.stringify({
        itemName: formData.itemName,
        itemCategory: formData.itemCategory,
        itemQty: formData.itemQty,
        itemDetails: formData.itemDetails,
        itemPrice: parseFloat(formData.itemPrice),      // New Field
        minStockLimit: parseInt(formData.minStockLimit), // New Field
        location: formData.location                      // New Field
      })
    );

    if (formData.itemImage) {
      data.append("file", formData.itemImage);
    }

    try {
      await axios.put(
        `http://localhost:8080/inventory/${itemId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Item updated successfully");
      onUpdated();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update item");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h2 className="text-xl font-bold text-center">Update Item</h2>

      <input
        name="itemName"
        value={formData.itemName}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Item Name"
      />

      <input
        name="itemCategory"
        value={formData.itemCategory}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Category"
      />

      {/* NEW: Price */}
      <input
        type="number"
        step="0.01"
        name="itemPrice"
        value={formData.itemPrice}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Price"
      />

      <input
        type="number"
        name="itemQty"
        value={formData.itemQty}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Quantity"
      />

      {/* NEW: Min Stock Limit */}
      <input
        type="number"
        name="minStockLimit"
        value={formData.minStockLimit}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Low Stock Alert Limit"
      />

      {/* NEW: Location */}
      <input
        name="location"
        value={formData.location}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Storage Location"
      />

      <textarea
        name="itemDetails"
        value={formData.itemDetails}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Details"
        rows={3}
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Update Image (Optional)</label>
        <input type="file" name="itemImage" onChange={onInputChange} className="text-sm" />
      </div>

      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
        Update Item
      </button>
    </form>
  );
};

export default UpdateItem;