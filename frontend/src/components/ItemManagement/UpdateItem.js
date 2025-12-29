import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateItem = ({ itemId, onUpdated }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemPrice: "",
    minStockLimit: "",
    location: "",
    itemImage: null,
  });

  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/inventory/${itemId}`);
        const data = res.data;
        setFormData({
          itemName: data.itemName || "",
          itemCategory: data.itemCategory || "",
          itemQty: data.itemQty || 0,
          itemDetails: data.itemDetails || "",
          itemPrice: data.itemPrice || 0,
          minStockLimit: data.minStockLimit || 0,
          location: data.location || "",
          itemImage: null,
        });
      } catch (err) {
        console.error("Error loading item for update", err);
      }
    };
    loadItem();
  }, [itemId]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    // Check if the input is a file, otherwise update text/number values
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

     const itemObject = {
      id: itemId, // Include ID to be safe
      itemName: formData.itemName,
      itemCategory: formData.itemCategory,
      itemQty: parseInt(formData.itemQty) || 0,
      itemDetails: formData.itemDetails,
      itemPrice: parseFloat(formData.itemPrice) || 0.0,
      minStockLimit: parseInt(formData.minStockLimit) || 0,
      location: formData.location,
      itemImage: formData.itemImage ? formData.itemImage.name : null,
    };

     data.append("itemDetails", JSON.stringify(itemObject));

     if (formData.itemImage) {
      data.append("file", formData.itemImage);
    }

    try {
       await axios.put(`http://localhost:8080/inventory/${itemId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

       await axios.post("http://localhost:8080/log", {
        action: "UPDATE_ITEM",
        performedBy: "Admin",
        details: `Updated item: ${formData.itemName}`,
      });

      alert("Item updated successfully");
      onUpdated();
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed. Make sure the backend 'InventModel' has all these fields.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-center mb-4">Update Item</h2>

      <div className="grid grid-cols-1 gap-3">
        <input name="itemName" value={formData.itemName} onChange={onInputChange} className="w-full border p-2 rounded" placeholder="Item Name" required />
        
        <input name="itemCategory" value={formData.itemCategory} onChange={onInputChange} className="w-full border p-2 rounded" placeholder="Category" />

        <div className="grid grid-cols-2 gap-2">
          <input type="number" step="0.01" name="itemPrice" value={formData.itemPrice} onChange={onInputChange} className="border p-2 rounded" placeholder="Price" />
          <input type="number" name="itemQty" value={formData.itemQty} onChange={onInputChange} className="border p-2 rounded" placeholder="Quantity" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input type="number" name="minStockLimit" value={formData.minStockLimit} onChange={onInputChange} className="border p-2 rounded" placeholder="Min Stock Limit" />
          <input name="location" value={formData.location} onChange={onInputChange} className="border p-2 rounded" placeholder="Location" />
        </div>

        <textarea name="itemDetails" value={formData.itemDetails} onChange={onInputChange} className="w-full border p-2 rounded" placeholder="Item Description" rows={3} />

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">Change Image (Optional)</label>
          <input type="file" name="itemImage" onChange={onInputChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100" />
        </div>
        {/* Image Preview Section */}
<div className="flex flex-col items-center gap-2 mb-4">
  <label className="text-xs font-bold text-gray-500 uppercase">Image Preview</label>
  <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
    {formData.itemImage ? (
      // Show the NEWly selected image preview
      <img 
        src={URL.createObjectURL(formData.itemImage)} 
        alt="New Preview" 
        className="w-full h-full object-cover"
      />
    ) : formData.currentImage ? (
      // Show the EXISTING image from the backend
      <img 
        src={`http://localhost:8080/uploads/${formData.currentImage}`} 
        alt="Current" 
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-gray-400 text-xs text-center p-2">No Image Available</span>
    )}
  </div>
</div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-4">
        Save Changes
      </button>
    </form>
  );
};

export default UpdateItem;