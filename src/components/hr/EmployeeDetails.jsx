import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";
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

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f3f4f6"
  };

  const mainContentStyle = {
    flex: 1,
    padding: "30px",
    overflowY: "auto"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "20px"
  };

  const searchInputStyle = {
    padding: "10px",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px"
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s ease"
  };

  const addButton = {
    ...buttonStyle,
    backgroundColor: "#0078d4",
    color: "#fff"
  };

  const printButton = {
    ...buttonStyle,
    backgroundColor: "#107c10",
    color: "#fff"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    backgroundColor: "#fff"
  };

  const thStyle = {
    backgroundColor: "#0078d4",
    color: "white",
    padding: "14px",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 1
  };

  const tdStyle = {
    padding: "14px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff"
  };

  const rowHoverStyle = {
    cursor: "pointer",
    transition: "background-color 0.2s ease"
  };

  const actionBtn = {
    ...buttonStyle,
    fontSize: "13px",
    padding: "6px 12px",
    marginRight: "6px"
  };

  const deleteBtn = {
    ...actionBtn,
    backgroundColor: "#e53935",
    color: "#fff"
  };

  const attachmentBtn = {
    ...actionBtn,
    backgroundColor: "#5f6368",
    color: "#fff"
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  };

  const pageBtn = {
    ...buttonStyle,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    color: "#333"
  };

  const activePageBtn = {
    ...pageBtn,
    backgroundColor: "#0078d4",
    color: "#fff",
    borderColor: "#0078d4"
  };

  return (
    <div style={containerStyle}>
      <Sidebars />

      <div style={mainContentStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0 }}>Employee Details</h2>
        </div>

        <div style={inputGroupStyle}>
          {/* Search input on top */}
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />

          {/* Buttons row below search */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={addButton} onClick={() => navigate("/add-employee")}>
              + Add Employee
            </button>
            <button style={printButton} onClick={handlePrint}>
              🖨️ Print All
            </button>
          </div>
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
                style={rowHoverStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f4f8")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
              >
                <td style={tdStyle}>{employee.employee_id}</td>
                <td style={tdStyle}>{employee.name}</td>
                <td style={tdStyle}>{employee.designation}</td>
                <td style={tdStyle}>{employee.department}</td>
                <td style={tdStyle}>{employee.company_name}</td>
                <td style={tdStyle}>{employee.salary}</td>
                <td style={tdStyle}>
                  <button
                    style={attachmentBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/employee/${employee.id}/attachments`);
                    }}
                  >
                    Attachment
                  </button>
                  <button
                    style={deleteBtn}
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
              style={currentPage === pageNumber ? activePageBtn : pageBtn}
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
