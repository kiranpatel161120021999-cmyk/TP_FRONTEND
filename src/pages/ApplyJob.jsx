import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEdit,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaBriefcase
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/ApplyJob.css";

function ApplyJob() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIX: Prevent crash on refresh
  const job =
    location.state || JSON.parse(localStorage.getItem("selectedJob")) || { title: "Position", company: "Company", location: "Remote", type: "Full Time", id: "0" };

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    resume: null,
    coverLetter: "",
    portfolio: "",
    phone: "",
  });

  const [isReviewing, setIsReviewing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ Auto-fill user data
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setForm((prev) => ({
        ...prev,
        name: userInfo.name || "",
        email: userInfo.email || "",
      }));
    }
  }, []);

  // ❌ No job fallback
  if (!job) {
    return (
      <div className="apply-error-container">
        <FaExclamationTriangle className="err-icon" />
        <h2>No Job Data Received</h2>
        <button onClick={() => navigate("/studentdashboard")}>
          Go Back
        </button>
      </div>
    );
  }

  // ✅ Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ File validation (PDF only)
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      setError("Only PDF files allowed.");
      return;
    }

    setError("");
    setForm((prev) => ({ ...prev, resume: file }));
  };

  // ✅ Review validation
  const handleReview = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill all required fields.");
      return;
    }

    if (!form.resume) {
      setError("Please upload your resume.");
      return;
    }

    setError("");
    setIsReviewing(true);
  };

  // ✅ FINAL SUBMIT
  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      data.append("company", job.companyId?.name || job.company);
      data.append("role", job.title || job.role);
      data.append("location", job.location || "Remote");

      // ✅ FIX: removed unused res + added headers
      await axios.post(
        "http://localhost:5000/api/applications/applyjob",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/studentdashboard");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS UI
  if (success) {
    return (
      <div className="apply-success-overlay">
        <div className="success-box">
          <FaCheckCircle className="check-icon" />
          <h2>Application Submitted!</h2>
          <p>
            Applied for <strong>{job.title}</strong> at{" "}
            <strong>{job.companyId?.name}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="apply-view animate-fade">
        <div className="apply-layout">
          
          <header className="apply-header">
            <button className="back-circle" onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </button>
            <div className="header-text">
              <h1>Apply for {job.title}</h1>
              <p>{job.companyId?.name || job.company}</p>
            </div>
          </header>

          <div className="apply-main">
            {!isReviewing ? (
              <div className="form-card">
                <div className="job-summary-strip">
                  <div className="strip-item"><FaMapMarkerAlt /> {job.location || "Remote"}</div>
                  <div className="strip-item"><FaBriefcase /> {job.type || "Full Time"}</div>
                  <div className="strip-item"><FaFileAlt /> {job.id || "ID-9012"}</div>
                </div>

                <form className="premium-form" onSubmit={handleReview}>
                  {error && <div className="error-alert"><FaExclamationTriangle /> {error}</div>}
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label><FaUser /> Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label><FaEnvelope /> Email Address</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label><FaPhone /> Phone Number</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label><FaMapMarkerAlt /> Address</label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="City, State, Country"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Resume (PDF Only)</label>
                    <div className={`file-upload-zone ${form.resume ? 'has-file' : ''}`}>
                      <label htmlFor="resume-upload">
                        <FaCloudUploadAlt className="upload-icon" />
                        {form.resume ? (
                          <span>📄 {form.resume.name}</span>
                        ) : (
                          <span>Click or Drag to Upload Resume</span>
                        )}
                        <input 
                          id="resume-upload"
                          type="file" 
                          accept=".pdf" 
                          onChange={handleFileChange} 
                          hidden
                        />
                      </label>
                      {form.resume && (
                        <button className="remove-file" onClick={() => setForm(f => ({...f, resume: null}))}>
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cover Letter (Optional)</label>
                    <textarea
                      name="coverLetter"
                      value={form.coverLetter}
                      onChange={handleChange}
                      placeholder="Why do you want to join us?"
                      className="rich-text"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="btn-primary-large">Review Application <FaArrowLeft style={{transform: 'rotate(180deg)', marginLeft: '8px'}} /></button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="review-card">
                <h2>Review Your Application</h2>
                <p className="review-sub">Please verify your details before final submission.</p>

                <div className="review-grid">
                  <div className="review-item"><label>Name</label><p>{form.name}</p></div>
                  <div className="review-item"><label>Email</label><p>{form.email}</p></div>
                  <div className="review-item"><label>Phone</label><p>{form.phone}</p></div>
                  <div className="review-item"><label>Address</label><p>{form.address}</p></div>
                  <div className="review-item full"><label>Resume File</label><p>📄 {form.resume?.name}</p></div>
                </div>

                <div className="review-actions">
                  <button className="btn-edit" onClick={() => setIsReviewing(false)}>
                    <FaEdit /> Edit Details
                  </button>
                  <button className="btn-final-submit" onClick={submitForm} disabled={loading}>
                    {loading ? "Submitting..." : "Confirm & Send Application"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;