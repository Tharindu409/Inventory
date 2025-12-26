import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Note: Destructure { id } from props so it's a usable variable
const UpdateProfile = ({ id, onUpdated }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });

    // 1. Fixed the Fetching Logic
    useEffect(() => {
        const loadUser = async () => {
            if (!id) return; // Guard clause
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                const userData = response.data;
                
                setFormData({
                    // Check if your backend uses 'name' or 'fullName'
                    fullName: userData.fullName || userData.name || "",
                    email: userData.email || "",
                    phone: userData.phone || userData.phoneNumber || "",
                    password: userData.password || ""
                });
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
        loadUser();
    }, [id]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 2. Fixed the Update Logic
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending formData directly as JSON
            await axios.put(`http://localhost:8080/user/${id}`, formData);
            alert("Profile updated successfully!");
            if (onUpdated) onUpdated(); // Trigger refresh in parent if prop exists
            navigate('/profile');
        } catch (error) {
            console.error("Update failed:", error.response?.data);
           alert("Sync failed. Connection to Area52 server lost.");
        }
    };

    // 3. Password Strength Logic
    const getStrengthColor = () => {
        if (formData.password.length === 0) return "bg-gray-200";
        if (formData.password.length < 6) return "bg-red-500";
        if (formData.password.length < 10) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 max-w-md mx-auto transition-all">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 dark:border-slate-700 pb-5">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl text-green-600 shadow-sm">
                    <FaUserEdit size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Profile Settings</h2>
                    <p className="text-[10px] text-green-600 dark:text-green-400 uppercase tracking-[0.2em] font-black">Personnel ID: {id}</p>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="group">
                    <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 mb-1 block transition-colors group-focus-within:text-green-600">Full Name</label>
                    <div className="flex items-center border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 focus-within:border-green-500 focus-within:bg-white transition-all">
                        <FaUser className="text-slate-400 mr-3" />
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={onInputChange}
                            className="w-full bg-transparent outline-none text-sm font-bold dark:text-white"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="group">
                    <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 mb-1 block">Email Address</label>
                    <div className="flex items-center border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 focus-within:border-green-500 transition-all">
                        <FaEnvelope className="text-slate-400 mr-3" />
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={onInputChange}
                            className="w-full bg-transparent outline-none text-sm font-bold dark:text-white"
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="group">
                    <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 mb-1 block">Phone Number</label>
                    <div className="flex items-center border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 focus-within:border-green-500 transition-all">
                        <FaPhone className="text-slate-400 mr-3" />
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={onInputChange}
                            className="w-full bg-transparent outline-none text-sm font-bold dark:text-white"
                            placeholder="+1 234 567 890"
                        />
                    </div>
                </div>

                {/* Password with Strength Meter */}
                <div className="group">
                    <label className="text-[11px] font-bold uppercase text-slate-400 ml-1 mb-1 block">Access Password</label>
                    <div className="flex items-center border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 focus-within:border-green-500 transition-all">
                        <FaLock className="text-slate-400 mr-3" />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={onInputChange}
                            className="w-full bg-transparent outline-none text-sm font-bold dark:text-white"
                            placeholder="••••••••"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-green-600">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* Strength Bar */}
                    <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${getStrengthColor()}`} style={{ width: `${Math.min((formData.password.length / 12) * 100, 100)}%` }}></div>
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-slate-900 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white py-4 rounded-2xl 
                    font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 mt-4"
                >
                    Update Personnel File
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;