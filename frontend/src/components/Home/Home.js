 import { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import axios from "axios";
import { FaSearch, FaBox, FaTag, FaLayerGroup, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchitem, setSearchitem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to load items", error);
    } finally {
      setLoading(false);
    }
  };

  const filterdata = items.filter((item) => {
    return (
      item.itemName.toLowerCase().includes(searchitem.toLowerCase()) ||
      item.itemCategory.toLowerCase().includes(searchitem.toLowerCase())
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-12">
          <label className="block text-center text-lg font-medium text-gray-700 mb-4">
            What are you looking for today?
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by name or category..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white shadow-lg focus:ring-2 focus:ring-green-500 transition-all text-gray-700 outline-none"
              value={searchitem}
              onChange={(e) => setSearchitem(e.target.value)}
            />
          </div>
        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <FaBox className="text-green-600 text-xl" />
            <h1 className="text-2xl font-bold text-gray-800">Available Inventory</h1>
          </div>
          <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {filterdata.length} Items Found
          </span>
        </div>

        {/* ITEMS GRID */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Fetching items...</p>
          </div>
        ) : filterdata.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
            <p className="text-gray-400 text-lg">No items match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filterdata.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-100"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={`http://localhost:8080/uploads/${item.itemImage}`}
                    alt={item.itemName}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                  />
                  {/* Category & Price Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 w-fit">
                      <FaTag className="text-[10px]" /> {item.itemCategory}
                    </span>
                    <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md w-fit">
                      ${item.itemPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors truncate">
                    {item.itemName}
                  </h2>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    {/* Stock Display with Low Stock Alert */}
                    <div className={`flex items-center gap-1.5 text-sm font-semibold ${
                      Number(item.itemQty) <= item.minStockLimit ? "text-red-600" : "text-gray-600"
                    }`}>
                      <FaLayerGroup />
                      <span>{item.itemQty} in stock</span>
                      {Number(item.itemQty) <= item.minStockLimit && (
                        <FaExclamationTriangle className="animate-pulse" title="Low Stock Alert" />
                      )}
                    </div>

                    {/* Location Display */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{item.location || "Main Warehouse"}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                    {item.itemDetails || "No description provided for this item."}
                  </p>

                  <button 
                    className="mt-auto w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg active:scale-95 transform"
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;