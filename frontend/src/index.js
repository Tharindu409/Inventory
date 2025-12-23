import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar/Nav";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
       <Navbar />
       <App />
    </React.StrictMode>
  </BrowserRouter>
);

