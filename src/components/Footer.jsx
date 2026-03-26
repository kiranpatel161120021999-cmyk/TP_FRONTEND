import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="home-container footer-grid">
        <div className="foot-col">
          <h3>🎓 T&P Portal</h3>
          <p>
            The ultimate bridge between academic excellence and industry leadership. 
            Empowering students with AI-driven tools since 2022.
          </p>
          <div className="foot-socials">
            <a href="https://linkedin.com" className="foot-social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://github.com" className="foot-social-icon" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://twitter.com" className="foot-social-icon" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>

        <div className="foot-col">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/home">Home Dashboard</Link></li>
            <li><Link to="/about">Our Foundation</Link></li>
            <li><Link to="/trainings">Expert Trainings</Link></li>
            <li><Link to="/alljobs">Career Openings</Link></li>
            <li><Link to="/companies">Top Recruiters</Link></li>
          </ul>
        </div>

        <div className="foot-col">
          <h4>Intelligence</h4>
          <ul>
            <li><Link to="/mock-interview">Mock Interview AI</Link></li>
            <li><Link to="/resume-intelligence">Resume Analytics</Link></li>
            <li><Link to="/java-mcq">Java Assessments</Link></li>
            <li><Link to="/contact">Support Center</Link></li>
            <li><Link to="/login">Faculty Portal</Link></li>
          </ul>
        </div>

        <div className="foot-col">
          <h4>Get in Touch</h4>
          <div className="foot-contact-info">
            <div className="foot-contact-item">
              <FaMapMarkerAlt />
              <p>123 Tech Avenue, Innovation District, MC 45201</p>
            </div>
            <div className="foot-contact-item">
              <FaPhoneAlt />
              <p>+1 (555) 987-6543</p>
            </div>
            <div className="foot-contact-item">
              <FaEnvelope />
              <p>contact@tp-portal.edu</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="foot-bottom">
        <p>© 2026 Training & Placement Management System | Crafted with <span>❤️</span> for Excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
