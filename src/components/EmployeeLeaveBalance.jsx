import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeLeaveBalance = () => {
  const [balances, setBalances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.4.183:8000/api/employee/details/api/employee_leave_balances/')
      .then(response => {
        setBalances(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leave balances:', error);
        setLoading(false);
      });

    axios.get('http://192.168.4.183:8000/api/employee/details/api/employees/')
      .then(res => {
        setEmployees(res.data);
      })
      .catch(err => console.error('Error fetching employees:', err));

  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{
      margin: '30px auto',
      maxWidth: '90%',
      backgroundColor: '#f4f6f9',
      border: '1px solid #d1dbe8',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#0078D4',
        fontSize: '20px',
        marginBottom: '15px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px'
      }}>
        Employee Leave Balances
      </h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '14px',
        backgroundColor: '#fff'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#e1e9f3' }}>
            <th style={thTdStyle}>Employee Name</th>
            <th style={thTdStyle}>Public Festival Holiday</th>
            <th style={thTdStyle}>Casual Leave</th>
            <th style={thTdStyle}>Sick Leave</th>
            <th style={thTdStyle}>Earned Leave</th>
            <th style={thTdStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance) => (
            <tr key={balance.id}>
              <td style={thTdStyle}>{balance.employee_name}</td>
              <td style={thTdStyle}>{balance.public_festival_holiday}</td>
              <td style={thTdStyle}>{balance.casual_leave}</td>
              <td style={thTdStyle}>{balance.sick_leave}</td>
              <td style={thTdStyle}>{balance.earned_leave}</td>
              <td style={thTdStyle}>{balance.leave_balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thTdStyle = {
  border: '1px solid #d1dbe8',
  padding: '10px',
  textAlign: 'center'
};

export default EmployeeLeaveBalance;
