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

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://192.168.4.183:8000/api/employee/details/api/employees/${id}/`);
        const emp = res.data;
        setEmployee({
          ...emp,
          company: emp.company?.id || emp.company,
        });
      } catch (err) {
        console.error("Error fetching employee details", err);
      }
    };

    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://192.168.4.183:8000/api/employee/details/api/tad_groups/");
        setCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies", err);
      }
    };

    fetchEmployee();
    fetchCompanies();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(employee).forEach((key) => {
        if (employee[key] !== null && employee[key] !== undefined) {
          formData.append(key, employee[key]);
        }
      });

      await axios.put(
        `http://192.168.4.183:8000/api/employee/details/api/employees/${id}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate(`/employee/${id}`);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="edit-employee">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>Employee ID</label>
            <input name="employee_id" value={employee.employee_id} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={employee.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input name="designation" value={employee.designation} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input type="date" name="joining_date" value={employee.joining_date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="date_of_birth" value={employee.date_of_birth} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={employee.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Mailing Address</label>
            <input name="mail_address" value={employee.mail_address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Personal Phone</label>
            <input name="personal_phone" value={employee.personal_phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Office Phone</label>
            <input name="office_phone" value={employee.office_phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Reference Phone</label>
            <input name="reference_phone" value={employee.reference_phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input name="job_title" value={employee.job_title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input name="department" value={employee.department} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input type="number" name="salary" value={employee.salary} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Reporting Leader</label>
            <input name="reporting_leader" value={employee.reporting_leader} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Special Skills</label>
            <textarea name="special_skills" value={employee.special_skills} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea name="remarks" value={employee.remarks} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Permanent Address</label>
            <textarea name="permanent_address" value={employee.permanent_address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Company</label>
            <select name="company" value={employee.company} onChange={handleChange}>
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.company_name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="image1" onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="submit-button">Update Employee</button>
      </form>

      <style jsx>{`
        .edit-employee {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
          margin-bottom: 6px;
        }

        input, select, textarea {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        textarea {
          resize: vertical;
        }

        .submit-button {
          margin-top: 30px;
          padding: 12px 20px;
          font-size: 1rem;
          background-color: #3182ce;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          align-self: center;
        }

        .submit-button:hover {
          background-color: #2b6cb0;
        }
      `}</style>
    </div>
  );
};

export default EditEmployeePage;
