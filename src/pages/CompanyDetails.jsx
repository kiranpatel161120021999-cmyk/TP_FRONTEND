import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CompanyDetails = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: "80px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <h1 style={{ color: "#1e1b4b", fontSize: "32px", fontWeight: 900 }}>Company Details</h1>
        <p style={{ color: "#6b7280", marginTop: "12px" }}>Detailed information about this company.</p>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDetails;
