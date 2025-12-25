import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaShoppingCart, FaCheckCircle, FaTag, FaMapMarkerAlt, FaExclamationTriangle, FaDollarSign } from "react-icons/fa";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/inventory/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching item details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="text-center mt-20 italic">Loading details...</div>;
  if (!item) return <div className="text-center mt-20 text-red-500">Item not found!</div>;

  // Determine if stock is low based on your new model field
  const isLowStock = Number(item.itemQty) <= item.minStockLimit && item.itemQty > 0;


  const addToOrder = ()=>{
    const existingCart = JSON.parse(localStorage.getItem("area52_cart")) || [];

    //check if item exist
    const itemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    if(itemIndex>-1){
      existingCart[itemIndex].itemQty+=1

    }else{

      existingCart.push({
        id:item.id,
        itemName:item.itemName,
        itemPrice:item.itemPrice,
        itemImage:item.itemImage,
        maxQty:item.itemQty,
        itemQty:1
       
      });
    }
    localStorage.setItem("area52_cart",JSON.stringify(existingCart));
    alert(`${item.itemName} added to order cart!`);
 
  }


  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-8 font-medium"
        >
          <FaArrowLeft /> Back to Inventory
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          {/* Image Section */}
          <div className="md:w-1/2 h-96 md:h-auto overflow-hidden bg-gray-200">
            <img 
              src={`http://localhost:8080/uploads/${item.itemImage}`} 
              alt={item.itemName} 
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "https://via.placeholder.com/600x400?text=No+Image+Found")}
            />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-2">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                  <FaTag /> {item.itemCategory}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                   <FaMapMarkerAlt className="text-green-500" />
                   <span>Loc: {item.location || "Central Warehouse"}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-green-600 flex items-center justify-end">
                  <FaDollarSign className="text-xl" />
                  {item.itemPrice?.toFixed(2)}
                </div>
                <span className="text-gray-400 text-[10px] uppercase tracking-widest">Unit Price</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{item.itemName}</h1>
            
            {/* Stock Status Logic */}
            <div className="mb-6">
               <div className={`flex items-center gap-2 font-semibold ${item.itemQty > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {item.itemQty > 0 ? <FaCheckCircle /> : <FaExclamationTriangle />} 
                  <span>{item.itemQty > 0 ? `${item.itemQty} Units available` : "Out of Stock"}</span>
               </div>
               
               {/* Show warning if stock is above 0 but below the minimum limit */}
               {isLowStock && (
                 <div className="mt-2 flex items-center gap-2 text-xs bg-amber-50 text-amber-700 p-2 rounded-lg border border-amber-200 animate-pulse">
                    <FaExclamationTriangle />
                    <span>Low Stock Warning: Reorder required (Limit: {item.minStockLimit})</span>
                 </div>
               )}
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
               <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Description</h3>
               <p className="text-gray-600 text-lg leading-relaxed">
                 {item.itemDetails || "No additional description provided for this item."}
               </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-4">
              <button 
              onClick={addToOrder}
                disabled={item.itemQty <= 0}
                className={`w-full py-4 rounded-2xl font-bold 
                  text-lg transition-all flex items-center justify-center
                   gap-3 shadow-lg active:scale-95 ${
                  item.itemQty > 0 
                  ? "bg-gray-900 text-white hover:bg-green-600" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaShoppingCart /> {item.itemQty > 0 ? "Add to Order" : "Unavailable"}
              </button>
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
                System Reference: AREA52-INV-{id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;