import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheck, FaTimes, FaArrowRight, FaGraduationCap, FaBook, FaCalendarAlt } from "react-icons/fa";
import "../style/Login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
    course: "",
    batch: "2024",
  });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
    redirect: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      showPopup(
        "Oops!",
        "Please fill in your name, email, and password to continue.",
        "error",
        null
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          branch: formData.branch.trim(),
          year: formData.year.trim(),
          course: formData.course.trim(),
          batch: formData.batch.trim(),
        }
      );

      showPopup(
        "Registration Successful! 🎉",
        "Your student account has been created. You can now log in to the portal.",
        "success",
        "/login"
      );
    } catch (error) {
      console.log("Signup Error:", error);
      showPopup(
        "Registration Failed",
        error?.response?.data?.message || "Something went wrong. Please check your details and try again.",
        "error",
        null
      );
    }
  };

  const showPopup = (title, message, type, redirect) => {
    setPopup({ show: true, title, message, type, redirect });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
    if (popup.redirect) {
      navigate(popup.redirect);
    }
  };

  return (
    <div className="login-wrapper animate-fade-in">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="container">
        <div className="login-section">
          <div className="login-header">
            <h2>Join the Future</h2>
            <p>Create your profile and unlock your career opportunities.</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label>Full Legal Name</label>
              <div className="input-wrapper">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Academic Email</label>
              <div className="input-wrapper">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="input-group">
                <label>Course</label>
                <div className="input-wrapper">
                  <FaGraduationCap />
                  <input
                    type="text"
                    name="course"
                    placeholder="B.Tech"
                    value={formData.course}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Branch</label>
                <div className="input-wrapper">
                  <FaBook />
                  <input
                    type="text"
                    name="branch"
                    placeholder="CSE"
                    value={formData.branch}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Register Student <FaArrowRight style={{marginLeft:'8px'}} />
            </button>
          </form>

          <div className="footer-text">
            Already have an account?{" "}
            <Link to="/login" className="link">Sign in</Link>
          </div>
          
          <button className="btn-secondary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>

        <div className="image-section">
          <div className="overlay">
            <h2>Bridge to Career Success</h2>
            <p>Join over 5000+ students already placed in top Fortune 500 companies via our portal.</p>
          </div>
        </div>
      </div>

      {popup.show && (
        <div className="popup">
          <div className="popup-box">
             <div className={`popup-icon ${popup.type === 'error' ? 'error' : ''}`}>
               {popup.type === 'error' ? <FaTimes /> : <FaCheck />}
             </div>
             <h3>{popup.title}</h3>
             <p>{popup.message}</p>
             <button className="popup-btn" onClick={closePopup}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;