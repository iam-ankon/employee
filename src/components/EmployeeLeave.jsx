import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Search states
    const [nameSearch, setNameSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios.get('http://192.168.4.183:8000/api/employee/details/api/employee_leaves/')
            .then((response) => {
                setLeaves(response.data);
                setFilteredLeaves(response.data); // Initialize filtered leaves with all data
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching leave data:', error);
                setLoading(false);
            });
    }, []);

    // Filter leaves based on search criteria
    useEffect(() => {
        let results = leaves;

        // Filter by name
        if (nameSearch) {
            results = results.filter(leave =>
                leave.employee_name.toLowerCase().includes(nameSearch.toLowerCase())
            );
        }

        // Filter by date range
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

            {/* Search Section */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px',
                marginBottom: '20px',
                alignItems: 'center'
            }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Search by Name:
                    </label>
                    <input
                        type="text"
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                        placeholder="Enter employee name"
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #d1dbe8'
                        }}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Start Date:
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #d1dbe8'
                        }}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        End Date:
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #d1dbe8'
                        }}
                    />
                </div>

                <button
                    onClick={() => {
                        setNameSearch('');
                        setStartDate('');
                        setEndDate('');
                    }}
                    style={{
                        alignSelf: 'flex-end',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        padding: '8px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear Filters
                </button>
            </div>

            {/* Add New Record Button */}
            <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <button
                    style={{
                        backgroundColor: '#0078D4',  // Blue
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        minWidth: '180px'
                    }}
                    onClick={() => navigate('/add-leave-request')}
                >
                    Add New Leave Record
                </button>

                <button
                    style={{
                        backgroundColor: '#28a745',  // Green
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        minWidth: '180px'
                    }}
                    onClick={() => navigate('/employee_leave_type')}
                >
                    Employee Leave Type
                </button>

                <button
                    style={{
                        backgroundColor: '#6f42c1',  // Purple
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        minWidth: '180px'
                    }}
                    onClick={() => navigate('/employee_leave_balance')}
                >
                    Employee Leave Balance
                </button>
            </div>

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
                            <tr
                                key={leave.id}
                                style={{ backgroundColor: '#fff', cursor: 'pointer' }}
                                onClick={() => handleRowClick(leave.id)}
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
                                            e.stopPropagation();
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
                                            e.stopPropagation();
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
    );
};

const cellStyle = {
    border: '1px solid #d1dbe8',
    padding: '10px',
    textAlign: 'left',
    verticalAlign: 'top',
};

export default EmployeeLeave;