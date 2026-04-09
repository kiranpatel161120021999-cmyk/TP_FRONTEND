import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { 
  FileText, Upload, Trash2, RefreshCcw, Search, CheckCircle, 
  XCircle, Loader2, Users, Building, Briefcase, Plus, Edit, 
  Trash, LogOut, ChevronRight, Navigation, Shield, Mail, Key,
  MapPin, Layers, DollarSign, Calendar, Cpu, Image, Award, Type
} from 'lucide-react';
import { FaChartPie, FaUsers, FaBuilding, FaBriefcase, FaSignOutAlt, FaPlus, FaSearch } from "react-icons/fa";
import "../style/AdminDashboard.css"; 

function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editJobModal, setEditJobModal] = useState(null); // null = closed, job obj = open

  // Form states
  const [currentTraining, setCurrentTraining] = useState({ title: "", subject: "", description: "", duration: "", startDate: "", price: "", language: "English", level: "Beginner" });
  const [currentJob, setCurrentJob] = useState({ title: "", skills: "", companyId: "", location: "", jobType: "Contractor Job", postedDate: "", description: "", image: "", salary: "", eligibility: "" });
  const [currentUser, setCurrentUser] = useState({
    role: "student",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
    mobile: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    avatar: null
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isAdminEditing, setIsAdminEditing] = useState(false);
  const [adminProfileData, setAdminProfileData] = useState(() => {
     const stored = JSON.parse(localStorage.getItem("adminProfileData") || "{}");
     const rootInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
     
     let defaultName = "Admin";
     if (rootInfo.name && rootInfo.name.toLowerCase() !== "verified user") {
         defaultName = rootInfo.name;
     }

     return {
        name: stored.name || defaultName,
        email: stored.email || rootInfo.email || "tpo.admin@university.edu",
        designation: stored.designation || "Head of Placements",
        department: stored.department || "Training & Placement Cell",
        employeeId: stored.employeeId || "TPO-ADM-2041",
        systemRole: stored.systemRole || "Primary Administrator",
        contactNumber: stored.contactNumber || "+91 98765 43210",
        campusLocation: stored.campusLocation || "Main University Campus"
     };
  });

  const handleAdminProfileChange = (e) => {
    setAdminProfileData({...adminProfileData, [e.target.name]: e.target.value});
  };

  const handleAdminProfileSave = () => {
    localStorage.setItem("adminProfileData", JSON.stringify(adminProfileData));
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    userInfo.name = adminProfileData.name;
    userInfo.email = adminProfileData.email;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setIsAdminEditing(false);
    toast.success("Profile updated successfully!");
  };

  const quickActions = [
    { id: 'add-training', label: "Add Training", icon: <FaPlus size={14} /> },
    { id: 'add-job', label: "Add Job", icon: <Briefcase size={14} /> },
    { id: 'add-users', label: "Add Users", icon: <Users size={14} /> },
    { id: 'admin-report', label: "Admin Report", icon: <Shield size={14} /> },
    { id: 'students-report', label: "Students Report", icon: <Users size={14} /> },
    { id: 'tpo-report', label: "TPO Report", icon: <Building size={14} /> },
    { id: 'training-report', label: "Training Report", icon: <FileText size={14} /> },
    { id: 'job-report', label: "Job Report", icon: <Briefcase size={14} /> },
    { id: 'job-registration', label: "Job Registration", icon: <CheckCircle size={14} /> },
    { id: 'training-registration', label: "Training Registration", icon: <Edit size={14} /> },
    { id: 'my-account', label: "My Account", icon: <Key size={14} /> },
    { id: 'change-password', label: "Change Password", icon: <Key size={14} /> },
    { id: 'logout', label: "Logout", icon: <LogOut size={14} /> },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [stud, comp, train, pdfRes, jobRes, appRes] = await Promise.all([
        axios.get("/api/students").catch(() => ({ data: [] })),
        axios.get("/api/companies").catch(() => ({ data: [] })),
        axios.get("/api/trainings").catch(() => ({ data: [] })),
        axios.get("/api/syllabus").catch(() => ({ data: [] })),
        axios.get("/api/jobs").catch(() => ({ data: [] })),
        axios.get("/api/applications").catch(() => ({ data: [] }))
      ]);
      setStudents(stud.data || []);
      setCompanies(comp.data || []);
      setTrainings(train.data || []);
      setPdfs(pdfRes.data || []);
      setJobs(jobRes.data || []);
      setApplications(appRes.data || []);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to sync live data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* --- ACTIONS --- */
  const handleSaveTraining = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving training...");
    try {
      const payload = { ...currentTraining, price: Number(currentTraining.price) };
      const res = await axios.post("/api/trainings/save", payload);
      if (currentTraining._id) {
        setTrainings(trainings.map(t => t._id === res.data._id ? res.data : t));
        toast.success("Training updated!", { id: loadingToast });
      } else {
        setTrainings([...trainings, res.data]);
        toast.success("New module launched!", { id: loadingToast });
      }
      setIsModalOpen(false);
      setCurrentTraining({ title: "", subject: "", description: "", duration: "", startDate: "", price: "", language: "English", level: "Beginner" });
      setPage("training-report");
    } catch {
      toast.error("Process failed", { id: loadingToast });
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(currentJob._id ? "Updating Job Profile..." : "Deploying new Job Profile...");
    try {
      const formData = new FormData();
      Object.keys(currentJob).forEach(key => {
        if (currentJob[key] !== null && currentJob[key] !== undefined && currentJob[key] !== '') {
          if (key === 'companyId' && typeof currentJob[key] === 'object') {
             formData.append('companyId', currentJob[key]._id);
          } else {
             formData.append(key, currentJob[key]);
          }
        }
      });
      if (currentJob._id) {
         await axios.put(`/api/jobs/${currentJob._id}`, formData);
         toast.success("Job Updated Successfully!", { id: loadingToast });
      } else {
         await axios.post("/api/jobs/add", formData);
         toast.success("Job Deployed Successfully!", { id: loadingToast });
      }
      setCurrentJob({ title: "", skills: "", companyId: "", location: "", jobType: "Contractor Job", postedDate: "", description: "", image: "", salary: "", eligibility: "" });
      loadData();
      setPage("job-report");
    } catch {
      toast.error(currentJob._id ? "Update failed" : "Deployment failed", { id: loadingToast });
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job listing? This cannot be undone.")) return;
    const loadingToast = toast.loading("Deleting job...");
    try {
      await axios.delete(`/api/jobs/${id}`);
      toast.success("✅ Job deleted successfully!", { id: loadingToast, duration: 3000 });
      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      toast.error("❌ Delete failed — please restart your backend server and try again.", { id: loadingToast, duration: 5000 });
    }
  };

  const handleEditJobUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating Job...");
    try {
      const formData = new FormData();
      const job = editJobModal;
      const fields = ['title','skills','location','jobType','postedDate','description','salary','eligibility'];
      fields.forEach(key => { if (job[key] !== null && job[key] !== undefined && job[key] !== '') formData.append(key, job[key]); });
      if (job.companyId && job.companyId !== '') {
        const cid = typeof job.companyId === 'object' ? job.companyId._id : job.companyId;
        formData.append('companyId', cid);
      }
      if (job.newImage) formData.append('image', job.newImage);
      const res = await axios.put(`/api/jobs/${job._id}`, formData);
      toast.success("Job Updated Successfully!", { id: loadingToast });
      const updatedJob = res.data.job;
      // We need to keep the populated companyId if the backend only returns an ID, or merge it.
      // Assuming backend returns the updated job object.
      setJobs(prev => prev.map(j => j._id === job._id ? { ...j, ...updatedJob } : j));
      setEditJobModal(null);
    } catch {
      toast.error("Update failed — please try again", { id: loadingToast });
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (currentUser.password !== currentUser.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const loadingToast = toast.loading("Deploying Executive User Profile...");
    try {
      const formData = new FormData();
      Object.keys(currentUser).forEach(key => {
        if (currentUser[key] !== null) formData.append(key, currentUser[key]);
      });

      await axios.post("/api/students", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      toast.success("User Successfully Registered!", { id: loadingToast });
      setCurrentUser({ role: "student", firstName: "", lastName: "", email: "", password: "", confirmPassword: "", gender: "Male", mobile: "", dob: "", address1: "", address2: "", city: "", state: "", country: "", avatar: null });
      loadData();
      setPage("students-report");
    } catch {
      toast.error("User registration failed", { id: loadingToast });
    }
  };

  const handleDeletePdf = async (id) => {
    if (!window.confirm("Delete this syllabus?")) return;
    try {
      await axios.delete(`/api/syllabus/${id}`);
      setPdfs(pdfs.filter(p => p._id !== id));
      toast.success("Syllabus removed");
    } catch {
      toast.error("Failed to delete");
    }
  };

  /* --- RENDERERS --- */
  const renderDashboard = () => (
    <div className="dash-body animate-in">
      <div className="page-header">
        <div className="header-info">
          <h2>Executive Dashboard</h2>
          <p>Global Training & Placement Overview</p>
        </div>
        <button onClick={loadData} className="primary-outline-btn" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCcw size={16}/> Sync
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="data-card hover-scale" onClick={() => setPage('students-report')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' }}>
           <div style={{ padding: '16px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '16px', display: 'flex' }}><Users size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Students</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{students.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
        <div className="data-card hover-scale" onClick={() => setPage('tpo-report')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' }}>
           <div style={{ padding: '16px', background: '#dbeafe', color: '#2563eb', borderRadius: '16px', display: 'flex' }}><Building size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Partners</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{companies.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
        <div className="data-card hover-scale" onClick={() => setPage('training-report')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' }}>
           <div style={{ padding: '16px', background: '#dcfce7', color: '#16a34a', borderRadius: '16px', display: 'flex' }}><Briefcase size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Training</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{trainings.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
        <div className="data-card hover-scale" onClick={() => toast("Syllabus Module Coming Soon", { icon: "📝" })} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' }}>
           <div style={{ padding: '16px', background: '#fef3c7', color: '#d97706', borderRadius: '16px', display: 'flex' }}><FileText size={24} /></div>
           <div>
             <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Syllabus Docs</p>
             <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--tp-dark)' }}>{pdfs.length.toString().padStart(2, '0')}</h3>
           </div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '30px', padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)', marginBottom: '24px' }}>Quick Access Modules</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
          {quickActions.map(action => (
            <div 
              key={action.id} 
              onClick={() => {
                if (action.id === 'logout') navigate("/");
                else if (action.id === 'add-training') { setPage('trainings'); }
                else setPage(action.id);
              }} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '16px', border: '1px solid var(--tp-border)', borderRadius: '0', background: 'var(--surface)', transition: 'all 0.2s' }}
            >
               <div style={{ width: '95px', height: '95px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--tp-primary), #4338ca)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', boxShadow: '0 6px 16px rgba(79, 70, 229, 0.25)' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', textAlign: 'center', lineHeight: '1.4' }}>
                    {action.label.split(' ').map((w,i) => <React.Fragment key={i}>{w}<br/></React.Fragment>)}
                  </span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="data-card table-card-pro">
        <h3 style={{ padding: '20px 24px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Navigation size={18} color="var(--tp-primary)" /> Latest Activity Log
        </h3>
        <table className="modern-pro-table">
          <thead>
             <tr><th>Entity</th><th>Event Identity</th><th style={{ textAlign: 'right' }}>Status</th></tr>
          </thead>
          <tbody>
            {students.slice(0, 3).map((s, i) => (
              <tr key={'s'+i}>
                <td><div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="cell-logo" style={{ background: '#e0e7ff', color: '#4f46e5' }}>{s.name?.[0] || '?'}</div><strong>{s.name || 'Anonymous Student'}</strong></div></td>
                <td><span className="role-text">Student Joined Platform</span></td>
                <td style={{ textAlign: 'right' }}><div className="status-pill selected">Active</div></td>
              </tr>
            ))}
            {applications.slice(0, 2).map((a, i) => (
              <tr key={'a'+i}>
                <td><div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="cell-logo" style={{ background: '#dcfce7', color: '#16a34a' }}>A</div><strong>{a.name || 'Anonymous Applicant'}</strong></div></td>
                <td><span className="role-text">Applied for {a.role || 'Job'}</span></td>
                <td style={{ textAlign: 'right' }}><div className="status-pill submitted">Submitted</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* --- MODULE: ADD JOB --- */
  const renderAddJob = () => (
    <div className="dash-body animate-in" style={{ paddingBottom: '80px' }}>
      <div className="executive-form-card">
         <div className="form-premium-header">
            <div className="header-icon-box"><Briefcase size={24} color="white" /></div>
            <h2 className="header-title">{currentJob._id ? 'OPTIMIZE JOB PROTOCOL' : 'DEPLOY NEW CAREER OPPORTUNITY'}</h2>
         </div>
         
         <form onSubmit={handleAddJob} className="premium-dual-form">
            <div className="executive-form-section">
               <div className="section-title-box"><Briefcase size={18} /> <h4>Identity Context</h4></div>
               <div className="dual-column-grid">
                  <div className="pro-field-group">
                     <label className="pro-field-label">Job Title</label>
                     <input className="premium-glass-input" placeholder="e.g. Senior Software Engineer" required value={currentJob.title} onChange={e => setCurrentJob({...currentJob, title: e.target.value})} />
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">Required Skill Set</label>
                     <input className="premium-glass-input" placeholder="React, Node.js, AWS" value={currentJob.skills} onChange={e => setCurrentJob({...currentJob, skills: e.target.value})} />
                  </div>
                  <div className="pro-field-group" style={{ gridColumn: '1 / -1' }}>
                     <label className="pro-field-label">Corporate Sponsor</label>
                     <select className="premium-glass-input" required value={currentJob.companyId} onChange={e => setCurrentJob({...currentJob, companyId: e.target.value})}>
                        <option value="">Select Partner Company</option>
                        {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                     </select>
                  </div>
               </div>
            </div>

            <div className="executive-form-section">
               <div className="section-title-box"><Navigation size={18} /> <h4>Deployment Logistics</h4></div>
               <div className="triple-column-grid">
                  <div className="pro-field-group">
                     <label className="pro-field-label">Target City</label>
                     <select className="premium-glass-input" required value={currentJob.location} onChange={e => setCurrentJob({...currentJob, location: e.target.value})}>
                        <option value="">Select Location</option>
                        <option value="Pune">Pune</option><option value="Mumbai">Mumbai</option><option value="Bangalore">Bangalore</option><option value="Delhi">Delhi</option><option value="Hyderabad">Hyderabad</option><option value="Remote">Remote</option>
                     </select>
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">Engagement Type</label>
                     <select className="premium-glass-input" value={currentJob.jobType} onChange={e => setCurrentJob({...currentJob, jobType: e.target.value})}>
                        <option value="Full-Time">Full-Time</option><option value="Contractor Job">Contractor Job</option><option value="Internship">Internship</option>
                     </select>
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">Launch Date</label>
                     <input type="date" className="premium-glass-input" value={currentJob.postedDate} onChange={e => setCurrentJob({...currentJob, postedDate: e.target.value})} />
                  </div>
               </div>
            </div>

            <div className="executive-form-section">
               <div className="section-title-box"><Award size={18} /> <h4>Expectations & Compensation</h4></div>
               <div className="dual-column-grid">
                  <div className="pro-field-group">
                     <label className="pro-field-label">Compensation Package</label>
                     <input className="premium-glass-input" placeholder="e.g. 12 - 15 LPA" value={currentJob.salary || ''} onChange={e => setCurrentJob({...currentJob, salary: e.target.value})} />
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">Eligibility Guidelines</label>
                     <input className="premium-glass-input" placeholder="B.E/B.Tech with 8.0+ CGPA" value={currentJob.eligibility || ''} onChange={e => setCurrentJob({...currentJob, eligibility: e.target.value})} />
                  </div>
                  <div className="pro-field-group" style={{ gridColumn: '1 / -1' }}>
                     <label className="pro-field-label">Detailed Intelligence (Description)</label>
                     <textarea className="premium-glass-input" rows={4} placeholder="Detail the full scope of work and mission..." value={currentJob.description || ''} onChange={e => setCurrentJob({...currentJob, description: e.target.value})} />
                  </div>
               </div>
            </div>

            <div className="pro-field-group" style={{ marginBottom: '24px' }}>
               <label className="pro-field-label">Banner Image / Branding</label>
               <input type="file" className="premium-glass-input" onChange={e => setCurrentJob({...currentJob, image: e.target.files[0]})} />
            </div>

            <div className="form-submit-container">
               <button type="submit" className="mega-premium-btn">
                  LAUNCH OPPORTUNITY NODE
                  <Shield size={20} />
               </button>
            </div>
         </form>
      </div>
    </div>
  );

  /* --- MODULE: ADD USERS --- */
  const renderAddUsers = () => (
    <div className="dash-body animate-in" style={{ paddingBottom: '80px' }}>
      <div className="executive-form-card">
        <div className="form-premium-header">
           <div className="header-icon-box"><Users size={24} color="white" /></div>
           <h2 className="header-title">USER ENROLLMENT PORTAL</h2>
           <p className="header-subtitle">Executive Identity Assignment v7.0</p>
        </div>

        <form onSubmit={handleAddUser} className="premium-dual-form">
          {/* Section 1: Role Selection */}
          <div className="executive-form-section">
            <div className="section-title-box"><Shield size={18} /> <h4>System User Role</h4></div>
            <div className="role-dropdown-container">
               <Shield size={18} className="role-icon" />
               <select 
                 className="premium-glass-input" 
                 required 
                 value={currentUser.role} 
                 onChange={e => setCurrentUser({...currentUser, role: e.target.value})}
               >
                 <option value="student">Student / Candidate</option>
                 <option value="admin">System Administrator</option>
                 <option value="tpo">Training & Placement Officer (TPO)</option>
               </select>
            </div>
          </div>

          {/* Section 2: Login Info */}
          <div className="executive-form-section">
            <div className="section-title-box"><Key size={18} /> <h4>User Login Parameters</h4></div>
            <div className="dual-column-grid">
               <div className="pro-field-group">
                  <label className="pro-field-label">First Name</label>
                  <input className="premium-glass-input" placeholder="e.g. Rahul" required value={currentUser.firstName} onChange={e => setCurrentUser({...currentUser, firstName: e.target.value})} />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Last Name</label>
                  <input className="premium-glass-input" placeholder="e.g. Sharma" required value={currentUser.lastName} onChange={e => setCurrentUser({...currentUser, lastName: e.target.value})} />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Email Address</label>
                  <input className="premium-glass-input" type="email" placeholder="email@example.com" required value={currentUser.email} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Password</label>
                  <input className="premium-glass-input" type="password" placeholder="••••••••" required value={currentUser.password} onChange={e => setCurrentUser({...currentUser, password: e.target.value})} />
               </div>
               <div className="pro-field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="pro-field-label">Confirm Password</label>
                  <input className="premium-glass-input" type="password" placeholder="Confirm Password" required value={currentUser.confirmPassword} onChange={e => setCurrentUser({...currentUser, confirmPassword: e.target.value})} />
               </div>
            </div>
          </div>

          {/* Section 3: Personal Info */}
          <div className="executive-form-section">
            <div className="section-title-box"><Users size={18} /> <h4>Demographic & Personal Identity</h4></div>
            <div className="pro-field-group" style={{ marginBottom: '24px' }}>
               <label className="pro-field-label">Gender Identity</label>
               <div className="premium-radio-group">
                  <label className="radio-label">
                     <input type="radio" value="Male" checked={currentUser.gender === 'Male'} onChange={e => setCurrentUser({...currentUser, gender: e.target.value})} />
                     Male
                  </label>
                  <label className="radio-label">
                     <input type="radio" value="Female" checked={currentUser.gender === 'Female'} onChange={e => setCurrentUser({...currentUser, gender: e.target.value})} />
                     Female
                  </label>
               </div>
            </div>
            <div className="dual-column-grid">
               <div className="pro-field-group">
                  <label className="pro-field-label">Mobile Number</label>
                  <input className="premium-glass-input" placeholder="e.g. +91 00000 00000" required value={currentUser.mobile} onChange={e => setCurrentUser({...currentUser, mobile: e.target.value})} />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Date of Birth</label>
                  <input className="premium-glass-input" type="date" required value={currentUser.dob} onChange={e => setCurrentUser({...currentUser, dob: e.target.value})} />
               </div>
               <div className="pro-field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="pro-field-label">Profile Visualization (Picture)</label>
                  <input type="file" className="premium-glass-input" onChange={e => setCurrentUser({...currentUser, avatar: e.target.files[0]})} />
               </div>
            </div>
          </div>

          {/* Section 4: Address */}
          <div className="executive-form-section">
            <div className="section-title-box"><MapPin size={18} /> <h4>Residential Address</h4></div>
            <div className="dual-column-grid">
               <div className="pro-field-group">
                  <label className="pro-field-label">Address Line 1</label>
                  <input className="premium-glass-input" placeholder="House/Flat No, Apartment" value={currentUser.address1} onChange={e => setCurrentUser({...currentUser, address1: e.target.value})} />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Address Line 2</label>
                  <input className="premium-glass-input" placeholder="Landmark, Street Name" value={currentUser.address2} onChange={e => setCurrentUser({...currentUser, address2: e.target.value})} />
               </div>
               <div className="triple-column-grid">
                  <div className="pro-field-group">
                     <label className="pro-field-label">City</label>
                     <input className="premium-glass-input" placeholder="City" value={currentUser.city} onChange={e => setCurrentUser({...currentUser, city: e.target.value})} />
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">State</label>
                     <input className="premium-glass-input" placeholder="State" value={currentUser.state} onChange={e => setCurrentUser({...currentUser, state: e.target.value})} />
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">Country</label>
                     <input className="premium-glass-input" placeholder="India" value={currentUser.country} onChange={e => setCurrentUser({...currentUser, country: e.target.value})} />
                  </div>
               </div>
            </div>
          </div>

          <div className="form-submit-container">
             <button type="submit" className="mega-premium-btn">
                AUTHENTICATE & DEPLOY IDENTITY
                <Shield size={20} />
             </button>
             <p className="security-footer-text">Security Protocol: By deploying this profile, you authorize identity classification across the TPO grid.</p>
          </div>
        </form>
      </div>
    </div>
  );

  /* --- MODULE: REPORT TABLES --- */
  const GenericTableCard = ({ title, columns, data, renderRow }) => (
    <div className="dash-body animate-in">
      <div className="page-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '950', letterSpacing: '-1px', color: 'var(--admin-navy)', margin: 0 }}>{title}</h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--admin-primary)', marginTop: '8px', borderRadius: '2px' }}></div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="pro-search" style={{ width: '250px' }}>
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Filter records..." style={{ border: 'none', background: 'transparent', padding: '10px', fontSize: '13px', outline: 0, width: '100%' }} />
          </div>
        </div>
      </div>
      <div className="pro-card" style={{ border: 'none', boxShadow: 'var(--admin-shadow)' }}>
        <table className="pro-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '20px 32px' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map(renderRow) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '80px 40px' }}>
                  <div style={{ opacity: 0.5, marginBottom: '16px' }}><Search size={48} /></div>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: '#94a3b8' }}>No metrics registered in this registry segment.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudentsReport = () => GenericTableCard({
    title: "Global Candidate Roster",
    columns: ["Candidate Identity", "Platform Email", "Degree/Course", "Status"],
    data: students,
    renderRow: (s) => (
      <tr key={s._id} className="modern-table-row">
         <td>
            <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div className="avatar-soft-gradient" style={{ background: 'linear-gradient(135deg, #6366f1, #4338ca)' }}>{s.name?.[0] || '?'}</div>
               <div className="name-cell"><strong>{s.name || 'Anonymous Student'}</strong><span>User ID: {s._id?.substring(0,8)}</span></div>
            </div>
         </td>
         <td><span className="role-text" style={{ fontStyle: 'italic', color: '#64748b' }}>{s.email}</span></td>
         <td><span className="date-text" style={{ fontWeight: '700' }}>{s.course || 'Unassigned'}</span></td>
         <td><div className="status-pill-v6 interview"><div style={{width:'6px',height:'6px',borderRadius:'50%',background:'currentColor'}}></div>Active</div></td>
      </tr>
    )
  });

  const renderTpoReport = () => GenericTableCard({
    title: "Placement Corporate Partners",
    columns: ["Corporate Entity", "Recruiter Email", "Hiring Contact", "Status"],
    data: companies,
    renderRow: (c) => (
      <tr key={c._id} className="modern-table-row">
         <td>
            <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div className="avatar-soft-gradient" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>{c.name?.[0] || '?'}</div>
               <div className="name-cell"><strong>{c.name || 'Corporate Partner'}</strong><span>Corporate Partner</span></div>
            </div>
         </td>
         <td><span className="role-text" style={{ fontWeight: '600' }}>{c.email}</span></td>
         <td><span className="date-text" style={{ color: '#64748b' }}>{c.phone || 'N/A'}</span></td>
         <td><div className="status-pill-v6 interview"><div style={{width:'6px',height:'6px',borderRadius:'50%',background:'currentColor'}}></div>Verified</div></td>
      </tr>
    )
  });

  const editInpStyle = { padding: '10px 14px', borderRadius: '6px', border: '1.5px solid #e2e8f0', outline: 0, background: '#fff', color: '#000', fontWeight: '700', width: '100%', boxSizing: 'border-box', fontSize: '14px' };
  const editLblStyle = { fontSize: '13px', fontWeight: '700', color: '#000', marginBottom: '4px', display: 'block' };

  const renderJobReport = () => (
    <div className="dash-body animate-in">
      {/* ---- EDIT MODAL ---- */}
      {editJobModal && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setEditJobModal(null); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(26, 37, 47, 0.8)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="executive-form-card" style={{ width: '100%', maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div className="form-premium-header">
               <div className="header-icon-box"><Settings size={24} color="white" /></div>
               <h2 className="header-title">RECONFIGURE JOB ARCHITECTURE</h2>
               <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: '700' }}>ID: {editJobModal._id}</p>
               <button onClick={() => setEditJobModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '10px', width: '32px', height: '32px', cursor: 'pointer' }}>×</button>
            </div>

            <form onSubmit={handleEditJobUpdate} className="premium-dual-form">
               <div className="dual-column-grid">
                  <div className="pro-field-group">
                    <label className="pro-field-label">Position Title</label>
                    <input className="premium-glass-input" value={editJobModal.title || ''} onChange={e => setEditJobModal({...editJobModal, title: e.target.value})} />
                  </div>
                  <div className="pro-field-group">
                    <label className="pro-field-label">Primary Tech Stack</label>
                    <input className="premium-glass-input" value={editJobModal.skills || ''} onChange={e => setEditJobModal({...editJobModal, skills: e.target.value})} />
                  </div>
               </div>

               <div className="triple-column-grid">
                  <div className="pro-field-group">
                    <label className="pro-field-label">Partner Entity</label>
                    <select className="premium-glass-input" value={editJobModal.companyId || ''} onChange={e => setEditJobModal({...editJobModal, companyId: e.target.value})}>
                      {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="pro-field-group">
                    <label className="pro-field-label">Geo Location</label>
                    <select className="premium-glass-input" value={editJobModal.location || ''} onChange={e => setEditJobModal({...editJobModal, location: e.target.value})}>
                      <option value="Pune">Pune</option><option value="Mumbai">Mumbai</option><option value="Bangalore">Bangalore</option><option value="Delhi">Delhi</option><option value="Hyderabad">Hyderabad</option><option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div className="pro-field-group">
                    <label className="pro-field-label">Engagement Type</label>
                    <select className="premium-glass-input" value={editJobModal.jobType || 'Contractor Job'} onChange={e => setEditJobModal({...editJobModal, jobType: e.target.value})}>
                      <option value="Full-Time">Full-Time</option><option value="Contractor Job">Contractor Job</option><option value="Internship">Internship</option>
                    </select>
                  </div>
               </div>

               <div className="pro-field-group">
                  <label className="pro-field-label">Detailed Intelligence (Description)</label>
                  <textarea className="premium-glass-input" rows={4} value={editJobModal.description || ''} onChange={e => setEditJobModal({...editJobModal, description: e.target.value})} />
               </div>

               <div className="dual-column-grid">
                  <div className="pro-field-group">
                     <label className="pro-field-label">Financial Compensation</label>
                     <input className="premium-glass-input" value={editJobModal.salary || ''} onChange={e => setEditJobModal({...editJobModal, salary: e.target.value})} />
                  </div>
                  <div className="pro-field-group">
                     <label className="pro-field-label">Eligibility Threshold</label>
                     <input className="premium-glass-input" value={editJobModal.eligibility || ''} onChange={e => setEditJobModal({...editJobModal, eligibility: e.target.value})} />
                  </div>
               </div>

               <div className="pro-field-group">
                 <label className="pro-field-label">Update Media Assets</label>
                 <input type="file" className="premium-glass-input" onChange={e => setEditJobModal({...editJobModal, newImage: e.target.files[0]})} />
               </div>

               <div className="form-submit-container" style={{ display: 'flex', gap: '16px' }}>
                 <button type="submit" className="mega-premium-btn" style={{ flex: 2 }}>SAVE CONFIGURATION</button>
                 <button type="button" onClick={() => setEditJobModal(null)} className="mega-premium-btn" style={{ flex: 1, background: '#e2e8f0', color: '#475569' }}>CANCEL</button>
               </div>
            </form>
          </div>
        </div>
      )}
      {/* ---- TABLE ---- */}
      <div className="page-header"><h2>Active Job Listings Directory</h2></div>
      <div className="data-card table-card-pro">
        <table className="modern-pro-table">
          <thead><tr>{["Role Designation","Corporate Sponsor","Location","Compensation","Actions"].map((c,i)=><th key={i}>{c}</th>)}</tr></thead>
          <tbody>
            {jobs.length > 0 ? jobs.map(j => (
              <tr key={j._id}>
                <td><div className="table-comp-cell" style={{display:'flex',alignItems:'center',gap:'12px'}}><div className="cell-logo" style={{background:'#fef3c7',color:'#d97706'}}><Briefcase size={16}/></div><strong>{j.title||'Untitled Position'}</strong></div></td>
                <td><span className="role-text">{j.companyId?.name||'Independent'}</span></td>
                <td><span className="date-text">{j.location||'Remote'}</span></td>
                <td><div className="status-pill active-pill">{j.salary||'Disclosed on call'}</div></td>
                <td>
                  <div style={{display:'flex',gap:'8px'}}>
                    <button onClick={() => {
                      const defaultJob = { title: '', skills: '', companyId: '', location: '', jobType: 'Contractor Job', postedDate: '', description: '', image: '', salary: '', eligibility: '' };
                      const cid = typeof j.companyId==='object'&&j.companyId!==null ? j.companyId._id : (j.companyId||'');
                      const dt = j.postedDate ? new Date(j.postedDate).toISOString().split('T')[0] : '';
                      setCurrentJob({ ...defaultJob, ...j, companyId: cid, postedDate: dt, image: null });
                      setPage('add-job');
                    }} style={{background:'var(--tp-primary)',border:'2px solid var(--tp-primary)',cursor:'pointer',color:'white',padding:'8px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',letterSpacing:'0.5px'}}>
                      Edit
                    </button>
                    <button onClick={()=>handleDeleteJob(j._id)} style={{background:'transparent',border:'2px solid #ef4444',cursor:'pointer',color:'#ef4444',padding:'8px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'700',letterSpacing:'0.5px'}}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan={5} style={{textAlign:'center',padding:'40px',color:'var(--tp-muted)'}}>No job listings found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTrainingReport = () => GenericTableCard({
    title: "Training Modules Performance",
    columns: ["Course Pipeline", "Subject Core", "Duration Matrix", "Price"],
    data: trainings,
    renderRow: (t) => (
      <tr key={t._id} className="modern-table-row">
         <td>
            <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div className="avatar-soft-gradient" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>{t.title?.[0] || '?'}</div>
               <div className="name-cell"><strong>{t.title || 'Training Program'}</strong><span>Live Course</span></div>
            </div>
         </td>
         <td><span className="role-text" style={{ color: '#64748b', fontWeight: '600' }}>{t.subject}</span></td>
         <td><span className="date-text" style={{ fontWeight: '700' }}>{t.duration}</span></td>
         <td><div style={{ fontWeight: '950', color: 'var(--admin-primary)', fontSize: '16px' }}>₹{t.price}</div></td>
      </tr>
    )
  });

  const renderJobRegistration = () => GenericTableCard({
    title: "Candidate Job Registrations",
    columns: ["Applicant Identity", "Applying To", "Corporate End-Target", "Status"],
    data: applications,
    renderRow: (a) => {
      const isVerified = a.name?.toLowerCase().includes("verified user");
      const cleanName = a.name?.replace(/verified user/gi, "").trim();
      
      return (
        <tr key={a._id} className="modern-table-row">
           <td>
              <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <div className="avatar-soft-gradient">
                    {cleanName ? cleanName[0] : (a.name ? a.name?.[0] : '?')}
                 </div>
                 <div className="name-cell">
                    <strong>{cleanName || a.name || 'Anonymous candidate'}</strong>
                    {isVerified && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={10} /> Verified Identity</span>}
                 </div>
              </div>
           </td>
           <td><span className="role-text" style={{ fontWeight: '700', color: 'var(--admin-navy)' }}>{a.role || 'General Application'}</span></td>
           <td><span className="date-text" style={{ color: '#64748b', fontWeight: '600' }}>{a.company || 'Direct Hire'}</span></td>
           <td>
              <div className={`status-pill-v6 ${a.status?.toLowerCase() === 'shortlisted' ? 'interview' : 'submitted'}`}>
                 <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                 {a.status || "Provisionally Submitted"}
              </div>
           </td>
        </tr>
      );
    }
  });

  /* MOCK: Because trainings lack an explicit full 'my-enrollments' tracking node per DB, we simulate a global tracker mapping students to stats */
  const renderTrainingRegistration = () => GenericTableCard({
    title: "Training Signups Ledger",
    columns: ["Student Entity", "Institutional Log", "Active Sessions", "Global Standing"],
    data: students.slice(0, 8),
    renderRow: (s, i) => (
      <tr key={s._id} className="modern-table-row">
         <td>
            <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div className="avatar-soft-gradient" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>{s.name?.[0] || '?'}</div>
               <div className="name-cell"><strong>{s.name || 'Student Candidate'}</strong><span>Registered Candidate</span></div>
            </div>
         </td>
         <td><span className="role-text" style={{ color: '#64748b' }}>{s.email}</span></td>
         <td><span className="date-text" style={{ fontWeight: '700' }}>{i % 3 === 0 ? "Java Full Stack Node" : "React Architecture"}</span></td>
         <td><div className="status-pill-v6 interview"><div style={{width:'6px',height:'6px',borderRadius:'50%',background:'currentColor'}}></div>Executing</div></td>
      </tr>
    )
  });

  /* --- MODULE: ADMIN USER METRICS --- */
  const renderAdminReport = () => (
    <div className="dash-body animate-in">
       <div className="page-header" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '950', letterSpacing: '-1px', color: 'var(--admin-navy)' }}>System Administrator Hierarchy</h2>
       </div>
       <div className="pro-card">
          <table className="pro-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
            <thead><tr><th style={{ textAlign: 'left', padding: '20px 32px' }}>Administrator Identity</th><th style={{ textAlign: 'left', padding: '20px 32px' }}>Privilege Clearance</th><th style={{ textAlign: 'right', padding: '20px 32px' }}>Security Link</th></tr></thead>
            <tbody>
              <tr className="modern-table-row">
                 <td style={{ padding: '20px 32px' }}>
                    <div className="table-comp-cell" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                       <div className="avatar-soft-gradient" style={{ background: '#0f172a' }}><Shield size={18}/></div>
                       <div className="name-cell"><strong>Super Admin (TP Master)</strong><span>Root Authorization</span></div>
                    </div>
                 </td>
                 <td style={{ padding: '20px 32px' }}><span className="role-text" style={{ fontWeight: '600', color: '#475569' }}>Tier-1 Override Capabilities</span></td>
                 <td style={{ textAlign: 'right', padding: '20px 32px' }}><div className="status-pill-v6 interview"><div style={{width:'6px',height:'6px',borderRadius:'50%',background:'currentColor'}}></div>Root Secured</div></td>
              </tr>
            </tbody>
          </table>
       </div>
    </div>
  );

  const renderMyAccount = () => {
    return (
    <div className="dash-body animate-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="data-card" style={{ padding: '40px', textAlign: 'center', position: 'relative' }}>
         {!isAdminEditing ? (
           <button onClick={() => setIsAdminEditing(true)} className="primary-outline-btn" style={{ position: 'absolute', top: '30px', right: '30px', width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit size={16}/> Edit Profile
           </button>
         ) : (
           <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', gap: '10px' }}>
              <button className="primary-outline-btn" onClick={() => setIsAdminEditing(false)} style={{ width: 'auto', padding: '10px 20px' }}>Cancel</button>
              <button className="primary-btn-pro" onClick={handleAdminProfileSave} style={{ width: 'auto', padding: '10px 20px' }}>Save Changes</button>
           </div>
         )}
         <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--tp-primary), #4f46e5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '900', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)' }}>
           {adminProfileData.name ? adminProfileData.name.substring(0,2).toUpperCase() : 'AD'}
         </div>
         {isAdminEditing ? (
            <input name="name" value={adminProfileData.name} onChange={handleAdminProfileChange} style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '60%' }} />
         ) : (
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--tp-dark)', marginBottom: '8px' }}>{adminProfileData.name}</h2>
         )}
         
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
            <Mail size={16} color="var(--tp-muted)" /> 
            {isAdminEditing ? (
               <input name="email" value={adminProfileData.email} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '50%' }} />
            ) : (
               <p style={{ color: 'var(--tp-muted)', fontSize: '16px', margin: 0 }}>{adminProfileData.email}</p>
            )}
         </div>
         
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', background: 'var(--tp-surface)', padding: '30px', borderRadius: '16px' }}>
            <div>
               <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase' }}>Official Designation</p>
               {isAdminEditing ? <input name="designation" value={adminProfileData.designation} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '100%', marginTop: '4px' }} /> : <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)' }}>{adminProfileData.designation}</h4>}
            </div>
            <div>
               <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase' }}>Department</p>
               {isAdminEditing ? <input name="department" value={adminProfileData.department} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '100%', marginTop: '4px' }} /> : <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)' }}>{adminProfileData.department}</h4>}
            </div>
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--tp-border)' }}>
               <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase' }}>Employee ID</p>
               {isAdminEditing ? <input name="employeeId" value={adminProfileData.employeeId} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '100%', marginTop: '4px' }} /> : <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)' }}>{adminProfileData.employeeId}</h4>}
            </div>
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--tp-border)' }}>
               <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase' }}>System Role</p>
               {isAdminEditing ? <input name="systemRole" value={adminProfileData.systemRole} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '100%', marginTop: '4px' }} /> : <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)' }}>{adminProfileData.systemRole}</h4>}
            </div>
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--tp-border)' }}>
               <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase' }}>Contact Number</p>
               {isAdminEditing ? <input name="contactNumber" value={adminProfileData.contactNumber} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '100%', marginTop: '4px' }} /> : <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)' }}>{adminProfileData.contactNumber}</h4>}
            </div>
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--tp-border)' }}>
               <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--tp-muted)', textTransform: 'uppercase' }}>Campus Location</p>
               {isAdminEditing ? <input name="campusLocation" value={adminProfileData.campusLocation} onChange={handleAdminProfileChange} style={{ fontSize: '16px', padding: '8px', borderRadius: '8px', border: '1px solid var(--tp-border)', width: '100%', marginTop: '4px' }} /> : <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--tp-dark)' }}>{adminProfileData.campusLocation}</h4>}
            </div>
         </div>
      </div>
    </div>
  );
  };

  const renderChangePassword = () => (
    <div className="dash-body animate-in" style={{ paddingBottom: '80px' }}>
      <div className="executive-form-card" style={{ maxWidth: '600px' }}>
         <div className="form-premium-header">
            <div className="header-icon-box"><Key size={24} color="white" /></div>
            <h2 className="header-title">ROTATE ADMINISTRATIVE CIPHER</h2>
         </div>
         <form onSubmit={(e) => { e.preventDefault(); toast.success("Password Cipher successfully rotated!"); }} className="premium-dual-form">
            <div className="pro-field-group">
               <label className="pro-field-label">Current Clearance Protocol Link</label>
               <input className="premium-glass-input" type="password" placeholder="Current Password" required />
            </div>
            <div className="pro-field-group">
               <label className="pro-field-label">New Secret Cipher</label>
               <input className="premium-glass-input" type="password" placeholder="New Password" required />
            </div>
            <div className="pro-field-group">
               <label className="pro-field-label">Re-Verify Secret Cipher</label>
               <input className="premium-glass-input" type="password" placeholder="Re-Verify Password" required />
            </div>

            <div className="form-submit-container">
               <button type="submit" className="mega-premium-btn">AUTHORIZE CIPHER SHIFT</button>
            </div>
         </form>
      </div>
    </div>
  );


  const renderContent = () => {
    switch (page) {
      case "dashboard": return renderDashboard();
      case "trainings": return renderTrainings(); // Fallback for pure trainings page if needed
      case "syllabus": return renderSyllabusManager(); // Fallback
      case "add-job": return renderAddJob();
      case "add-users": return renderAddUsers();
      case "admin-report": return renderAdminReport();
      case "students-report": return renderStudentsReport();
      case "tpo-report": return renderTpoReport();
      case "training-report": return renderTrainingReport();
      case "job-report": return renderJobReport();
      case "job-registration": return renderJobRegistration();
      case "training-registration": return renderTrainingRegistration();
      case "my-account": return renderMyAccount();
      case "change-password": return renderChangePassword();
      default: return renderDashboard();
    }
  };

  /* Leftover essential modals from native dashboard */
  const renderTrainings = () => (
    <div className="dash-body animate-in" style={{ paddingBottom: '80px' }}>
      <div className="executive-form-card">
         <div className="form-premium-header">
            <div className="header-icon-box"><Award size={24} color="white" /></div>
            <h2 className="header-title">CREATE NEW COURSE EXECUTION PLAN</h2>
         </div>
         <form onSubmit={handleSaveTraining} className="premium-dual-form">
            <div className="dual-column-grid">
               <div className="pro-field-group">
                  <label className="pro-field-label">Course Title</label>
                  <input className="premium-glass-input" placeholder="e.g. React Native Masterclass" value={currentTraining.title} onChange={e => setCurrentTraining({...currentTraining, title: e.target.value})} required />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Subject Category</label>
                  <input className="premium-glass-input" placeholder="e.g. Frontend Development" value={currentTraining.subject} onChange={e => setCurrentTraining({...currentTraining, subject: e.target.value})} required />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Duration Sequence</label>
                  <input className="premium-glass-input" placeholder="e.g. 12 Weeks" value={currentTraining.duration} onChange={e => setCurrentTraining({...currentTraining, duration: e.target.value})} required />
               </div>
               <div className="pro-field-group">
                  <label className="pro-field-label">Price Value (in ₹)</label>
                  <input className="premium-glass-input" placeholder="e.g. 5000" type="number" value={currentTraining.price} onChange={e => setCurrentTraining({...currentTraining, price: e.target.value})} required />
               </div>
               <div className="pro-field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="pro-field-label">Instruction Outline (Description)</label>
                  <textarea className="premium-glass-input" style={{ minHeight: '120px' }} placeholder="Outline syllabus, key topics..." value={currentTraining.description} onChange={e => setCurrentTraining({...currentTraining, description: e.target.value})} required />
               </div>
            </div>

            <div className="form-submit-container" style={{ display: 'flex', gap: '20px' }}>
               <button type="button" onClick={() => setPage('dashboard')} className="mega-premium-btn" style={{ background: '#e2e8f0', color: '#475569' }}>CANCEL</button>
               <button type="submit" className="mega-premium-btn">LAUNCH SYLLABUS NODE</button>
            </div>
         </form>
      </div>
    </div>
  );

  const renderSyllabusManager = () => <>{setPage("dashboard")}</>; // Redirect stub

  return (
    <div className="dashboard-container">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="fixed-sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div className="sidebar-logo">🎓 <span>Executive Admin</span></div>
        <nav className="side-nav" style={{ flex: 1, overflowY: 'auto' }}>
          <div className={`nav-item ${page === 'dashboard' ? "active" : ""}`} onClick={() => setPage('dashboard')}><FaChartPie /> <span>Mega-Dashboard</span></div>
          {quickActions.map(action => (
             action.id === 'logout' ? null :
             <div 
               key={action.id} 
               className={`nav-item ${page === action.id ? "active" : ""}`}
               onClick={() => {
                 if (action.id === 'add-training') { setPage('trainings'); }
                 else setPage(action.id);
               }}
             >
               {action.icon} <span>{action.label}</span>
             </div>
          ))}
        </nav>
        <div className="sidebar-bottom" style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => navigate("/")} className="logout-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 'bold' }}>
            <FaSignOutAlt /> <span>Logout Gateway</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="main-content-area">
        <header className="top-navbar">
          <div className="search-bar"><FaSearch /><input type="text" placeholder="Global structural search..." /></div>
          <div className="profile-actions">
            <div className="nav-profile clickable-profile" onClick={() => setPage('my-account')}><span>System Root Node</span><div className="p-avatar">AD</div></div>
          </div>
        </header>

        <section className="scroll-content">
          {loading ? (
            <div className="loader-container"><div className="loader-spin"></div><p>Aggregating Deep Data Models...</p></div>
          ) : (
            renderContent()
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;