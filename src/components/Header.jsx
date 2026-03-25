import React from 'react';
import { Link } from 'react-router-dom';
import '../style/globalComponents.css';

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
          <Link to="/login" className="nav-login-btn">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
