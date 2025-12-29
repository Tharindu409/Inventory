import React, { useState } from 'react'; // 1. Added useState
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios'; // 2. Import axios
import { toast, Toaster } from 'react-hot-toast'; // 3. For feedback

const Contact = () => {
  // 4. Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Support Request', // Default subject
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // 5. Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 6. Connect to your Spring Boot endpoint
      const response = await axios.post("http://localhost:8080/api/contact/submit", formData);
      
      if (response.status === 200) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: 'Support Request', message: '' }); // Clear form
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-16 px-6">
      <Toaster position="top-center" />
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
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 dark:text-white outline-none focus:border-green-500" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email Address" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 dark:text-white outline-none focus:border-green-500" 
                />
              </div>
              <div>
                <textarea 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help?" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 dark:text-white outline-none focus:border-green-500"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 py-4 rounded-xl text-white font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Sending..." : <><FaPaperPlane /> Send Message</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;