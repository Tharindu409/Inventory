import React, { useState } from 'react';
import { FaChevronDown,   FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      category: "General",
      q: "What is Area52 and how does it help my business?", 
      a: "Area52 is a centralized logistics hub. It helps you reduce human error by tracking every item movement and providing real-time stock levels so you never run out of critical supplies." 
    },
    { 
      category: "Inventory",
      q: "How do I handle low stock alerts?", 
      a: "Items will automatically appear with a warning badge on your dashboard if they fall below the minimum threshold. You can set these limits individually for each item in the Edit menu." 
    },
    { 
      category: "Security",
      q: "Who can see the Audit Logs?", 
      a: "Audit logs are strictly reserved for users with ADMIN privileges. These logs track who added, deleted, or modified an item and include a timestamp for full accountability." 
    },
    { 
      category: "Orders",
      q: "Where can I see my order history?", 
      a: "Navigate to the 'Orders' tab in the navbar. There, you can see a list of all finalized orders, the items included, and the total cost associated with each transaction." 
    },
    { 
      category: "Inventory",
      q: "Can I export my inventory data?", 
      a: "Currently, you can view all data via the Admin Dashboard. We are working on a feature to allow CSV/Excel exports in a future update." 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <FaQuestionCircle className="text-green-600 text-5xl mx-auto mb-4" />
          <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">How can we help?</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Search our knowledge base or browse categories below</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-200 ${
                openIndex === index ? 'border-green-500 shadow-md' : 'border-gray-100 dark:border-slate-700 shadow-sm'
              }`}
            >
              <button 
                className="w-full flex justify-between items-center p-6 text-left outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{faq.category}</span>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{faq.q}</span>
                </div>
                <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-green-600' : 'text-gray-400'}`}>
                   <FaChevronDown />
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-500 dark:text-gray-400 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300">
                  <div className="pt-4 border-t border-gray-50 dark:border-slate-700">
                    {faq.a}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 bg-green-700 rounded-[2rem] text-center text-white shadow-xl">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-green-100 text-sm mb-6">If you couldn't find the answer you're looking for, our team is here to help.</p>
          <button 
            onClick={() => window.location.href='/contact'}
            className="bg-white text-green-700 px-8 py-3 rounded-xl font-black text-sm hover:bg-yellow-400 hover:text-green-900 transition-colors"
          >
            CONTACT SUPPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;