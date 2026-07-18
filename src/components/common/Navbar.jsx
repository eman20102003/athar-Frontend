import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../../styles/common/Navbar.css";

const AdminNavbar = ({ logout }) => (
  <nav className="navbar">
    <Link to="/admin" className="navbar__logo">أثر <span className="navbar__logo-tag">لوحة التحكم</span></Link>

    <ul className="navbar__links">
      <li><Link to="/admin" className="navbar__link">نظرة عامة</Link></li>
      <li><Link to="/admin/users" className="navbar__link">المستخدمون</Link></li>
      <li><Link to="/admin/orders" className="navbar__link">الطلبات</Link></li>
      <li><Link to="/admin/books" className="navbar__link">الكتب</Link></li>
    </ul>

    <div className="navbar__actions">
      <ThemeToggle />
      <button className="navbar__logout" onClick={logout}>تسجيل خروج</button>
    </div>
  </nav>
);

const PublicNavbar = ({ user, logout }) => (
  <nav className="navbar">
    <Link to="/" className="navbar__logo">أثر</Link>

    <ul className="navbar__links">
      <li><Link to="/" className="navbar__link">الرئيسية</Link></li>
      <li><Link to="/#featured" className="navbar__link">المميزة</Link></li>
      <li><Link to="/#popular" className="navbar__link">الأشهر</Link></li>
      <li><Link to="/#about" className="navbar__link">من نحن</Link></li>
      <li><Link to="/#contact" className="navbar__link">تواصل معنا</Link></li>
    </ul>

    <div className="navbar__actions">
      <ThemeToggle />
      {user ? (
        <>
          <Link to="/library" className="navbar__link">مكتبتي</Link>
          <Link to="/favorites" className="navbar__link">المفضلة</Link>
          <Link to="/profile" className="navbar__link">حسابي</Link>
          <button className="navbar__logout" onClick={logout}>تسجيل خروج</button>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar__login">تسجيل دخول</Link>
          <Link to="/register" className="navbar__login navbar__login--outline">حساب جديد</Link>
        </>
      )}
    </div>
  </nav>
);

const Navbar = () => {
  const { user, logout } = useAuth();

  if (user?.role === "admin") {
    return <AdminNavbar logout={logout} />;
  }

  return <PublicNavbar user={user} logout={logout} />;
};

export default Navbar;