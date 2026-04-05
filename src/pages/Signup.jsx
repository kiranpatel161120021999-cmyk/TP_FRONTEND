import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheck, FaTimes, FaArrowRight, FaGraduationCap, FaBook, FaCalendarAlt, FaKey, FaRocket } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import "../style/Login.css";

const Signup = () => {
  const [authStep, setAuthStep] = useState(0); // 0: Form, 1: OTP
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
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

  // STEP 0 -> 1: SEND OTP
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      showPopup("Oops!", "Please fill in your name, email, and password to continue.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { 
        email: formData.email.trim() 
      });
      showPopup("Verify Email 📧", response.data.message || "Enter the 6-digit code sent to your academic inbox.", "success");
      setAuthStep(1);
    } catch (error) {
      showPopup("Registration Error", error?.response?.data?.message || "Failed to start registration. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 1 -> FINISH: VERIFY OTP & REGISTER
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        otp: otp.trim(),
        ...formData
      });

      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);

      showPopup("Success ✅", "Profile verified. Welcome to the portal!", "success", "/studentdashboard");
    } catch (error) {
      showPopup("Verification Failed", error?.response?.data?.message || "Invalid or expired OTP. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE SIGNUP SUCCESS
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/google-login", {
        credential: credentialResponse.credential,
      });

      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);

      showPopup("Success ✅", "Google registration successful! Redirecting...", "success", "/studentdashboard");
    } catch (error) {
      showPopup("Auth Failed", error?.response?.data?.message || "Google registration failed.", "error");
    }
  };

  const handleGoogleError = () => {
    showPopup("Auth Error", "Google Login could not be initialized.", "error");
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
            <h2>{authStep === 1 ? "Verify Identity" : "Join the Future"}</h2>
            <p>
              {authStep === 0 && "Create your profile and unlock your career opportunities."}
              {authStep === 1 && "Final step: Enter the verification code sent to your email."}
            </p>
          </div>

          <div className="auth-step-container">
            {/* STEP 0: REGISTRATION FORM */}
            {authStep === 0 && (
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

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Initializing..." : "Proceed to Verify"} <FaArrowRight style={{marginLeft:'8px'}} />
                </button>

                <div className="divider-v5">
                  <span>OR</span>
                </div>

                <div style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="filled_blue"
                    shape="pill"
                    size="large"
                    text="signup_with"
                    width="100%"
                  />
                </div>
              </form>
            )}

            {/* STEP 1: OTP VERIFICATION */}
            {authStep === 1 && (
              <form onSubmit={handleVerifyOTP} className="reveal-in">
                <div className="input-group">
                  <label>6-Digit Verification Code</label>
                  <div className="input-wrapper">
                    <FaKey />
                    <input
                      type="text"
                      placeholder="000 000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                      required
                      style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '24px' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Verifying..." : "Complete Registration"} <FaRocket style={{ marginLeft: '8px' }} />
                </button>

                <button type="button" className="btn-link" onClick={() => setAuthStep(0)} style={{marginTop:'16px', display:'block', margin:'16px auto'}}>
                  ← Back to Details
                </button>

                <p style={{textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b'}}>
                  Didn't get the code? <span style={{color: 'var(--auth-primary)', cursor: 'pointer', fontWeight: 600}}>Resend OTP</span>
                </p>
              </form>
            )}
          </div>

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
            <div className={`step-badge step-${authStep}`}>STEP 0{authStep + 1}</div>
            <h2>{authStep === 1 ? "Email Verification" : "Bridge to Career Success"}</h2>
            <p>{authStep === 1 ? "We've sent a unique 6-digit code to ensure the security of your new professional account." : "Join over 5000+ students already placed in top Fortune 500 companies via our portal."}</p>
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