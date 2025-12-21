 import { useEffect, useState } from "react";
import { FaDashcube } from "react-icons/fa";
import { Link } from "react-router-dom";
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

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Available Items
        </h1>

        <Link
          to="/AdminDashBoard"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <FaDashcube />
          Admin Panel
        </Link>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <p className="text-gray-500">No items available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={`http://localhost:8080/uploads/${item.itemImage}`}
                alt={items.itemImage}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = "/no-image.png")}
              />

              {/* Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.itemName}
                </h2>

                <p className="text-sm text-gray-500 mb-1">
                  Category: {item.itemCategory}
                </p>

                <p className="text-sm text-gray-500 mb-2">
                  Quantity: {item.itemQty}
                </p>

                <p className="text-sm text-gray-600">
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
