import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeaveRequest = () => {
  const [employees, setEmployees] = useState([]);
  const [newLeave, setNewLeave] = useState({
    employee: '',
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'pending', // Default status
  });
  const navigate = useNavigate();
  // Fetch the list of employees from the backend
  useEffect(() => {
    axios.get('http://0.0.0.0:8000/api/employee/details/api/employees/') // Replace with the correct API endpoint for fetching employees
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave({
      ...newLeave,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://0.0.0.0:8000/api/employee/details/api/employee_leaves/', newLeave)
      .then((response) => {
        console.log('Leave record added:', response.data);
        // Redirect or show success message after submitting
        navigate('/employee_leave');
      })
      .catch((error) => {
        console.error('Error adding leave record:', error);
      });
  };
  

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Add New Leave Request</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Employee:</label>
          <select
            name="employee"
            value={newLeave.employee}
            onChange={handleInputChange}
            style={inputStyle}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Leave Type:</label>
          <select
            name="leave_type"
            value={newLeave.leave_type}
            onChange={handleInputChange}
            style={inputStyle}
            required
          >
            <option value="public_festival_holiday">Public Festival Holiday</option>
            <option value="casual_leave">Casual Leave</option>
            <option value="sick_leave">Sick Leave</option>
            <option value="earned_leave">Earned Leave</option>
          </select>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={newLeave.start_date}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={newLeave.end_date}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Reason:</label>
          <textarea
            name="reason"
            value={newLeave.reason}
            onChange={handleInputChange}
            style={textareaStyle}
          />
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>Status:</label>
          <select
            name="status"
            value={newLeave.status}
            onChange={handleInputChange}
            style={inputStyle}
            required
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>Submit</button>
        </div>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: '600px',
  margin: '30px auto',
  padding: '20px',
  backgroundColor: '#f3f6fb',
  borderRadius: '8px',
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Segoe UI, sans-serif',
};

const headerStyle = {
  color: '#0078D4',
  borderBottom: '1px solid #ccc',
  paddingBottom: '10px',
  marginBottom: '20px',
  fontSize: '24px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#333',
};

const inputStyle = {
  padding: '10px',
  fontSize: '14px',
  border: '1px solid #d1dbe8',
  borderRadius: '5px',
  outline: 'none',
  marginBottom: '10px',
};

const textareaStyle = {
  padding: '10px',
  fontSize: '14px',
  border: '1px solid #d1dbe8',
  borderRadius: '5px',
  outline: 'none',
  marginBottom: '10px',
  minHeight: '80px',
};

const buttonContainerStyle = {
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: '#0078D4',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default AddLeaveRequest;
