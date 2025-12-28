import { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import axios from "axios";
import { FaSearch, FaBox, FaLayerGroup, FaMapMarkerAlt, FaExclamationTriangle, FaFilter } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchitem, setSearchitem] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      setItems(res.data);
      setFilteredItems(res.data); // Initial load
    } catch (error) {
      console.error("Failed to load items", error);
    } finally {
      setLoading(false);
    }
  };

  // Debouncing and Filtering Logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const matchingItems = items.filter((item) => { 
        const matchesSearch = item.itemName.toLowerCase().includes(searchitem.toLowerCase()) || 
                              item.itemCategory.toLowerCase().includes(searchitem.toLowerCase());
        const matchesCategory = searchCategory === "All" || item.itemCategory === searchCategory;
        const matchesPrice = maxPrice === "" || item.itemPrice <= parseFloat(maxPrice);
        
        return matchesSearch && matchesCategory && matchesPrice;
      });
      setFilteredItems(matchingItems);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchitem, searchCategory, maxPrice, items]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* --- ADVANCED FILTER BAR --- */}
        <div className="bg-white rounded-3xl shadow-xl p-4 lg:p-6 border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-2">
                <FaSearch /> Search Products
              </label>
              <input
                type="text"
                placeholder="Name or keywords..."
                className="w-full pl-4 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 transition-all
                 outline-none"
                value={searchitem}
                onChange={(e) => setSearchitem(e.target.value)}
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-2">
                <FaFilter /> Category
              </label>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full p-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Christmas Decorations">Christmas Decorations</option>

              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-2">
                Price Limit: <span className="text-green-600">${maxPrice || '∞'}</span>
              </label>
              <input
                type="number"
                placeholder="Enter max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* --- SECTION HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <FaBox size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Featured Inventory</h2>
          </div>
          <p className="text-sm font-bold text-gray-400">
            Showing <span className="text-green-600">{filteredItems.length}</span> items
          </p>
        </div>

        {/* --- ITEMS GRID --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="mt-4 font-bold text-gray-400 animate-pulse">Scanning Warehouse...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
          >
            <FaSearch size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No results found for your search criteria.</p>
            <button onClick={() => {setSearchitem(""); setMaxPrice(""); setSearchCategory("All");}} className="mt-4 text-green-600 font-bold hover:underline">Clear all filters</button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-100"
                >
                  {/* IMAGE SECTION */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={`http://localhost:8080/uploads/${item.itemImage}`}
                      alt={item.itemName}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black uppercase text-gray-800 shadow-sm">
                        {item.itemCategory}
                      </span>
                    </div>
                    {/* Floating Price */}
                    <div className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-1.5 rounded-2xl font-bold shadow-lg">
                      ${item.itemPrice?.toFixed(2)}
                    </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-green-600 transition-colors">
                      {item.itemName}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${
                            Number(item.itemQty) <= item.minStockLimit ? "text-red-500 bg-red-50" : "text-gray-500 bg-gray-50"
                        } px-2 py-1 rounded-md`}>
                            <FaLayerGroup size={10} />
                            {item.itemQty} in stock
                            {Number(item.itemQty) <= item.minStockLimit && <FaExclamationTriangle className="animate-bounce" />}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                            <FaMapMarkerAlt /> {item.location || "WH-01"}
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                      {item.itemDetails || "High quality inventory item available for immediate dispatch."}
                    </p>

                    <button 
                      className="mt-auto w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                      onClick={() => navigate(`/item/${item.id}`)}
                    >
                      View Details
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;