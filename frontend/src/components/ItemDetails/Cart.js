import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckDouble, FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("area52_cart")) || [];
        setCartItems(data);
    }, []);

   const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item => {
        if (item.id === id) {
            // Ensure we are targeting 'orderQty'
            const currentQty = Number(item.orderQty) || 1;
            const newQty = Math.max(1, currentQty + delta);
            return { ...item, orderQty: newQty };
        }
        return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("area52_cart", JSON.stringify(updatedCart));
};
    const removeFromCart = (id) => {
        const updateCart = cartItems.filter(item => item.id !== id);
        setCartItems(updateCart);
        localStorage.setItem("area52_cart", JSON.stringify(updateCart));
    };

    const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item.itemPrice) || 0;
    const qty = Number(item.orderQty) || 0;
    return total + (price * qty);
}, 0);

 const handleCheckout = async () => {
    const confirmOrder = window.confirm("Finalize this order and reduce stock?");
    if (!confirmOrder) return;

    try {
        for (const item of cartItems) {
            // 1. Fetch latest data to prevent overwriting other people's updates
            const res = await axios.get(`http://localhost:8080/inventory/${item.id}`);
            const dbItem = res.data;

            // 2. Math logic
            const currentStock = parseInt(dbItem.itemQty) || 0;
            const requestedQty = parseInt(item.orderQty) || 0;
            const finalQty = currentStock - requestedQty;

            if (finalQty < 0) {
                alert(`Insufficient stock for ${dbItem.itemName}. Available: ${currentStock}`);
                return;
            }

            // 3. Prepare Object
            const updatedObject = {
                ...dbItem,
                itemQty: finalQty.toString()
            };

            // 4. Prepare FormData (Matches Backend @RequestParam names)
            const formData = new FormData();
            formData.append("itemDetails", JSON.stringify(updatedObject));
            // We do NOT append "file" here because we want to keep the current image

            // 5. API Call
            await axios.put(`http://localhost:8080/inventory/${item.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
        }

        alert("Success! Stock updated and order finalized.");
        localStorage.removeItem("area52_cart");
        setCartItems([]);
        navigate("/home");

    } catch (error) {
        console.error("Server Response:", error.response?.data);
        alert("Error: The server rejected the update. Check console for details.");
    }
};

  

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors mb-2"
                        >
                            <FaArrowLeft /> BACK TO INVENTORY
                        </button>
                        <h2 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                            <FaShoppingBag className="text-green-600" /> Your Cart
                        </h2>
                    </div>
                    <span className="text-gray-400 font-medium">{cartItems.length} Items</span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-16 rounded-3xl text-center shadow-xl border border-gray-100">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaShoppingBag className="text-gray-300 text-3xl" />
                        </div>
                        <p className="text-gray-500 text-xl font-medium">Your order list is empty.</p>
                        <button 
                            onClick={() => navigate('/home')}
                            className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        {/* LEFT COLUMN: ITEM LIST */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-6 w-full">
                                        <img 
                                            src={`http://localhost:8080/uploads/${item.itemImage}`} 
                                            className="w-24 h-24 rounded-2xl object-cover border border-gray-50 shadow-inner" 
                                            alt={item.itemName} 
                                        />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-gray-800">{item.itemName}</h3>
                                            <p className="text-green-600 font-semibold mb-3">${item.itemPrice.toFixed(2)}</p>
                                            
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-gray-50 w-fit rounded-lg p-1 border">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-2 hover:bg-white rounded-md text-gray-500 hover:text-red-500 transition"
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="w-8 text-center font-bold text-gray-700">{item.orderQty}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-2 hover:bg-white rounded-md text-gray-500 hover:text-green-600 transition"
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                                        <p className="text-xl font-black text-gray-900 mb-2">
                                            ${(item.itemPrice * item.orderQty).toFixed(2)}
                                        </p>
                                        <button 
                                            onClick={() => removeFromCart(item.id)} 
                                            className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                                            title="Remove item"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT COLUMN: SUMMARY BOX */}
                        <div className="lg:sticky lg:top-10">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="font-semibold text-gray-800">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Handling Fee</span>
                                        <span className="text-green-600 font-bold tracking-tight">FREE</span>
                                    </div>
                                    <div className="pt-4 border-t flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-3xl font-black text-green-600">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 text-lg"
                                    onClick={() => handleCheckout()}
                                >
                                    <FaCheckDouble /> Finalize Order
                                </button>
                                
                                <p className="text-center text-xs text-gray-400 mt-6 uppercase tracking-widest">
                                    Secure Area52 Protocol
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;