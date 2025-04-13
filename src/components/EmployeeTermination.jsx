import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://192.168.4.183:8000/api/employee/details/api/employees/";

const EmployeeTermination = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/employee/${id}`);
  };

  const handleDelete = async (e, employeeId) => {
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}${employeeId}/`);
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employee_id.toString().includes(searchTerm)
  );

  const handlePrint = () => {
    window.print();
  };

  const styles = {
    container: {
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
    content: {
      flex: 1,
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    searchInput: {
      padding: "10px",
      marginBottom: "15px",
      width: "300px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    printButton: {
      padding: "10px 15px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#0078D4",
      color: "white",
      padding: "12px 10px",
      textAlign: "left",
    },
    td: {
      padding: "12px 10px",
      textAlign: "left",
      verticalAlign: "middle",
    },
    actionButton: {
      marginRight: "5px",
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#d9534f",
      color: "white",
      border: "none",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>HR Work</div>
        <a href="/cv-add" style={styles.sidebarLink}>Add CV</a>
        <a href="/interviews" style={styles.sidebarLink}>Interviews</a>
        <a href="/employee" style={styles.sidebarLink}>Employee</a>
        <a href="/attendance" style={styles.sidebarLink}>Attendance</a>
        <a href="/employee_leave" style={styles.sidebarLink}>Employee Leave</a>
        <a href="/performanse_appraisal" style={styles.sidebarLink}>Performance Appraisal</a>
        <a href="/finance-provision" style={styles.sidebarLink}>Finance Provision</a>
        <a href="/employee-termination" style={{ ...styles.sidebarLink, backgroundColor: "#e1eaff" }}>Employee Termination</a>
        <a href="/letter-send" style={styles.sidebarLink}>Send Letter</a>
        <a href="/email-logs" style={styles.sidebarLink}>Email Logs</a>
        <a href="/tad-groups" style={styles.sidebarLink}>TAD Groups</a>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h2>Employee Termination</h2>
        </div>

        <input
          type="text"
          placeholder="Search by Name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <button style={styles.printButton} onClick={handlePrint}>
          🖨️ Print List
        </button>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Designation</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Salary</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr
                key={employee.id}
                onClick={() => handleRowClick(employee.id)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f9f9f9" : "#ffffff")
                }
              >
                <td style={styles.td}>{employee.employee_id}</td>
                <td style={styles.td}>{employee.name}</td>
                <td style={styles.td}>{employee.designation}</td>
                <td style={styles.td}>{employee.department}</td>
                <td style={styles.td}>{employee.company_name}</td>
                <td style={styles.td}>{employee.salary}</td>
                <td style={{ ...styles.td, display: "flex", gap: "5px" }}>
                  <button
                    style={{
                      ...styles.actionButton,
                      backgroundColor: "#0078D4",
                      color: "white",
                      border: "none",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/attachments/${employee.id}`);
                    }}
                  >
                    📎 Attachment
                  </button>
                  <button
                    style={{
                      ...styles.actionButton,
                      ...styles.deleteButton,
                    }}
                    onClick={(e) => handleDelete(e, employee.id)}
                  >
                    🗑️ Delete
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

export default EmployeeTermination;
