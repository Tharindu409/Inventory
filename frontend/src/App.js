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
import UserProfile from "./components/User/UserProfile/UserProfile";
import UpdateProfile from "./components/User/UserProfile/UpdateProfile";
import Contact from "./components/3. Contact.js";
import FAQ from "./components/FAQ.js";

const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  
  if (userRole !== "ADMIN") {
    // If not admin, redirect to home or show an error
    return <Home />;
  }
  
  return children;
};  
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        
        <Route
          path="/AdminDashboard"
          element={
            <AdminRoute>
              <AdminDashBoard />
            </AdminRoute>
          }
        />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/updateitem/:id" element={<UpdateItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />

        {/* User Authentication & Profile */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        {/* URL Param :id is essential here for UpdateProfile to work */}
        <Route path="/profile" element={<UserProfile />} /> 
        
        {/* Shopping */}
        <Route path="/order" element={<Cart/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/faq" element={<FAQ/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;