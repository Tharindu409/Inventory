 import { useEffect, useState } from "react";

import axios from "axios";
 
const Home = () => {
  const [items, setItems] = useState([]);

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


  return (
    
    <div className="min-h-screen bg-gray-100 p-6">

      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Available Items
        </h1>

        
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <p className="text-gray-500">No items available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="w-full h-56 overflow-hidden rounded-t-2xl">
        <img
          src={`http://localhost:8080/uploads/${item.itemImage}`}
          alt={item.itemName}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          onError={(e) => (e.target.src = "/no-image.png")}
        />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-green-600 truncate">
          {item.itemName}
        </h2>

        <p className="text-sm text-green-700">
          <span className="font-medium">Category:</span> {item.itemCategory}
        </p>

        <p className="text-sm text-green-700">
          <span className="font-medium">Quantity:</span> {item.itemQty}
        </p>

        <p className="text-sm text-gray-600 line-clamp-3">
          {item.itemDetails}
        </p>
      </div>

       
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default Home;
