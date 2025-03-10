import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/employee/details/api/employee_termination/";

const EmployeeTermination = () => {
  const [employees, setEmployees] = useState([]);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Employee Termination</h2>
      <button className="btn add-btn" onClick={() => navigate("/add-termination")}>Add New Employee</button>

      {/* Employee List */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee_id}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.department}</td>
              <td>{employee.company_name}</td>
              <td>${employee.salary}</td>
              <td>
                <button className="btn edit-btn" onClick={() => navigate(`/edit/${employee.id}`)}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          background-color: #f4f6f9;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          font-size: 28px;
          color: #333;
          margin-bottom: 20px;
        }

        .btn {
          padding: 8px 16px;
          margin: 5px;
          font-size: 14px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-btn {
          background-color:rgba(19, 186, 50, 0.78);
          color: white;
        }

        .edit-btn {
          background-color: #ffa500;
          color: white;
        }

        .delete-btn {
          background-color: #d9534f;
          color: white;
        }

        .employee-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background-color: white;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        }

        .employee-table th,
        .employee-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .employee-table th {
          background-color: #0078d4;
          color: white;
        }

        .employee-table tr:hover {
          background-color: #f1f1f1;
        }

        .employee-table td button {
          padding: 6px 12px;
          margin-right: 5px;
          border-radius: 4px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default EmployeeTermination;
