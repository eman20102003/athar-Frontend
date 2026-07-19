import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BookDetails from "../pages/Books/BookDetails";
import Reader from "../pages/Reader";
import Checkout from "../pages/Checkout/Checkout";
import Success from "../pages/Checkout/Success";
import Failed from "../pages/Checkout/Failed";
import MyBooks from "../pages/Library/MyBooks";
import Favorites from "../pages/Library/Favorites";
import MyOrders from "../pages/Library/MyOrders";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/Admin/Dashboard";
import BooksManager from "../pages/Admin/BooksManager";
import OrdersManager from "../pages/Admin/OrdersManager";
import UsersManager from "../pages/Admin/UsersManager";
import CategoriesManager from "../pages/Admin/CategoriesManager";
import { PrivateRoute, AdminRoute } from "../components/common/ProtectedRoutes";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/books/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
    <Route path="/reader/:bookId" element={<PrivateRoute><Reader /></PrivateRoute>} />
    <Route path="/checkout/:bookId" element={<PrivateRoute><Checkout /></PrivateRoute>} />
    <Route path="/checkout/success/:orderId" element={<PrivateRoute><Success /></PrivateRoute>} />
    <Route path="/checkout/failed" element={<PrivateRoute><Failed /></PrivateRoute>} />
    <Route path="/library" element={<PrivateRoute><MyBooks /></PrivateRoute>} />
    <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
    <Route path="/orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
    <Route path="/admin/books" element={<AdminRoute><BooksManager /></AdminRoute>} />
    <Route path="/admin/orders" element={<AdminRoute><OrdersManager /></AdminRoute>}/>
    <Route path="/admin/users" element={<AdminRoute><UsersManager /></AdminRoute>} />
    <Route path="/admin/categories" element={<AdminRoute><CategoriesManager /></AdminRoute>} />
      <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
