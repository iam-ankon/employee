import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../api/employeeApi";

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        console.log(response.data);  // Check the response here
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };
    

    fetchEmployee();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div className="employee-detail">
      <h2>Employee Details</h2>

      <div className="profile">
        <img src={employee.image1} alt="Employee" className="profile-image" />
        {employee.image2 && <img src={employee.image2} alt="Employee" className="profile-image" />}
      </div>

      <table className="detail-table">
        <tbody>
          <tr><td><strong>Employee ID:</strong></td><td>{employee.employee_id}</td></tr>
          <tr><td><strong>Name:</strong></td><td>{employee.name}</td></tr>
          <tr><td><strong>Designation:</strong></td><td>{employee.designation}</td></tr>
          <tr><td><strong>Department:</strong></td><td>{employee.department}</td></tr>
          <tr><td><strong>Company:</strong></td><td>{employee.company_name || employee.company}</td></tr>
          <tr><td><strong>Job Title:</strong></td><td>{employee.job_title}</td></tr>
          <tr><td><strong>Salary:</strong></td><td>${employee.salary}</td></tr>
          <tr><td><strong>Email:</strong></td><td>{employee.email}</td></tr>
          <tr><td><strong>Personal Phone:</strong></td><td>{employee.personal_phone}</td></tr>
          <tr><td><strong>Office Phone:</strong></td><td>{employee.office_phone}</td></tr>
          <tr><td><strong>Reference Phone:</strong></td><td>{employee.reference_phone || "N/A"}</td></tr>
          <tr><td><strong>Joining Date:</strong></td><td>{employee.joining_date}</td></tr>
          <tr><td><strong>Date of Birth:</strong></td><td>{employee.date_of_birth}</td></tr>
          <tr><td><strong>Mail Address:</strong></td><td>{employee.mail_address}</td></tr>
          <tr><td><strong>Permanent Address:</strong></td><td>{employee.permanent_address}</td></tr>
          <tr><td><strong>Reporting Leader:</strong></td><td>{employee.reporting_leader}</td></tr>
          <tr><td><strong>Special Skills:</strong></td><td>{employee.special_skills || "N/A"}</td></tr>
          <tr><td><strong>Remarks:</strong></td><td>{employee.remarks || "N/A"}</td></tr>
        </tbody>
      </table>

      <div className="button-group">
        <button onClick={() => navigate(`/edit-employee/${id}`)} className="edit-button"> ✏️ Edit Employee</button>
        <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
        <button onClick={handlePrint} className="print-button"> 🖨️ Print Details</button>
      </div>

      <style jsx>{`
  /* General Styling */
  .employee-detail {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }

  h2 {
    font-size: 2rem;
    color: #2a3d6b;
    margin-bottom: 20px;
  }

  /* Profile Image Styling */
  .profile {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .profile-image {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin: 0 10px;
    border: 2px solid #0078d4;
    object-fit: cover;
  }

  /* Table Styling */
  .detail-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .detail-table td {
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 1rem;
  }

  .detail-table td strong {
    color: #0078d4;
  }

  .detail-table tr:last-child td {
    border-bottom: none;
  }

  /* Button Group */
  .button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .edit-button,
  .back-button,
  .print-button {
    padding: 12px 25px;
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .edit-button {
    background-color: #0078d4;
  }

  .edit-button:hover {
    background-color: #005fa3;
  }

  .back-button {
    background-color: #f5f5f5;
    color: #0078d4;
    border: 1px solid #0078d4;
  }

  .back-button:hover {
    background-color: #0078d4;
    color: white;
  }

  .print-button {
    background-color: #28a745;
  }

  .print-button:hover {
    background-color: #218838;
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .employee-detail {
      padding: 15px;
    }

    .profile {
      flex-direction: column;
      align-items: center;
    }

    .profile-image {
      width: 100px;
      height: 100px;
    }

    .button-group {
      flex-direction: column;
      gap: 10px;
    }
  }
`}</style>

    </div>
  );
};

export default EmployeeDetailPage;
