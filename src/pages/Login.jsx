import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { FaEnvelope, FaLock, FaCheck, FaTimes, FaRocket, FaShieldAlt, FaKey } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import "../style/Login.css";

const Login = () => {
  const [authStep, setAuthStep] = useState(0); // 0: Google Start, 1: Email/Pass, 2: OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
    redirect: null,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action") || "";
  const portalCtx = searchParams.get("role") || "student";

  // GOOGLE LOGIN SUCCESS
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/google-login", {
        credential: credentialResponse.credential,
      });

      let effectiveRole = response.data.role;
      if (portalCtx === "admin") effectiveRole = "admin";
      if (portalCtx === "company") effectiveRole = "company";

      localStorage.setItem("userRole", effectiveRole);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);

      let basePath = searchParams.get("redirect");
      if (!basePath) {
        basePath = effectiveRole === "admin" ? "/admindashboard" : (effectiveRole === "company" ? "/company-dashboard" : "/studentdashboard");
      }
      const finalPath = action ? `${basePath}?action=${action}` : basePath;
      
      if (action === "enroll") {
        // For enrollment, bypass the popup for a truly "direct" experience
        navigate(finalPath);
      } else {
        showPopup("Success ✅", "Google login successful! Redirecting...", "success", finalPath);
      }
    } catch (error) {
      showPopup("Auth Failed", error?.response?.data?.message || "Google login failed.", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleError = () => {
    showPopup("Auth Error", "Google Login could not be initialized.", "error");
  };

  // STEP 1 -> 2 (Send OTP)
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      showPopup("Incomplete", "Please provide both email and password.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email: email.trim() });
      showPopup("Notice 📧", response.data.message || "A verification code has been generated. Check your console/inbox.", "success");
      setAuthStep(2);
    } catch (error) {
      showPopup("Error", error?.response?.data?.message || "Failed to send OTP. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 -> FINISH (Verify OTP)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: email.trim(),
        password: password.trim(),
        otp: otp.trim()
      });

      let effectiveRole = response.data.role;
      if (portalCtx === "admin") effectiveRole = "admin";
      if (portalCtx === "company") effectiveRole = "company";

      localStorage.setItem("userRole", effectiveRole);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user.id);

      let basePath = searchParams.get("redirect");
      if (!basePath) {
        basePath = effectiveRole === "admin" ? "/admindashboard" : (effectiveRole === "company" ? "/company-dashboard" : "/studentdashboard");
      }
      const finalPath = action ? `${basePath}?action=${action}` : basePath;
      
      if (action === "enroll") {
        // For enrollment, bypass the popup for a truly "direct" experience
        navigate(finalPath);
      } else {
        showPopup("Success ✅", "Identity verified.", "success", finalPath);
      }
    } catch (error) {
      showPopup("Verification Failed", error?.response?.data?.message || "Invalid OTP. Please try again.", "error");
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
    <div className={`login-wrapper animate-fade-in theme-${portalCtx}`}>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="container">
        <div className="login-section">
          <div className="login-header">
            <h2>
              {authStep === 2 
                ? "Verify Identity" 
                : (portalCtx === "company" ? "Corporate Portal" 
                  : (portalCtx === "admin" ? "Admin Gateway" : "Student Login"))}
            </h2>
            <p>
              {authStep === 0 && (portalCtx === "company" ? "Connect with top students seamlessly." : "Start your professional journey with a single click.")}
              {authStep === 2 && "Enter the 6-digit code sent to your academic email."}
            </p>
          </div>

          <div className="auth-step-container">
            {/* STEP 0: UNIFIED AUTHORIZATION */}
            {authStep === 0 && (
              <div className="step-0-view reveal-in">
                <div style={{ width: '100%', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="filled_blue"
                    shape="pill"
                    size="large"
                    text="continue_with"
                    width="400"
                  />
                </div>

                <div className="divider-v5"><span>OR CONTINUE WITH EMAIL</span></div>

                <form onSubmit={handleSendOTP}>
                  <div className="input-group">
                    <label>Institutional Email</label>
                    <div className="input-wrapper">
                      <FaEnvelope />
                      <input
                        type="email"
                        placeholder="name@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Security Password</label>
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

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Initializing..." : "Proceed to Verify"} <FaShieldAlt style={{ marginLeft: '8px' }} />
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: OTP INPUT */}
            {authStep === 2 && (
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

                <button type="button" className="btn-link" onClick={() => setAuthStep(0)} style={{marginTop:'16px', display:'block', margin:'16px auto', border:'none', background:'none', color:'#64748b', cursor:'pointer', fontWeight:'600'}}>
                  ← Back to Login
                </button>
                <p style={{textAlign: 'center', marginTop: '8px', fontSize: '13px', color: '#64748b'}}>
                  Didn't get the code? <span style={{color: 'var(--auth-primary)', cursor: 'pointer', fontWeight: 600}}>Resend OTP</span>
                </p>
              </form>
            )}
          </div>

          <div className="footer-text" style={{marginTop:'32px'}}>
            By continuing, you agree to our <span className="link">Terms of Service</span>
          </div>

          <button className="btn-secondary" onClick={() => navigate("/")} style={{marginTop:'20px'}}>
            Return to Portal
          </button>
        </div>

        <div className="image-section">
          <div className="overlay">
            <div className={`step-badge step-${authStep}`}>STEP 0{authStep + 1}</div>
            <h2>{authStep === 2 ? "Encryption Verified" : "Secure Auth Gateway"}</h2>
            <p>We use 256-bit SSL encryption to ensure your placement data and credentials remain private and secure.</p>
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
