import React, { useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [inventory, setInventory] = useState({
    itemId: '',
    itemImage: null,
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: ''
  });

  const onInputChange = (e) => {
    if (e.target.name === 'itemImage') {
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

    // Upload image
    const formData = new FormData();
    formData.append("file", inventory.itemImage);

    let imageName = "";
    try {
      const response = await axios.post(
        "http://localhost:8080/inventory/itemImg",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      imageName = response.data;
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
      return;
    }

    // Save inventory data
    const updatedInventory = { ...inventory, itemImage: imageName };
    try {
      await axios.post("http://localhost:8080/inventory", updatedInventory);
      alert("Item added successfully");
      setInventory({
        itemId: '',
        itemImage: null,
        itemName: '',
        itemCategory: '',
        itemQty: '',
        itemDetails: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-3">
      <input name="itemId" value={inventory.itemId} onChange={onInputChange} placeholder="Item ID" className="w-full border p-2 rounded" /><br/>
      <input type="file" name="itemImage" onChange={onInputChange} accept="image/*" className="w-full" /><br/>
      <input name="itemName" value={inventory.itemName} onChange={onInputChange} placeholder="Item Name" className="w-full border p-2 rounded" /><br/>
      <input name="itemCategory" value={inventory.itemCategory} onChange={onInputChange} placeholder="Category" className="w-full border p-2 rounded" /><br/>
      <input type="number" name="itemQty" value={inventory.itemQty} onChange={onInputChange} placeholder="Quantity" className="w-full border p-2 rounded" /><br/>
      <textarea name="itemDetails" value={inventory.itemDetails} onChange={onInputChange} placeholder="Details" className="w-full border p-2 rounded" /><br/>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Item</button><br/>
    </form>
  );
};

export default AddItem;
