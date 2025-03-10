import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CVAdd = () => {
  const [name, setName] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvFile) {
      alert("Please select a file");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cv_file", cvFile);
    
    try {
      await axios.post("http://127.0.0.1:8000/api/employee/details/api/CVAdd/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert("CV uploaded successfully");
      setName("");
      setCvFile(null);
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("Failed to upload CV");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="heading">Add CV</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>CV File:</label>
            <input
              type="file"
              onChange={(e) => setCvFile(e.target.files[0])}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <button onClick={() => navigate("/cv-list")} className="view-btn">
          View All CVs
        </button>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f7fafc;
        }

        .form-container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 400px;
          max-width: 100%;
        }

        .heading {
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: 600;
          text-align: center;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .input-field:focus {
          outline: none;
          border-color: #0078d4;
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

        .view-btn {
          width: 100%;
          padding: 12px;
          background-color: #1a73e8;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }

        .view-btn:hover {
          background-color: #1558b0;
        }
      `}</style>
    </div>
  );
};

export default CVAdd;
