import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests

const LETTER_CHOICES = [
  { value: "offer_letter", label: "Offer Letter" },
  { value: "appointment_letter", label: "Appointment Letter" },
  { value: "joining_report", label: "Joining Report" },
];

const AddCVPage = () => {
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    letterFile: null,
    letterType: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handles text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCvData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCvData((prevData) => ({
        ...prevData,
        letterFile: e.target.files[0],
      }));
    }
  };

  // API request function
  const addCVManagement = async (formData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/employee/details/api/cv_management/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!cvData.letterFile) {
        alert("Please select a letter file.");
        setLoading(false);
        return;
      }

      if (!cvData.letterType) {
        alert("Please select a letter type.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", cvData.name);
      formData.append("email", cvData.email);
      formData.append("letter_file", cvData.letterFile);
      formData.append("letter_type", cvData.letterType);

      // Debugging: Console log FormData values
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await addCVManagement(formData);
      alert("CV added successfully!");
      navigate("/cv-management");
    } catch (error) {
      console.error("Error adding CV:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(`Error: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert("Failed to add CV. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-cv-container">
      <div className="add-cv-form-container">
        <h2 className="heading">Send Letter</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Name *</label>
            <input
              type="text"
              name="name"
              value={cvData.name}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="label">Email *</label>
            <input
              type="email"
              name="email"
              value={cvData.email}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="label">Letter File *</label>
            <input
              type="file"
              name="letterFile"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="label">Letter Type *</label>
            <select
              name="letterType"
              value={cvData.letterType}
              onChange={handleInputChange}
              required
              className="input"
            >
              <option value="" disabled>Select Letter Type</option>
              {LETTER_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Save"}
          </button>
        </form>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .add-cv-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f7fafc;
        }

        .add-cv-form-container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 400px;
          max-width: 100%;
        }

        .heading {
          font-size: 2rem;
          margin-bottom: 20px;
          font-weight: bold;
          text-align: center;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .label {
          display: block;
          font-size: 1rem;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }

        .input {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .input:focus {
          border-color: #0078d4;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.2);
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #0078d4;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #005fa3;
        }
      `}</style>
    </div>
  );
};

export default AddCVPage;
