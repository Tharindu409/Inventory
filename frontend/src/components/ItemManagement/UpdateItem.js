 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemImage: null
  });

  // LOAD ITEM DATA
  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/inventory/${id}`);
        setFormData({
          itemId: res.data.itemId,
          itemName: res.data.itemName,
          itemCategory: res.data.itemCategory,
          itemQty: res.data.itemQty,
          itemDetails: res.data.itemDetails,
          itemImage: null
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load item");
      }
    };
    loadItem();
  }, [id]);

  // INPUT CHANGE
  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // SUBMIT UPDATE
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append(
      "itemDetails",
      JSON.stringify({
        itemId: formData.itemId,
        itemName: formData.itemName,
        itemCategory: formData.itemCategory,
        itemQty: formData.itemQty,
        itemDetails: formData.itemDetails
      })
    );

    if (formData.itemImage) {
      data.append("file", formData.itemImage);
    }

    try {
      await axios.put(
        `http://localhost:8080/inventory/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Item updated successfully");
      navigate("/AdminDashBoard");

    } catch (err) {
      console.error(err);
      alert("Failed to update item");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-6 p-5 bg-white rounded-xl shadow space-y-3"
    >
      <h2 className="text-xl font-bold text-center">Update Item</h2>

      <input
        name="itemId"
        value={formData.itemId}
        onChange={onInputChange}
        placeholder="Item ID"
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        name="itemImage"
        onChange={onInputChange}
        className="w-full"
      />

      <input
        name="itemName"
        value={formData.itemName}
        onChange={onInputChange}
        placeholder="Item Name"
        className="w-full border p-2 rounded"
      />

      <input
        name="itemCategory"
        value={formData.itemCategory}
        onChange={onInputChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="itemQty"
        value={formData.itemQty}
        onChange={onInputChange}
        placeholder="Quantity"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="itemDetails"
        value={formData.itemDetails}
        onChange={onInputChange}
        placeholder="Details"
        className="w-full border p-2 rounded"
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Update Item
      </button>
    </form>
  );
};

export default UpdateItem;
