import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeaveRequestDetails = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [leaveBalances, setLeaveBalances] = useState({
        casual_leave: 0,
        sick_leave: 0,
        earned_leave: 0
    });
    const formRef = useRef();

    useEffect(() => {
        // Fetch leave details
        axios.get(`http://192.168.4.183:8000/api/employee/details/api/employee_leaves/${id}/`)
            .then((response) => {
                setLeave(response.data);
            })
            .catch((error) => {
                console.error('Error fetching leave details:', error);
            });

        // Fetch companies
        axios.get('http://192.168.4.183:8000/api/employee/details/api/tad_groups/')
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });

        // Fetch leave balances for the employee
        axios.get('http://192.168.4.183:8000/api/employee/details/api/employee_leave_balances/')
            .then(response => {
                // Find the balance for the current employee
                const employeeBalance = response.data.find(balance =>
                    balance.employee === leave?.employee_id ||
                    balance.employee_name === leave?.employee_name
                );

                if (employeeBalance) {
                    setLeaveBalances({
                        casual_leave: employeeBalance.casual_leave,
                        sick_leave: employeeBalance.sick_leave,
                        earned_leave: employeeBalance.earned_leave
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching leave balances:', error);
            });
    }, [id, leave?.employee_id, leave?.employee_name]);

    // Calculate balance values
    const calculateBalance = (leaveType) => {
        const entitled = leaveBalances[leaveType] || 0;
        const applied = leave.leave_type === leaveType ? leave.leave_days : 0;
        return entitled - applied;
    };

    // Calculate leave availed values (Leave entitled - Balance)
    const calculateLeaveAvailed = (leaveType) => {
        const entitled = leaveBalances[leaveType] || 0;
        const balance = calculateBalance(leaveType);
        return entitled - balance;
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Leave Application Form</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 5mm;
                        }
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            font-size: 9pt;
                            line-height: 1.2;
                        }
                        .form-container {
                            width: 100%;
                            padding: 5mm;
                            box-sizing: border-box;
                        }
                        h1 {
                            text-align: center;
                            margin: 5px 0;
                            font-size: 12pt;
                            text-transform: uppercase;
                        }
                        .form-row {
                            margin-bottom: 3px;
                            display: flex;
                            align-items: center;
                            page-break-inside: avoid;
                        }
                        label {
                            min-width: 100px;
                            margin-right: 5px;
                            font-weight: bold;
                        }
                        .field {
                            flex: 1;
                            min-width: 0;
                            padding: 2px;
                            border-bottom: 1px solid #ddd;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .divider {
                            border-top: 1px dashed #000;
                            margin: 5px 0;
                        }
                        .signature-line {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 10px;
                        }
                        .signature {
                            flex: 1;
                            text-align: center;
                            padding: 0 5px;
                            border-top: 1px solid #000;
                            margin-top: 20px;
                            font-style: italic;
                            font-size: 8pt;
                        }
                        .signature-box {
                            height: 15px;
                            border-bottom: 1px solid #000;
                            margin-top: 5px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 5px 0;
                            font-size: 8pt;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 2px;
                            text-align: center;
                        }
                        th {
                            background-color: #f2f2f2;
                            text-transform: uppercase;
                        }
                        .text-area {
                            min-height: 30px;
                            border: 1px solid #ddd;
                            padding: 2px;
                            background-color: #f9f9f9;
                            width: 100%;
                        }
                        .compact-row {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 5px;
                            align-items: center;
                            margin-bottom: 3px;
                        }
                        .compact-field {
                            padding: 2px;
                            border-bottom: 1px solid #ddd;
                        }
                    </style>
                </head>
                <body>
                    <div class="form-container">
                        ${formRef.current.innerHTML}
                    </div>
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                window.close();
                            }, 100);
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    if (!leave) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    // Main styles
    const styles = {
        formContainer: {
            maxWidth: '800px',
            margin: '20px auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            position: 'relative'
        },
        header: {
            textAlign: 'center',
            marginBottom: '15px',
            fontSize: '20px',
            textTransform: 'uppercase'
        },
        formRow: {
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center'
        },
        label: {
            minWidth: '120px',
            marginRight: '5px',
            fontWeight: 'bold',
            fontSize: '14px'
        },
        field: {
            flex: '1',
            minWidth: '100px',
            padding: '4px',
            borderBottom: '1px solid #ddd',
            fontSize: '14px'
        },
        divider: {
            borderTop: '1px dashed #000',
            margin: '15px 0'
        },
        signatureLine: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
        },
        signature: {
            flex: '1',
            textAlign: 'center',
            padding: '0 10px',
            borderTop: '1px solid #000',
            marginTop: '30px',
            fontStyle: 'italic'
        },
        signatureBox: {
            height: '40px',
            borderBottom: '1px solid #000',
            marginTop: '5px'
        },
        printButton: {
            display: 'block',
            margin: '20px auto',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
        },
        sectionHeader: {
            fontSize: '16px',
            margin: '15px 0 8px',
            textAlign: 'center',
            textTransform: 'uppercase'
        },
        textAreaField: {
            minHeight: '50px',
            border: '1px solid #ddd',
            padding: '6px',
            backgroundColor: '#f9f9f9',
            width: '100%',
            fontSize: '14px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '10px',
            fontSize: '13px'
        },
        tableCell: {
            border: '1px solid #ddd',
            padding: '4px',
            textAlign: 'center'
        },
        tableHeader: {
            backgroundColor: '#f2f2f2',
            textTransform: 'uppercase',
            fontSize: '12px'
        },
        compactRow: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            alignItems: 'center',
            marginBottom: '5px'
        },
        compactField: {
            padding: '4px',
            borderBottom: '1px solid #ddd'
        }
    };

    return (
        <div>
            <div ref={formRef} style={styles.formContainer}>
                <h1 style={styles.header}>LEAVE APPLICATION FORM</h1>

                {/* Employee Information - Two Column Layout */}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Date:</label>
                            <div style={styles.field}>{new Date().toLocaleDateString()}</div>
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Employee ID:</label>
                            <div style={styles.field}>{leave.employee_code}</div>
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Joining Date:</label>
                            <div style={styles.field}>{leave.joining_date}</div>
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>To:</label>
                            <div style={styles.field}>{leave.to || 'HR Department'}</div>
                        </div>
                    </div>
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Name of applicant:</label>
                            <div style={styles.field}>{leave.employee_name}</div>
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Designation:</label>
                            <div style={styles.field}>{leave.designation}</div>
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Company:</label>
                            <div style={styles.field}>{leave.company_name}</div>
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Department:</label>
                            <div style={styles.field}>{leave.department}</div>
                        </div>
                    </div>
                </div>

                {/* Compact Leave Duration Row */}
                <div style={styles.compactRow}>
                    <span>I wish to apply for</span>
                    <div style={{ ...styles.compactField, width: '30px', textAlign: 'center' }}>{leave.leave_days}</div>
                    <span>days</span>
                    <div style={{ ...styles.compactField, minWidth: '80px' }}>{leave.leave_type}</div>
                    <span>from</span>
                    <div style={{ ...styles.compactField, minWidth: '80px' }}>{leave.start_date}</div>
                    <span>to</span>
                    <div style={{ ...styles.compactField, minWidth: '80px' }}>{leave.end_date}</div>
                </div>

                <div style={styles.formRow}>
                    <label style={styles.label}>Reason for leave:</label>
                    <div style={styles.textAreaField}>{leave.reason || 'N/A'}</div>
                </div>

                <div style={styles.formRow}>
                    <label style={styles.label}>Whereabouts:</label>
                    <div style={styles.field}>{leave.whereabouts || 'N/A'}</div>
                </div>

                <div style={styles.divider}></div>

                {/* Contact Info */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Mobile no:</label>
                            <div style={styles.field}>{leave.personal_phone}</div>
                        </div>
                    </div>
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>Substitute person:</label>
                            <div style={styles.field}>{leave.sub_person}</div>
                        </div>
                    </div>
                </div>

                {/* Signature Section */}
                <div style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <div style={{ width: '48%' }}>
                            <div>Signature of Substitute:</div>
                            <div style={styles.signatureBox}></div>
                        </div>
                        <div style={{ width: '48%' }}>
                            <div>Signature of Applicant:</div>
                            <div style={styles.signatureBox}></div>
                        </div>
                    </div>
                </div>

                <div style={styles.divider}></div>

                {/* Leave Status Table */}
                <h2 style={styles.sectionHeader}>Leave Status (for official use)</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.tableCell, ...styles.tableHeader }}></th>
                            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Earned Leave</th>
                            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Casual Leave</th>
                            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Sick Leave</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.tableCell}>Leave entitled</td>
                            <td style={styles.tableCell}>{leaveBalances.earned_leave}</td>
                            <td style={styles.tableCell}>{leaveBalances.casual_leave}</td>
                            <td style={styles.tableCell}>{leaveBalances.sick_leave}</td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>Leave availed</td>
                            <td style={styles.tableCell}>{calculateLeaveAvailed('earned_leave')}</td>
                            <td style={styles.tableCell}>{calculateLeaveAvailed('casual_leave')}</td>
                            <td style={styles.tableCell}>{calculateLeaveAvailed('sick_leave')}</td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>Balance</td>
                            <td style={styles.tableCell}>{calculateBalance('earned_leave')}</td>
                            <td style={styles.tableCell}>{calculateBalance('casual_leave')}</td>
                            <td style={styles.tableCell}>{calculateBalance('sick_leave')}</td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>Applied for</td>
                            <td style={styles.tableCell}>{leave.leave_type === 'earned_leave' ? leave.leave_days : '-'}</td>
                            <td style={styles.tableCell}>{leave.leave_type === 'casual_leave' ? leave.leave_days : '-'}</td>
                            <td style={styles.tableCell}>{leave.leave_type === 'sick_leave' ? leave.leave_days : '-'}</td>
                        </tr>
                    </tbody>
                </table>

                <div style={styles.formRow}>
                    <label style={styles.label}>Comments:</label>
                    <div style={{ ...styles.textAreaField, minHeight: '40px' }}>{leave.comment || 'N/A'}</div>
                </div>

                <div style={styles.signatureLine}>
                    <span style={styles.signature}>Head of Department</span>
                    <span style={styles.signature}>HR & Admin</span>
                    <span style={styles.signature}>Authorized Signature</span>
                </div>

                <div style={styles.divider}></div>

                {/* Post-Leave Report */}
                <h2 style={styles.sectionHeader}>Report on joining after leave</h2>
                <div style={styles.formRow}>
                    <label style={styles.label}>Scheduled joining date:</label>
                    <div style={styles.field}>{leave.date_of_joining_after_leave || 'N/A'}</div>
                </div>
                <div style={styles.formRow}>
                    <label style={styles.label}>Actual joining date:</label>
                    <div style={styles.field}>{leave.actual_date_of_joining || 'N/A'}</div>
                </div>
                <div style={styles.formRow}>
                    <label style={styles.label}>Reason for delay:</label>
                    <div style={{ ...styles.textAreaField, minHeight: '40px' }}>{leave.reson_for_delay || 'N/A'}</div>
                </div>

                <div style={styles.signatureLine}>
                    <span style={styles.signature}>Applicant Signature</span>
                    <span style={styles.signature}>HR & Admin</span>
                    <span style={styles.signature}>Authorized Signature</span>
                </div>
            </div>

            <button
                style={styles.printButton}
                onClick={handlePrint}
            >
                Print Form
            </button>
        </div>
    );
};

export default LeaveRequestDetails;

