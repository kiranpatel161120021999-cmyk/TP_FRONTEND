import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import "../style/header.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Role
  const userRole = localStorage.getItem("userRole");

  // Dashboard route
  const getDashboardPath = () => {
    switch (userRole) {
      case "admin":
        return "/admindashboard";
      case "company":
        return "/company-dashboard";
      default:
        return "/studentdashboard";
    }
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <FaGraduationCap />
          <span>T&P Portal</span>
        </Link>

        {/* NAV */}
        <nav className="nav">
          <Link
            to="/home"
            className={
              location.pathname === "/" || location.pathname === "/home"
                ? "active"
                : ""
            }
          >
            Home
          </Link>

          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/trainings" className={isActive("/trainings")}>Trainings</Link>
          <Link to="/alljobs" className={isActive("/alljobs")}>Jobs</Link>
          <Link to="/companies" className={isActive("/companies")}>Companies</Link>
          <Link to="/resume-intelligence" className={isActive("/resume-intelligence")}>Resume AI</Link>
          <Link to="/mock-interview" className={isActive("/mock-interview")}>Mock Interview</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>

          {/* AUTH */}
          <div className="auth-section">
            {userRole ? (
              <>
                <Link to={getDashboardPath()} className="btn dashboard-btn">
                  Dashboard
                </Link>

                <button onClick={handleLogout} className="btn logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn login-btn">
                Login
              </Link>
            )}
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;