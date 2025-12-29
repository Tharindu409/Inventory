import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaCheckCircle, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/contact/all");
            // Sort by date (newest first)
            const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setMessages(sorted);
        } catch (err) {
            toast.error("Failed to load messages");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/contact/read/${id}`);
            toast.success("Marked as read");
            fetchMessages(); // Refresh list
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/contact/${id}`);
            toast.success("Message deleted");
            setMessages(messages.filter(m => m.id !== id));
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="p-8 bg-gray-50 min-h-screen dark:bg-slate-900">
            <Toaster />
            <div className="max-w-6xl mx-auto">
                {/* Header & Stats */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 dark:text-white">Customer <span className="text-blue-600">Inbox</span></h1>
                        <p className="text-gray-500">Manage inquiries and support requests</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <FaEnvelope /> {unreadCount} New Messages
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading inbox...</div>
                ) : (
                    <div className="grid gap-4">
                        {messages.length === 0 && <p className="text-center text-gray-500 py-10">No messages found.</p>}
                        
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`p-6 rounded-2xl border transition-all ${
                                    !msg.read 
                                    ? "bg-white border-blue-200 shadow-md border-l-4 border-l-blue-500" 
                                    : "bg-gray-50 border-gray-100 opacity-80"
                                } dark:bg-slate-800 dark:border-slate-700`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className={`p-3 rounded-full ${!msg.read ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}>
                                            {!msg.read ? <FaEnvelope /> : <FaEnvelopeOpen />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                                {msg.name} 
                                                {!msg.read && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">New</span>}
                                            </h3>
                                            <p className="text-xs text-gray-500">{msg.email} • {new Date(msg.createdAt).toLocaleString()}</p>
                                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed italic">"{msg.message}"</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {!msg.read && (
                                            <button 
                                                onClick={() => handleMarkAsRead(msg.id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                title="Mark as Read"
                                            >
                                                <FaCheckCircle size={20} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMessages;