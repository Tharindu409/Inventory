 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaArrowLeft, FaTrash, FaUserEdit } from 'react-icons/fa';

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            setError('Please login to access your profile');
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:8080/user/${userId}`)
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Could not find user details.');
                setLoading(false);
            });
    }, []);

    const deleteProfile = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;
        try {
            await axios.delete(`http://localhost:8080/user/${userData.id}`);
            alert("Profile deleted successfully");
            localStorage.clear();
            window.dispatchEvent(new Event("storage"));
            navigate('/');
        } catch (error) {
            alert("Error deleting profile");
        }
    };

    if (loading) return <div className="flex justify-center mt-20 font-bold text-green-700">Loading Profile...</div>;
    
    if (error) return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 text-red-700 rounded-lg text-center">
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="mt-4 underline">Back to Login</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition font-bold">
                <FaArrowLeft /> Back
            </button>

            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-green-700 p-8 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                         <FaUser className="text-white text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest">Personal File</h2>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                        <FaUser className="text-green-600" />
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 font-black uppercase">Full Name</p>
                            <p className="text-slate-800 font-bold">{userData.fullName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                        <FaEnvelope className="text-green-600" />
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 font-black uppercase">Email Address</p>
                            <p className="text-slate-800 font-bold">{userData.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                        <FaPhone className="text-green-600" />
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 font-black uppercase">Phone</p>
                            <p className="text-slate-800 font-bold">{userData.phone || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                        <FaLock className="text-green-600" />
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-400 font-black uppercase">Security Key</p>
                            <div className="flex justify-between items-center">
                                <p className="text-slate-800 font-bold">{showPassword ? userData.password : "••••••••"}</p>
                                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-green-600">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <button 
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg active:scale-95"
                            onClick={() => navigate(`/update-profile/${userData.id}`)}
                        >
                            <FaUserEdit /> Edit Personnel File
                        </button>
                        <button
                            className="w-full text-red-500 py-2 font-bold text-sm hover:underline"
                            onClick={deleteProfile}
                        >
                            <FaTrash className="inline mr-2" /> Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;