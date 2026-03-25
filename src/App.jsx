import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import TrainingDetails from "./pages/training-details";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trainings from "./pages/Trainings";
import Contact from "./pages/Contact";
import JavaMCQ from "./pages/JavaMCQ";
import AllJobs from "./pages/AllJobs";
import JobDetails from "./pages/JobDetails";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import Companies from "./pages/Companies"; 
import JobApplication from "./pages/JobApplication"; 
import ApplyJob from "./pages/ApplyJob";
import Jobs from "./pages/Jobs";
import ResumeIntelligence from "./pages/ResumeIntelligence";
import CompanyConnect from "./pages/CompanyConnect";
import CompanyDetails from "./pages/CompanyDetails";
import DriveCycles from "./pages/DriveCycles";
import CompanyProfile from "./pages/CompanyProfile";
import MockInterview from "./pages/MockInterview";
import CompanyDashboard from "./pages/CompanyDashboard";

// ✅ Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("userRole");
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />; // Or a custom 403 page
  }
  
  return children;
};

function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* GENERAL */}
      <Route path="/about" element={<About />} />
      <Route path="/trainings" element={<Trainings />} />
      <Route path="/training-details/:id" element={<TrainingDetails />} />
      <Route path="/training-assignment/:id" element={<Details />} />
      <Route path="/training/:id" element={<TrainingDetails />} />

      {/* JOBS */}
      <Route path="/alljobs" element={<AllJobs />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/jobapplication" element={<ApplyJob />} />
      <Route path="/jobs" element={<AllJobs />} />
      <Route path="/ApplyJob" element={<ApplyJob />} />

      {/* DASHBOARDS */}
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route 
        path="/admindashboard" 
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/company/connect/:id" 
        element={
          <ProtectedRoute allowedRole="admin">
            <CompanyConnect />
          </ProtectedRoute>
        } 
      />
      <Route path="/company-details/:id" element={<CompanyDetails />} />

      <Route 
        path="/admin/drive-cycles" 
        element={
          <ProtectedRoute allowedRole="admin">
            <DriveCycles />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/company-dashboard" 
        element={
          <ProtectedRoute allowedRole="company">
            <CompanyDashboard />
          </ProtectedRoute>
        } 
      />

      {/* STUDENT PANEL */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/student-applications" element={<Applications />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/company-profile/:id" element={<CompanyProfile />} />
    

      {/* OTHER */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/java-mcq" element={<JavaMCQ />} />
      <Route path="/resume-intelligence" element={<ResumeIntelligence />} />
      <Route path="/mock-interview" element={<MockInterview />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;