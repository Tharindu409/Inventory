import   { useEffect, useState } from "react";
import axios from "axios";
 
import { 
  FaHistory, 
  FaUserShield, 
  FaBoxOpen, 
   FaClock, 
  FaSyncAlt,
  FaExclamationCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Ensure this endpoint matches your Spring Boot Controller
      const res = await axios.get("http://localhost:8080/logs");
      setLogs(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to sync system logs. Please check backend connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine badge colors based on action type
  const getBadgeStyle = (action) => {
    const act = action.toUpperCase();
    if (act.includes("DELETE") || act.includes("REMOVE")) return "bg-red-100 text-red-700 border-red-200";
    if (act.includes("STOCK") || act.includes("QTY")) return "bg-orange-100 text-orange-700 border-orange-200";
    if (act.includes("CREATE") || act.includes("ADD")) return "bg-green-100 text-green-700 border-green-200";
    if (act.includes("ROLE") || act.includes("PERMISSION")) return "bg-purple-100 text-purple-700 border-purple-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  // Helper to get Icon based on action
  const getActionIcon = (action) => {
    const act = action.toUpperCase();
    if (act.includes("USER")) return <FaUserShield className="opacity-50" />;
    if (act.includes("STOCK") || act.includes("ITEM")) return <FaBoxOpen className="opacity-50" />;
    return <FaHistory className="opacity-50" />;
  };

  // Clear Logs Handler

  const handleClersLogs=()=>{
    axios.delete("http://localhost:8080/logs/clear")


    .then((res)=>{

      alert("All logs have been cleared.");
      fetchLogs();
    })
    
    .catch((err)=>{
      console.error("Error clearing logs:", err);
    }); 

  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* --- HEADER --- */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-lg shadow-lg">
            <FaHistory size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">System Activity Feed</h2>
            <p className="text-xs text-gray-400 font-medium">Real-time audit trail of all administrative actions</p>
          </div>
        </div>
        <button 
         onClick={handleClersLogs}
          className="px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all border
           border-red-100"
          title="Clear Audit Logs"
        >
         Clear History
        </button>
 
        
        <button 
          onClick={fetchLogs}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
          title="Refresh Logs"
        >
          <FaSyncAlt className={loading ? "animate-spin" : ""} />
        </button>

      </div>


      {/* --- TABLE CONTENT --- */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <div className="w-8 h-8 border-4 border-gray-100 border-t-green-500 rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-bold animate-pulse">Retrieving Audit Logs...</p>
          </div>
        ) : error ? (
          <div className="py-20 flex flex-col items-center justify-center text-red-400">
            <FaExclamationCircle size={40} className="mb-4" />
            <p className="font-bold">{error}</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">Time & Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">Initiated By</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">Action Type</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">Activity Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <FaClock className="text-gray-300" />
                      {new Date(log.timestamp).toLocaleDateString()} 
                      <span className="text-gray-300 font-normal">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase border border-slate-200">
                        {log.performedBy?.charAt(0) || "A"}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{log.performedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase ${getBadgeStyle(log.action)}`}>
                      {getActionIcon(log.action)}
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {log.details}
                    </p>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-gray-400 font-medium">
                    No system activity recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* --- FOOTER HINT --- */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>Showing {logs.length} Total Events</span>
        <span>Audit Secure Mode Enabled</span>
      </div>
    </motion.div>

  );
};

export default AdminLogs;