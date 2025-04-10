import React, { useState } from "react";
import axios from "axios";

const NewAppraisal = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    designation: "",
    joining_date: "",
    department: "",
    last_increment_date: "",
    last_promotion_date: "",
    last_education: "",
    job_knowledge: "",
    job_description: "",
    performance_in_meetings: "",
    performance_description: "",
    communication_skills: "",
    communication_description: "",
    reliability: "",
    reliability_description: "",
    initiative: "",
    initiative_description: "",
    stress_management: "",
    stress_management_description: "",
    co_operation: "",
    co_operation_description: "",
    leadership: "",
    leadership_description: "",
    discipline: "",
    discipline_description: "",
    ethical_considerations: "",
    ethical_considerations_description: "", 
    promotion: false,
    increment: false,
    performance_reward: false,
    performance: "",
    expected_performance: "",
    present_salary: "",
    proposed_salary: "",
    present_designation: "",
    proposed_designation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://192.168.4.183:8000/api/employee/details/api/performanse_appraisals/", formData);
      alert("Appraisal Added Successfully!");
    } catch (error) {
      console.error("Error adding appraisal:", error);
    }
  };

  const styles = {
    container: {
      width: "100%",
      maxWidth: "900px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#f4f5f7",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: "20px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    textarea: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      height: "100px",
      resize: "vertical",
      gridColumn: "span 2",
    },
    button: {
      gridColumn: "span 2",
      padding: "12px",
      borderRadius: "6px",
      backgroundColor: "#0078d4",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      textAlign: "center",
      border: "none",
      width: '20%',
    },
    buttonHover: {
      backgroundColor: "#005a9e",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Performance Appraisal</h2>
      <form onSubmit={handleSubmit} style={styles.formGrid}>
        {Object.keys(formData).map((key) => (
          <div style={styles.formGroup} key={key}>
            <label style={styles.label}>{key.replace(/_/g, " ").toUpperCase()}</label>
            {key.includes("description") ? (
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={styles.textarea}
              />
            ) : key.includes("date") ? (
              <input
                type="date"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            ) : key.includes("performance_in_meetings") || key.includes("score") || key.includes("knowledge") || key.includes("communication_skills") ? (
              <input
                type="number"
                min="1"
                max="5"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            ) : key === "promotion" || key === "increment" || key === "performance_reward" ? (
              <input
                type="checkbox"
                name={key}
                checked={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
              />
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0078d4")}
        >
          Add Appraisal
        </button>
      </form>
    </div>
  );
};

export default NewAppraisal;
