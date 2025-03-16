import React from 'react';
import { Link } from 'react-router-dom';

const HRWorkPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>HR Work</h2>
        <ul>
          <li>
            <Link to="/employees" className="flex items-center py-2 hover:text-gray-300">
              <img src="/Users/iam_ankon/Desktop/employee/public/1.jpg" alt="Employees" className="mr-2 w-5 h-5" />
              Employees
            </Link>
          </li>
          <li>
            <Link to="/attendance" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/attendance-logo.png" alt="Attendance" className="mr-2 w-5 h-5" />
              Attendance
            </Link>
          </li>
          <li>
            <Link to="/email-logs" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/email-logs-logo.png" alt="Email Logs" className="mr-2 w-5 h-5" />
              Email Logs
            </Link>
          </li>
          <li>
            <Link to="/interviews" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/interviews-logo.png" alt="Interviews" className="mr-2 w-5 h-5" />
              Interviews
            </Link>
          </li>
          <li>
            <Link to="/finance-provision" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/finance-logo.png" alt="Finance Provision" className="mr-2 w-5 h-5" />
              Finance Provision
            </Link>
          </li>
          <li>
            <Link to="/admin-provision" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/admin-logo.png" alt="Admin Provision" className="mr-2 w-5 h-5" />
              Admin Provision
            </Link>
          </li>
          <li>
            <Link to="/it-provision" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/it-logo.png" alt="IT Provision" className="mr-2 w-5 h-5" />
              IT Provision
            </Link>
          </li>
          <li>
            <Link to="/cv-add" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/cv-add-logo.png" alt="Add CV" className="mr-2 w-5 h-5" />
              Add CV
            </Link>
          </li>
          <li>
            <Link to="/cv-management" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/cv-management-logo.png" alt="CV Management" className="mr-2 w-5 h-5" />
              CV Management
            </Link>
          </li>
          <li>
            <Link to="/tad-groups" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/cv-management-logo.png" alt="tad groups" className="mr-2 w-5 h-5" />
              Tad Groups
            </Link>
          </li>
          <li>
            <Link to="/tad-groups" className="flex items-center py-2 hover:text-gray-300">
              <img src="/path/to/cv-management-logo.png" alt="tad groups" className="mr-2 w-5 h-5" />
              Employee Termination Process
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <h2 className="text-3xl font-bold mb-6">HR Work Dashboard</h2>

        {/* Cards section */}
        <div className="card-container">
          <div className="card">
            <h3>Employees</h3>
            <p>Manage employee data, view lists, and perform actions on employee records.</p>
            <Link to="/employees">Go to Employees</Link>
          </div>
          <div className="card">
            <h3>Attendance</h3>
            <p>Track employee attendance, review reports, and manage leave requests.</p>
            <Link to="/attendance">Go to Attendance</Link>
          </div>
          <div className="card">
            <h3>Email Logs</h3>
            <p>View email communication logs and track messages sent to employees.</p>
            <Link to="/email-logs">Go to Email Logs</Link>
          </div>
          <div className="card">
            <h3>Interviews</h3>
            <p>Manage interview schedules, view past interviews, and make decisions.</p>
            <Link to="/interviews">Go to Interviews</Link>
          </div>
          <div className="card">
            <h3>Finance Provision</h3>
            <p>Manage financial resources, allocate budgets, and track expenses.</p>
            <Link to="/finance-provision">Go to Finance Provision</Link>
          </div>
          <div className="card">
            <h3>Admin Provision</h3>
            <p>Manage administrative tasks, user roles, and system settings.</p>
            <Link to="/admin-provision">Go to Admin Provision</Link>
          </div>
          <div className="card">
            <h3>IT Provision</h3>
            <p>Manage IT resources, provision hardware, and assign software licenses.</p>
            <Link to="/it-provision">Go to IT Provision</Link>
          </div>
          <div className="card">
            <h3>Letter Send</h3>
            <p>Manage CV submissions, review applications, and send offer letters.</p>
            <Link to="/cv-management">Go to Letter Send</Link>
          </div>
          <div className="card">
            <h3>Add CV</h3>
            <p>Upload CV files, enter applicant details, and submit candidate profiles.</p>
            <Link to="/cv-list">Go to Add CV</Link>
          </div>
          <div className="card">
            <h3>Tad Groups</h3>
            <p>Upload company names only.</p>
            <Link to="/tad-groups">Go to Tad Groups</Link>
          </div>
          <div className="card">
            <h3>Employee Termination Process</h3>
            <p>Upload Letter for the employee.</p>
            <Link to="/employee-termination">Go to Tad Groups</Link>
          </div>
        </div>
      </div>

      {/* Styles for the HRWorkPage */}
      <style jsx>{`
        /* Sidebar Styles */
        .sidebar {
          // background-color: #2d3748; 
          // color: white;
          // padding: 20px;
          // width: 250px;
          // height: 100vh;
        }

        .sidebar h2 {
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 20px;
        }

        .sidebar ul {
          list-style-type: none;
          padding: 0;
        }

        .sidebar ul li {
          margin-bottom: 15px;
        }

        .sidebar ul li a {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          color: white;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .sidebar ul li a:hover {
          background-color: #4a5568; /* Darker gray on hover */
          color: #edf2f7; /* Light color on hover */
        }

        /* Main Content Area */
        .main-content {
          flex: 1;
          padding: 30px;
          background-color: #f7fafc;
          overflow: auto;
        }

        .main-content h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 30px;
        }

        /* Card Styles */
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .card {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .card:hover {
          transform: translateY(-15px);
          box-shadow: 0 6px 15px rgba(86, 59, 210, 0.31);
        }

        .card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .card p {
          font-size: 1rem;
          color: #4a5568;
          margin-bottom: 20px;
        }

        .card a {
          font-size: 1rem;
          color: #3182ce;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .card a:hover {
          color: #2b6cb0;
        }

        /* Media Queries for Responsiveness */
        @media (max-width: 768px) {
          .sidebar {
            width: 200px;
            padding: 15px;
          }

          .main-content {
            padding: 20px;
          }

          .card-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HRWorkPage;
