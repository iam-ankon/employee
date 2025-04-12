import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeaveRequest = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [balances, setBalances] = useState([]); // To hold leave balances
  const [newLeave, setNewLeave] = useState({
    employee: '',
    employee_code: '',
    designation: '',
    joining_date: '',
    department: '',
    company: '',
    personal_phone: '',
    sub_person: '',
    email: '',
    receiver_name: '',
    to: '',
    date: '',
    leave_days: '',
    leave_balance: 0,  // Initial leave_balance
    comment: '',
    leave_type: '',
    start_date: '',
    end_date: '',
    leave_entited: 0,
    leave_applied_for: 0,
    leave_availed: 0,
    balance: '',  // Balance field should reflect leave_balance
    date_of_joining_after_leave: '',
    actual_date_of_joining: '',
    reson_for_delay: '',
    reason: '',
    status: 'pending',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees
    axios.get('http://192.168.4.183:8000/api/employee/details/api/employees/')
      .then(res => {
        setEmployees(res.data);
      })
      .catch(err => console.error('Error fetching employees:', err));

    // Fetch companies
    axios.get('http://192.168.4.183:8000/api/employee/details/api/tad_groups/')
      .then(res => {
        setCompanies(res.data);
      })
      .catch(err => console.error('Error fetching companies:', err));

    // Fetch leave balances
    axios.get('http://192.168.4.183:8000/api/employee/details/api/employee_leave_balances/')
      .then(response => {
        setBalances(response.data);
      })
      .catch(error => console.error('Error fetching leave balances:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'employee') {
      const selectedEmployee = employees.find(emp => emp.id.toString() === value);
      if (selectedEmployee) {
        // Set employee details in state
        setNewLeave(prev => ({
          ...prev,
          employee: value,
          employee_code: selectedEmployee.employee_id || '',
          designation: selectedEmployee.designation || '',
          department: selectedEmployee.department || '',
          company: selectedEmployee.company || '',
          personal_phone: selectedEmployee.personal_phone || '',
          joining_date: selectedEmployee.joining_date || '',
          email: selectedEmployee.email || '',
        }));

        // Find the corresponding leave balance for the selected employee
        const selectedBalance = balances.find(balance => balance.employee === selectedEmployee.id);

        // Update the balance field in the state
        if (selectedBalance) {
          setNewLeave(prev => ({
            ...prev,
            balance: selectedBalance.leave_balance,  // Update balance field with the value
            leave_balance: selectedBalance.leave_balance, // Ensure consistency between fields
          }));
        } else {
          setNewLeave(prev => ({
            ...prev,
            balance: 0,  // Default to 0 if no balance is found
            leave_balance: 0, // Ensure consistency between fields
          }));
        }
      }
    } else {
      setNewLeave(prev => {
        const updatedLeave = {
          ...prev,
          [name]: value,
        };

        // Calculate leave days if start and end date are provided
        if (updatedLeave.start_date && updatedLeave.end_date) {
          const startDate = new Date(updatedLeave.start_date);
          const endDate = new Date(updatedLeave.end_date);
          if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
            const leaveDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
            updatedLeave.leave_days = leaveDays;
          }
        }
        return updatedLeave;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formatDate = (date) => {
      const d = new Date(date);
      return !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : null;
    };

    const updatedLeave = {
      ...newLeave,
      to: newLeave.to || null,
      date: newLeave.date || null,
      reason: newLeave.reason || '',
      date_of_joining_after_leave: formatDate(newLeave.date_of_joining_after_leave),
      actual_date_of_joining: formatDate(newLeave.actual_date_of_joining),
    };

    axios.post('http://192.168.4.183:8000/api/employee/details/api/employee_leaves/', updatedLeave)
      .then((res) => {
        console.log('Leave record added:', res.data);
        navigate('/employee_leave');
      })
      .catch((err) => {
        console.error('Error adding leave record:', err.response ? err.response.data : err);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };



  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>Add New Leave Request</h3>
      <form onSubmit={handleSubmit}>
        <div style={formGrid}>
          {[
            { label: 'Employee', name: 'employee', type: 'select', options: employees, optionLabel: 'name' },
            { label: 'Employee Code', name: 'employee_code' },
            { label: 'Designation', name: 'designation' },
            { label: 'Joining Date', name: 'joining_date', type: 'date' },
            { label: 'Department', name: 'department' },
            { label: 'Company', name: 'company', type: 'select', options: companies, optionLabel: 'company_name' },
            { label: 'Personal Phone', name: 'personal_phone' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Substitute Person', name: 'sub_person' },
            { label: 'Receiver Name', name: 'receiver_name' },
            { label: 'To', name: 'to' },
            { label: 'Date', name: 'date', type: 'date' },
            { label: 'Start Date', name: 'start_date', type: 'date' },
            { label: 'End Date', name: 'end_date', type: 'date' },
            { label: 'Leave Days', name: 'leave_days', type: 'number', readOnly: true, value: newLeave.leave_balance },
            { label: 'Balance', name: 'balance', type: 'number', readOnly: true, value: newLeave.balance },
            { label: 'Comment', name: 'comment' },
            {
              label: 'Leave Type',
              name: 'leave_type',
              type: 'select',
              options: [
                { id: 'public_festival_holiday', name: 'Public Festival Holiday' },
                { id: 'casual_leave', name: 'Casual Leave' },
                { id: 'sick_leave', name: 'Sick Leave' },
                { id: 'earned_leave', name: 'Earned Leave' },
              ],
            },
            { label: 'Date of Joining After Leave', name: 'date_of_joining_after_leave', type: 'date' },
            { label: 'Actual Date of Joining', name: 'actual_date_of_joining', type: 'date' },
            { label: 'Reason for Delay', name: 'reson_for_delay' },
            {
              label: 'Status',
              name: 'status',
              type: 'select',
              options: [
                { id: 'pending', name: 'Pending' },
                { id: 'approved', name: 'Approved' },
                { id: 'rejected', name: 'Rejected' },
              ],
              disabled: true,  // Disable status selection for new leave requests
            },
          ].map((field) => (
            <div key={field.name} style={inputGroup}>
              <label style={labelStyle}>{field.label}:</label>
              {field.type === 'select' ? (
                <select name={field.name} value={newLeave[field.name]} onChange={handleInputChange} style={inputStyle} disabled={field.disabled}>
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.id} value={option.id}>{option[field.optionLabel] || option.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={newLeave[field.name]}
                  onChange={handleInputChange}
                  style={inputStyle}
                  readOnly={field.readOnly}
                  disabled={field.readOnly}
                />
              )}
            </div>
          ))}

          <div style={fullWidthGroup}>
            <label style={labelStyle}>Leave Reason:</label>
            <textarea name="reason" value={newLeave.reason} onChange={handleInputChange} style={textareaStyle} />
          </div>
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '1200px',
  margin: '30px auto',
  padding: '30px',
  backgroundColor: '#f4f6f9',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  fontFamily: 'Segoe UI, sans-serif',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '30px',
  color: '#2b5797',
  textAlign: 'center',
};

const formGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const inputGroup = {
  flex: '1 1 45%',
  display: 'flex',
  flexDirection: 'column',
};

const fullWidthGroup = {
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  fontWeight: '600',
  marginBottom: '6px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const textareaStyle = { ...inputStyle, height: '80px' };

const buttonStyle = {
  backgroundColor: '#2b5797',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '30px',
};
export default AddLeaveRequest;
