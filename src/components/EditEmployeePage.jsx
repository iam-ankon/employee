import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employee_id: "",
    name: "",
    designation: "",
    joining_date: "",
    date_of_birth: "",
    email: "",
    mail_address: "",
    personal_phone: "",
    office_phone: "",
    reference_phone: "",
    job_title: "",
    department: "",
    company: "",
    salary: "",
    reporting_leader: "",
    special_skills: "",
    remarks: "",
    image1: null,
    permanent_address: "",
  });

  const [companies, setCompanies] = useState([]); // Store available companies

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/employee/details/api/employees/${id}/`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/employee/details/api/tad_groups/"); // Adjust API URL if needed
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchEmployee();
    fetchCompanies();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle company selection
  const handleCompanyChange = (e) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      company: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(employee).forEach((key) => {
        if (employee[key] !== null && employee[key] !== undefined) {
          if (key === "image1" && employee[key] instanceof File) {
            formData.append(key, employee[key]); // Append file
          } else {
            formData.append(key, employee[key]);
          }
        }
      });

      const response = await axios.put(
        `http://127.0.0.1:8000/api/employee/details/api/employees/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Employee updated:", response.data);
      navigate(`/employee/${id}`); // Redirect after update
    } catch (error) {
      console.error("Error updating employee:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
      }
    }
  };

  return (
    <div className="edit-employee">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {Object.keys(employee).map(
          (key) =>
            key !== "image1" &&
            key !== "company" && (
              <div key={key} className="form-group">
                <label htmlFor={key}>{key.replace(/_/g, " ").toUpperCase()}</label>
                {key === "remarks" ? (
                  <textarea
                    id={key}
                    name={key}
                    value={employee[key]}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <input
                    type={key === "salary" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={employee[key]}
                    onChange={handleChange}
                    className="input-field"
                  />
                )}
              </div>
            )
        )}

        {/* Company Dropdown */}
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <select
            name="company"
            value={employee.company}
            onChange={handleCompanyChange}
            className="input-field"
          >
            <option value="">Select Company</option>
            {companies.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.company_name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Field */}
        <div className="form-group">
          <label htmlFor="image1">Image 1</label>
          <input type="file" name="image1" onChange={handleChange} className="input-field" />
        </div>

        <button type="submit" className="submit-button">
          Update Employee
        </button>
      </form>

      <style jsx>{`
        .edit-employee {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 8px;
        }

        .edit-employee h2 {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          font-weight: bold;
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: #4a5568;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #cbd5e0;
          font-size: 1rem;
        }

        .input-field:focus {
          border-color: #63b3ed;
          outline: none;
        }

        textarea.input-field {
          resize: vertical;
          height: 150px;
        }

        .submit-button {
          background-color: #3182ce;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #2b6cb0;
        }
      `}</style>
    </div>
  );
};

export default EditEmployeePage;
