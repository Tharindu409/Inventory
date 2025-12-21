import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaImage, FaTag, FaBox, FaList, FaHashtag } from "react-icons/fa";

const AddItem = () => {

  const navigate = useNavigate();
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

  {/* Item ID */}
  <div className="flex items-center border rounded-md p-2">
    <FaHashtag className="text-gray-400 mr-2" />
    <input
      name="itemId"
      value={inventory.itemId}
      onChange={onInputChange}
      placeholder="Item ID"
      className="w-full outline-none text-sm"
    />
  </div>

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
    />
  </div>

  {/* Item Category */}
  <div className="flex items-center border rounded-md p-2">
    <FaTag className="text-gray-400 mr-2" />
    <input
      name="itemCategory"
      value={inventory.itemCategory}
      onChange={onInputChange}
      placeholder="Category"
      className="w-full outline-none text-sm"
    />
  </div>

  {/* Item Quantity */}
  <div className="flex items-center border rounded-md p-2">
    <FaList className="text-gray-400 mr-2" />
    <input
      type="number"
      name="itemQty"
      value={inventory.itemQty}
      onChange={onInputChange}
      placeholder="Quantity"
      className="w-full outline-none text-sm"
    />
  </div>

  {/* Item Details */}
  <textarea
    name="itemDetails"
    value={inventory.itemDetails}
    onChange={onInputChange}
    placeholder="Details"
    className="w-full border rounded-md p-2 text-sm resize-none"
    rows={3}
  />

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
  >
    Add Item
  </button>
</form>

  );
};

export default AddItem;
