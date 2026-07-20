import { NavLink, Link } from "react-router-dom";
import { BookOpen, Heart, User, LogOut, LogIn, UserPlus, LayoutDashboard, Library } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const AdminNavbar = ({ logout }) => (
  <nav className="navbar">
    <Link to="/admin" className="navbar__logo">
      <BookOpen size={22} strokeWidth={2.2} />
      أثر <span className="navbar__logo-tag">لوحة التحكم</span>
    </Link>

    <ul className="navbar__links">
      <li><NavLink to="/admin" end className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>نظرة عامة</NavLink></li>
      <li><NavLink to="/admin/books" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>الكتب</NavLink></li>
      <li><NavLink to="/admin/categories" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>التصنيفات</NavLink></li>
      <li><NavLink to="/admin/orders" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>الطلبات</NavLink></li>
      <li><NavLink to="/admin/users" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>المستخدمون</NavLink></li>
      <li><NavLink to="/admin/reviews" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>التعليقات</NavLink></li>
    </ul>

    <div className="navbar__actions">
      <ThemeToggle />
      <button className="navbar__logout" onClick={logout}><LogOut size={16} /> خروج</button>
    </div>
  </nav>
);

const PublicNavbar = ({ user, logout }) => (
  <nav className="navbar">
    <Link to="/" className="navbar__logo">
      <BookOpen size={22} strokeWidth={2.2} />
      أثر
    </Link>

    <ul className="navbar__links">
      <li><NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>الرئيسية</NavLink></li>
      <li><a href="/#featured" className="navbar__link">المميزة</a></li>
      <li><a href="/#popular" className="navbar__link">الأشهر</a></li>
      <li><a href="/#most-read" className="navbar__link">الأكثر قراءة</a></li>
      <li><a href="/#about" className="navbar__link">من نحن</a></li>
      <li><a href="/#contact" className="navbar__link">تواصل معنا</a></li>
    </ul>

    <div className="navbar__actions">
      <ThemeToggle />
      {user ? (
        <>
          <Link to="/library" className="navbar__icon-link" title="مكتبتي"><Library size={19} /></Link>
          <Link to="/favorites" className="navbar__icon-link" title="المفضلة"><Heart size={19} /></Link>
          <Link to="/profile" className="navbar__icon-link" title="حسابي"><User size={19} /></Link>
          <button className="navbar__logout" onClick={logout}><LogOut size={16} /> خروج</button>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar__login"><LogIn size={16} /> دخول</Link>
          <Link to="/register" className="navbar__login navbar__login--outline"><UserPlus size={16} /> حساب جديد</Link>
        </>
      )}
    </div>
  </nav>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  if (user?.role === "admin") return <AdminNavbar logout={logout} />;
  return <PublicNavbar user={user} logout={logout} />;
};

export default Navbar;