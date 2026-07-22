import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen, Heart, User, LogOut, LogIn, UserPlus, Library, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../../styles/common/Navbar.css";

const AdminNavbar = ({ logout, menuOpen, setMenuOpen }) => (
  <nav className="navbar">
    <Link to="/admin" className="navbar__logo">
      <BookOpen size={22} strokeWidth={2.2} />
      أثر <span className="navbar__logo-tag">لوحة التحكم</span>
    </Link>

    <button className="navbar__burger" onClick={() => setMenuOpen((v) => !v)} aria-label="القائمة">
      {menuOpen ? <X size={22} /> : <Menu size={22} />}
    </button>

    <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
      <li><NavLink to="/admin" end className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>نظرة عامة</NavLink></li>
      <li><NavLink to="/admin/books" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>الكتب</NavLink></li>
      <li><NavLink to="/admin/categories" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>التصنيفات</NavLink></li>
      <li><NavLink to="/admin/orders" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>الطلبات</NavLink></li>
      <li><NavLink to="/admin/users" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>المستخدمون</NavLink></li>
      <li><NavLink to="/admin/reviews" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>التعليقات</NavLink></li>
      <li className="navbar__mobile-only">
        <button className="navbar__logout" onClick={logout}><LogOut size={16} /> خروج</button>
      </li>
    </ul>

    <div className="navbar__actions navbar__desktop-only">
      <ThemeToggle />
      <button className="navbar__logout" onClick={logout}><LogOut size={16} /> خروج</button>
    </div>

    <div className="navbar__mobile-theme">
      <ThemeToggle />
    </div>
  </nav>
);

const PublicNavbar = ({ user, logout, menuOpen, setMenuOpen }) => (
  <nav className="navbar">
    <Link to="/" className="navbar__logo">
      <BookOpen size={22} strokeWidth={2.2} />
      أثر
    </Link>

    <button className="navbar__burger" onClick={() => setMenuOpen((v) => !v)} aria-label="القائمة">
      {menuOpen ? <X size={22} /> : <Menu size={22} />}
    </button>

    <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
      <li><NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} onClick={() => setMenuOpen(false)}>الرئيسية</NavLink></li>
     
      <li><Link to="/#featured" className="navbar__link" onClick={() => setMenuOpen(false)}>المميزة</Link></li>
      <li><Link to="/#popular" className="navbar__link" onClick={() => setMenuOpen(false)}>الأشهر</Link></li>
      <li><Link to="/#most-read" className="navbar__link" onClick={() => setMenuOpen(false)}>الأكثر قراءة</Link></li>
      <li><Link to="/#about" className="navbar__link" onClick={() => setMenuOpen(false)}>من نحن</Link></li>
      <li><Link to="/#contact" className="navbar__link" onClick={() => setMenuOpen(false)}>تواصل معنا</Link></li>

      {user && (
        <>
          <li className="navbar__mobile-only"><Link to="/library" className="navbar__link" onClick={() => setMenuOpen(false)}>مكتبتي</Link></li>
          <li className="navbar__mobile-only"><Link to="/favorites" className="navbar__link" onClick={() => setMenuOpen(false)}>المفضلة</Link></li>
          <li className="navbar__mobile-only"><Link to="/profile" className="navbar__link" onClick={() => setMenuOpen(false)}>حسابي</Link></li>
          <li className="navbar__mobile-only">
            <button className="navbar__logout" onClick={logout}><LogOut size={16} /> خروج</button>
          </li>
        </>
      )}
      {!user && (
        <li className="navbar__mobile-only navbar__mobile-auth">
          <Link to="/login" className="navbar__login" onClick={() => setMenuOpen(false)}><LogIn size={16} /> دخول</Link>
          <Link to="/register" className="navbar__login navbar__login--outline" onClick={() => setMenuOpen(false)}><UserPlus size={16} /> حساب جديد</Link>
        </li>
      )}
    </ul>

    <div className="navbar__actions navbar__desktop-only">
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

    <div className="navbar__mobile-theme">
      <ThemeToggle />
    </div>
  </nav>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (user?.role === "admin") {
    return <AdminNavbar logout={logout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
  }

  return <PublicNavbar user={user} logout={logout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
};

export default Navbar;