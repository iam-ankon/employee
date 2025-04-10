import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LETTER_CHOICES = [
  { value: "offer_letter", label: "Offer Letter" },
  { value: "appointment_letter", label: "Appointment Letter" },
  { value: "joining_report", label: "Joining Report" },
];

const EditCVPage = () => {
  const { cvId } = useParams();
  const navigate = useNavigate();

  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    letterFile: null,
    letterType: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get(`http://192.168.4.183:8000/api/employee/details/api/cv_management/${cvId}/`);
        setCvData(response.data);
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };
    fetchCV();
  }, [cvId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCvData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCvData((prevData) => ({
        ...prevData,
        letterFile: e.target.files[0],
      }));
    }
  };

  const updateCVManagement = async (formData) => {
    try {
      const response = await axios.put(
        `http://192.168.4.183:8000/api/employee/details/api/cv_management/${cvId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

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

      await updateCVManagement(formData);
      alert("CV updated successfully!");
      navigate("/cv-management");
    } catch (error) {
      console.error("Error updating CV:", error);
      alert("Failed to update CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-cv-container">
      <div className="edit-cv-form-container">
        <h2 className="heading">Edit Letter</h2>
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
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .edit-cv-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f7fafc;
        }

        .edit-cv-form-container {
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

export default EditCVPage;
