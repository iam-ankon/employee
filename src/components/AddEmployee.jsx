import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        designation: "",
        joining_date: "",
        date_of_birth: "",
        email: "",
        mail_address: "",
        personal_phone: "",
        office_phone: "",
        reference_phone: "",
        job_title: "",
        department: "",
        company: "",
        salary: "",
        reporting_leader: "",
        special_skills: "",
        remarks: "",
        image1: null,
        permanent_address: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    // Fetch companies from backend API
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://192.168.4.183:8000/api/employee/details/api/tad_groups/"); // Make sure to use correct endpoint
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const employeeFormData = new FormData();
        Object.keys(formData).forEach((key) => {
            employeeFormData.append(key, formData[key]);
        });

        try {
            const response = await axios.post(`http://192.168.4.183:8000/api/employee/details/api/employees/`, employeeFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Employee added:', response.data);
            setSuccessMessage("Employee saved successfully!");
            setFormData({
                employee_id: "",
                name: "",
                designation: "",
                joining_date: "",
                date_of_birth: "",
                email: "",
                mail_address: "",
                personal_phone: "",
                office_phone: "",
                reference_phone: "",
                job_title: "",
                department: "",
                company: "", // Reset company field
                salary: "",
                reporting_leader: "",
                special_skills: "",
                remarks: "",
                image1: null,
                permanent_address: "",
            });
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error('Error saving employee data:', error);
            setSuccessMessage("Error saving employee data. Please try again.");
        }
    };

    const styles = {
        container: { padding: "20px", maxWidth: "1000px", margin: "auto", backgroundColor: "#f4f4f4", borderRadius: "8px" },
        input: { width: "100%", padding: "8px", marginBottom: "10px" },
        button: {
            padding: "10px",
            backgroundColor: "#0078D4",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s, transform 0.2s",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)",
            width: '30%',
            marginTop: "50px",
        },
        buttonHover: {
            backgroundColor: "#005ea6",
            transform: "scale(1.05)",
        },
        successMessage: {
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            marginBottom: "20px",
            borderRadius: "5px",
            textAlign: "center",
        },
        errorMessage: {
            padding: "10px",
            backgroundColor: "#f44336",
            color: "#fff",
            marginBottom: "20px",
            borderRadius: "5px",
            textAlign: "center",
        },
        popup: {
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            display: showPopup ? "block" : "none",
        },
        form: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
        },
        label: { display: "block", marginBottom: "5px" },
        fileInput: { padding: "10px", border: "1px solid #ddd", marginBottom: "10px" }
    };

    return (
        <div style={styles.container}>
            <h2>Add Employee</h2>

            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label style={styles.label}>Employee ID <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="employee_id" required onChange={handleChange} style={styles.input} value={formData.employee_id} />
                </div>

                <div>
                    <label style={styles.label}>Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="name" required onChange={handleChange} style={styles.input} value={formData.name} />
                </div>

                <div>
                    <label style={styles.label}>Designation <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="designation" required onChange={handleChange} style={styles.input} value={formData.designation} />
                </div>

                <div>
                    <label style={styles.label}>Joining Date <span style={{ color: "red" }}>*</span></label>
                    <input type="date" name="joining_date" required onChange={handleChange} style={styles.input} value={formData.joining_date} />
                </div>

                <div>
                    <label style={styles.label}>Date of Birth <span style={{ color: "red" }}>*</span></label>
                    <input type="date" name="date_of_birth" required onChange={handleChange} style={styles.input} value={formData.date_of_birth} />
                </div>

                <div>
                    <label style={styles.label}>Email <span style={{ color: "red" }}>*</span></label>
                    <input type="email" name="email" required onChange={handleChange} style={styles.input} value={formData.email} />
                </div>

                <div>
                    <label style={styles.label}>Mail Address <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="mail_address" required onChange={handleChange} style={styles.input} value={formData.mail_address} />
                </div>

                <div>
                    <label style={styles.label}>Personal Phone <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="personal_phone" required onChange={handleChange} style={styles.input} value={formData.personal_phone} />
                </div>

                <div>
                    <label style={styles.label}>Office Phone <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="office_phone" required onChange={handleChange} style={styles.input} value={formData.office_phone} />
                </div>

                <div>
                    <label style={styles.label}>Reference Phone</label>
                    <input type="text" name="reference_phone" onChange={handleChange} style={styles.input} value={formData.reference_phone} />
                </div>

                <div>
                    <label style={styles.label}>Job Title <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="job_title" required onChange={handleChange} style={styles.input} value={formData.job_title} />
                </div>

                <div>
                    <label style={styles.label}>Department <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="department" required onChange={handleChange} style={styles.input} value={formData.department} />
                </div>
                <div>
                    <label style={styles.label}>Company <span style={{ color: "red" }}>*</span></label>
                    <select
                        name="company"
                        required
                        onChange={handleChange}
                        style={styles.input}
                        value={formData.company}
                    >
                        <option value="">Select Company</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.id} - {company.company_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={styles.label}>Salary <span style={{ color: "red" }}>*</span></label>
                    <input type="number" name="salary" required onChange={handleChange} style={styles.input} value={formData.salary} />
                </div>

                <div>
                    <label style={styles.label}>Reporting Leader <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="reporting_leader" required onChange={handleChange} style={styles.input} value={formData.reporting_leader} />
                </div>

                <div>
                    <label style={styles.label}>Special Skills</label>
                    <input type="text" name="special_skills" onChange={handleChange} style={styles.input} value={formData.special_skills} />
                </div>

                <div>
                    <label style={styles.label}>Remarks</label>
                    <textarea name="remarks" onChange={handleChange} style={styles.input} value={formData.remarks}></textarea>
                </div>

                <div>
                    <label style={styles.label}>Permanent Address <span style={{ color: "red" }}>*</span></label>
                    <textarea name="permanent_address" required onChange={handleChange} style={styles.input} value={formData.permanent_address}></textarea>
                </div>

                <div>
                    <label style={styles.label}>Profile Picture <span style={{ color: "red" }}>*</span></label>
                    <input type="file" name="image1" required onChange={handleFileChange} style={styles.fileInput} />
                </div>

                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        ...(isHovered ? styles.buttonHover : {})
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Submit
                </button>
                <button
                    type="back"
                    onClick={() => navigate("/employees")}
                    style={{
                        ...styles.button,
                        ...(isHovered ? styles.buttonHover : {})
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Back
                </button>
            </form>

            <div style={styles.popup}>{successMessage}</div>
        </div>
    );
};

export default AddEmployee;
