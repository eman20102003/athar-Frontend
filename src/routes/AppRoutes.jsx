import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BookDetails from "../pages/Books/BookDetails";
/*import Reader from "../pages/Reader";
import Checkout from "../pages/Checkout/Checkout";
import Success from "../pages/Checkout/Success";
import Failed from "../pages/Checkout/Failed";
import MyBooks from "../pages/Library/MyBooks";
import Favorites from "../pages/Library/Favorites";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/Admin/Dashboard";*/
import { PrivateRoute, AdminRoute } from "../components/common/ProtectedRoutes";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/books/:id" element={<BookDetails />} />

    
      <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
