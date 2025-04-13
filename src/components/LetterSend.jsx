import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLetterSend, deleteLetterSend } from "../api/employeeApi";

const LetterSend = () => {
  const [cvs, setCvs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVs = async () => {
      const response = await getLetterSend();
      setCvs(response.data);
    };
    fetchCVs();
  }, []);

  const handleAddCV = () => {
    navigate("/add-letter");
  };

  const handleEditCV = (cvId) => {
    navigate(`/edit-cv/${cvId}`);
  };

  const handleDeleteCV = async (cvId) => {
    if (window.confirm("Are you sure you want to delete this Letter?")) {
      try {
        await deleteLetterSend(cvId);
        setCvs(cvs.filter((cv) => cv.id !== cvId));
        alert("Letter deleted successfully!");
      } catch (error) {
        console.error("Error deleting Letter:", error);
        alert("Failed to delete Letter. Please try again.");
      }
    }
  };

  const filteredCVs = cvs.filter((cv) =>
    cv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },
    sidebar: {
      width: "230px",
      backgroundColor: "#f3f6fb",
      height: "100vh",
      padding: "20px 15px",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
    },
    sidebarHeader: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#0078D4",
    },
    sidebarLink: {
      display: "block",
      padding: "10px",
      margin: "5px 0",
      textDecoration: "none",
      color: "#333",
      borderRadius: "6px",
      transition: "0.3s",
    },
    sidebarLinkHover: {
      backgroundColor: "#e1eaff",
    },
    mainContent: {
      flex: 1,
      overflowY: "auto",
      padding: "30px",
      backgroundColor: "#f3f3f3",
    },
    heading: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    searchInput: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      marginBottom: "20px",
    },
    addButton: {
      padding: "10px 20px",
      backgroundColor: "#0078D4",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginBottom: "20px",
    },
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
    },
    cardText: {
      color: "#333",
      marginBottom: "8px",
    },
    cardLink: {
      color: "#0078D4",
      textDecoration: "none",
    },
    buttonContainer: {
      marginTop: "10px",
      display: "flex",
      gap: "10px",
    },
    editButton: {
      padding: "6px 12px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    deleteButton: {
      padding: "6px 12px",
      backgroundColor: "#d9534f",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>HR Work</div>
        <a href="/cv-add" style={styles.sidebarLink}>Add CV</a>
        <a href="/interviews" style={styles.sidebarLink}>Interviews</a>
        <a href="/employee" style={styles.sidebarLink}>Employee</a>
        <a href="/attendance" style={styles.sidebarLink}>Attendance</a>
        <a href="/employee_leave" style={styles.sidebarLink}>Employee Leave</a>
        <a href="/performanse_appraisal" style={styles.sidebarLink}>Performance Appraisal</a>
        <a href="/finance-provision" style={styles.sidebarLink}>Finance Provision</a>
        <a href="/employee-termination" style={styles.sidebarLink}>Employee Termination</a>
        <a href="/letter-send" style={{ ...styles.sidebarLink, backgroundColor: "#e1eaff" }}>Send Letter</a>
        <a href="/email-logs" style={styles.sidebarLink}>Email Logs</a>
        <a href="/tad-groups" style={styles.sidebarLink}>TAD Groups</a>
        
      </div>

      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Letter Send</h2>

        <input
          type="text"
          placeholder="Search Letter..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />

        <button onClick={handleAddCV} style={styles.addButton}>
          Send Email
        </button>

        <div style={styles.cardContainer}>
          {filteredCVs.map((cv) => (
            <div key={cv.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{cv.name}</h3>
              <p style={styles.cardText}>Email: {cv.email}</p>
              <p style={styles.cardText}>Letter Type: {cv.letter_type}</p>
              <p style={styles.cardText}>
                Letter File:{" "}
                {cv.letter_file ? (
                  <a
                    href={cv.letter_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.cardLink}
                  >
                    View Letter
                  </a>
                ) : (
                  "No File"
                )}
              </p>
              <div style={styles.buttonContainer}>
                <button
                  onClick={() => handleEditCV(cv.id)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCV(cv.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterSend;
