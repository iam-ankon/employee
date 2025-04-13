import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  // Styles
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const sidebarStyle = {
    width: "230px",
    backgroundColor: "#f3f6fb",
    padding: "20px 15px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
    flexShrink: 0
  };

  const sidebarHeaderStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#0078D4"
  };

  const sidebarLinkStyle = {
    display: "block",
    padding: "10px",
    margin: "5px 0",
    textDecoration: "none",
    color: "#333",
    borderRadius: "6px",
    transition: "0.3s"
  };

  const mainContentStyle = {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f3f2f1"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "20px"
  };

  const searchInputStyle = {
    padding: "10px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "14px"
  };

  const addButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#0078d4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const printButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#107c10",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
    borderRadius: "6px",
    overflow: "hidden"
  };

  const thStyle = {
    backgroundColor: "#0078d4",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontWeight: "500"
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #e1e1e1",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const actionButtonStyle = {
    marginRight: "8px",
    padding: "6px 12px",
    fontSize: "13px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer"
  };

  const deleteButtonStyle = {
    backgroundColor: "#d9534f",
    color: "white"
  };

  const attachmentButtonStyle = {
    backgroundColor: "#605e5c",
    color: "white"
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>HR Work</div>
        <Link to="/cv-add" style={sidebarLinkStyle}>Add CV</Link>
        <Link to="/interviews" style={sidebarLinkStyle}>Interviews</Link>
        <Link to="/employee" style={{ ...sidebarLinkStyle, backgroundColor: "#e1eaff" }}>Employee</Link>
        <Link to="/attendance" style={sidebarLinkStyle}>Attendance</Link>
        <Link to="/employee_leave" style={sidebarLinkStyle}>Employee Leave</Link>
        <Link to="/performanse_appraisal" style={sidebarLinkStyle}>Performance Appraisal</Link>
        <Link to="/finance-provision" style={sidebarLinkStyle}>Finance Provision</Link>
        <Link to="/employee-termination" style={sidebarLinkStyle}>Employee Termination</Link>
        <Link to="/letter-send" style={sidebarLinkStyle}>Send Letter</Link>
        <Link to="/email-logs" style={sidebarLinkStyle}>Email Logs</Link>
        <Link to="/tad-groups" style={sidebarLinkStyle}>TAD Groups</Link>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <div style={headerStyle}>
          <h2>Employee Details</h2>
        </div>
        
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
        
        <div style={buttonContainerStyle}>
          <button style={addButtonStyle} onClick={() => navigate("/add-employee")}>
            + Add Employee
          </button>
          <button style={printButtonStyle} onClick={handlePrint}>
            🖨️ Print All
          </button>
        </div>
        
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Designation</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Salary</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => handleRowClick(employee.id)}
                style={tdStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <td style={tdStyle}>{employee.employee_id}</td>
                <td style={tdStyle}>{employee.name}</td>
                <td style={tdStyle}>{employee.designation}</td>
                <td style={tdStyle}>{employee.department}</td>
                <td style={tdStyle}>{employee.company_name}</td>
                <td style={tdStyle}>{employee.salary}</td>
                <td style={tdStyle}>
                  <button
                    style={{ ...actionButtonStyle, ...attachmentButtonStyle }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/employee/${employee.id}/attachments`);
                    }}
                  >
                    Attachment
                  </button>
                  <button
                    style={{ ...actionButtonStyle, ...deleteButtonStyle }}
                    onClick={(e) => handleDelete(employee.id, e)}
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

export default EmployeeDetails;