import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebars from "./sidebars";

const MailMdSir = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setInterviewDetails(location.state);
    } else {
      navigate("/interviews");
    }
  }, [location.state, navigate]);

  const handleSendMail = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.4.54:8000/api/employee/details/api/mdsir/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          interview_details: interviewDetails,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Email sent successfully and saved!");
        navigate(`/interviews?interview_id=${interviewDetails.id}`, { replace: true });
      } else {
        alert(`Error sending email: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  const getCSRFToken = () => {
    const name = "csrftoken";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

  return (
    <div style={styles.wrapper}>
      <Sidebars />
      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Send Interview Details</h2>

          <div style={styles.detailsContainer}>
            <h3 style={styles.subHeading}>Interview Details</h3>
            {Object.entries(interviewDetails).map(([key, value]) => (
              <p key={key}>
                <strong style={{ textTransform: "capitalize" }}>{key.replace(/_/g, ' ')}:</strong>{" "}
                {typeof value === "boolean" ? (value ? "Yes" : "No") : value || "N/A"}
              </p>
            ))}
          </div>

          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Recipient's Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter recipient's email"
            />
          </div>

          <button
            onClick={handleSendMail}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#ccc" : styles.button.backgroundColor,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = styles.button.backgroundColor;
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailMdSir;

// Styles
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#DCEEF3",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  content: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: '#A7D5E1',
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  subHeading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  detailsContainer: {
    backgroundColor: "#DCEEF3",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #E0E0E0",
    maxHeight: "400px",
    overflowY: "auto",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #D1D1D1",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#DCEEF3",
  },
  button: {
    width: "30%",
    padding: "12px",
    backgroundColor: "#0078D4",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#005A9E",
  },
};
