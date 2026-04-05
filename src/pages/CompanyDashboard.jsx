import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHome, FaBriefcase, FaSignOutAlt, FaPlus, FaUsers,
  FaCheckCircle, FaClock, FaChartLine, FaChevronRight, 
  FaTimes, FaMapMarkerAlt, FaRupeeSign, FaBuilding, FaUserTie
} from "react-icons/fa";
import "../style/StudentDashboard.css"; // Reuse premium dashboard styling

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [appFilter, setAppFilter] = useState("All");
  
  // Modals
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", location: "", package: "", type: "Full Time", deadline: "" });

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    // Secure the route
    if (role !== "company") {
      navigate("/");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // Mock data hydration (later wire to actual backend)
    setTimeout(() => {
        setJobs([
            { _id: "j1", title: "Frontend Developer", location: "Remote", package: "12 LPA", type: "Full Time", applicants: 45, deadline: "2026-05-10" },
            { _id: "j2", title: "Backend Engineer", location: "Bangalore", package: "15 LPA", type: "Full Time", applicants: 23, deadline: "2026-06-01" },
        ]);
        setCandidates([
            { _id: "c1", name: "Kiran Patel", email: "kiranpatel161120021999@gmail.com", jobTitle: "Frontend Developer", status: "Submitted", branch: "Computer Engineering", cgpa: "8.5" },
            { _id: "c2", name: "Alice Smith", email: "alice@gmail.com", jobTitle: "Backend Engineer", status: "Shortlisted", branch: "IT", cgpa: "9.1" },
            { _id: "c3", name: "John Doe", email: "john@gmail.com", jobTitle: "Frontend Developer", status: "Interview", branch: "CSE", cgpa: "7.8" },
        ]);
        setLoading(false);
    }, 800);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const jobData = { ...newJob, _id: "j" + Date.now(), applicants: 0 };
    setJobs([jobData, ...jobs]);
    setShowJobModal(false);
    setNewJob({ title: "", location: "", package: "", type: "Full Time", deadline: "" });
  };

  const updateCandidateStatus = (id, newStatus) => {
    if(!newStatus) return;
    setCandidates(candidates.map(c => c._id === id ? { ...c, status: newStatus } : c));
  };

  // --- RENDERS ---

  const renderDashboard = () => (
    <div className="dash-body animate-in">
      <div className="welcome-banner" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 40%, #0284c7 100%)" }}>
        <h1>Welcome back, {user?.name || "Corporate Partner"}!</h1>
        <p>Monitor your active job listings and track top-tier talent easily.</p>
        
        <div className="real-time-stats">
          <div className="time-pill"><FaClock /> {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
          <div className="live-pill"><span className="pulse-circle"></span> System Synced</div>
        </div>
      </div>

      <div className="stat-cards">
        <div className="mini-card" onClick={() => setPage("jobs")} style={{ cursor: "pointer" }}>
          <div className="mini-icon purple"><FaBriefcase /></div>
          <div className="mini-info">
            <span className="label">Active Postings</span>
            <span className="value">{jobs.length}</span>
          </div>
          <FaChevronRight style={{ marginLeft: "auto", color: "#cbd5e1" }} />
        </div>
        
        <div className="mini-card" onClick={() => { setAppFilter("All"); setPage("candidates"); }} style={{ cursor: "pointer" }}>
          <div className="mini-icon blue"><FaUsers /></div>
          <div className="mini-info">
            <span className="label">Total Applicants</span>
            <span className="value">{candidates.length}</span>
          </div>
          <FaChevronRight style={{ marginLeft: "auto", color: "#cbd5e1" }} />
        </div>

        <div className="mini-card" onClick={() => { setAppFilter("Shortlisted"); setPage("candidates"); }} style={{ cursor: "pointer" }}>
          <div className="mini-icon green"><FaCheckCircle /></div>
          <div className="mini-info">
            <span className="label">Shortlisted</span>
            <span className="value">{candidates.filter(c => c.status === "Shortlisted").length}</span>
          </div>
          <FaChevronRight style={{ marginLeft: "auto", color: "#cbd5e1" }} />
        </div>

        <div className="mini-card" onClick={() => { setAppFilter("Interview"); setPage("candidates"); }} style={{ cursor: "pointer" }}>
          <div className="mini-icon orange"><FaUserTie /></div>
          <div className="mini-info">
            <span className="label">Interviews</span>
            <span className="value">{candidates.filter(c => c.status === "Interview").length}</span>
          </div>
          <FaChevronRight style={{ marginLeft: "auto", color: "#cbd5e1" }} />
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Active Job Postings</h2>
          <p>Review the roles currently open for applicants.</p>
        </div>
        <div className="page-actions">
          <button className="apply-btn-premium" onClick={() => setShowJobModal(true)}><FaPlus /> Post New Job</button>
        </div>
      </div>

      <div className="jobs-list-full">
        {jobs.length > 0 ? jobs.map((job, idx) => (
          <div key={idx} className="data-card job-premium-card">
            <div className="job-premium-main">
              <div className="job-logo-box">
                 {user?.name?.[0] || 'C'}
              </div>
              
              <div className="job-main-info">
                <div className="job-title-row">
                  <h3>{job.title}</h3>
                  <span className="tag-new">Hiring Hub</span>
                </div>
                <div className="job-meta-chips">
                  <div className="meta-chip"><FaMapMarkerAlt /> {job.location}</div>
                  <div className="meta-chip"><FaRupeeSign /> {job.package}</div>
                  <div className="meta-chip"><FaBriefcase /> {job.type}</div>
                  <div className="meta-chip"><FaUsers /> {job.applicants} Applicants</div>
                </div>
              </div>
              
              <div className="job-action-area">
                <p className="deadline-text">Deadline: {job.deadline}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="primary-outline-btn">Edit Job</button>
                  <button className="primary-btn-pro" onClick={() => setPage("candidates")}>View Pipeline</button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="empty-table-msg">
            <FaBriefcase />
            <p>You haven't posted any jobs yet.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCandidates = () => {
    const filtered = appFilter === "All" ? candidates : candidates.filter(c => c.status === appFilter);
    return (
      <div className="dash-body animate-in">
        <div className="page-header">
          <div className="header-info">
            <h2>Candidate Pipeline</h2>
            <p>Evaluating talent for your listed jobs.</p>
          </div>
          <div className="page-actions">
            {appFilter !== "All" && (
                <button className="primary-outline-btn" style={{ padding: "8px 15px" }} onClick={() => setAppFilter("All")}>Clear Filter</button>
            )}
            <div className="live-badge"><span className="pulse-circle"></span> {filtered.length} Results</div>
          </div>
        </div>

        <div className="data-card table-card-pro">
          <table className="modern-pro-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Target Role</th>
                <th>Academics</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <strong style={{ fontSize: "15px", color: "#1e293b" }}>{c.name}</strong>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{c.email}</span>
                    </div>
                  </td>
                  <td><span className="role-text">{c.jobTitle}</span></td>
                  <td>
                    <div style={{ fontSize: "13px", color: "#475569" }}>
                      {c.branch} <br/> <strong style={{ color: "#0ea5e9" }}>CGPA: {c.cgpa}</strong>
                    </div>
                  </td>
                  <td>
                    <div className={`status-pill ${c.status?.toLowerCase() || 'submitted'}`}>
                      <span className="s-dot"></span> {c.status}
                    </div>
                  </td>
                  <td>
                    <select 
                      className="primary-outline-btn" 
                      style={{ padding: "6px 10px", width: "130px", fontSize: "12px" }}
                      value={c.status}
                      onChange={(e) => updateCandidateStatus(c._id, e.target.value)}
                    >
                       <option value="Submitted">Submitted</option>
                       <option value="Shortlisted">Shortlist</option>
                       <option value="Interview">Interview</option>
                       <option value="Rejected">Reject</option>
                       <option value="Placed">Hired Target</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5">
                    <div className="empty-table-msg">
                      <FaUsers />
                      <p>No candidates match your current view.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR USING PREMIUM STYLES */}
      <aside className="fixed-sidebar">
        <div className="sidebar-logo">T&P<span>Portal</span><br/><small style={{fontSize: "10px", opacity: 0.7, letterSpacing: "2px", fontWeight: "400"}}>RECRUITER</small></div>
        
        <nav className="side-nav">
          <div className={`nav-item ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>
            <FaHome /> <span>Overview</span>
          </div>
          <div className={`nav-item ${page === "jobs" ? "active" : ""}`} onClick={() => setPage("jobs")}>
            <FaBriefcase /> <span>Manage Postings</span>
          </div>
          <div className={`nav-item ${page === "candidates" ? "active" : ""}`} onClick={() => setPage("candidates")}>
            <FaUsers /> <span>Review Pipeline</span>
          </div>
          <div className={`nav-item ${page === "profile" ? "active" : ""}`} onClick={() => setPage("profile")}>
            <FaBuilding /> <span>Company Profile</span>
          </div>
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* TOP NAV & CONTENT */}
      <main className="main-content-area">
        <header className="top-navbar">
          <div style={{ fontWeight: 800, fontSize: "18px", color: "#1e1b4b" }}>Corporate Gateway</div>
          <div className="profile-actions">
            <div className="nav-profile clickable-profile">
              <div className="p-avatar" style={{ background: "#4338ca" }}>{user?.name?.[0] || 'C'}</div>
              <span>{user?.name || "Corporate Partner"}</span>
            </div>
          </div>
        </header>

        <section className="scroll-content">
          {loading ? (
            <div className="loader-container">
              <div className="loader-spin" style={{ borderTopColor: "#4338ca" }}></div>
              <p>Fetching Campus Data...</p>
            </div>
          ) : (
            <>
              {page === "dashboard" && renderDashboard()}
              {page === "jobs" && renderJobs()}
              {page === "candidates" && renderCandidates()}
            </>
          )}
        </section>
      </main>

      {/* POST JOB MODAL (REUSING TRACKING MODAL STYLES FOR CONSISTENCY) */}
      {showJobModal && (
        <div className="tracking-modal-overlay animate-fade">
          <div className="tracking-modal-content" style={{ maxWidth: "600px" }}>
            <button className="close-tracking-btn" onClick={() => setShowJobModal(false)}><FaTimes /></button>
            <h3>Create Job Listing</h3>
            <p className="app-sub-info">Broadcast a new recruitment position to students.</p>
            
            <form onSubmit={handlePostJob} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Job Title</label>
                  <input type="text" required style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "8px", border: "1px solid #cbd5e1" }} value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Software Engineer" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Location</label>
                  <input type="text" required style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "8px", border: "1px solid #cbd5e1" }} value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="e.g. Bangalore, Remote" />
                </div>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Package</label>
                  <input type="text" required style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "8px", border: "1px solid #cbd5e1" }} value={newJob.package} onChange={e => setNewJob({...newJob, package: e.target.value})} placeholder="e.g. 10 LPA" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Type</label>
                  <select style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "8px", border: "1px solid #cbd5e1" }} value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                    <option>Full Time</option>
                    <option>Internship</option>
                    <option>Part Time</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>Application Deadline</label>
                <input type="date" required style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "8px", border: "1px solid #cbd5e1" }} value={newJob.deadline} onChange={e => setNewJob({...newJob, deadline: e.target.value})} />
              </div>
              <button type="submit" className="save-btn" style={{ marginTop: "15px", padding: "14px", justifyContent: "center", fontSize: "16px" }}>
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CompanyDashboard;
