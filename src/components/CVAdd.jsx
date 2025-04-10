import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CVAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    position_for: "",
    age: "",
    reference: "",
    email: "",
    phone: "",
    cvFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cvFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cvFile) {
      alert("Please select a CV file");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("position_for", formData.position_for);
    uploadData.append("age", formData.age);
    uploadData.append("reference", formData.reference);
    uploadData.append("email", formData.email);
    uploadData.append("phone", formData.phone);
    uploadData.append("cv_file", formData.cvFile);

    try {
      await axios.post("http://192.168.4.183:8000/api/employee/details/api/CVAdd/", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("CV uploaded successfully");
      setFormData({ name: "",position_for: "", age: "", reference: "", email: "", phone: "", cvFile: null });
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
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" />
          </div>

          <div className="form-group">
            <label>Position for:</label>
            <input type="text" name="position_for" value={formData.position_for} onChange={handleChange} className="input-field" />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" />
          </div>

          <div className="form-group">
            <label>Reference:</label>
            <input type="text" name="reference" value={formData.reference} onChange={handleChange} className="input-field" />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}  className="input-field" />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input-field" />
          </div>

          <div className="form-group">
            <label>CV File:</label>
            <input type="file" onChange={handleFileChange} required className="input-field" />
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
          margin-bottom: 15px;
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
