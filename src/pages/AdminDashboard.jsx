import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaUsers, FaBuilding, FaBriefcase, FaFileLines, FaChartPie, 
  FaPenToSquare, FaTrash, FaRightFromBracket, FaMagnifyingGlass, 
  FaGear, FaBell, FaPlus, FaChevronRight, 
  FaUserGraduate, FaCalendarDays, FaRocket, FaGlobe,
  FaArrowTrendUp, FaCheckDouble, FaXmark, FaArrowUpRightFromSquare
} from "react-icons/fa6";

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
    { id: 1, role: "SDE Intern", company: "Google", location: "Bangalore", type: "Full-Time", applicants: 124, status: "Active", salary: "12 LPA" },
    { id: 2, role: "Full Stack Dev", company: "Zomato", location: "Remote", type: "Intern", applicants: 89, status: "Closing", salary: "18 LPA" }
  ]);
  const [drives, setDrives] = useState([
    { id: 1, company: "Microsoft", date: "28 Mar 2024", type: "On-Campus", status: "Upcoming", package: "45 LPA" },
    { id: 2, company: "Amazon", date: "15 Apr 2024", type: "Off-Campus", status: "Open", package: "32 LPA" }
  ]);

  // Form & UI States
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

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
        axios.get("http://localhost:5000/api/students").catch(() => ({ data: [] })),
        axios.get("http://localhost:5000/api/companies").catch(() => ({ data: [] }))
      ]);
      setStudents(Array.isArray(sRes.data) ? sRes.data : []);
      setCompanies(Array.isArray(cRes.data) ? cRes.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  // --- Entity Handlers ---

  const openForm = (type, mode = "add", data = {}) => {
    setModalType(type);
    setIsEditMode(mode === "edit");
    setEditId(data._id || data.id || null);
    setFormData(data);
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'company') {
        if (isEditMode) {
          await axios.put(`http://localhost:5000/api/companies/${editId}`, formData);
        } else {
          await axios.post("http://localhost:5000/api/companies/add", formData);
        }
      }
      setShowAddModal(false);
      setFormData({});
      loadAllData();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === 'company') await axios.delete(`http://localhost:5000/api/companies/${id}`);
        loadAllData();
      } catch (err) { console.error("Delete error:", err); }
    }
  };

  // --- Render Sections ---

  const renderDashboard = () => (
    <div className="pro-content animate-fade-in">
       <div className="pro-welcome-hero">
          <div className="hero-text">
             <h1>Good morning, Admin</h1>
             <p>Placement season is active. You have <strong>12</strong> new registration requests.</p>
          </div>
          <div className="hero-actions">
             <button className="pro-btn pro-btn-secondary"><FaFileLines /> Report 2024</button>
             <button className="pro-btn pro-btn-primary" onClick={() => openForm('company')}><FaPlus /> Onboard Agency</button>
          </div>
       </div>

       <div className="pro-stats-strip">
          <div className="pro-mini-card">
             <div className="mini-icon icon-bg-blue"><FaUsers /></div>
             <div className="mini-data">
                <span className="label">Total Students</span>
                <span className="value">{students.length}</span>
                <span className="trend positive"><FaArrowTrendUp /> 12%</span>
             </div>
          </div>
          <div className="pro-mini-card">
             <div className="mini-icon icon-bg-green"><FaBuilding /></div>
             <div className="mini-data">
                <span className="label">Companies</span>
                <span className="value">{companies.length}</span>
                <span className="trend positive"><FaArrowTrendUp /> 5 new</span>
             </div>
          </div>
          <div className="pro-mini-card">
             <div className="mini-icon icon-bg-purple"><FaBriefcase /></div>
             <div className="mini-data">
                <span className="label">Active Jobs</span>
                <span className="value">{jobs.length}</span>
                <span className="trend">Stable</span>
             </div>
          </div>
          <div className="pro-mini-card">
             <div className="mini-icon icon-bg-orange"><FaCheckDouble /></div>
             <div className="mini-data">
                <span className="label">Placement rate</span>
                <span className="value">84%</span>
                <span className="trend positive">+2%</span>
             </div>
          </div>
       </div>

       <div className="pro-dashboard-grid">
          <div className="pro-card pro-col-2">
             <div className="pro-card-header">
                <h3>Recruitment Velocity</h3>
                <span className="pro-badge pro-badge-success">Live Season</span>
             </div>
             <div className="pro-chart-container">
                <Line 
                   data={{
                     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                     datasets: [{
                        label: 'Interviews',
                        data: [45, 59, 80, 81, 102],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true,
                        tension: 0.4
                     }]
                   }}
                   options={{ maintainAspectRatio: false }}
                />
             </div>
          </div>
          <div className="pro-card">
             <div className="pro-card-header">
                <h3>Hiring Sources</h3>
             </div>
             <div className="pro-chart-container" style={{height:'300px'}}>
                <Doughnut 
                   data={{
                      labels: ['On-Campus', 'Referral', 'Off-Campus'],
                      datasets: [{
                         data: [65, 20, 15],
                         backgroundColor: ['#2563eb', '#9333ea', '#f59e0b'],
                         borderWidth: 0
                      }]
                   }}
                   options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } }}
                />
             </div>
          </div>
       </div>
    </div>
  );

  const renderStudents = () => (
    <div className="pro-content animate-fade-in">
       <div className="pro-page-header">
          <div className="page-info">
             <h2>Student Directory</h2>
             <p>Management of eligible student pool and academic history.</p>
          </div>
          <button className="pro-btn pro-btn-primary" onClick={() => openForm('student')}><FaPlus /> Add Student</button>
       </div>

       <div className="pro-card">
          <div className="pro-table-controls">
             <div className="pro-search">
                <FaMagnifyingGlass />
                <input type="text" placeholder="Search by name, roll or stream..." onChange={(e) => setSearchQuery(e.target.value)} />
             </div>
             <select className="pro-select" onChange={(e) => setFilterCourse(e.target.value)}>
                <option value="All">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
             </select>
          </div>
          <div className="pro-table-wrapper">
             <table className="pro-table">
                <thead>
                   <tr>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th className="pro-text-right">Actions</th>
                   </tr>
                </thead>
                <tbody>
                   {students.filter(s => 
                      ((s.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())) &&
                      (filterCourse === "All" || s.course?.includes(filterCourse))
                   ).map(student => (
                      <tr key={student._id}>
                         <td>
                            <div className="pro-user-cell">
                               <div className="pro-avatar">{student.name?.charAt(0)}</div>
                               <div className="pro-user-info">
                                  <span className="name">{student.name}</span>
                                  <span className="email">{student.email}</span>
                               </div>
                            </div>
                         </td>
                         <td><span className="pro-code">{student._id?.slice(-8).toUpperCase()}</span></td>
                         <td><span className="pro-label">{student.course}</span></td>
                         <td>
                            <span className={`pro-status ${student.placed ? 'status-green' : 'status-blue'}`}>
                               {student.placed ? 'Placed' : 'Ready'}
                            </span>
                         </td>
                         <td className="pro-text-right">
                            <div className="pro-cell-actions">
                               <button className="pro-icon-btn" onClick={() => openForm('student', 'edit', student)}><FaPenToSquare /></button>
                               <button className="pro-icon-btn danger" onClick={() => handleDelete('student', student._id)}><FaTrash /></button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );

  const renderCompanies = () => (
    <div className="pro-content animate-fade-in">
       <div className="pro-page-header">
          <div className="page-info">
             <h2>Corporate Hub</h2>
             <p>Oversee company partnerships and recruiter interactions.</p>
          </div>
          <button className="pro-btn pro-btn-primary" onClick={() => openForm('company')}><FaPlus /> Register Partner</button>
       </div>

       <div className="pro-companies-grid">
          {companies.map(company => (
             <div className="pro-company-card" key={company._id}>
                <div className="pro-card-top">
                   <div className="pro-company-logo">
                      {company.logo ? <img src={company.logo} alt="" /> : company.name?.charAt(0)}
                   </div>
                   <div className="pro-card-actions">
                      <button className="pro-icon-btn" onClick={() => openForm('company', 'edit', company)}><FaPenToSquare /></button>
                      <button className="pro-icon-btn danger" onClick={() => handleDelete('company', company._id)}><FaTrash /></button>
                   </div>
                </div>
                <div className="pro-card-main">
                   <h3>{company.name}</h3>
                   <span className="location"><FaGlobe /> {company.location || 'Global'}</span>
                </div>
                <div className="pro-card-footer">
                   <div className="pro-stat-item">
                      <span className="val">12</span>
                      <span className="lab">Hired</span>
                   </div>
                   <div className="pro-divider"></div>
                   <div className="pro-stat-item">
                      <span className="val">04</span>
                      <span className="lab">Jobs</span>
                   </div>
                   <button className="pro-btn pro-btn-link" onClick={() => { setSelectedCompany(company); setShowAnalyticsModal(true); }}>
                      Analytics <FaArrowUpRightFromSquare />
                   </button>
                </div>
             </div>
          ))}
          <div className="pro-add-card" onClick={() => openForm('company')}>
             <FaPlus />
             <span>Add New Partner</span>
          </div>
       </div>
    </div>
  );

  const renderJobs = () => (
    <div className="pro-content animate-fade-in">
       <div className="pro-page-header">
          <div className="page-info">
             <h2>Job Postings</h2>
             <p>Monitor active vacancies and applicant volumes.</p>
          </div>
          <button className="pro-btn pro-btn-primary"><FaPlus /> Create Job</button>
       </div>
       <div className="pro-card">
          <div className="pro-table-wrapper">
             <table className="pro-table">
                <thead>
                   <tr>
                      <th>Role</th>
                      <th>Company</th>
                      <th>Applicants</th>
                      <th>Status</th>
                      <th className="pro-text-right">Action</th>
                   </tr>
                </thead>
                <tbody>
                   {jobs.map(job => (
                      <tr key={job.id}>
                         <td><span className="pro-label">{job.role}</span></td>
                         <td>{job.company}</td>
                         <td>{job.applicants}</td>
                         <td>
                            <span className={`pro-status ${job.status === 'Active' ? 'status-green' : 'status-blue'}`}>{job.status}</span>
                         </td>
                         <td className="pro-text-right">
                            <div className="pro-cell-actions">
                               <button className="pro-icon-btn"><FaPenToSquare /></button>
                               <button className="pro-icon-btn danger" onClick={() => setJobs(jobs.filter(j => j.id !== job.id))}><FaTrash /></button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );

  const renderDrives = () => (
    <div className="pro-content animate-fade-in">
       <div className="pro-page-header">
          <div className="page-info">
             <h2>Drive Cycles</h2>
             <p>Scheduled campus recruitment and selection events.</p>
          </div>
          <button className="pro-btn pro-btn-primary"><FaPlus /> Schedule Drive</button>
       </div>
       <div className="pro-card">
          <div className="pro-table-wrapper">
             <table className="pro-table">
                <thead>
                   <tr>
                      <th>Company</th>
                      <th>Date</th>
                      <th>Package</th>
                      <th>Status</th>
                   </tr>
                </thead>
                <tbody>
                   {drives.map(drive => (
                      <tr key={drive.id}>
                         <td><span className="pro-label">{drive.company}</span></td>
                         <td>{drive.date}</td>
                         <td>{drive.package}</td>
                         <td>
                            <span className={`pro-status ${drive.status === 'Upcoming' ? 'status-blue' : 'status-green'}`}>{drive.status}</span>
                         </td>
                         <td className="pro-text-right">
                            <div className="pro-cell-actions">
                               <button className="pro-icon-btn"><FaPenToSquare /></button>
                               <button className="pro-icon-btn danger"><FaTrash /></button>
                            </div>
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
      case "drives": return renderDrives();
      default: return (
        <div className="pro-empty-state">
           <FaRocket /> 
           <h3>Module Under Construction</h3>
           <p>This management module is currently being finalized for high-performance use.</p>
           <button className="pro-btn pro-btn-primary" onClick={() => setPage('dashboard')}>Return to Overview</button>
        </div>
      );
    }
  };

  return (
    <div className="pro-admin-layout">
      {/* Sidebar V4 - Dark Pro */}
      <aside className="pro-sidebar">
         <div className="sidebar-brand">
            <div className="brand-dot"></div>
            <span>ADMIN <span>PRO</span></span>
         </div>
         
         <div className="sidebar-section">
            <span className="section-title">Insights</span>
            <div className={`pro-sidebar-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
               <FaChartPie /> <span>Dashboard</span>
            </div>
         </div>

         <div className="sidebar-section">
            <span className="section-title">Management</span>
            <div className={`pro-sidebar-link ${page === 'students' ? 'active' : ''}`} onClick={() => setPage('students')}>
               <FaUserGraduate /> <span>Students</span>
            </div>
            <div className={`pro-sidebar-link ${page === 'companies' ? 'active' : ''}`} onClick={() => setPage('companies')}>
               <FaBuilding /> <span>Companies</span>
            </div>
            <div className={`pro-sidebar-link ${page === 'jobs' ? 'active' : ''}`} onClick={() => setPage('jobs')}>
               <FaBriefcase /> <span>Job Postings</span>
            </div>
            <div className={`pro-sidebar-link ${page === 'drives' ? 'active' : ''}`} onClick={() => setPage('drives')}>
               <FaFileLines /> <span>Drive Cycles</span>
            </div>
         </div>

         <div className="sidebar-section">
            <span className="section-title">Preferences</span>
            <div className={`pro-sidebar-link ${page === 'settings' ? 'active' : ''}`} onClick={() => setPage('settings')}>
               <FaGear /> <span>Infrastructure</span>
            </div>
         </div>

         <div className="sidebar-footer">
            <button className="pro-logout" onClick={handleLogout}>
               <FaRightFromBracket /> <span>Exit Terminal</span>
            </button>
         </div>
      </aside>

      <main className="pro-main">
         <header className="pro-header">
            <div className="pro-header-left">
               <span className="pro-breadcrumb">Portal / Management / <span>{page}</span></span>
            </div>
            <div className="pro-header-right">
               <div className="pro-notif"><FaBell /> <div className="notif-dot"></div></div>
               <div className="pro-divider-v"></div>
               <div className="pro-user-chip">
                  <div className="avatar">AD</div>
                  <div className="details">
                     <span className="name">Super Admin</span>
                     <span className="role">Platform Master</span>
                  </div>
               </div>
            </div>
         </header>

         <div className="pro-container">
            {loading ? (
               <div className="pro-loading">
                  <div className="pro-spinner"></div>
                  <p>Initializing secure protocol...</p>
               </div>
            ) : renderContent()}
         </div>
      </main>

      {/* Corporate Analytics Modal */}
      {showAnalyticsModal && selectedCompany && (
         <div className="pro-overlay" onClick={() => setShowAnalyticsModal(false)}>
            <div className="pro-modal pro-modal-lg" onClick={e => e.stopPropagation()}>
               <div className="modal-header-v4">
                  <div className="header-info">
                     <h3>{selectedCompany.name} Analytics</h3>
                     <p>Recruitment performance overview</p>
                  </div>
                  <button className="close-btn" onClick={() => setShowAnalyticsModal(false)}><FaXmark /></button>
               </div>
               <div className="modal-body-v4">
                  <div className="pro-modal-stats">
                     <div className="stat-unit">
                        <span>Avg Package</span>
                        <strong>14.2 LPA</strong>
                     </div>
                     <div className="stat-unit">
                        <span>Offers Made</span>
                        <strong>24</strong>
                     </div>
                     <div className="stat-unit">
                        <span>Success Rate</span>
                        <strong>18.4%</strong>
                     </div>
                  </div>
                  <div className="modal-chart-v4">
                     <Bar 
                        data={{
                           labels: ['2020', '2021', '2022', '2023', '2024'],
                           datasets: [{
                              label: 'Placements',
                              data: [12, 19, 15, 25, 30],
                              backgroundColor: '#2563eb',
                              borderRadius: 4
                           }]
                        }} 
                        options={{ maintainAspectRatio: false }}
                     />
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
         <div className="pro-overlay" onClick={() => setShowAddModal(false)}>
            <div className="pro-modal" onClick={e => e.stopPropagation()}>
               <div className="modal-header-v4">
                  <h3>{isEditMode ? 'Modify' : 'Register'} {modalType}</h3>
                  <button className="close-btn" onClick={() => setShowAddModal(false)}><FaXmark /></button>
               </div>
               <form className="modal-form-v4" onSubmit={handleSubmit}>
                  <div className="form-group-v4">
                     <label>Full Name / Identifier</label>
                     <input type="text" value={formData.name || ""} required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group-v4">
                     <label>Official Email</label>
                     <input type="email" value={formData.email || ""} required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="modal-actions-v4">
                     <button type="button" className="pro-btn-subtle" onClick={() => setShowAddModal(false)}>Discard</button>
                     <button type="submit" className="pro-btn-primary">{isEditMode ? 'Update Record' : 'Commit Entry'}</button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}

export default AdminDashboard;