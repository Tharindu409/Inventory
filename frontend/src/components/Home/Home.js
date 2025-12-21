import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => navigate("/additem")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded"
      >
        Add Item
      </button>
    </div>
  );
}

export default Home;


