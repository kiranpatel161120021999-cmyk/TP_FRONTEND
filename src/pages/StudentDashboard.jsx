import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHome, FaUser, FaBriefcase, FaBuilding, FaFileAlt,
  FaCog, FaSignOutAlt, FaBell, FaSearch, FaChevronRight,
  FaCheckCircle, FaClock, FaCalendarAlt, FaTrophy, 
  FaSyncAlt, FaLaptopCode, FaChartLine, FaRupeeSign, FaGraduationCap, FaEdit
} from "react-icons/fa";
import "../style/studentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "job", title: "New Job Opening: Google", msg: "Google is hiring for SDE Intern role. Apply now!", time: "2 hours ago", read: false },
    { id: 2, type: "app", title: "Application Viewed", msg: "TCS viewed your application for Java Developer.", time: "5 hours ago", read: true },
    { id: 3, type: "event", title: "Mock Interview Tomorrow", msg: "Don't forget your scheduled mock interview at 10:00 AM.", time: "1 day ago", read: false },
    { id: 4, type: "system", title: "System Update", msg: "The placement portal has been updated with new features.", time: "2 days ago", read: true },
  ]);
  
  // Clock Utility
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const email = userInfo?.email;

      if (email) {
        const res = await axios.get(`http://localhost:5000/api/students/profile/${email}`);
        setUser(res.data);
      } else {
        // Just for demo
        setUser({ name: "Demo Student", email: "student@sample.com", course: "B.Tech CSE" });
      }

      const compRes = await axios.get("http://localhost:5000/api/companies");
      setCompanies(compRes.data);

      const jobRes = await axios.get("http://localhost:5000/api/jobs");
      setJobs(jobRes.data);

      if (email) {
        const appRes = await axios.get(`http://localhost:5000/api/applications/user/${email}`);
        setApps(appRes.data);
      }
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditForm({ ...user });
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    try {
      // Assuming endpoint exists for profile update
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(`http://localhost:5000/api/students/profile/${userInfo.email}`, editForm);
      setUser(editForm);
      setIsEditing(false);
      alert("Profile updated successfully! ✨");
    } catch (err) {
      console.error("Save error:", err);
      // Fallback for demo if backend is not ready
      setUser(editForm);
      setIsEditing(false);
      alert("Note: Saved to local state (Demo Mode).");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const userInitials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "ST";

  const renderDashboard = () => (
    <div className="dash-body animate-in">
      <div className="welcome-banner">
        <div className="banner-left">
          <h1>Welcome, {user?.name?.split(" ")[0] || "Student"}! 🎓</h1>
          <p>Your placement portal is up to date. Keep tracking your opportunities.</p>
          <div className="real-time-stats">
            <span className="live-pill"><FaSyncAlt /> Synchronized</span>
            <span className="time-pill">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="stat-cards">
        <div className="mini-card">
          <div className="mini-icon purple"><FaLaptopCode /></div>
          <div className="mini-info">
            <span className="label">Total Applied</span>
            <span className="value">12</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-icon orange"><FaChartLine /></div>
          <div className="mini-info">
            <span className="label">Shortlisted</span>
            <span className="value">04</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-icon green"><FaCheckCircle /></div>
          <div className="mini-info">
            <span className="label">Placed</span>
            <span className="value">01</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-icon blue"><FaTrophy /></div>
          <div className="mini-info">
            <span className="label">Interviews</span>
            <span className="value">03</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="main-feed">
          <div className="data-card">
            <div className="card-header">
              <h3>Recent Job Alerts</h3>
              <button onClick={fetchData} className="refresh-btn"><FaSyncAlt /></button>
            </div>
            <div className="activity-list">
              {jobs.length > 0 ? jobs.map((job, i) => (
                <div key={i} className="job-item">
                  <div className="job-logo">{job.companyId?.name?.[0] || 'J'}</div>
                  <div className="job-details">
                    <strong>{job.companyId?.name || "Company"}</strong>
                    <span>{job.title}</span>
                  </div>
                  <span className="status-tag active">Open</span>
                  <div className="job-time">
                    <button 
                      className="icon-apply-btn" 
                      onClick={() => navigate("/ApplyJob", { state: job })}
                      title="Quick Apply"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="job-item">
                  <div className="job-details">
                    <span>No active job alerts found.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="side-feed">
          <div className="data-card profile-preview">
            <h3>My Quick View</h3>
            <div className="quick-avatar">{userInitials}</div>
            <h4>{user?.name || "Student User"}</h4>
            <p>{user?.course || "Not Set"}</p>
            <div className="badge-row">
              <span className="profile-badge">Verified</span>
              <span className="profile-badge">Premium</span>
            </div>
            <div className="preview-actions">
              <button className="primary-outline-btn" onClick={() => setPage("profile")}>View Full Profile</button>
              <button className="primary-btn-pro" onClick={() => {setPage("profile"); setIsEditing(true)}}>
                <FaEdit /> Edit Now
              </button>
            </div>
          </div>

          <div className="data-card">
            <h3>Upcoming Events</h3>
            <ul className="event-list">
              <li>
                <div className="ev-icon"><FaCalendarAlt /></div>
                <div className="ev-text"><strong>Aptitude Test</strong> <span>Tomorrow, 10 AM</span></div>
              </li>
              <li>
                <div className="ev-icon"><FaClock /></div>
                <div className="ev-text"><strong>GD Round</strong> <span>15 March, 02 PM</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanies = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Corporate Partners</h2>
          <p>Real-time list of campus recruiters and history.</p>
        </div>
        <div className="page-actions">
          <span className="live-badge"><span className="pulse-circle"></span> Live Sync</span>
          <button onClick={fetchData} className="refresh-circle-btn" title="Refresh Data"><FaSyncAlt /></button>
        </div>
      </div>

      <div className="companies-row">
        {companies.length > 0 ? companies.map((c, i) => (
          <div className="company-info-card" key={i}>
            <div className="c-logo">{c.name[0]}</div>
            <div className="c-content">
              <h3>{c.name}</h3>
              <p className="c-sector">{c.sector || "Information Technology"}</p>
              <div className="c-stats">
                <div className="stat-pill"><strong>12</strong> Hired</div>
                <div className="stat-pill"><strong>04</strong> Open</div>
              </div>
            </div>
            <button className="view-btn" onClick={() => setPage("jobs")}>
              View Openings
            </button>
          </div>
        )) : (
          <div className="loading-state-box">
            <div className="loader-mini"></div>
            <p>Fetching corporate directory...</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Active Recruitment Drives</h2>
          <p>Explore real-time job openings matching your profile.</p>
        </div>
        <div className="page-actions">
          <span className="live-badge"><span className="pulse-circle"></span> Live Sync</span>
          <button onClick={fetchData} className="refresh-circle-btn" title="Refresh Data"><FaSyncAlt /></button>
        </div>
      </div>
      <div className="jobs-list-full">
        {jobs.length > 0 ? jobs.map((job, i) => (
          <div key={i} className="data-card job-premium-card">
            <div className="job-premium-main">
              <div className="job-logo-box">{job.companyId?.name?.[0] || 'J'}</div>
              <div className="job-main-info">
                <div className="job-title-row">
                  <h3>{job.title}</h3>
                  <span className="tag-new">Newly Added</span>
                </div>
                <p className="job-comp-link">{job.companyId?.name || "Premium Recruiter"}</p>
                <div className="job-meta-chips">
                  <span className="meta-chip"><FaRupeeSign /> {job.salary || "Competitive"}</span>
                  <span className="meta-chip"><FaGraduationCap /> {job.eligibility || "B.Tech / MCA"}</span>
                  <span className="meta-chip"><FaCalendarAlt /> Results: 2025</span>
                </div>
              </div>
              <div className="job-action-area">
                <div className="deadline-text">Ends: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "20 Mar"}</div>
                <button 
                  className="apply-btn-premium" 
                  onClick={() => navigate("/ApplyJob", { state: job })}
                >
                  View & Apply <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        )) : (
           <div className="loading-state-box">
            <div className="loader-mini"></div>
            <p>Scanning for live opportunities...</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Application Pipeline</h2>
          <p>Track your recruitment status across all drives in real-time.</p>
        </div>
        <div className="page-actions">
          <span className="live-badge"><span className="pulse-circle"></span> Live Sync</span>
          <button onClick={fetchData} className="refresh-circle-btn" title="Refresh Data"><FaSyncAlt /></button>
        </div>
      </div>
      <div className="data-card table-card-pro">
        <table className="modern-pro-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Designation</th>
              <th>Applied Date</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.length > 0 ? apps.map((app, i) => (
              <tr key={i}>
                <td>
                  <div className="table-comp-cell">
                    <div className="cell-logo">{app.companyId?.name?.[0] || app.company?.[0] || 'C'}</div>
                    <strong>{app.companyId?.name || app.company || "Direct Recruitment"}</strong>
                  </div>
                </td>
                <td><span className="role-text">{app.jobId?.title || app.role || "Associated Role"}</span></td>
                <td><span className="date-text">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Pending Sync"}</span></td>
                <td>
                  <div className={`status-pill ${app.status?.toLowerCase() || 'submitted'}`}>
                    <span className="s-dot"></span> {app.status || "Submitted"}
                  </div>
                </td>
                <td><button className="table-action-btn">Track Status</button></td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5">
                  <div className="empty-table-msg">
                    <FaFileAlt />
                    <p>No active applications found. Discover and apply to start tracking.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Notifications Center</h2>
          <p>Stay updated with job alerts, application status, and events.</p>
        </div>
        <button 
          className="refresh-circle-btn" 
          onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
          title="Mark all as read"
        >
          <FaCheckCircle />
        </button>
      </div>

      <div className="notif-layout">
        <div className="data-card notif-card-pro">
          {notifications.length > 0 ? (
            <div className="notif-list-pro">
              {notifications.map(n => (
                <div key={n.id} className={`notif-item-pro ${n.read ? 'read' : 'unread'}`}>
                  <div className={`notif-icon-box ${n.type}`}>
                    {n.type === 'job' && <FaBriefcase />}
                    {n.type === 'app' && <FaFileAlt />}
                    {n.type === 'event' && <FaCalendarAlt />}
                    {n.type === 'system' && <FaCog />}
                  </div>
                  <div className="notif-content-pro">
                    <div className="notif-head">
                      <h4>{n.title}</h4>
                      <span className="notif-time">{n.time}</span>
                    </div>
                    <p>{n.msg}</p>
                  </div>
                  {!n.read && <div className="unread-dot"></div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-notif">
              <FaBell style={{ fontSize: '48px', opacity: '0.2', marginBottom: '15px' }} />
              <p>No new notifications at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>My Student Profile</h2>
          <p>Manage your academic and career details for recruiters.</p>
        </div>
        {!isEditing ? (
          <button className="edit-main-btn" onClick={handleEditToggle}><FaEdit /> Edit Profile</button>
        ) : (
          <div className="edit-actions-top">
             <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
             <button className="save-btn" onClick={handleSaveProfile}>{saveLoading ? "Saving..." : "Save Changes"}</button>
          </div>
        )}
      </div>
      <div className="profile-layout">
        <div className="data-card profile-main-card">
          <div className="profile-banner-pro">
             <div className="banner-badge">Student ID: {user?.id || "STU-882"}</div>
          </div>
          <div className="profile-info-content">
            <div className="profile-avatar-large">{userInitials}</div>
            <div className="profile-main-labels">
               {isEditing ? (
                 <input 
                   className="edit-name-input"
                   name="name"
                   value={editForm.name}
                   onChange={handleEditChange}
                 />
               ) : (
                 <h2>{user?.name || "Student User"}</h2>
               )}
               <p className="profile-sub">{user?.course || "Academic Program"} | Batch {user?.batch || "2025"}</p>
            </div>

            <div className="profile-details-grid edit-mode-grid">
              <div className="detail-box">
                <label>Email Address</label>
                <p className="locked-field">{user?.email}</p>
              </div>
              <div className="detail-box">
                <label>Mobile Number</label>
                {isEditing ? (
                  <input name="con_no" value={editForm.con_no} onChange={handleEditChange} />
                ) : (
                  <p>{user?.con_no || "+91 XXXXX XXXXX"}</p>
                )}
              </div>
              <div className="detail-box">
                <label>Academic Branch</label>
                {isEditing ? (
                  <input name="branch" value={editForm.branch} onChange={handleEditChange} />
                ) : (
                  <p>{user?.branch || "Computer Science"}</p>
                )}
              </div>
              <div className="detail-box">
                <label>Graduation Year</label>
                {isEditing ? (
                  <input name="batch" value={editForm.batch} onChange={handleEditChange} />
                ) : (
                  <p>{user?.batch || "2025"}</p>
                )}
              </div>
              <div className="detail-box">
                <label>Current CGPA</label>
                {isEditing ? (
                  <input name="cgpa" value={editForm.cgpa} onChange={handleEditChange} />
                ) : (
                  <p>{user?.cgpa || "8.5 / 10.0"}</p>
                )}
              </div>
              <div className="detail-box">
                <label>Placement Status</label>
                <p className="locked-field">{user?.placed ? "Placed 🎉" : "Actively Seeking"}</p>
              </div>
            </div>

            <div className="profile-skills-sec">
               <label>Technical Expertise</label>
               {isEditing ? (
                 <textarea 
                   name="skills_text" 
                   value={editForm.skills_text || "React, Node, Python, AWS, SQL"} 
                   onChange={handleEditChange}
                   className="edit-skills-area"
                   placeholder="Enter skills separated by commas..."
                 />
               ) : (
                 <div className="skills-row-pro">
                    {(user?.skills_text || "React.js, Node.js, Python, AWS, SQL").split(",").map((s, i) => (
                      <span key={i} className="skill-tag">{s.trim()}</span>
                    ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <h2>Portal Settings</h2>
        <p>Customize security and notification defaults.</p>
      </div>
      <div className="settings-grid">
        <div className="data-card">
          <h3>Security Center</h3>
          <div className="setting-item">
            <div className="setting-info">
              <strong>Two-Factor Authentication</strong>
              <p>Add an extra layer of security to your account.</p>
            </div>
            <button className="primary-outline-btn" style={{ width: 'auto', padding: '8px 20px' }}>Enable</button>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <strong>Change Portal Password</strong>
              <p>Last changed 3 months ago.</p>
            </div>
            <button className="primary-outline-btn" style={{ width: 'auto', padding: '8px 20px' }}>Update</button>
          </div>
        </div>
        <div className="data-card">
          <h3>Notifications</h3>
          <p style={{ color: 'var(--tp-muted)', fontSize: '14px' }}>Choose what updates you want to receive via email.</p>
          <div className="setting-item">
            <p>New Job Alerts</p>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <p>Interview Schedules</p>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <p>Placement Tips</p>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="fixed-sidebar">
        <div className="sidebar-logo">
          🎓 <span>T&P Portal</span>
        </div>
        
        <nav className="side-nav">
          {[
            { id: "dashboard", icon: <FaHome />, label: "Dashboard" },
            { id: "jobs", icon: <FaBriefcase />, label: "Jobs" },
            { id: "companies", icon: <FaBuilding />, label: "Companies" },
            { id: "applications", icon: <FaFileAlt />, label: "Applications" },
            { id: "notifications", icon: <FaBell />, label: "Notifications" },
            { id: "profile", icon: <FaUser />, label: "Account" },
            { id: "settings", icon: <FaCog />, label: "Settings" },
          ].map(item => (
            <div 
              key={item.id} 
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="main-content-area">
        <header className="top-navbar">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search jobs, notices..." />
          </div>
          <div className="profile-actions">
            <div 
              className="notif-bell clickable-notif" 
              onClick={() => setPage("notifications")}
              title="View Notifications"
            >
              <FaBell /> 
              {notifications.some(n => !n.read) && <span className="dot"></span>}
            </div>
            <div 
              className="nav-profile clickable-profile" 
              onClick={() => setPage("profile")}
              title="Go to Account Settings"
            >
              <span>{user?.name || "Student"}</span>
              <div className="p-avatar">{userInitials}</div>
            </div>
          </div>
        </header>

        <section className="scroll-content">
          {loading && !user ? (
            <div className="loader-container">
              <div className="loader-spin"></div>
              <p>Authenticating Live Data...</p>
            </div>
          ) : (
            <>
              {page === "dashboard" && renderDashboard()}
              {page === "companies" && renderCompanies()}
              {page === "jobs" && renderJobs()}
              {page === "applications" && renderApplications()}
              {page === "notifications" && renderNotifications()}
              {page === "profile" && renderProfile()}
              {page === "settings" && renderSettings()}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;