import React, { useEffect, useState } from 'react';
import { getAttendance, addAttendance, updateAttendance, deleteAttendance, getEmployees } from '../api/employeeApi';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    check_in: '',
    check_out: '',
    office_start_time: '09:30',
    id: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceRes, employeesRes] = await Promise.all([
          getAttendance(),
          getEmployees()
        ]);
        setAttendance(attendanceRes.data);
        setFilteredAttendance(attendanceRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = attendance.filter(item => {
      const matchesName = item.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter ? item.date.includes(dateFilter) : true;
      return matchesName && matchesDate;
    });
    setFilteredAttendance(filtered);
  }, [searchTerm, dateFilter, attendance]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const formatTimeTo12Hour = (timeString) => {
    if (!timeString) return null;
    
    // Extract time portion from different formats
    let timePart = '';
    if (timeString.includes('T')) {
      // Format: "2023-05-15T09:30:00Z"
      timePart = timeString.slice(11, 16);
    } else if (timeString.includes(':')) {
      // Format: "09:30:00" or "09:30"
      timePart = timeString.length > 5 ? timeString.slice(0, 5) : timeString;
    } else {
      return timeString;
    }

    // Convert to 12-hour format
    const [hours, minutes] = timePart.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const calculateTimeDifference = (checkIn, officeStart) => {
    if (!checkIn || !officeStart) return { inTime: null, delayTime: null, status: '-' };
    
    try {
      // Extract 24-hour time for calculations
      const get24HourTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return { hours, minutes };
      };

      const checkIn24 = get24HourTime(checkIn);
      const officeStart24 = get24HourTime(officeStart);

      const checkInTotal = checkIn24.hours * 60 + checkIn24.minutes;
      const officeTotal = officeStart24.hours * 60 + officeStart24.minutes;

      if (checkInTotal <= officeTotal) {
        const diffMinutes = officeTotal - checkInTotal;
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return {
          inTime: `${hours}:${minutes.toString().padStart(2, '0')}`,
          delayTime: null,
          status: 'On Time'
        };
      } else {
        const diffMinutes = checkInTotal - officeTotal;
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return {
          inTime: null,
          delayTime: `${hours}:${minutes.toString().padStart(2, '0')}`,
          status: 'Late'
        };
      }
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return { inTime: null, delayTime: null, status: 'Error' };
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        employee: parseInt(formData.employee, 10),
        check_in: `${formData.check_in}:00`,
        check_out: formData.check_out ? `${formData.check_out}:00` : null,
        office_start_time: `${formData.office_start_time}:00`,
      };

      if (formData.id) {
        await updateAttendance(formData.id, payload);
      } else {
        await addAttendance(payload);
      }

      const response = await getAttendance();
      setAttendance(response.data);
      setShowForm(false);
      setFormData({ employee: '', check_in: '', check_out: '', office_start_time: '09:30', id: null });
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const handleEdit = (record) => {
    setFormData({
      id: record.id,
      employee: record.employee.id,
      check_in: record.check_in.slice(11, 16),
      check_out: record.check_out ? record.check_out.slice(11, 16) : '',
      office_start_time: record.office_start_time.slice(11, 16),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this attendance record?")) {
      try {
        await deleteAttendance(id);
        const response = await getAttendance();
        setAttendance(response.data);
      } catch (error) {
        console.error("Error deleting attendance:", error);
      }
    }
  };



  const containerStyle = {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333'
  };

  const sectionStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '4px',
    marginBottom: '12px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '12px'
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#f3f3f3',
    borderBottom: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Attendance Management</h2>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label>Search by Name:</label>
          <input
            type="text"
            placeholder="Employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label>Filter by Date:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ alignSelf: 'flex-end' }}>
          <button
            onClick={() => setShowForm(true)}
            style={{ ...buttonStyle, backgroundColor: '#0078d4', color: '#fff' }}
          >
            + Add Attendance
          </button>
        </div>
      </div>

      {showForm && (
        <div style={sectionStyle}>
          <h3 style={{ marginBottom: '16px' }}>{formData.id ? 'Edit Attendance' : 'Add Attendance'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label>Employee:</label>
                <select
                  name="employee"
                  value={formData.employee}
                  onChange={handleFormChange}
                  style={inputStyle}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Office Start Time:</label>
                <input
                  type="time"
                  name="office_start_time"
                  value={formData.office_start_time}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label>Check In:</label>
                <input
                  type="time"
                  name="check_in"
                  value={formData.check_in}
                  onChange={handleFormChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label>Check Out:</label>
                <input
                  type="time"
                  name="check_out"
                  value={formData.check_out}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }}>
                {formData.id ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ ...buttonStyle, backgroundColor: '#6c757d', color: '#fff' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={sectionStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Employee</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Check In</th>
              <th style={thStyle}>Check Out</th>
              <th style={thStyle}>Office Start</th>
              <th style={thStyle}>In Time</th>
              <th style={thStyle}>Delay Time</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
             <tbody>
            {filteredAttendance.map((record) => {
              // Format the times to 12-hour format
              const checkIn = formatTimeTo12Hour(record.check_in);
              const checkOut = formatTimeTo12Hour(record.check_out);
              const officeStart = formatTimeTo12Hour(record.office_start_time) || '09:30 AM';
              
              // Calculate time differences
              const { inTime, delayTime, status } = calculateTimeDifference(
                checkIn || '00:00 AM', 
                officeStart
              );

              return (
                <tr key={record.id}>
                  <td style={tdStyle}>{record.employee_name}</td>
                  <td style={tdStyle}>{record.date}</td>
                  <td style={tdStyle}>{checkIn || '-'}</td>
                  <td style={tdStyle}>{checkOut || '-'}</td>
                  <td style={tdStyle}>{officeStart}</td>
                  <td style={tdStyle}>{inTime ? `${inTime}` : '-'}</td>
                  <td style={tdStyle}>{delayTime ? `${delayTime}` : '-'}</td>
                  <td style={tdStyle}>{status}</td>
                  <td style={{ ...tdStyle, display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEdit(record)}
                      style={{ ...buttonStyle, backgroundColor: '#0078d4', color: '#fff', padding: '8px 12px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      style={{ ...buttonStyle, backgroundColor: '#dc3545', color: '#fff', padding: '8px 12px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;