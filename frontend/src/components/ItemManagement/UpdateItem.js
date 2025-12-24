import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateItem = ({ itemId, onUpdated }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemImage: null
  });

  useEffect(() => {
    const loadItem = async () => {
      const res = await axios.get(`http://localhost:8080/inventory/${itemId}`);
      setFormData({
        itemName: res.data.itemName,
        itemCategory: res.data.itemCategory,
        itemQty: res.data.itemQty,
        itemDetails: res.data.itemDetails,
        itemImage: null
      });
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
    data.append(
      "itemDetails",
      JSON.stringify({
        itemName: formData.itemName,
        itemCategory: formData.itemCategory,
        itemQty: formData.itemQty,
        itemDetails: formData.itemDetails
      })
    );

    if (formData.itemImage) {
      data.append("file", formData.itemImage);
    }

    await axios.put(
      `http://localhost:8080/inventory/${itemId}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Item updated successfully");
    onUpdated();
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

      <input
        type="number"
        name="itemQty"
        value={formData.itemQty}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Quantity"
      />

      <textarea
        name="itemDetails"
        value={formData.itemDetails}
        onChange={onInputChange}
        className="w-full border p-2 rounded"
        placeholder="Details"
      />

      <input type="file" name="itemImage" onChange={onInputChange} />

      <button className="w-full bg-black text-white py-2 rounded">
        Update Item
      </button>
    </form>
  );
};

export default UpdateItem;
