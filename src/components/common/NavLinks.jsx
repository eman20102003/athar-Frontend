import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const NavLinks = () => {
  const { user } = useAuth();

  return (
    <nav>
      <ul className="navbar__links">

        <li>
          <NavLink to="/">
            الرئيسية
          </NavLink>
        </li>

        <li>
          <NavLink to="/books">
            الكتب
          </NavLink>
        </li>

        <li>
          <NavLink to="/about">
            من نحن
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact">
            تواصل معنا
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink to="/library">
                مكتبتي
              </NavLink>
            </li>

            <li>
              <NavLink to="/favorites">
                المفضلة
              </NavLink>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <li>
            <NavLink to="/admin">
              لوحة التحكم
            </NavLink>
          </li>
        )}

      </ul>
    </nav>
  );
};

export default NavLinks;