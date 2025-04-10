import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditLeaveRequest = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee: '',
        employee_code: '',
        designation: '',
        joining_date: '',
        department: '',
        company: '',
        personal_phone: '',
        sub_person: '',
        to: '',
        date: '',
        start_date: '',
        end_date: '',
        leave_days: '',  // Ensure this is an empty string or 0
        balance: '',
        comment: '',
        leave_type: '',
        date_of_joining_after_leave: '',
        actual_date_of_joining: '',
        reason_for_delay: '',
        status: '',
    });


    useEffect(() => {
        axios.get(`http://192.168.4.183:8000/api/employee/details/api/employee_leaves/${id}/`)
            .then(res => setFormData(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        axios.put(`http://192.168.4.183:8000/api/employee/details/api/employee_leaves/${id}/`, formData)
            .then(() => {
                // Redirect to the leave list after successful update
                navigate('/employee_leave');
            })
            .catch(err => console.error(err));
    };


    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Edit Leave Request</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.grid}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Employee</label>
                        <input
                            type="text"
                            name="employee"
                            value={formData.employee_name || ''}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Employee"
                            readOnly
                            disabled
                        />

                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Employee ID</label>
                        <input
                            type="text"
                            name="employee_code"
                            value={formData.employee_code ?? ''}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Employee Code"
                            readOnly
                            disabled
                        />

                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Designation</label>
                        <input type="text" name="designation" value={formData.designation || ''} onChange={handleChange} style={styles.input} placeholder="Designation" readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Joining Date</label>
                        <input type="date" name="joining_date" value={formData.joining_date || ''} onChange={handleChange} style={styles.input} readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Department</label>
                        <input type="text" name="department" value={formData.department || ''} onChange={handleChange} style={styles.input} placeholder="Department" readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Company</label>
                        <input type="text" name="company" value={formData.company_name || ''} onChange={handleChange} style={styles.input} placeholder="Company" readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Personal Phone</label>
                        <input type="text" name="personal_phone" value={formData.personal_phone || ''} onChange={handleChange} style={styles.input} placeholder="Personal Phone" readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Substitute Person</label>
                        <input type="text" name="sub_person" value={formData.sub_person || ''} onChange={handleChange} style={styles.input} placeholder="Sub Person"readOnly disabled />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Date</label>
                        <input type="date" name="date" value={formData.date || ''} onChange={handleChange} style={styles.input} readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Start Date</label>
                        <input type="date" name="start_date" value={formData.start_date || ''} onChange={handleChange} style={styles.input} readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>End Date</label>
                        <input type="date" name="end_date" value={formData.end_date || ''} onChange={handleChange} style={styles.input} readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Leave Days</label>
                        <input type="number" name="leave_days" value={formData.leave_days || ''} onChange={handleChange} style={styles.input} placeholder="Leave Days" readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Balance</label>
                        <input type="number" name="balance" value={formData.balance || ''} onChange={handleChange} style={styles.input} placeholder="Balance" readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Date of Joining After Leave</label>
                        <input type="date" name="date_of_joining_after_leave" value={formData.date_of_joining_after_leave || ''} onChange={handleChange} style={styles.input} readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Actual Date of Joining</label>
                        <input type="date" name="actual_date_of_joining" value={formData.actual_date_of_joining || ''} onChange={handleChange} style={styles.input} readOnly disabled />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Reason for Delay</label>
                        <textarea name="reason_for_delay" value={formData.reason_for_delay || ''} onChange={handleChange} style={styles.textarea} placeholder="Reason for Delay" readOnly disabled></textarea>
                    </div>
                </div>
                <div style={styles.grid}>
                <div style={styles.inputGroup}>
                        <label style={styles.label}>To</label>
                        <input type="text" name="to" value={formData.to || ''} onChange={handleChange} style={styles.input} placeholder="To" />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Comment</label>
                        <textarea name="comment" value={formData.comment || ''} onChange={handleChange} style={styles.textarea} placeholder="Comment"></textarea>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Leave Type</label>
                        <select name="leave_type" value={formData.leave_type || ''} onChange={handleChange} style={styles.select} readOnly disabled >
                            <option value="public_festival_holiday">Public Festival Holiday</option>
                            <option value="casual_leave">Casual Leave</option>
                            <option value="sick_leave">Sick Leave</option>
                            <option value="earned_leave">Earned Leave</option>
                        </select>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Status</label>
                        <select name="status" value={formData.status || ''} onChange={handleChange} style={styles.select}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div style={styles.submitGroup}>
                    <button type="submit" style={styles.submitButton} disabled={loading}>{loading ? 'Updatting...' : 'Update'}</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1200px',
        margin: 'auto',
        backgroundColor: '#f4f4f9',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontWeight: '600',
        marginBottom: '8px',
        fontSize: '14px',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        minHeight: '80px',
    },
    select: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitGroup: {
        textAlign: 'center',
    },
    submitButton: {
        padding: '12px 30px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '20%',
    },
};

export default EditLeaveRequest;
