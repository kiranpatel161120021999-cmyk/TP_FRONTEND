import React from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {

  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      company: "TCS",
      role: "Frontend Developer",
      location: "Pune"
    },
    {
      id: 2,
      company: "Infosys",
      role: "Backend Developer",
      location: "Bangalore"
    },
    {
      id: 3,
      company: "Wipro",
      role: "Full Stack Developer",
      location: "Hyderabad"
    }
  ];

  const applyJob = (job) => {
    navigate("/apply-job", { state: job });
  };

  return (
    <div>

      <h2>Job List</h2>

      <table>

        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job.id}>

              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>{job.location}</td>

              <td>
                <button onClick={() => applyJob(job)}>
                  Apply
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Jobs;