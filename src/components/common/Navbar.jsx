import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";

import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* Logo */}

        <Link to="/" className="navbar__logo">

          <img
            src="/logo.png"
            alt="Athar"
            className="navbar__logo-image"
          />

          <div className="navbar__logo-content">
            <h2>أثر</h2>
            <span>ATHAR</span>
          </div>

        </Link>

        {/* Navigation */}

        <NavLinks />

        {/* Right Side */}

        <div className="navbar__actions">

          <ThemeToggle />

          <UserMenu />

        </div>

      </div>
    </header>
  );
};

export default Navbar;