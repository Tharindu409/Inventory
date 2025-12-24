 import { useEffect, useState } from "react";
  import Hero from "../Hero/Hero";


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

  //search function
  const [searchitem, setSearchitem] = useState("");
  const filterdata = items.filter((item) => {
    return item.itemName.toLowerCase().includes(searchitem.toLowerCase()) 
    || item.itemCategory.toLowerCase().includes(searchitem.toLowerCase());
  });


 return (
  <>
    {/* HERO SECTION */}
    <Hero />

    {/* HOME CONTENT */}
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Search */}
      <p className="block text-sm font-semibold text-gray-600 mb-2">
        Search items here
      </p>

      <div className="relative">
        <svg
          className="w-6 h-6 absolute left-3 top-3 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search items Name or Category..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300
          text-gray-700 placeholder-gray-400 bg-white
          focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          value={searchitem}
          onChange={(e) => setSearchitem(e.target.value)}
        />
      </div>

      <br />

      {/* Header */}
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
          {filterdata.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={`http://localhost:8080/uploads/${item.itemImage}`}
                  alt={item.itemName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => (e.target.src = "/no-image.png")}
                />
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-green-600 truncate">
                  {item.itemName}
                </h2>

                <p className="text-sm text-green-700">
                  <span className="font-medium">Category:</span>{" "}
                  {item.itemCategory}
                </p>

                <p className="text-sm text-green-700">
                  <span className="font-medium">Quantity:</span>{" "}
                  {item.itemQty}
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
  </>
);

};

export default Home;
