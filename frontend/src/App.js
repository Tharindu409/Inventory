 import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddItem from "./components/AddItem/AddItem";
import AdminDashBoard from "./components/Admin/AdminDashboard";
import UpdateItem from "./components/ItemManagement/UpdateItem"; 
  

function App() {
  return (
    
    <Routes>
       <Route path="/AdminDashBoard" element={<AdminDashBoard/>}/>
      
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/updateitem/:id" element={<UpdateItem />} />

      <Route path="/additem" element={<AddItem />} />
       
      
    </Routes>
  );
}

export default App;
