import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddItem from "./components/AddItem/AddItem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/additem" element={<AddItem />} />
      
    </Routes>
  );
}

export default App;
