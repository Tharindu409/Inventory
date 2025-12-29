import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Cleaner imports
import AddUser from '../../components/Admin/AdminAddUser';
import UpdateUser from '../../components/UserManagement/AdminUpdateUser';
import Modal from '../../components/ItemManagement/Model';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa'; // Icons for better UI


const UserManagement = () => { // Fixed naming typo
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/user");
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to load users", error);
        }
    };

    const deleteUser = async (id) => {
        // Find user details first so we can log the name
        const userToDelete = users.find(u => u.id === id);
        const userName = userToDelete ? userToDelete.fullName : "Unknown User";

        const confirmDelete = window.confirm(`Are you sure you want to delete user: ${userName}?`);
        
        if (confirmDelete) {
            try {
                // 1. Delete the user
                await axios.delete(`http://localhost:8080/user/${id}`);

                // 2. Log the action
                await axios.post("http://localhost:8080/log", {
                    action: "DELETE_USER",
                    performedBy: "Admin",
                    details: `Permanently removed user: ${userName} (Email: ${userToDelete?.email})`
                });

                alert("User deleted and action logged.");
                loadUsers(); // Refresh list
            } catch (error) {
                console.error("Failed to delete user or log action", error);
                alert("Error during deletion.");
            }
        }
    };

    const editUser = (id) => {
        setSelectedUserId(id);
        setEditModalOpen(true);
    };

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <button 
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    <FaUserPlus /> Add New User
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">User ID</th>
                            <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Full Name</th>
                            <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                            <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Phone</th>
                            <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase">Role</th>
                            <th className="px-5 py-3 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-5 py-4 text-sm text-gray-700 font-mono">#{user.id}</td>
                                <td className="px-5 py-4 text-sm text-gray-700 font-medium">{user.fullName}</td>
                                <td className="px-5 py-4 text-sm text-gray-600">{user.email}</td>
                                <td className="px-5 py-4 text-sm text-gray-600">{user.phone}</td>
                                <td className="px-5 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-center">
                                    {/* ACTIONS MOVED INSIDE THE ROW */}
                                    <button
                                        onClick={() => editUser(user.id)} // FIXED: user.id instead of users.id
                                        className="text-blue-600 hover:text-blue-900 mr-4 transition"
                                        title="Edit User"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)} // FIXED: user.id instead of users.id
                                        className="text-red-600 hover:text-red-900 transition"
                                        title="Delete User"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {users.length === 0 && (
                    <div className="p-10 text-center text-gray-400">No users found in database.</div>
                )}
            </div>

            {/* MODALS */}
            {isAddModalOpen && (
                <Modal onClose={() => setAddModalOpen(false)}>
                    <AddUser onClose={() => {
                        setAddModalOpen(false);
                        loadUsers();
                    }} />
                </Modal>
            )}

            {isEditModalOpen && (
                <Modal onClose={() => setEditModalOpen(false)}>
                    <UpdateUser userId={selectedUserId} onClose={() => {
                        setEditModalOpen(false);
                        loadUsers();
                    }} />
                </Modal>
            )}
        </div>
    );
};

export default UserManagement;