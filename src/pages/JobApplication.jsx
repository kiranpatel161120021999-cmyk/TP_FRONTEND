import React, { useState } from "react";

function Companies() {

  const [showForm, setShowForm] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const handleApply = (company) => {
    setCompanyName(company);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${companyName} ✅`);
    setShowForm(false);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Companies</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Apply</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>TCS</td>
            <td>Software Developer</td>
            <td>
              <button onClick={() => handleApply("TCS")}>Apply</button>
            </td>
          </tr>

          <tr>
            <td>Infosys</td>
            <td>System Engineer</td>
            <td>
              <button onClick={() => handleApply("Infosys")}>Apply</button>
            </td>
          </tr>

          <tr>
            <td>Wipro</td>
            <td>Frontend Developer</td>
            <td>
              <button onClick={() => handleApply("Wipro")}>Apply</button>
            </td>
          </tr>

        </tbody>
      </table>

      {/* Application Form */}

      {showForm && (
        <div style={{ marginTop: "30px", border: "1px solid gray", padding: "20px", width: "400px" }}>

          <h3>Apply for {companyName}</h3>

          <form onSubmit={handleSubmit}>

            <div>
              <label>Name</label>
              <br />
              <input type="text" required />
            </div>

            <br />

            <div>
              <label>Email</label>
              <br />
              <input type="email" required />
            </div>

            <br />

            <div>
              <label>Phone</label>
              <br />
              <input type="text" required />
            </div>

            <br />

            <div>
              <label>Resume Link</label>
              <br />
              <input type="text" placeholder="Drive / Portfolio link" required />
            </div>

            <br />

            <button type="submit">Submit Application</button>

          </form>

        </div>
      )}

    </div>
  );
}

export default Companies;