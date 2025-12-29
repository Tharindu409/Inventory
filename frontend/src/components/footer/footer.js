import React from "react";
import { FaBoxOpen, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 dark:bg-slate-950 text-white mt-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tighter mb-4">
            <FaBoxOpen className="text-yellow-400" /> AREA52
          </div>
          <p className="text-sm text-green-100/70 dark:text-gray-400 leading-relaxed">
            Revolutionizing warehouse logistics with real-time tracking and 
            advanced system auditing. Efficiency starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Navigation</h3>
          <ul className="space-y-4 text-sm text-green-100/60 dark:text-gray-400">
            <li><Link to="/home" className="hover:text-yellow-400 transition">Dashboard</Link></li>
            <li><Link to="/items" className="hover:text-yellow-400 transition">Inventory List</Link></li>
            <li><Link to="/faq" className="hover:text-yellow-400 transition">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Support</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Contact</h3>
          <p className="text-sm text-green-100/60 dark:text-gray-400 mb-2">support@area52.com</p>
          <p className="text-sm text-green-100/60 dark:text-gray-400">Colombo, Sri Lanka</p>
          <div className="flex gap-4 mt-6">
            <FaFacebook className="hover:text-yellow-400 cursor-pointer transition" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer transition" />
            <FaLinkedin className="hover:text-yellow-400 cursor-pointer transition" />
            <FaGithub className="hover:text-yellow-400 cursor-pointer transition" />
          </div>
        </div>

        {/* Newsletter / Status */}
        <div>
          <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">System Status</h3>
          <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-900/50 p-3 rounded-xl border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-8 text-center text-xs text-green-100/30 dark:text-gray-600 font-medium">
        © {new Date().getFullYear()} AREA52 LOGISTICS. Built for High-Efficiency Warehousing.
      </div>
    </footer>
  );
};

export default Footer;