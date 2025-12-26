 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';


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

        // Fetching user data
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

    if (loading) return <div className="flex justify-center mt-20 font-bold text-green-700">Loading Profile...</div>;
    
    if (error) return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 text-red-700 rounded-lg text-center">
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="mt-4 underline">Back to Login</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Simple Back Button */}
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition">
                <FaArrowLeft /> Back
            </button>

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="bg-green-600 p-6 text-center">
                    <h2 className="text-xl font-bold text-white">My Profile</h2>
                </div>

                <div className="p-6 space-y-5">
                    {/* Full Name */}
                    <div className="flex items-center gap-4 border-b pb-3">
                        <FaUser className="text-gray-400" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Full Name</p>
                            <p className="text-gray-800 font-medium">{userData.fullName}</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 border-b pb-3">
                        <FaEnvelope className="text-gray-400" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Email Address</p>
                            <p className="text-gray-800 font-medium">{userData.email}</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4 border-b pb-3">
                        <FaPhone className="text-gray-400" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Phone Number</p>
                            <p className="text-gray-800 font-medium">{userData.phone || "Not Provided"}</p>
                        </div>
                    </div>

                    {/* Password with Toggle */}
                    <div className="flex items-center gap-4 border-b pb-3">
                        <FaLock className="text-gray-400" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Password</p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-800 font-medium">
                                    {showPassword ? userData.password : "••••••••"}
                                </p>
                                <button 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-green-600 transition"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition 
                        shadow-md active:scale-95 mt-4"
                        onClick={() => navigate('/updateProfile')}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;