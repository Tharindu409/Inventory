 import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddItem from "./components/AddItem/AddItem";
import AdminDashBoard from "./components/Admin/AdminDashboard";
import UpdateItem from "./components/ItemManagement/UpdateItem"; 
import Footer from "./components/footer/footer";
import Navbar from "./components/Navbar/Nav";
import Hero from "./components/Hero/Hero";

  

function App() {
  return (
    
    <>
    <Navbar />
    
    <Routes>
       <Route path="/AdminDashBoard" element={<AdminDashBoard/>}/>
      
      <Route path="/" element={
        <>
        <Hero />
        <Home />
        </>
        }
       />
      <Route path="/home" element={<Home />} />
      <Route path="/updateitem/:id" element={<UpdateItem />} />

      <Route path="/additem" element={<AddItem />} />
       
      
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
