import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebars from './sidebars';
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
        leave_days: '',
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

    const handleSubmit = () => {
        setLoading(true);
        axios.put(`http://192.168.4.183:8000/api/employee/details/api/employee_leaves/${id}/`, formData)
            .then(() => {
                navigate('/employee_leave');
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const containerStyle = {
        display: 'flex',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
    };

    const mainContentStyle = {
        flex: 1,
        padding: '30px',
        backgroundColor: '#f4f4f9',
    };

    const formContainerStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: '0 auto',
    };

    const formHeaderStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    };

    const formGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '15px',
    };

    const formGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const formLabelStyle = {
        fontWeight: '600',
        marginBottom: '5px',
    };

    const formInputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const formSelectStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const formTextAreaStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px',
    };

    const submitButtonStyle = {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex' }}>
                <Sidebars />
                <div style={{ flex: 1, overflow: 'auto' }}>
                    {/* Your page content here */}
                </div>
            </div>
            <div style={mainContentStyle}>
                <div style={formContainerStyle}>
                    <h2 style={formHeaderStyle}>Edit Leave Request</h2>
                    <form>
                        <div style={formGridStyle}>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Employee</label>
                                <input type="text" name="employee" value={formData.employee_name || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Employee ID</label>
                                <input type="text" name="employee_code" value={formData.employee_code ?? ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Designation</label>
                                <input type="text" name="designation" value={formData.designation || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Email</label>
                                <input type="email" name="email" value={formData.email || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Joining Date</label>
                                <input type="date" name="joining_date" value={formData.joining_date || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Department</label>
                                <input type="text" name="department" value={formData.department || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Company</label>
                                <input type="text" name="company" value={formData.company_name || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Personal Phone</label>
                                <input type="text" name="personal_phone" value={formData.personal_phone || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Substitute Person</label>
                                <input type="text" name="sub_person" value={formData.sub_person || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Date</label>
                                <input type="date" name="date" value={formData.date || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Start Date</label>
                                <input type="date" name="start_date" value={formData.start_date || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>End Date</label>
                                <input type="date" name="end_date" value={formData.end_date || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Leave Days</label>
                                <input type="number" name="leave_days" value={formData.leave_days || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Balance</label>
                                <input type="number" name="balance" value={formData.balance || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Date of Joining After Leave</label>
                                <input type="date" name="date_of_joining_after_leave" value={formData.date_of_joining_after_leave || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Actual Date of Joining</label>
                                <input type="date" name="actual_date_of_joining" value={formData.actual_date_of_joining || ''} onChange={handleChange} style={formInputStyle} readOnly disabled />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Reason for Delay</label>
                                <textarea name="reason_for_delay" value={formData.reason_for_delay || ''} onChange={handleChange} style={formTextAreaStyle} readOnly disabled></textarea>
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>To</label>
                                <input type="text" name="to" value={formData.to || ''} onChange={handleChange} style={formInputStyle} />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Comment</label>
                                <textarea name="comment" value={formData.comment || ''} onChange={handleChange} style={formTextAreaStyle}></textarea>
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Leave Type</label>
                                <select name="leave_type" value={formData.leave_type || ''} onChange={handleChange} style={formSelectStyle} readOnly disabled>
                                    <option value="public_festival_holiday">Public Festival Holiday</option>
                                    <option value="casual_leave">Casual Leave</option>
                                    <option value="sick_leave">Sick Leave</option>
                                    <option value="earned_leave">Earned Leave</option>
                                </select>
                            </div>
                            <div style={formGroupStyle}>
                                <label style={formLabelStyle}>Status</label>
                                <select name="status" value={formData.status || ''} onChange={handleChange} style={formSelectStyle}>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div style={{ textAlign: 'center' }}>
                        <button type="button" onClick={handleSubmit} style={submitButtonStyle} disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLeaveRequest;