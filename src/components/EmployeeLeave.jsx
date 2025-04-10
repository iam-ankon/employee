import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const EmployeeLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Hook to navigate

    useEffect(() => {
        axios.get('http://192.168.4.183:8000/api/employee/details/api/employee_leaves/')
            .then((response) => {
                setLeaves(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching leave data:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        // Make a DELETE request to the API to remove the leave record
        axios.delete(`http://192.168.4.183:8000/api/employee/details/api/employee_leaves/${id}/`)
            .then((response) => {
                console.log('Leave record deleted:', response.data);
                // Remove the deleted leave record from the state
                setLeaves(leaves.filter((leave) => leave.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting leave record:', error);
            });
    };

    const handleRowClick = (id) => {
        navigate(`/leave-request-details/${id}`);  // Navigate to LeaveRequestDetails page
    };

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    return (
        <div style={{
            margin: '30px auto',
            maxWidth: '90%',
            backgroundColor: '#f3f6fb',
            border: '1px solid #d1dbe8',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ color: '#0078D4', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                Employee Leave Records
            </h2>

            {/* Add New Record Button */}
            <button
                style={{
                    backgroundColor: '#0078D4',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => navigate('/add-leave-request')}  // Navigate to AddLeaveRequest page
            >
                Add New Leave Record
            </button>

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
                    {leaves.map((leave) => (
                        <tr
                            key={leave.id}
                            style={{ backgroundColor: '#fff', cursor: 'pointer' }}
                            onClick={() => handleRowClick(leave.id)}  // Handle row click to navigate
                        >
                            <td style={cellStyle}>{leave.employee_name}</td>
                            <td style={cellStyle}>{leave.leave_type.replace(/_/g, ' ')}</td>
                            <td style={cellStyle}>{leave.start_date}</td>
                            <td style={cellStyle}>{leave.end_date}</td>
                            <td style={cellStyle}>{leave.reason || 'N/A'}</td>
                            <td style={cellStyle}>{leave.status}</td>
                            <td style={cellStyle}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();  // Prevent the row click from being triggered
                                        handleDelete(leave.id);
                                    }}
                                    style={{
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click
                                        navigate(`/edit-leave-request/${leave.id}`);
                                    }}
                                    style={{
                                        backgroundColor: '#ffaa00',
                                        color: 'white',
                                        padding: '10px 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const cellStyle = {
    border: '1px solid #d1dbe8',
    padding: '10px',
    textAlign: 'left',
    verticalAlign: 'top',
};

export default EmployeeLeave;
