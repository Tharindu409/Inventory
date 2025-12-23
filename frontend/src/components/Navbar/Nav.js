import React from "react";
import { Link } from "react-router-dom";
import { FaDashcube } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-gray-200 px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-xl font-bold text-white">
        InventorySys
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 text-sm">
         
        <li>
          <Link to="/" className="hover:text-white transition">
            Items
          </Link>
        </li>
        <li>
          <Link to="/categories" className="hover:text-white transition">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/suppliers" className="hover:text-white transition">
            Suppliers
          </Link>
        </li>
        <li>
          <Link to="/reports" className="hover:text-white transition">
            Reports
          </Link>
        </li>
      </ul>

      {/* Logout */}
      <Link
          to="/AdminDashBoard"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <FaDashcube />
          Admin Panel
        </Link>
    </nav>
  );
};

export default Navbar;
