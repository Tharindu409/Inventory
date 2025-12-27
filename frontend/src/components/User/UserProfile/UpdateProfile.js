 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserEdit, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const UpdateProfile = () => {
    const { id } = useParams(); // Gets ID from the URL path
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
        const loadUser = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
        loadUser();
    }, [id]);

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/user/${id}`, formData);
            alert("Profile synchronized successfully!");
            // Update localStorage name in case it changed
            localStorage.setItem("fullName", formData.fullName);
            window.dispatchEvent(new Event("storage"));
            navigate('/profile');
        } catch (error) {
            alert("Sync failed. Check connection to Area52.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
            <button onClick={() => navigate(-1)} className="mb-6 self-start max-w-md mx-auto flex items-center gap-2 text-slate-400 hover:text-slate-800 transition font-bold">
                <FaArrowLeft /> Cancel
            </button>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-md w-full transition-all">
                <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-5">
                    <div className="bg-green-600 p-4 rounded-2xl text-white shadow-lg">
                        <FaUserEdit size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Edit Profile</h2>
                        <p className="text-[10px] text-green-600 uppercase tracking-widest font-black font-mono">ID: {id}</p>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Full Name</label>
                        <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                            <FaUser className="text-slate-400 mr-3" />
                            <input name="fullName" value={formData.fullName} onChange={onInputChange} className="bg-transparent w-full outline-none font-bold text-sm" required />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Email</label>
                        <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                            <FaEnvelope className="text-slate-400 mr-3" />
                            <input name="email" type="email" value={formData.email} onChange={onInputChange} className="bg-transparent w-full outline-none font-bold text-sm" required />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Phone</label>
                        <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                            <FaPhone className="text-slate-400 mr-3" />
                            <input name="phone" value={formData.phone} onChange={onInputChange} className="bg-transparent w-full outline-none font-bold text-sm" />
                        </div>
                    </div>

                    <div className="space-y-1 pb-4">
                        <label className="text-[10px] font-bold uppercase text-slate-400 ml-2">Password</label>
                        <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition-all">
                            <FaLock className="text-slate-400 mr-3" />
                            <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={onInputChange} className="bg-transparent w-full outline-none font-bold text-sm" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-200 hover:bg-green-700 active:scale-95 transition-all">
                        Update Personnel File
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;