import React, { useState } from "react";

function Application() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      name,
      email,
      phone,
      resume,
      company
    };

    console.log(applicationData);
    

    alert("Application submitted successfully ✅");

    setName("");
    setEmail("");
    setPhone("");
    setResume("");
    setCompany("");
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Job Application Form</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          border: "1px solid #ccc",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px"
        }}
      >

        <label>Company Name</label>
        <br />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <br /><br />

        <label>Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <label>Phone</label>
        <br />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br /><br />

        <label>Resume Link</label>
        <br />
        <input
          type="text"
          placeholder="Google Drive / Portfolio link"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Submit Application</button>

      </form>

    </div>
  );
}

export default Application;