import { useState } from "react";
import axios from "axios";

function App() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastRun, setLastRun] = useState("");

  const runPipeline = async () => {
    if (!domain) {
      alert("Please enter a company domain");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/pipeline",
        { domain }
      );

      setData(response.data);
      setLastRun(new Date().toLocaleString());
    } catch (error) {
      console.error(error);
      alert("Error running pipeline");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = () => {
    alert("Email Sent Successfully!");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>🚀 Outreach Automation Dashboard</h1>

      <p>
        Automates company discovery, contact enrichment,
        email generation and outreach workflow.
      </p>

      <input
        type="text"
        placeholder="Enter company domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={runPipeline}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Run Pipeline
      </button>

      {loading && (
        <h3 style={{ color: "blue" }}>
          Running Pipeline...
        </h3>
      )}

      {data && (
        <>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "8px"
            }}
          >
            <h3>📊 Statistics</h3>
            <p>Companies Found: {data.companies.length}</p>
            <p>Contacts Found: {data.contacts.length}</p>
            <p>Emails Found: {data.emails.length}</p>
            <p>
              <strong>Last Run:</strong> {lastRun}
            </p>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "8px"
            }}
          >
            <h2>🏢 Similar Companies</h2>

            <ul>
              {data.companies.map((company) => (
                <li key={company}>{company}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "8px"
            }}
          >
            <h2>👤 Decision Makers</h2>

            <ul>
              {data.contacts.map((contact, index) => (
                <li key={index}>
                  {contact.name} - {contact.role}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "8px"
            }}
          >
            <h2>📧 Emails</h2>

            <ul>
              {data.emails.map((email) => (
                <li key={email}>{email}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "8px"
            }}
          >
            <h2>✉️ Email Preview</h2>

            <p>
              <strong>Subject:</strong> Partnership Opportunity
            </p>

            <p>Hi,</p>

            <p>
              We help companies automate outreach,
              lead generation and customer engagement.
            </p>

            <p>
              Looking forward to connecting with you.
            </p>

            <p>
              Regards,
              <br />
              Vijaya
            </p>

            <button
              onClick={sendEmail}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                cursor: "pointer"
              }}
            >
              Send Email
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;