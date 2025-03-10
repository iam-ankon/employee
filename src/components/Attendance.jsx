import React, { useEffect, useState } from 'react';
import { getAttendance, addAttendance, updateAttendance, deleteAttendance, getEmployees } from '../api/employeeApi';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    check_in: '',
    check_out: '',
    office_start_time: '09:30', // Default office start time (9:30 AM)
    id: null,
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getAttendance();
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchAttendance();
    fetchEmployees();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.check_in) {
      console.error("Check-in is required!");
      return;
    }
  
    try {
      const checkInTime = formData.check_in.slice(0, 5); 
      const checkOutTime = formData.check_out ? `${formData.check_out.slice(0, 5)}:00` : null;
      const officeStartTime = formData.office_start_time.slice(0, 5);
  
      const formattedData = {
        employee: parseInt(formData.employee, 10),
        check_in: `${checkInTime}:00`,
        check_out: checkOutTime,
        office_start_time: `${officeStartTime}:00`,
      };
  
      if (formData.id) {
        await updateAttendance(formData.id, formattedData);
        console.log("Attendance updated successfully");
      } else {
        await addAttendance(formattedData);
        console.log("Attendance saved successfully");
      }
  
      setShowForm(false);
      setFormData({ employee: '', check_in: '', check_out: '', office_start_time: '09:30', id: null });
      const response = await getAttendance();
      setAttendance(response.data);
    } catch (error) {
      console.error("Error saving attendance:", error.response?.data || error);
    }
  };
  
  

  const handleEdit = (attendanceItem) => {
    setFormData({
      ...attendanceItem,
      employee: attendanceItem.employee.id,
      check_in: attendanceItem.check_in.slice(11, 16),  // Extract time portion
      check_out: attendanceItem.check_out ? attendanceItem.check_out.slice(11, 16) : '',
      office_start_time: attendanceItem.office_start_time ? attendanceItem.office_start_time.slice(11, 16) : '09:30', // Ensure proper time format
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        await deleteAttendance(id);
        const response = await getAttendance();
        setAttendance(response.data);
      } catch (error) {
        console.error("Error deleting attendance:", error);
      }
    }
  };

  return (
    <div className="attendance">
      <h2>Attendance</h2>
      <button onClick={() => setShowForm(true)}>+ Add Attendance</button>
      {showForm && (
        <div className="attendance-form">
          <h3>{formData.id ? 'Edit Attendance' : 'Add Attendance'}</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Employee:</label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleFormChange}
                required
              >
                <option value="">Select an Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Check In:</label>
              <input
                type="time"
                name="check_in"
                value={formData.check_in}
                onChange={handleFormChange}
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
              />
            </div>
            <div>
              <label>Office Start Time:</label>
              <input
                type="time"
                name="office_start_time"
                value={formData.office_start_time}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <button type="submit">{formData.id ? 'Update' : 'Save'} Attendance</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Office Start Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td>{record.employee_name}</td>
              <td>{record.date}</td>
              <td>{record.check_in}</td>
              <td>{record.check_out}</td>
              <td>{record.office_start_time}</td>
              <td>
                <button onClick={() => handleEdit(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add your CSS Styling here */}
      <style jsx>{`
        .attendance {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          background-color: #f3f4f6;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: auto;
        }
        h2 {
          text-align: center;
          color: #333;
        }
        button {
          background-color: #0078d4;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #005a9e;
        }
        .attendance-form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
        .attendance-form h3 {
          color: #333;
          margin-bottom: 15px;
        }
        form {
          display: grid;
          gap: 15px;
        }
        form div {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        input[type="time"],
        select {
          padding: 10px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button[type="submit"],
        button[type="button"] {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button[type="submit"] {
          background-color: #28a745;
          color: white;
        }
        button[type="submit"]:hover {
          background-color: #218838;
        }
        button[type="button"] {
          background-color: #dc3545;
          color: white;
        }
        button[type="button"]:hover {
          background-color: #c82333;
        }
        table {
          width: 100%;
          margin-top: 30px;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #0078d4;
          color: white;
          font-weight: bold;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
        td {
          font-size: 14px;
        }
        button {
          padding: 6px 12px;
          font-size: 14px;
          cursor: pointer;
        }
        button:hover {
          background-color: #ccc;
          color: white;
        }
        button:focus {
          outline: none;
        }
        @media (max-width: 768px) {
          .attendance {
            padding: 10px;
          }
          .attendance-form {
            padding: 15px;
          }
          table {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Attendance;


