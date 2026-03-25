import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaCheck, FaTimes, FaUserAlt, FaRocket } from "react-icons/fa";
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
    redirect: null,
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      showPopup("Missing Credentials", "Enter both your registered email and password.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      // Store identity session
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      const targetPath = response.data.role === "admin" ? "/admindashboard" : "/studentdashboard";

      showPopup(
        "Welcome Back! 👋",
        response.data.message || "Login successful. Accessing your dashboard...",
        "success",
        targetPath
      );
    } catch (error) {
      console.log("Login Error:", error);
      showPopup(
        "Access Denied",
        error?.response?.data?.message || "Invalid credentials or server unavailable.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showPopup = (title, message, type, redirect = null) => {
    setPopup({ show: true, title, message, type, redirect });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, show: false }));
    if (popup.redirect) navigate(popup.redirect);
  };

  return (
    <div className="login-wrapper animate-fade-in">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="container">
        <div className="login-section">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to manage your training & placements.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Registered Email</label>
              <div className="input-wrapper">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="name@university.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Secret Password</label>
              <div className="input-wrapper">
                <FaLock />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#64748b' }}>
                <input type="checkbox" style={{ accentColor: 'var(--auth-primary)' }} /> Remember me
              </label>
              <Link to="/forgot-password" style={{ color: 'var(--auth-primary)', fontWeight: 600, textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Authenticating..." : "Sign Into Portal"} <FaRocket style={{ marginLeft: '8px' }} />
            </button>
          </form>

          <div className="footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="link">Register for free</Link>
          </div>

          <button className="btn-secondary" onClick={() => navigate("/")}>
            Return to Homepage
          </button>
        </div>

        <div className="image-section">
          <div className="overlay">
            <h2>Accelerate Your Career</h2>
            <p>Connect with top recruiters, track your applications, and participate in campus drives seamlessly.</p>
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

export default Login;
