import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import Sidebars from './sidebars';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

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

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Styles
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
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

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  };

  const pageButtonStyle = {
    padding: "8px 12px",
    margin: "0 5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#fff"
  };

  const activePageButtonStyle = {
    ...pageButtonStyle,
    backgroundColor: "#0078d4",
    color: "#fff",
    border: "1px solid #0078d4"
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={{ display: 'flex' }}>
        <Sidebars />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* Your page content here */}
        </div>
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
            {currentEmployees.map((employee) => (
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
        <div style={paginationStyle}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={currentPage === pageNumber ? activePageButtonStyle : pageButtonStyle}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;