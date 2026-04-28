import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHome, FaBriefcase, FaSignOutAlt, FaPlus, FaUsers,
  FaCheckCircle, FaClock, FaChartLine, FaChevronRight,
  FaTimes, FaMapMarkerAlt, FaRupeeSign, FaBuilding, FaUserTie,
  FaFilter
} from "react-icons/fa";
import "../style/CompanyDashboard.css";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [appFilter, setAppFilter] = useState("All");
  const [showJobModal, setShowJobModal] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [subStatus, setSubStatus] = useState("Active");
  const [billingPage, setBillingPage] = useState("overview");
  const [newJob, setNewJob] = useState({ title: "", location: "", package: "", type: "Full Time", deadline: "" });
  const [editJobData, setEditJobData] = useState(null); // null = closed

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "company") { navigate("/"); return; }
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setUser(userInfo);
    setTimeout(() => {
      setJobs([
        { _id: "j1", title: "Frontend Developer", location: "Remote", package: "12 LPA", type: "Full Time", applicants: 45, deadline: "2026-05-10" },
        { _id: "j2", title: "Backend Engineer", location: "Bangalore", package: "15 LPA", type: "Full Time", applicants: 23, deadline: "2026-06-01" },
        { _id: "j3", title: "Data Analyst", location: "Hyderabad", package: "10 LPA", type: "Full Time", applicants: 18, deadline: "2026-05-20" },
      ]);
      setCandidates([
        { _id: "c1", name: "Kiran Patel", email: "kiran@example.com", jobTitle: "Frontend Developer", status: "Submitted", branch: "Computer Engineering", cgpa: "8.5" },
        { _id: "c2", name: "Alice Smith", email: "alice@example.com", jobTitle: "Backend Engineer", status: "Shortlisted", branch: "IT", cgpa: "9.1" },
        { _id: "c3", name: "John Doe", email: "john@example.com", jobTitle: "Frontend Developer", status: "Interview", branch: "CSE", cgpa: "7.8" },
        { _id: "c4", name: "Priya Sharma", email: "priya@example.com", jobTitle: "Data Analyst", status: "Placed", branch: "CSE", cgpa: "9.4" },
      ]);
      setLoading(false);
    }, 700);
  }, [navigate]);

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const handlePostJob = (e) => {
    e.preventDefault();
    setJobs([{ ...newJob, _id: "j" + Date.now(), applicants: 0 }, ...jobs]);
    setShowJobModal(false);
    setNewJob({ title: "", location: "", package: "", type: "Full Time", deadline: "" });
  };

  const handleEditJob = (e) => {
    e.preventDefault();
    setJobs(jobs.map(j => j._id === editJobData._id ? { ...editJobData } : j));
    setEditJobData(null);
  };

  const updateCandidateStatus = (id, newStatus) => {
    if (!newStatus) return;
    setCandidates(candidates.map(c => c._id === id ? { ...c, status: newStatus } : c));
  };

  const statusClass = (s) => ({
    "Submitted": "submitted", "Shortlisted": "shortlisted",
    "Interview": "interview", "Rejected": "rejected", "Placed": "placed"
  })[s] || "submitted";

  // DATE
  const dateStr = new Date().toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });

  // ── PAGES ──

  const renderDashboard = () => (
    <div>
      <div className="cd-hero-banner">
        <h1>Welcome back, {user?.name || "Corporate Partner"}!</h1>
        <p>Monitor your active job listings and track top-tier talent — all in one place.</p>
        <div className="cd-hero-pills">
          <div className="cd-hero-pill"><FaClock /> {dateStr}</div>
          <div className="cd-hero-pill"><span className="cd-pulse"></span> System Synced</div>
        </div>
      </div>

      <div className="cd-stat-grid">
        <div className="cd-stat-card" onClick={() => setPage("jobs")}>
          <div className="cd-stat-info">
            <span className="cd-stat-label">Active Postings</span>
            <span className="cd-stat-value">{jobs.length}</span>
          </div>
          <div className="cd-stat-icon purple"><FaBriefcase /></div>
        </div>
        <div className="cd-stat-card" onClick={() => { setAppFilter("All"); setPage("candidates"); }}>
          <div className="cd-stat-info">
            <span className="cd-stat-label">Total Applicants</span>
            <span className="cd-stat-value">{candidates.length}</span>
          </div>
          <div className="cd-stat-icon blue"><FaUsers /></div>
        </div>
        <div className="cd-stat-card" onClick={() => { setAppFilter("Shortlisted"); setPage("candidates"); }}>
          <div className="cd-stat-info">
            <span className="cd-stat-label">Shortlisted</span>
            <span className="cd-stat-value">{candidates.filter(c => c.status === "Shortlisted").length}</span>
          </div>
          <div className="cd-stat-icon green"><FaCheckCircle /></div>
        </div>
        <div className="cd-stat-card" onClick={() => { setAppFilter("Interview"); setPage("candidates"); }}>
          <div className="cd-stat-info">
            <span className="cd-stat-label">In Interview</span>
            <span className="cd-stat-value">{candidates.filter(c => c.status === "Interview").length}</span>
          </div>
          <div className="cd-stat-icon orange"><FaUserTie /></div>
        </div>
      </div>

      {/* Recent Jobs Preview */}
      <div className="cd-section-header">
        <div>
          <div className="cd-section-title">Recent Postings</div>
          <div className="cd-section-sub">Your most recently created job listings</div>
        </div>
        <button className="cd-btn-primary" onClick={() => setPage("jobs")}>
          View All <FaChevronRight />
        </button>
      </div>

      <div className="cd-jobs-grid">
        {jobs.slice(0, 2).map((job, i) => (
          <div className="cd-job-card" key={i}>
            <div className="cd-job-avatar">{(user?.name?.[0] || "C")}</div>
            <div className="cd-job-info">
              <div className="cd-job-title">{job.title}</div>
              <div className="cd-job-chips">
                <span className="cd-chip"><FaMapMarkerAlt />{job.location}</span>
                <span className="cd-chip"><FaRupeeSign />{job.package}</span>
                <span className="cd-chip"><FaBriefcase />{job.type}</span>
                <span className="cd-chip"><FaUsers />{job.applicants} Applicants</span>
              </div>
            </div>
            <div className="cd-job-meta">
              <span className="cd-deadline">Deadline: {new Date(job.deadline).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
              <button className="cd-btn-outline" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={() => setPage("candidates")}>
                View Pipeline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJobs = () => (
    <div>
      <div className="cd-section-header">
        <div>
          <div className="cd-section-title">Manage Job Postings</div>
          <div className="cd-section-sub">Review, edit, and manage all your active listings</div>
        </div>
      </div>

      {jobs.length > 0 ? (
        <div className="cd-jobs-grid">
          {jobs.map((job, i) => (
            <div className="cd-job-card" key={i}>
              <div className="cd-job-avatar">{(user?.name?.[0] || "C")}</div>
              <div className="cd-job-info">
                <div className="cd-job-title">{job.title}</div>
                <div className="cd-job-chips">
                  <span className="cd-chip"><FaMapMarkerAlt />{job.location}</span>
                  <span className="cd-chip"><FaRupeeSign />{job.package}</span>
                  <span className="cd-chip"><FaBriefcase />{job.type}</span>
                  <span className="cd-chip"><FaUsers />{job.applicants} Applicants</span>
                </div>
              </div>
              <div className="cd-job-meta">
                <span className="cd-deadline">Deadline: {new Date(job.deadline).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
                <div className="cd-job-actions">
                  <button className="cd-btn-outline" style={{ padding: "8px 14px", fontSize: "13px" }} onClick={() => setEditJobData({...job})}>Edit</button>
                  <button className="cd-btn-primary" style={{ padding: "8px 14px", fontSize: "13px" }} onClick={() => setPage("candidates")}>Pipeline</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cd-empty">
          <FaBriefcase />
          <p>No job postings yet. Click "Post New Job" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderCandidates = () => {
    const tabs = ["All", "Submitted", "Shortlisted", "Interview", "Placed", "Rejected"];
    const filtered = appFilter === "All" ? candidates : candidates.filter(c => c.status === appFilter);

    return (
      <div>
        <div className="cd-section-header">
          <div>
            <div className="cd-section-title">Candidate Pipeline</div>
            <div className="cd-section-sub">Review, evaluate and move candidates through your hiring stages</div>
          </div>
          <div className="cd-live-badge">
            <span className="cd-pulse"></span> {filtered.length} Results
          </div>
        </div>

        <div className="cd-filter-tabs">
          {tabs.map(t => (
            <button
              key={t}
              className={`cd-filter-tab ${appFilter === t ? "active" : ""}`}
              onClick={() => setAppFilter(t)}
            >{t}</button>
          ))}
        </div>

        <div className="cd-table-card">
          <table className="cd-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Applied For</th>
                <th>Academics</th>
                <th>Status</th>
                <th>Update Stage</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className="cd-candidate-name">{c.name}</div>
                    <div className="cd-candidate-email">{c.email}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.jobTitle}</td>
                  <td>
                    <div style={{ fontSize: "13px", color: "#64748b" }}>{c.branch}</div>
                    <div className="cd-cgpa">CGPA: {c.cgpa}</div>
                  </td>
                  <td>
                    <div className={`cd-status-pill ${statusClass(c.status)}`}>
                      <span className="cd-status-dot"></span> {c.status}
                    </div>
                  </td>
                  <td>
                    <select
                      className="cd-status-select"
                      value={c.status}
                      onChange={e => updateCandidateStatus(c._id, e.target.value)}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Placed">Hired</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5">
                    <div className="cd-empty">
                      <FaUsers />
                      <p>No candidates match this filter.</p>
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

  const renderProfile = () => (
    <div className="cd-dashboard-view animate-in">
      <div className="cd-section-header">
        <div>
          <div className="cd-section-title">Company Profile</div>
          <div className="cd-section-sub">Manage your corporate identity and public details</div>
        </div>
        <button className="cd-btn-primary"><FaBuilding /> Edit Profile</button>
      </div>

      <div className="cd-profile-layout">
        {/* Main Column */}
        <div className="cd-profile-main-col">
          <div className="cd-profile-card">
            <div className="cd-profile-banner"></div>
            <div className="cd-profile-content">
              <div className="cd-profile-header-strip">
                 <div className="cd-profile-avatar-large">{user?.name?.[0]?.toUpperCase() || "C"}</div>
                 <div className="cd-profile-actions">
                    <span className="cd-verified-badge"><FaCheckCircle/> Verified Profile</span>
                 </div>
              </div>
              
              <div className="cd-profile-main-info">
                <h2>{user?.name || "Premium Recruiter"}</h2>
                <p className="cd-profile-role">Established Corporate Partner since 2026</p>
              </div>
              
              <div className="cd-profile-section-title">Corporate Details</div>
              
              <div className="cd-profile-grid">
                <div className="cd-profile-field">
                  <label>Company Name</label>
                  <div className="cd-field-value-pro">
                    <FaBuilding className="field-icon"/> 
                    <div>
                      <div className="field-val-text">{user?.name || "Premium Recruiter"}</div>
                      <div className="field-sub-text">Registered Business Name</div>
                    </div>
                  </div>
                </div>
                <div className="cd-profile-field">
                  <label>Corporate Email</label>
                  <div className="cd-field-value-pro">
                    <FaUserTie className="field-icon"/> 
                    <div>
                      <div className="field-val-text">{user?.email || "recruitment@company.com"}</div>
                      <div className="field-sub-text">Primary Contact</div>
                    </div>
                  </div>
                </div>
                <div className="cd-profile-field">
                  <label>Industry</label>
                  <div className="cd-field-value-pro">
                    <FaChartLine className="field-icon" style={{background: '#eff6ff', color: '#2563eb'}}/> 
                    <div>
                      <div className="field-val-text">Information Technology</div>
                      <div className="field-sub-text">Software & Tech Services</div>
                    </div>
                  </div>
                </div>
                <div className="cd-profile-field">
                  <label>Headquarters</label>
                  <div className="cd-field-value-pro">
                    <FaMapMarkerAlt className="field-icon" style={{background: '#fef2f2', color: '#ef4444'}}/> 
                     <div>
                      <div className="field-val-text">Bangalore, India</div>
                      <div className="field-sub-text">Global HQ</div>
                    </div>
                  </div>
                </div>
                <div className="cd-profile-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Company Overview</label>
                  <div className="cd-field-value-pro overview-field">
                    We are a leading tech organization committed to building innovative solutions. We actively recruit top engineering talent and provide an environment built on professional growth, cutting-edge technology, and unparalleled teamwork. Our mission is to accelerate the transition to sustainable digital infrastructure.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="cd-profile-side-col">
          <div className="cd-side-card">
             <h3>Account Status</h3>
             <div className="cd-account-tier" style={subStatus === 'Canceled' ? {background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', boxShadow: 'none'} : {}}>
               <div className="tier-icon" style={subStatus === 'Canceled' ? {color: '#94a3b8'} : {}}>★</div>
               <div className="tier-info">
                 <strong>Enterprise Plan</strong>
                 <span>{subStatus === 'Active' ? 'Active Subscription' : 'Canceled Subscription'}</span>
               </div>
             </div>
             <p className="tier-desc">
               {subStatus === 'Active' ? 'You have unlimited access to post jobs and search candidate pipelines.' : 'Your plan will expire soon. Reactivate to keep unlimited access.'}
             </p>
             <button className="cd-btn-outline" style={{width: '100%', marginTop: '12px'}} onClick={() => { setShowSubscription(true); setBillingPage('overview'); }}>Manage Subscription</button>
          </div>

          <div className="cd-side-card">
             <h3>Recruitment Stats</h3>
             <ul className="cd-stat-list">
               <li><span>Total Jobs Posted</span> <strong>{jobs.length}</strong></li>
               <li><span>Total Applicants</span> <strong>{candidates.length}</strong></li>
               <li><span>Candidates Hired</span> <strong>{candidates.filter(c => c.status === "Placed").length}</strong></li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cd-layout">

      {/* ── SIDEBAR ── */}
      <aside className="cd-sidebar-nav">
        <div className="cd-sidebar-logo">
          <div className="logo-mark">T&P<span>Portal</span></div>
          <span className="logo-tag">Recruiter Hub</span>
        </div>

        <div className="cd-company-info">
          <div className="cd-company-avatar">{user?.name?.[0]?.toUpperCase() || "C"}</div>
          <div>
            <div className="cd-company-name">{user?.name || "Corporate Partner"}</div>
            <div className="cd-company-role">Company Account</div>
          </div>
        </div>

        <nav className="cd-nav">
          <span className="cd-nav-label">Main Menu</span>
          <div className={`cd-nav-item ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>
            <FaHome /> Overview
          </div>
          <div className={`cd-nav-item ${page === "jobs" ? "active" : ""}`} onClick={() => setPage("jobs")}>
            <FaBriefcase /> Manage Postings
          </div>
          <div className={`cd-nav-item ${page === "candidates" ? "active" : ""}`} onClick={() => setPage("candidates")}>
            <FaUsers /> Candidate Pipeline
          </div>

          <div className="cd-nav-divider" />
          <span className="cd-nav-label">Account</span>
          <div className={`cd-nav-item ${page === "profile" ? "active" : ""}`} onClick={() => setPage("profile")}>
            <FaBuilding /> Company Profile
          </div>
          <div className={`cd-nav-item ${page === "analytics" ? "active" : ""}`} onClick={() => setPage("analytics")}>
            <FaChartLine /> Analytics
          </div>
        </nav>

        <div className="cd-sidebar-footer">
          <button className="cd-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="cd-main">
        <header className="cd-topbar">
          <div className="cd-topbar-title">
            {page === "dashboard" ? "Overview" : page === "jobs" ? "Job Postings" : page === "candidates" ? "Candidate Pipeline" : "Company Profile"}
          </div>
          <div className="cd-topbar-right">
            {page === "jobs" && (
              <button className="cd-btn-primary" onClick={() => setShowJobModal(true)}>
                <FaPlus /> Post New Job
              </button>
            )}
            <span className="cd-topbar-date">{dateStr}</span>
            <div className="cd-topbar-avatar">{user?.name?.[0]?.toUpperCase() || "C"}</div>
          </div>
        </header>

        <div className="cd-content">
          {loading ? (
            <div style={{ textAlign: "center", padding: "100px 0", color: "#64748b" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>⏳</div>
              <p style={{ fontWeight: 600 }}>Loading portal data...</p>
            </div>
          ) : (
            <>
              {page === "dashboard" && renderDashboard()}
              {page === "jobs" && renderJobs()}
              {page === "candidates" && renderCandidates()}
              {page === "profile" && renderProfile()}
              {page === "analytics" && (
                <div className="cd-empty" style={{ marginTop: "60px" }}>
                  <FaChartLine />
                  <p>Analytics coming soon.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ── POST JOB MODAL ── */}
      {showJobModal && (
        <div className="cd-modal-overlay" onClick={() => setShowJobModal(false)}>
          <div className="cd-modal" onClick={e => e.stopPropagation()}>
            <button className="cd-modal-close" onClick={() => setShowJobModal(false)}><FaTimes /></button>
            <div className="cd-modal-title">Post a New Job</div>
            <div className="cd-modal-sub">Broadcast a recruitment position to campus students.</div>
            <form onSubmit={handlePostJob}>
              <div className="cd-form-grid">
                <div className="cd-form-group">
                  <label className="cd-label">Job Title</label>
                  <input className="cd-input" required placeholder="e.g. Software Engineer" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                </div>
                <div className="cd-form-group">
                  <label className="cd-label">Location</label>
                  <input className="cd-input" required placeholder="e.g. Bangalore, Remote" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                </div>
                <div className="cd-form-group">
                  <label className="cd-label">Package</label>
                  <input className="cd-input" required placeholder="e.g. 12 LPA" value={newJob.package} onChange={e => setNewJob({...newJob, package: e.target.value})} />
                </div>
                <div className="cd-form-group">
                  <label className="cd-label">Job Type</label>
                  <select className="cd-select" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                    <option>Full Time</option>
                    <option>Internship</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div className="cd-form-group full">
                  <label className="cd-label">Application Deadline</label>
                  <input type="date" className="cd-input" required value={newJob.deadline} onChange={e => setNewJob({...newJob, deadline: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="cd-submit-btn">🚀 Publish Listing</button>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT JOB MODAL ── */}
      {editJobData && (
        <div className="cd-modal-overlay" onClick={() => setEditJobData(null)}>
          <div className="cd-modal" onClick={e => e.stopPropagation()}>
            <button className="cd-modal-close" onClick={() => setEditJobData(null)}><FaTimes /></button>
            <div className="cd-modal-title">Edit Job Listing</div>
            <div className="cd-modal-sub">Update the details for this posting.</div>
            <form onSubmit={handleEditJob}>
              <div className="cd-form-grid">
                <div className="cd-form-group">
                  <label className="cd-label">Job Title</label>
                  <input className="cd-input" required value={editJobData.title} onChange={e => setEditJobData({...editJobData, title: e.target.value})} />
                </div>
                <div className="cd-form-group">
                  <label className="cd-label">Location</label>
                  <input className="cd-input" required value={editJobData.location} onChange={e => setEditJobData({...editJobData, location: e.target.value})} />
                </div>
                <div className="cd-form-group">
                  <label className="cd-label">Package</label>
                  <input className="cd-input" required value={editJobData.package} onChange={e => setEditJobData({...editJobData, package: e.target.value})} />
                </div>
                <div className="cd-form-group">
                  <label className="cd-label">Job Type</label>
                  <select className="cd-select" value={editJobData.type} onChange={e => setEditJobData({...editJobData, type: e.target.value})}>
                    <option>Full Time</option>
                    <option>Internship</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div className="cd-form-group full">
                  <label className="cd-label">Application Deadline</label>
                  <input type="date" className="cd-input" required value={editJobData.deadline} onChange={e => setEditJobData({...editJobData, deadline: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="cd-submit-btn">💾 Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* ── SUBSCRIPTION MODAL ── */}
      {showSubscription && (
        <div className="cd-modal-overlay" onClick={() => setShowSubscription(false)}>
          <div className="cd-modal" style={{maxWidth: '450px', textAlign: 'center'}} onClick={e => e.stopPropagation()}>
            <button className="cd-modal-close" onClick={() => setShowSubscription(false)}><FaTimes /></button>
            
            {billingPage === "overview" && (
              <>
                <div className="tier-icon" style={{margin: '0 auto 16px', background: '#fef3c7', color: '#d97706', width: '60px', height: '60px', fontSize: '28px'}}>★</div>
                <div className="cd-modal-title">Enterprise Plan</div>
                <div className="cd-modal-sub" style={{marginBottom: '24px'}}>Your corporate subscription is {subStatus === 'Active' ? 'perfectly active' : 'canceled and will not renew'}.</div>
                
                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid #e2e8f0', textAlign: 'left'}}>
                   <h4 style={{marginBottom: '6px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Billing Cycle</h4>
                   <p style={{color: subStatus === 'Active' ? '#16a34a' : '#ef4444', fontWeight: '900', fontSize: '22px', marginBottom: '16px'}}>
                     {subStatus} <span style={{fontSize: '14px', color: '#94a3b8', fontWeight: '500'}}>{subStatus === 'Active' ? 'Billed Annually' : 'Ends Jan 01'}</span>
                   </p>
                   
                   <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px dashed #cbd5e1', paddingBottom: '10px', marginBottom: '10px'}}>
                      <span style={{color: '#64748b'}}>Plan Limit</span>
                      <strong style={{color: '#1e293b'}}>Unlimited Posts</strong>
                   </div>
                   <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
                      <span style={{color: '#64748b'}}>{subStatus === 'Active' ? 'Renewal Date' : 'Access Until'}</span>
                      <strong style={{color: '#1e293b'}}>01 Jan 2027</strong>
                   </div>
                </div>
                
                <button className="cd-submit-btn" style={{marginTop: '0'}} onClick={() => setBillingPage('hub')}>
                  Open Secure Billing Hub
                </button>
              </>
            )}

            {billingPage === "hub" && (
                <div style={{textAlign: 'left', animation: 'fadeIn 0.2s ease'}}>
                   <h2 style={{fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: '#1e293b'}}>Billing Hub</h2>
                   
                   <div style={{marginBottom: '20px'}}>
                     <h3 style={{fontSize: '12px', color: '#64748b', marginBottom: '10px', textTransform:'uppercase', fontWeight: 700}}>Payment Method</h3>
                     <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc'}}>
                        <div style={{background: '#1e293b', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'}}>VISA</div>
                        <div>
                          <div style={{fontWeight: '700', fontSize: '14px', color: '#1e293b'}}>•••• •••• •••• 4242</div>
                          <div style={{fontSize: '12px', color: '#64748b'}}>Expires 12/28</div>
                        </div>
                     </div>
                   </div>

                   <div style={{marginBottom: '28px'}}>
                     <h3 style={{fontSize: '12px', color: '#64748b', marginBottom: '10px', textTransform:'uppercase', fontWeight: 700}}>Recent Invoices</h3>
                     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0'}}>
                        <span style={{fontSize: '14px', fontWeight: '600', color: '#1e293b'}}>Jan 01, 2026</span>
                        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                          <span style={{fontSize: '14px', fontWeight: '700'}}>$1,200.00</span>
                          <span style={{fontSize: '12px', background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '100px', fontWeight: '700'}}>Paid</span>
                        </div>
                     </div>
                   </div>

                   <div style={{display: 'flex', gap: '12px'}}>
                     {subStatus === 'Active' ? (
                       <button className="cd-btn-outline" style={{flex: 1, borderColor: '#ef4444', color: '#ef4444'}} onClick={() => {
                         setSubStatus("Canceled");
                         setBillingPage("overview");
                       }}>Cancel Plan</button>
                     ) : (
                       <button className="cd-btn-primary" style={{flex: 1, background: '#16a34a', border: 'none'}} onClick={() => {
                         setSubStatus("Active");
                         setBillingPage("overview");
                       }}>Reactivate Plan</button>
                     )}
                     <button className="cd-btn-outline" style={{flex: 1}} onClick={() => setBillingPage("overview")}>Back</button>
                   </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
