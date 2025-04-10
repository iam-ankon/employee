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
    e.stopPropagation(); // Prevent row click event

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
    container: { padding: "20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    buttonContainer: { display: "flex", gap: "10px", width: "fit-content", marginTop: "10px" },
    searchInput: { padding: "8px", marginBottom: "10px", width: "250px" },
    printButton: {
      padding: "10px 15px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      width: "auto"
    },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
    th: { backgroundColor: "#0078D4", color: "white", padding: "10px" },
    td: { padding: "10px", borderBottom: "1px solid #ddd", cursor: "pointer" },
    actionButton: { marginRight: "5px", padding: "5px 10px", cursor: "pointer" },
    deleteButton: { backgroundColor: "#d9534f", color: "white", border: "none" }
  };

  return (
    <div style={styles.container}>
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
      <div style={styles.buttonContainer}>
        <button style={styles.printButton} onClick={handlePrint}>
          🖨️ Print List
        </button>
      </div>
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
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} onClick={() => handleRowClick(employee.id)} style={styles.td}>
              <td>{employee.employee_id}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.department}</td>
              <td>{employee.company_name}</td>
              <td>{employee.salary}</td>
              <td>
                <button
                  style={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/attachments/${employee.id}`);
                  }}>
                  Attachment
                </button>

                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={(e) => handleDelete(e, employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTermination;
