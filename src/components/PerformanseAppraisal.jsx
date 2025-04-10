import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const PerformanseAppraisal = () => {
  const [appraisals, setAppraisals] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

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
    event.stopPropagation(); // Prevent row click event
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
    <div style={styles.container}>
      <h2 style={styles.title}>Performance Appraisal</h2>

      {/* Add New Appraisal Button */}
      <Link to="/add-newAppraisal">
        <button style={styles.addButton}>+ Add New Appraisal</button>
      </Link>

      {/* Display Appraisals List */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Last Increment</th>
              <th>Last Promotion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appraisals.map((appraisal) => (
              <tr 
                key={appraisal.id} 
                onClick={() => navigate(`/appraisal-details/${appraisal.id}`)}
                style={styles.row}
              >
                <td>{appraisal.employee_id}</td>
                <td>{appraisal.name}</td>
                <td>{appraisal.designation}</td>
                <td>{appraisal.department}</td>
                <td>{appraisal.last_increment_date}</td>
                <td>{appraisal.last_promotion_date}</td>
                <td>
                  <button 
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click event
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// CSS-in-JS Styles (Outlook-Like UI)
const styles = {
  container: {
    width: "100%",
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f3f3f3",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  addButton: {
    background: "#0078D4",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "block",
    margin: "0 auto 20px",
    textDecoration: "none",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "8px",
    background: "white",
    padding: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  row: {
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    transition: "background 0.2s ease-in-out",
  },
  rowHover: {
    background: "#eef6ff",
  },
  editButton: {
    background: "#28a745",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PerformanseAppraisal;
