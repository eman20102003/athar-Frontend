import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const UserMenu = () => {

  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="navbar__guest">

        <Link
          to="/login"
          className="navbar__login-btn"
        >
          تسجيل الدخول
        </Link>

        <Link
          to="/register"
          className="navbar__register-btn"
        >
          إنشاء حساب
        </Link>

      </div>
    );
  }

  return (
    <div className="navbar__user">

      <button className="navbar__user-button">

        <span className="navbar__avatar">
          {user.name.charAt(0).toUpperCase()}
        </span>

        <span>{user.name}</span>

      </button>

      <div className="navbar__dropdown">

        <Link to="/profile">
          الملف الشخصي
        </Link>

        <Link to="/library">
          مكتبتي
        </Link>

        <Link to="/favorites">
          المفضلة
        </Link>

        {user.role === "admin" && (
          <Link to="/admin">
            لوحة التحكم
          </Link>
        )}

        <button
          onClick={logout}
          className="navbar__logout-btn"
        >
          تسجيل الخروج
        </button>

      </div>

    </div>
  );
};

export default UserMenu;