 import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddItem from "./components/AddItem/AddItem";
import AdminDashBoard from "./components/Admin/AdminDashboard";
import UpdateItem from "./components/ItemManagement/UpdateItem"; 
import Footer from "./components/footer/footer";
import Navbar from "./components/Navbar/Nav";
import Register from "./components/User/Register/Register";
import LandingPage from "./components/User/LandingPage";
import Login from "./components/User/Login/Login";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import Cart from "./components/ItemDetails/Cart";

function App() {
  return (
    
    <>
    <Navbar />
    <Routes>
       <Route path="/AdminDashBoard" element={<AdminDashBoard/>}/>
      
      <Route path="/" element={
        <LandingPage />}
      />
      <Route path="/home" element={<Home />} />
      <Route path="/updateitem/:id" element={<UpdateItem />} />
       <Route path="/additem" element={<AddItem />} />

       {/* User Registration and login */}

       <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/item/:id" element={<ItemDetails />} />

      <Route path="/order" element={<Cart/>}/>
      
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
