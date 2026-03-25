import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaUsers, FaBuilding, FaBriefcase, FaFileAlt, FaChartPie, 
  FaChartBar, FaEdit, FaTrash, FaSignOutAlt, FaSearch, 
  FaUserCircle, FaCog, FaBell, FaPlus, FaTrophy, 
  FaArrowUp, FaArrowDown, FaBuilding as FaCompany,
  FaTimes, FaChevronRight, FaUserGraduate, FaCalendarAlt
} from "react-icons/fa";

import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend, ArcElement, PointElement, LineElement
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "../style/AdminDashboard.css";

// Register ChartJS plugins
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, 
  Legend, ArcElement, PointElement, LineElement
);

function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // Data States
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([
    { id: 1, role: "SDE Intern", company: "Google", location: "Bangalore", type: "Internship", applicants: 124, status: "Active" },
    { id: 2, role: "Full Stack Developer", company: "Zomato", location: "Remote", type: "Full-Time", applicants: 89, status: "Closing Soon" }
  ]);
  const [applications, setApplications] = useState([
    { id: 1, student: "Rahul Verma", company: "TCS", role: "Developer", status: "Selected", date: "12 Mar 2024" },
    { id: 2, student: "Sneha Kapur", company: "Wipro", role: "Analyst", status: "Pending", date: "11 Mar 2024" },
    { id: 3, student: "Amit Singh", company: "Infosys", role: "QA Engineer", status: "Rejected", date: "10 Mar 2024" }
  ]);

  // Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'student' or 'company'
  const [formData, setFormData] = useState({});

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        axios.get("http://localhost:5000/api/students"),
        axios.get("http://localhost:5000/api/companies")
      ]);
      setStudents(sRes.data || []);
      setCompanies(cRes.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // --- Chart Configs ---
  const barData = {
    labels: ["CSE", "IT", "ECE", "MECH", "CIVIL"],
    datasets: [{
      label: 'Placements 2024',
      data: [45, 38, 25, 15, 10],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderRadius: 12,
      borderSkipped: false,
    }]
  };

  const doughnutData = {
    labels: ['Placed', 'Ongoing', 'Unplaced'],
    datasets: [{
      data: [65, 20, 15],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      hoverOffset: 10,
      borderWidth: 0
    }]
  };

  // --- Render Helpers ---

  const renderDashboard = () => (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div className="premium-card" style={{
        background: 'linear-gradient(135deg, var(--admin-primary), var(--admin-secondary))',
        padding: '32px',
        color: 'white',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{position:'relative', zIndex: 1}}>
          <h2 style={{fontSize:'28px', marginBottom:'8px'}}>Welcome back, Admin!</h2>
          <p style={{opacity: 0.9, maxWidth: '500px'}}>The placement season is at its peak. You have 12 new company registrations and 45 student applications to review today.</p>
        </div>
        <FaChartBar style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-20px',
          fontSize: '150px',
          opacity: 0.1,
          transform: 'rotate(-15deg)'
        }} />
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="premium-stat-card">
          <div className="stat-main">
            <h4>Total Students</h4>
            <div className="stat-value">{students.length || 0}</div>
            <div className="stat-trend trend-up"><FaArrowUp /> 12% vs last month</div>
          </div>
          <div className="stat-icon-wrapper icon-purple"><FaUsers /></div>
        </div>
        <div className="premium-stat-card">
          <div className="stat-main">
            <h4>Partner Companies</h4>
            <div className="stat-value">{companies.length || 0}</div>
            <div className="stat-trend trend-up"><FaArrowUp /> 5 new this week</div>
          </div>
          <div className="stat-icon-wrapper icon-blue"><FaBuilding /></div>
        </div>
        <div className="premium-stat-card">
          <div className="stat-main">
            <h4>Active Job Roles</h4>
            <div className="stat-value">{jobs.length}</div>
            <div className="stat-trend trend-down"><FaArrowDown /> 2% vs yesterday</div>
          </div>
          <div className="stat-icon-wrapper icon-pink"><FaBriefcase /></div>
        </div>
        <div className="premium-stat-card">
          <div className="stat-main">
            <h4>Placement Rate</h4>
            <div className="stat-value">85%</div>
            <div className="stat-trend trend-up"><FaTrophy /> Goal reached</div>
          </div>
          <div className="stat-icon-wrapper icon-green"><FaArrowUp /></div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="premium-card">
          <div className="card-header">
            <h3>Department Performance</h3>
            <div style={{display:'flex', gap:'8px'}}>
               <span className="badge badge-info">2024 Batch</span>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        <div className="premium-card">
          <div className="card-header">
            <h3>Placement Status</h3>
          </div>
          <div className="chart-container" style={{height:'300px', padding:'20px'}}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, cutout: '70%' }} />
          </div>
          <div style={{padding:'0 24px 24px'}}>
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
                <span className="text-muted" style={{fontSize:'13px'}}>Placed Students</span>
                <span style={{fontWeight:700}}>65%</span>
             </div>
             <div style={{width:'100%', height:'6px', background:'#f1f5f9', borderRadius:'3px'}}>
                <div style={{width:'65%', height:'100%', background:'#10b981', borderRadius:'3px'}}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="premium-card animate-fade-in shadow-lg">
      <div className="card-header" style={{flexDirection:'column', alignItems:'stretch', gap:'20px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
           <h2>Student Directory</h2>
           <button className="btn-premium btn-primary" onClick={() => { setModalType('student'); setShowAddModal(true); }}>
            <FaPlus /> Add New Student
          </button>
        </div>
        
        <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
           <div className="search-box-header" style={{flex:'1', minWidth:'250px'}}>
              <FaSearch className="search-nav-icon" />
              <input 
                type="text" 
                className="search-input-header" 
                placeholder="Search by name, email or roll..." 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <select className="premium-input" style={{width:'200px'}} onChange={(e) => setFilterCourse(e.target.value)}>
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
           </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Basic Info</th>
              <th>Course & Batch</th>
              <th>Progress</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(searchQuery || filterCourse !== "All" ? students.filter(s => 
              (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
              (filterCourse === "All" || s.course.includes(filterCourse))
            ) : students).map(student => (
              <tr key={student._id}>
                <td>
                   <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                      <div className="nav-avatar" style={{width:'40px', height:'40px', fontSize:'14px'}}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-strong">{student.name}</div>
                        <div className="text-muted text-xs">ID: ST-2024-00{student._id.slice(-2)}</div>
                      </div>
                   </div>
                </td>
                <td>
                   <div className="text-strong">{student.course}</div>
                   <div className="text-muted text-xs">{student.batch} Batch</div>
                </td>
                <td>
                  <span className={`badge ${student.placed ? 'badge-success' : 'badge-info'}`}>
                    {student.placed ? "Placed" : "Job Hunting"}
                  </span>
                </td>
                <td>{student.email}</td>
                <td>
                   <div style={{display:'flex', gap:'8px'}}>
                      <button className="btn-premium btn-outline btn-icon-only" title="Edit Profile"><FaEdit /></button>
                      <button className="btn-premium btn-outline btn-icon-only" style={{color:'var(--admin-danger)'}} title="Delete"><FaTrash /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCompanies = () => (
    <div className="animate-fade-in">
       <div className="page-header" style={{display:'flex', justifyContent:'space-between', marginBottom:'32px', alignItems:'center'}}>
         <div>
            <h2 style={{fontSize:'24px'}}>Company Ecosystem</h2>
            <p className="text-muted">Manage corporate partners and campus drive history</p>
         </div>
         <button className="btn-premium btn-primary" onClick={() => { setModalType('company'); setShowAddModal(true); }}>
           <FaPlus /> Direct Onload
         </button>
       </div>

       <div className="companies-grid">
         {companies.map(company => (
           <div className="company-card-new" key={company._id}>
              <div className="company-logo-large">
                {company.logo ? <img src={company.logo} alt="" style={{width:'100%', height:'100%', borderRadius:'20px'}} /> : company.name.charAt(0)}
              </div>
              <h3>{company.name}</h3>
              <p className="text-muted"><FaSearch style={{marginRight:'6px', verticalAlign:'middle'}} /> {company.location || "Global HQ"}</p>
              
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', margin:'20px 0'}}>
                 <div style={{padding:'10px', background:'#f8fafc', borderRadius:'12px'}}>
                    <div style={{fontSize:'12px', color:'var(--admin-text-secondary)'}}>Open Jobs</div>
                    <div style={{fontSize:'16px', fontWeight:700}}>04</div>
                 </div>
                 <div style={{padding:'10px', background:'#f8fafc', borderRadius:'12px'}}>
                    <div style={{fontSize:'12px', color:'var(--admin-text-secondary)'}}>Hired</div>
                    <div style={{fontSize:'16px', fontWeight:700}}>12</div>
                 </div>
              </div>

              <div style={{display:'flex', gap:'12px'}}>
                <button className="btn-premium btn-primary" style={{flex:1}}>Connect</button>
                <button className="btn-premium btn-outline" style={{flex:1}}>Details</button>
              </div>
           </div>
         ))}

         {/* Empty State Card */}
         <div className="company-card-new" style={{borderStyle:'dashed', display:'flex', flexDirection:'column', justifyContent:'center', minHeight:'300px'}}>
            <div className="company-logo-large" style={{background:'var(--admin-bg)', border:'none'}}>
               <FaPlus style={{color:'#94a3b8'}} />
            </div>
            <p className="text-muted">Register an new corporate partner to begin campus drives.</p>
         </div>
       </div>
    </div>
  );

  const renderJobs = () => (
    <div className="animate-fade-in">
      <div className="page-header" style={{display:'flex', justifyContent:'space-between', marginBottom:'24px'}}>
        <h2>Active Job Postings</h2>
        <button className="btn-premium btn-primary"><FaPlus /> Create Job</button>
      </div>
      
      <div className="premium-card">
         <div className="table-wrapper">
            <table className="premium-table">
               <thead>
                 <tr>
                   <th>Role & Company</th>
                   <th>Location</th>
                   <th>Type</th>
                   <th>Applicants</th>
                   <th>Status</th>
                   <th>Actions</th>
                 </tr>
               </thead>
               <tbody>
                  {jobs.map(job => (
                    <tr key={job.id}>
                      <td>
                         <div className="text-strong">{job.role}</div>
                         <div className="text-muted text-xs">{job.company}</div>
                      </td>
                      <td>{job.location}</td>
                      <td><span className="badge badge-info">{job.type}</span></td>
                      <td>
                         <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <div style={{flex:1, background:'#f1f5f9', height:'6px', borderRadius:'3px', minWidth:'60px'}}>
                               <div style={{width:'70%', background:'var(--admin-primary)', height:'100%', borderRadius:'3px'}}></div>
                            </div>
                            <span style={{fontSize:'12px', fontWeight:600}}>{job.applicants}</span>
                         </div>
                      </td>
                      <td>
                         <span className={`badge ${job.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                           {job.status}
                         </span>
                      </td>
                      <td>
                        <button className="btn-premium btn-outline btn-icon-only"><FaChevronRight /></button>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (page) {
      case "dashboard": return renderDashboard();
      case "students": return renderStudents();
      case "companies": return renderCompanies();
      case "jobs": return renderJobs();
      case "settings": return (
        <div className="settings-container animate-fade-in">
           <div className="page-header" style={{marginBottom:'32px'}}>
              <h2 style={{fontSize:'28px'}}>Portal Settings</h2>
              <p className="text-muted">Global configuration for Training & Placement platform</p>
           </div>
           
           <div className="premium-card" style={{padding:'0'}}>
              <div style={{padding:'32px', borderBottom:'1px solid var(--admin-border)'}}>
                <h4 className="settings-section-title">Registration Controls</h4>
                <div className="setting-row">
                   <div className="setting-info">
                     <h5>Public Student Registration</h5>
                     <p>Allow new students to sign up via the public portal landing page</p>
                   </div>
                   <label className="switch">
                     <input type="checkbox" defaultChecked />
                     <span className="slider"></span>
                   </label>
                </div>
                <div className="setting-row">
                   <div className="setting-info">
                     <h5>Automatic Profile Verification</h5>
                     <p>Verify students automatically using their academic email domain</p>
                   </div>
                   <label className="switch">
                     <input type="checkbox" />
                     <span className="slider"></span>
                   </label>
                </div>
              </div>

              <div style={{padding:'32px'}}>
                <h4 className="settings-section-title">Notification & Alerts</h4>
                <div className="setting-row">
                   <div className="setting-info">
                     <h5>Job Posting Emails</h5>
                     <p>Send automated HTML email alerts when companies post new roles</p>
                   </div>
                   <label className="switch">
                     <input type="checkbox" defaultChecked />
                     <span className="slider"></span>
                   </label>
                </div>
                <div className="setting-row">
                   <div className="setting-info">
                     <h5>Admin Digest</h5>
                     <p>Weekly performance report sent to administrator emails</p>
                   </div>
                   <label className="switch">
                     <input type="checkbox" defaultChecked />
                     <span className="slider"></span>
                   </label>
                </div>
              </div>

              <div style={{padding:'24px 32px', background:'#f8fafc', display:'flex', justifyContent:'flex-end'}}>
                 <button className="btn-premium btn-primary">Save Platform Config</button>
              </div>
           </div>
        </div>
      );
      default: return <div>Coming Soon...</div>;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar shadow-2xl">
        <div className="sidebar-header">
           <div className="sidebar-logo">
             <div className="logo-box">TP</div>
             <div className="logo-text">Premium Portal</div>
           </div>
        </div>

        <nav className="sidebar-nav">
           <div className="nav-section-title">Analytics</div>
           <ul className="nav-list">
             <li className="nav-item">
               <div className={`nav-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
                  <FaChartPie className="nav-icon" /> Overview
               </div>
             </li>
           </ul>

           <div className="nav-section-title">Management</div>
           <ul className="nav-list">
             <li className="nav-item">
               <div className={`nav-link ${page === 'students' ? 'active' : ''}`} onClick={() => setPage('students')}>
                  <FaUserGraduate className="nav-icon" /> Students
               </div>
             </li>
             <li className="nav-item">
               <div className={`nav-link ${page === 'companies' ? 'active' : ''}`} onClick={() => setPage("companies")}>
                  <FaBuilding className="nav-icon" /> Companies
               </div>
             </li>
           </ul>

           <div className="nav-section-title">Ecosystem</div>
           <ul className="nav-list">
             <li className="nav-item">
               <div className={`nav-link ${page === 'jobs' ? 'active' : ''}`} onClick={() => setPage('jobs')}>
                 <FaBriefcase className="nav-icon" /> Job Postings
               </div>
             </li>
             <li className="nav-item">
               <div className="nav-link"><FaFileAlt className="nav-icon" /> Drive Cycles</div>
             </li>
           </ul>

           <div className="nav-section-title">Settings</div>
           <ul className="nav-list">
             <li className="nav-item">
               <div className={`nav-link ${page === 'settings' ? 'active' : ''}`} onClick={() => setPage('settings')}>
                 <FaCog className="nav-icon" /> Configuration
               </div>
             </li>
           </ul>
        </nav>

        <div className="sidebar-footer">
           <button className="btn-premium btn-outline" style={{width:'100%', borderColor:'rgba(239, 68, 68, 0.4)', color:'#ef4444'}} onClick={handleLogout}>
             <FaSignOutAlt /> Terminate Session
           </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="admin-main">
        <header className="admin-header shadow-sm">
           <div className="header-left">
             <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <div style={{width:'4px', height:'24px', background:'var(--admin-primary)', borderRadius:'2px'}}></div>
                <h1 style={{textTransform:'capitalize'}}>{page} Control</h1>
             </div>
           </div>
           <div className="header-right">
              <div className="search-box-header">
                <FaSearch className="search-nav-icon" />
                <input type="text" className="search-input-header" placeholder="Global search..." />
              </div>
              
              <div className="premium-card" style={{padding:'8px 12px', display:'flex', alignItems:'center', gap:'12px', border:'1px solid var(--admin-border)'}}>
                 <FaBell style={{fontSize:'18px', color:'var(--admin-text-secondary)', cursor:'pointer'}} />
                 <div style={{width:'1px', height:'20px', background:'var(--admin-border)'}}></div>
                 <div className="user-profile-nav">
                    <div className="nav-avatar" style={{width:'32px', height:'32px', fontSize:'12px', background:'var(--admin-primary)', color:'white'}}>AD</div>
                    <div className="user-info-text" style={{display:'none'}}>
                      <span style={{fontSize:'13px', fontWeight:'700'}}>Admin</span>
                    </div>
                 </div>
              </div>
           </div>
        </header>

        <div className="content-area">
          {loading ? (
            <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px'}}>
               <div className="spinner-modern"></div>
               <p className="text-muted animate-pulse">Synchronizing platform data...</p>
            </div>
          ) : renderContent()}
        </div>
      </main>

      {/* Modals with Animation Overlay */}
      {showAddModal && (
        <div className="premium-overlay" onClick={() => setShowAddModal(false)}>
           <div className="premium-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                   <div className="logo-box" style={{width:'32px', height:'32px', fontSize:'14px'}}>
                      {modalType === 'student' ? <FaUserGraduate /> : <FaCompany />}
                   </div>
                   <h3 style={{fontSize:'20px'}}>{modalType === 'student' ? 'Register New Student' : 'Onboard Partner Company'}</h3>
                </div>
                <button className="btn-premium btn-outline btn-icon-only" onClick={() => setShowAddModal(false)}><FaTimes /></button>
              </div>
              <div className="modal-body">
                <form className="premium-form">
                   <div className="form-group">
                      <label className="form-label">{modalType === 'student' ? 'Full Legal Name' : 'Registered Business Name'}</label>
                      <input type="text" className="premium-input" placeholder="Type here..." required />
                   </div>
                   <div className="form-group">
                      <label className="form-label">Professional Email Address</label>
                      <input type="email" className="premium-input" placeholder="admin@domain.com" required />
                   </div>
                   {modalType === 'student' && (
                     <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Academic Stream</label>
                          <select className="premium-input">
                             <option>B.Tech CSE</option>
                             <option>B.Tech IT</option>
                             <option>M.Tech AI</option>
                             <option>MBA Marketing</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Graduation Year</label>
                          <input type="number" className="premium-input" defaultValue="2024" />
                        </div>
                     </div>
                   )}
                   {modalType === 'company' && (
                      <div className="form-group">
                        <label className="form-label">Industry Sector</label>
                        <input type="text" className="premium-input" placeholder="e.g. Fintech, SaaS, EdTech" />
                      </div>
                   )}
                </form>
              </div>
              <div className="modal-footer" style={{background:'#f8fafc', borderBottomLeftRadius:'16px', borderBottomRightRadius:'16px'}}>
                 <button className="btn-premium btn-outline" onClick={() => setShowAddModal(false)}>Discard</button>
                 <button className="btn-premium btn-primary shadow-md">Complete Registration</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;