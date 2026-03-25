import React from 'react';
import { Link } from 'react-router-dom';
import '../style/GlobalComponents.css';

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="home-container footer-grid">
        <div className="foot-col">
          <h3>🎓 T&amp;P Portal</h3>
          <p>Your trusted Training &amp; Placement partner, bridging students with dream careers since 2022.</p>
        </div>
        <div className="foot-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/trainings">Trainings</Link></li>
            <li><Link to="/alljobs">All Jobs</Link></li>
            <li><Link to="/companies">Companies</Link></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Tools</h4>
          <ul>
            <li><Link to="/mock-interview">Mock Interview</Link></li>
            <li><Link to="/java-mcq">Java MCQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Admin Login</Link></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Contact</h4>
          <p>📍 XXXXX Street, Mars City</p>
          <p>📞 (123) 456-7890</p>
          <p>✉️ info@tpsystem.com</p>
        </div>
      </div>
      <div className="foot-bottom">
        <p>© 2026 Training &amp; Placement System | Designed with ❤️ by Khushi</p>
      </div>
    </footer>
  );
};

export default Footer;
