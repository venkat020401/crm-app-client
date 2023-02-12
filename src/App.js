import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/child/Login";
import "./sbadmin.css";
import Register from "./components/child/Register";
import AdminDashboard from "../src/components/child/Dashboard/AdminDashboard";
import PasswordReset from "./components/child/PasswordReset";
import UpdatePassword from "./components/child/UpdatePassword";
import VerifyUser from "./components/child/VerifyUser";
import AddProduct from "./components/child/AddProduct";
import ViewProduct from "./components/child/ViewProduct";
import EditProduct from "./components/child/EditProduct";
import UserDshboard from "./components/child/Dashboard/UserDshboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/user-dashboard" element={<UserDshboard />}/>
        <Route path="/add-product" element={<AddProduct />}/>
        <Route path="/view-product/:id" element={<ViewProduct />}/>
        <Route path="/update-product/:id" element={<EditProduct />}/>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/verify-user/:id/:randomnum" element={<VerifyUser />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
