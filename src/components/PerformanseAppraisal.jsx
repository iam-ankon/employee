import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PerformanseAppraisal = () => {
  const [appraisals, setAppraisals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppraisals();
  }, []);

  const fetchAppraisals = async () => {
    try {
      const response = await axios.get("http://192.168.4.183:8000/api/employee/details/api/performanse_appraisals/");
      setAppraisals(response.data);
    } catch (error) {
      console.error("Error fetching appraisals:", error);
    }
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this appraisal?")) {
      try {
        await axios.delete(`http://192.168.4.183:8000/api/employee/details/api/performanse_appraisals/${id}/`);
        setAppraisals(appraisals.filter((appraisal) => appraisal.id !== id));
      } catch (error) {
        console.error("Error deleting appraisal:", error);
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>HR Work</div>
        <a href="/cv-add" style={styles.sidebarLink}>Add CV</a>
        <a href="/interviews" style={styles.sidebarLink}>Interviews</a>
        <a href="/employee" style={styles.sidebarLink}>Employee</a>
        <a href="/attendance" style={styles.sidebarLink}>Attendance</a>
        <a href="/employee_leave" style={styles.sidebarLink}>Employee Leave</a>
        <a href="/performanse_appraisal" style={{ ...styles.sidebarLink, backgroundColor: "#e1eaff" }}>Performance Appraisal</a>
        <a href="/finance-provision" style={styles.sidebarLink}>Finance Provision</a>
        <a href="/employee-termination" style={styles.sidebarLink}>Employee Termination</a>
        <a href="/letter-send" style={styles.sidebarLink}>Send Letter</a>
        <a href="/email-logs" style={styles.sidebarLink}>Email Logs</a>
        <a href="/tad-groups" style={styles.sidebarLink}>TAD Groups</a>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.title}>Performance Appraisal</h2>

        <Link to="/add-newAppraisal">
          <button style={styles.addButton}>+ Add New Appraisal</button>
        </Link>

        <div style={styles.cardsWrapper}>
          {appraisals.map((appraisal) => (
            <div
              key={appraisal.id}
              style={styles.card}
              onClick={() => navigate(`/appraisal-details/${appraisal.id}`)}
            >
              <div style={styles.cardTop}>
                <div><strong>Employee ID:</strong> {appraisal.employee_id}</div>
                <div><strong>Name:</strong> {appraisal.name}</div>
              </div>
              <div style={styles.cardMiddle}>
                <div><strong>Designation:</strong> {appraisal.designation}</div>
                <div><strong>Department:</strong> {appraisal.department}</div>
              </div>
              <div style={styles.cardBottom}>
                <div><strong>Last Increment:</strong> {appraisal.last_increment_date}</div>
                <div><strong>Last Promotion:</strong> {appraisal.last_promotion_date}</div>
              </div>
              <div style={styles.cardActions}>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/edit-appraisal/${appraisal.id}`);
                  }}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={(event) => handleDelete(appraisal.id, event)}
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

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8f9fb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: "220px",
    background: "#ffffff",
    padding: "20px",
    borderRight: "1px solid #ddd",
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
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
    marginBottom: "5px",
    color: "#333",
    textDecoration: "none",
    borderRadius: "4px",
    transition: "background 0.3s",
  },
  container: {
    flex: 1,
    padding: "40px",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "28px",
    marginBottom: "30px",
  },
  addButton: {
    background: "#0078D4",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "block",
    margin: "0 auto 30px",
    fontSize: "16px",
  },
  cardsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
    cursor: "pointer",
  },
  cardTop: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  cardMiddle: {
    marginBottom: "10px",
    fontSize: "15px",
    color: "#555",
  },
  cardBottom: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  editButton: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default PerformanseAppraisal;
