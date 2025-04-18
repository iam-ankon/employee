// EmployeeDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../../api/employeeApi";
import axios from 'axios';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [customerNames, setCustomerNames] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  useEffect(() => {
    const fetchCustomerNames = async () => {
      if (employee?.customer && employee.customer.length > 0) {
        const names = [];
        for (const customerId of employee.customer) {
          try {
            const response = await axios.get(`http://192.168.4.183:8000/api/employee/details/api/customers/${customerId}/`);
            names.push(response.data.customer_name); // Assuming your customer API returns 'customer_name'
          } catch (error) {
            console.error(`Error fetching customer ${customerId}`, error);
            names.push("N/A"); // Handle cases where fetching fails
          }
        }
        setCustomerNames(names);
      } else {
        setCustomerNames([]);
      }
    };

    fetchCustomerNames();
  }, [employee]);

  const handlePrint = () => {
    window.print();
  };

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div>
      <style>
        {`
          @media print {
            body {
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0;
              padding: 0;
            }

            .employee-detail {
              width: 100%;
              margin: 0 auto;
              padding: 20px;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #000;
            }

            .employee-detail h2 {
              text-align: center;
              color: #0078d4;
              margin-bottom: 20px;
              font-size: 24px;
            }

            .profile {
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
            }

            .profile-image {
              width: 150px;
              height: 150px;
              object-fit: cover;
              border-radius: 10px;
              margin: 0 10px;
              border: 2px solid #0078d4;
            }

            .detail-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              font-size: 14px;
            }

            .detail-table td {
              padding: 8px 10px;
              vertical-align: top;
            }

            .detail-table td:first-child {
              font-weight: bold;
              color: #444;
              width: 30%;
            }

            .detail-table tr {
              border-bottom: 1px solid #ccc;
            }

            .no-print {
              display: none !important;
            }
          }

          .employee-detail {
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            background: #f9f9f9;
          }

          .employee-detail h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #0078d4;
          }

          .profile {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
          }

          .profile-image {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            border: 2px solid #0078d4;
          }

          .detail-table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            font-size: 15px;
          }

          .detail-table td {
            padding: 8px;
            border-bottom: 1px solid #ccc;
          }

          .detail-table td:first-child {
            font-weight: bold;
            color: #333;
            width: 35%;
          }

          .button-group {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .button-group button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
          }

          .edit-button {
            background-color: #0078d4;
            color: white;
          }

          .back-button {
            background-color: #f0ad4e;
            color: white;
          }

          .print-button {
            background-color: #5cb85c;
            color: white;
          }
        `}
      </style>

      <div className="employee-detail">
        <h2>Employee Details</h2>

        <div className="profile">
          <img src={employee.image1} alt="Employee" className="profile-image" />
          {employee.image2 && <img src={employee.image2} alt="Employee" className="profile-image" />}
        </div>

        <table className="detail-table">
          <tbody>
            <tr><td>Employee ID:</td><td>{employee.employee_id}</td></tr>
            <tr><td>Name:</td><td>{employee.name}</td></tr>
            <tr><td>Designation:</td><td>{employee.designation}</td></tr>
            <tr><td>Department:</td><td>{employee.department}</td></tr>
            <tr>
              <td>Customer:</td>
              <td>{customerNames.length > 0 ? customerNames.join(", ") : "N/A"}</td>
            </tr>
            <tr><td>Company:</td><td>{employee.company_name || employee.company}</td></tr>
            <tr><td>Job Title:</td><td>{employee.job_title}</td></tr>
            <tr><td>Salary:</td><td>${employee.salary}</td></tr>
            <tr><td>Email:</td><td>{employee.email}</td></tr>
            <tr><td>Personal Phone:</td><td>{employee.personal_phone}</td></tr>
            <tr><td>Office Phone:</td><td>{employee.office_phone}</td></tr>
            <tr><td>Reference Phone:</td><td>{employee.reference_phone || "N/A"}</td></tr>
            <tr><td>Joining Date:</td><td>{employee.joining_date}</td></tr>
            <tr><td>Date of Birth:</td><td>{employee.date_of_birth}</td></tr>
            <tr><td>Mail Address:</td><td>{employee.mail_address}</td></tr>
            <tr><td>Permanent Address:</td><td>{employee.permanent_address}</td></tr>
            <tr><td>Reporting Leader:</td><td>{employee.reporting_leader}</td></tr>
            <tr><td>Special Skills:</td><td>{employee.special_skills || "N/A"}</td></tr>
            <tr><td>Remarks:</td><td>{employee.remarks || "N/A"}</td></tr>
          </tbody>
        </table>

        <div className="button-group no-print">
          <button onClick={() => navigate(`/edit-employee/${id}`)} className="edit-button">✏️ Edit Employee</button>
          <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
          <button onClick={handlePrint} className="print-button">🖨️ Print Details</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;