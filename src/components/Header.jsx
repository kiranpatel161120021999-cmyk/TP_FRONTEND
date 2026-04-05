import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import '../style/GlobalComponents.css';

const Header = () => {
  return (
    <header className="home-header">
      <div className="home-container header-flex">
        <div className="logo">🎓 T&amp;P Portal</div>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/trainings">Trainings</Link>
          <Link to="/alljobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/contact">Contact</Link>
          
          {(() => {
            const userRole = localStorage.getItem("userRole");
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            const userName = userInfo?.name;
            const userInitials = userName ? userName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "";

            if (userRole && userName) {
              return (
                <div className="user-nav-section">
                  <Link to="/profile" className="user-badge">
                    <div className="avatar-init">{userInitials}</div>
                    <span className="user-name-label">{userName}</span>
                  </Link>
                  <button 
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }} 
                    className="nav-logout-btn"
                    style={{
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      marginLeft: '10px'
                    }}
                  >
                    Logout
                  </button>
                </div>
              );
            }

            return (
              <div className="login-dropdown-wrapper">
                <Link to="/login" className="nav-login-btn">
                  Login <FaChevronDown style={{ fontSize: "12px", marginLeft: "4px" }} />
                </Link>
                <div className="login-dropdown-menu">
                  <Link to="/login?role=student" target="_blank">Student Login</Link>
                  <Link to="/login?role=company" target="_blank">TPO / Corporate</Link>
                  <Link to="/login?role=admin" target="_blank">Admin Login</Link>
                </div>
              </div>
            );
          })()}
        </nav>
      </div>
    </header>
  );
};

export default Header;
