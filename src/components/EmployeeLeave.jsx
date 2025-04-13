import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [nameSearch, setNameSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios.get('http://192.168.4.183:8000/api/employee/details/api/employee_leaves/')
            .then((response) => {
                setLeaves(response.data);
                setFilteredLeaves(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching leave data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let results = leaves;

        if (nameSearch) {
            results = results.filter(leave =>
                leave.employee_name.toLowerCase().includes(nameSearch.toLowerCase())
            );
        }

        if (startDate) {
            results = results.filter(leave =>
                new Date(leave.start_date) >= new Date(startDate)
            );
        }

        if (endDate) {
            results = results.filter(leave =>
                new Date(leave.end_date) <= new Date(endDate)
            );
        }

        setFilteredLeaves(results);
    }, [nameSearch, startDate, endDate, leaves]);

    const handleDelete = (id) => {
        axios.delete(`http://192.168.4.183:8000/api/employee/details/api/employee_leaves/${id}/`)
            .then(() => {
                setLeaves(leaves.filter(leave => leave.id !== id));
            })
            .catch(error => {
                console.error('Error deleting leave record:', error);
            });
    };

    const handleRowClick = (id) => {
        navigate(`/leave-request-details/${id}`);
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>HR Work</div>
                <a href="/cv-add" style={styles.sidebarLink}>Add CV</a>
                <a href="/interviews" style={styles.sidebarLink}>Interviews</a>
                <a href="/employee" style={styles.sidebarLink}>Employee</a>
                <a href="/attendance" style={styles.sidebarLink}>Attendance</a>
                <a href="/employee_leave" style={{ ...styles.sidebarLink, backgroundColor: "#e1eaff" }}>Employee Leave</a>
                <a href="/performanse_appraisal" style={{ ...styles.sidebarLink}}>Performance Appraisal</a>
                <a href="/finance-provision" style={styles.sidebarLink}>Finance Provision</a>
                <a href="/employee-termination" style={styles.sidebarLink}>Employee Termination</a>
                <a href="/letter-send" style={styles.sidebarLink}>Send Letter</a>
                <a href="/email-logs" style={styles.sidebarLink}>Email Logs</a>
                <a href="/tad-groups" style={styles.sidebarLink}>TAD Groups</a>
            </div>

            {/* Main Content */}
            <div style={{
                margin: '30px auto',
                maxWidth: '90%',
                backgroundColor: '#f3f6fb',
                border: '1px solid #d1dbe8',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                flex: 1
            }}>
                <h2 style={{ color: '#0078D4', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    Employee Leave Records
                </h2>

                {/* Search */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={labelStyle}>Search by Name:</label>
                        <input
                            type="text"
                            value={nameSearch}
                            onChange={(e) => setNameSearch(e.target.value)}
                            placeholder="Enter employee name"
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={labelStyle}>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={labelStyle}>End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <button
                        onClick={() => {
                            setNameSearch('');
                            setStartDate('');
                            setEndDate('');
                        }}
                        style={clearButtonStyle}
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/add-leave-request')} style={btnStyle('#0078D4')}>Add New Leave Record</button>
                    <button onClick={() => navigate('/employee_leave_type')} style={btnStyle('#28a745')}>Employee Leave Type</button>
                    <button onClick={() => navigate('/employee_leave_balance')} style={btnStyle('#6f42c1')}>Employee Leave Balance</button>
                </div>

                {/* Table */}
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontSize: '14px',
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#e1e9f3' }}>
                            <th style={cellStyle}>Employee</th>
                            <th style={cellStyle}>Leave Type</th>
                            <th style={cellStyle}>Start Date</th>
                            <th style={cellStyle}>End Date</th>
                            <th style={cellStyle}>Reason</th>
                            <th style={cellStyle}>Status</th>
                            <th style={cellStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length > 0 ? (
                            filteredLeaves.map((leave) => (
                                <tr key={leave.id} style={{ backgroundColor: '#fff', cursor: 'pointer' }} onClick={() => handleRowClick(leave.id)}>
                                    <td style={cellStyle}>{leave.employee_name}</td>
                                    <td style={cellStyle}>{leave.leave_type.replace(/_/g, ' ')}</td>
                                    <td style={cellStyle}>{leave.start_date}</td>
                                    <td style={cellStyle}>{leave.end_date}</td>
                                    <td style={cellStyle}>{leave.reason || 'N/A'}</td>
                                    <td style={cellStyle}>{leave.status}</td>
                                    <td style={cellStyle}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(leave.id); }}
                                            style={{ ...actionButton, backgroundColor: '#ff4d4d' }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate(`/edit-leave-request/${leave.id}`); }}
                                            style={{ ...actionButton, backgroundColor: '#ffaa00' }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ ...cellStyle, textAlign: 'center' }}>
                                    No leave records found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const cellStyle = {
    border: '1px solid #d1dbe8',
    padding: '10px',
    textAlign: 'left',
    verticalAlign: 'top',
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #d1dbe8'
};

const clearButtonStyle = {
    alignSelf: 'flex-end',
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

const btnStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    minWidth: '180px'
});

const actionButton = {
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
};

const styles = {
 
    sidebar: {
      width: "230px",
      backgroundColor: "#f3f6fb",
      height: "100vh",
      padding: "20px 15px",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
    },
    sidebarHeader: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#0078D4",
    },
    sidebarLink: {
      display: "block",
      padding: "10px",
      margin: "5px 0",
      textDecoration: "none",
      color: "#333",
      borderRadius: "6px",
      transition: "0.3s",
    },
    sidebarLinkHover: {
      backgroundColor: "#e1eaff",
    },
  };
export default EmployeeLeave;
