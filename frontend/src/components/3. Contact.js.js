import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tighter">
            Contact <span className="text-green-600">Support</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Have a question? We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Side: Simple Info Cards */}
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-green-600 text-xl" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                  <p className="dark:text-white font-bold">tharindun979@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <FaPhone className="text-blue-600 text-xl" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                  <p className="dark:text-white font-bold">+94 76 094 1191</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Office</p>
                  <p className="dark:text-white font-bold">Malabe, Colombo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Form */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl">
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 dark:text-white outline-none focus:border-green-500" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 dark:text-white outline-none focus:border-green-500" 
                />
              </div>
              <div>
                <textarea 
                  rows="4" 
                  placeholder="How can we help?" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 dark:text-white outline-none focus:border-green-500"
                ></textarea>
              </div>
              <button className="w-full bg-green-600 py-4 rounded-xl text-white font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;