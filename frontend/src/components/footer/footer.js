import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white mt-16">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">InventorySys</h2>
          <p className="mt-3 text-sm text-black-400">
            Smart and efficient inventory management system to track,
            manage, and optimize your stock in real-time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Items</li>
            <li className="hover:text-white cursor-pointer">Suppliers</li>
            <li className="hover:text-white cursor-pointer">Reports</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">📍 Colombo, Sri Lanka</p>
          <p className="text-sm">📧 support@inventorysys.com</p>
          <p className="text-sm">📞 +94 77 123 4567</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 py-4 text-center text-sm text-gray-900">
        © {new Date().getFullYear()} InventorySys. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
