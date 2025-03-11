import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/employee/${id}`);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error("Error deleting employee", error);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employee_id.toString().includes(searchQuery) ||
      employee.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: { padding: "20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    buttonContainer: {
      display: "flex",
      gap: "10px",  // Space between buttons
      width: "fit-content",
      marginTop: "10px" // Ensures it's spaced from the table
    },
    searchInput: { padding: "8px", marginBottom: "10px", width: "250px" },
    addButton: {
      padding: "10px 15px",
      backgroundColor: "#0078D4",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      width: "auto"
    },
    printButton: {
      padding: "10px 15px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      width: "auto" // Ensures Print button does not stretch
    },
    printLogo: { width: "20px", height: "20px", marginRight: "8px" }, // Logo styling
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
    th: { backgroundColor: "#0078D4", color: "white", padding: "10px" },
    td: { padding: "10px", borderBottom: "1px solid #ddd", cursor: "pointer" },
    actionButton: { marginRight: "5px", padding: "5px 10px", cursor: "pointer" },
    deleteButton: { backgroundColor: "#d9534f", color: "white", border: "none" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Employee Details</h2>
      </div>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={() => navigate("/add-employee")}>+ Add Employee</button>
        <button style={styles.printButton} onClick={handlePrint}>
        🖨️ Print All
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
                    navigate(`/employee/${employee.id}/attachments`);
                  }}>
                  Attachment
                </button>

                <button style={{ ...styles.actionButton, ...styles.deleteButton }} onClick={(e) => handleDelete(employee.id, e)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
