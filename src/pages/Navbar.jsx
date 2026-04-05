import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaBell, FaChevronDown } from "react-icons/fa";
import "../style/GlobalComponents.css";

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

  // User Info
  const userRole = localStorage.getItem("userRole");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userName = userInfo?.name || "Verified User";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);

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

            {userRole ? (
              <div className="user-nav-section">
                <div className="notif-box">
                  <FaBell />
                  <span className="notif-dot"></span>
                </div>

                <Link to={getDashboardPath()} className="user-badge">
                  <span className="user-name-label">{userName}</span>
                  <div className="avatar-init">{userInitials}</div>
                </Link>

                <button onClick={handleLogout} className="btn logout-btn" style={{marginLeft: '10px'}}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="login-dropdown-wrapper">
                <Link to="/login" className="btn nav-login-btn">
                  Login <FaChevronDown style={{ fontSize: "12px", marginLeft: "4px" }} />
                </Link>
                <div className="login-dropdown-menu">
                  <Link to="/login?role=student" target="_blank">Student Login</Link>
                  <Link to="/login?role=company" target="_blank">TPO / Corporate</Link>
                  <Link to="/login?role=admin" target="_blank">Admin Login</Link>
                </div>
              </div>
            )}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;