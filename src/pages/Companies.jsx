import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaGraduationCap, FaMoneyBillWave, FaBuilding, FaTimes, FaCheckCircle, FaFilter } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/Companies.css";

const MOCK_COMPANIES = [
  {
    id: 1,
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    role: "Software Developer",
    package: "3.5 - 5.0 LPA",
    location: "Pune, India",
    eligibility: "60% & above",
    tags: ["IT Services", "MNC", "Bulk Hiring"]
  },
  {
    id: 2,
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    role: "System Engineer",
    package: "4.0 LPA",
    location: "Bangalore",
    eligibility: "65% & above",
    tags: ["Software", "Consulting"]
  },
  {
    id: 3,
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    role: "Frontend Developer",
    package: "4.5 LPA",
    location: "Hyderabad",
    eligibility: "65% & above",
    tags: ["IT Consulting", "Web Dev"]
  },
  {
    id: 4,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    role: "SDE - 1",
    package: "15.0 - 24.0 LPA",
    location: "Hyderabad / Bangalore",
    eligibility: "75% & above (No Backlogs)",
    tags: ["Product Based", "E-Commerce", "Tier 1"]
  },
  {
    id: 5,
    name: "Cognizant",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg",
    role: "Programmer Analyst Trainee",
    package: "4.0 - 6.7 LPA",
    location: "Chennai",
    eligibility: "60% & above",
    tags: ["IT Services", "MNC"]
  },
  {
    id: 6,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    role: "Support Engineer",
    package: "12.0 LPA",
    location: "Noida / Hyderabad",
    eligibility: "70% & above",
    tags: ["Product Based", "Cloud"]
  }
];

function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", resume: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Filters State
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter logic
  const filteredCompanies = MOCK_COMPANIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Tier 1") return matchesSearch && c.tags.includes("Tier 1");
    if (activeFilter === "MNC") return matchesSearch && c.tags.includes("MNC");
    if (activeFilter === "Product Based") return matchesSearch && c.tags.includes("Product Based");
    return matchesSearch;
  });

  const openModal = (company) => {
    setSelectedCompany(company);
    setIsSuccess(false);
    setFormData({ name: "", email: "", phone: "", resume: "" });
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setIsSuccess(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="companies-page">
      <Header />

      {/* ── ELITE MESH HERO ── */}
      <section className="comp-hero">
        <div className="comp-container comp-hero-content reveal-in">
          <span className="comp-badge"><FaBuilding /> Hiring Partners</span>
          <h1>Elite <span>Recruitment Network</span></h1>
          <p>Connect with the world's most ambitious companies. Track active drives, explore exclusive campus openings, and launch your career.</p>
          
          <div className="comp-search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by company, tech stack, or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT LAYOUT ── */}
      <section className="comp-main-sec">
        <div className="comp-container comp-content-layout">
          
          {/* Filtering Sidebar */}
          <aside className="comp-filter-sidebar reveal-in">
            <div className="filter-group">
              <h4>Filter by Type</h4>
              <div className="filter-pill-list">
                {["All", "Tier 1", "MNC", "Product Based"].map(f => (
                  <span 
                    key={f} 
                    className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Active Locations</h4>
              <div className="filter-pill-list">
                {["Bangalore", "Hyderabad", "Pune", "Remote"].map(l => (
                  <span key={l} className="filter-pill">{l}</span>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Package Tiers</h4>
              <div className="filter-pill-list">
                {["< 5 LPA", "5 - 10 LPA", "10 - 20 LPA", "20+ LPA"].map(p => (
                  <span key={p} className="filter-pill">{p}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Company Display Area */}
          <div className="comp-display-area">
            <div className="comp-header-row reveal-in">
              <h2>Open Drives ({filteredCompanies.length})</h2>
              <div className="sort-box" style={{fontSize:'14px', fontWeight:'700', color:'#64748b'}}>
                Sorted by: <span style={{color:'#7c3aed'}}>Most Recent</span>
              </div>
            </div>

            {filteredCompanies.length === 0 ? (
              <div className="comp-empty">
                <FaBuilding className="empty-icon" />
                <h3>No companies found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              <div className="comp-grid">
                {filteredCompanies.map((company, index) => (
                  <div className="comp-card reveal-in" key={company.id} style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="comp-card-top">
                      <div className="comp-logo-box">
                        <img src={company.logo} alt={company.name} />
                      </div>
                      <span className="comp-tag">{company.tags[0]}</span>
                    </div>
                    
                    <h3 className="comp-name">{company.name}</h3>
                    <h4 className="comp-role">{company.role}</h4>

                    <div className="comp-details-list">
                      <div className="cd-item">
                        <FaMoneyBillWave className="cd-icon" />
                        <span>{company.package}</span>
                      </div>
                      <div className="cd-item">
                        <FaMapMarkerAlt className="cd-icon" />
                        <span>{company.location}</span>
                      </div>
                      <div className="cd-item">
                        <FaGraduationCap className="cd-icon" />
                        <span>{company.eligibility}</span>
                      </div>
                      <div className="cd-item">
                        <FaFilter className="cd-icon" />
                        <span>{company.tags[1] || 'Global'}</span>
                      </div>
                    </div>

                    <button className="comp-apply-btn" onClick={() => openModal(company)}>
                      Quick Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MODAL 2.0 ── */}
      {selectedCompany && (
        <div className="comp-modal-overlay" onClick={closeModal}>
          <div className="comp-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><FaTimes /></button>
            
            {!isSuccess ? (
              <>
                <div className="modal-header">
                  <img src={selectedCompany.logo} alt="logo" className="modal-logo" />
                  <div>
                    <h2 style={{color:'white'}}>Apply to {selectedCompany.name}</h2>
                    <p style={{color:'rgba(255,255,255,0.7)'}}>{selectedCompany.role} • {selectedCompany.location}</p>
                  </div>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Rahul Sharma" />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>College Email</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="rahul@collage.edu" />
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 9876543210" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Professional Profile / Portfolio</label>
                    <input type="url" name="resume" required value={formData.resume} onChange={handleInputChange} placeholder="LinkedIn or Portfolio Link" />
                  </div>

                  <div className="modal-actions" style={{marginTop:'40px'}}>
                    <button type="submit" className="modal-submit-btn" style={{width:'100%', borderRadius:'12px'}} disabled={isSubmitting}>
                      {isSubmitting ? "Validating Profile..." : "Confirm Application"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="modal-success" style={{padding:'60px 40px'}}>
                <FaCheckCircle className="success-icon" style={{fontSize:'80px'}} />
                <h2>Profile Shortlisted!</h2>
                <p>Your application for <strong>{selectedCompany.name}</strong> is currently being processed. You'll receive an update in the Dashboard soon.</p>
                <button className="modal-submit-btn w-full" style={{borderRadius:'12px'}} onClick={closeModal}>Go to Dashboard</button>
              </div>
            )}
            
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Companies;