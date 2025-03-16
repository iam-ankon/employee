import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CVEdit = () => {
  const { id } = useParams(); // Get the CV ID from the URL
  const [cv, setCv] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    reference: "",
    email: "",
    phone: "",
    cv_file: null,
  });

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/employee/details/api/CVAdd/${id}/`);
        setCv(response.data);
        setFormData({
          name: response.data.name,
          age: response.data.age || "",
          reference: response.data.reference || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          cv_file: null,
        });
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };

    fetchCV();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv_file: e.target.files[0], // Store the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("age", formData.age);
    formDataToSubmit.append("reference", formData.reference);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    
    if (formData.cv_file) {
      formDataToSubmit.append("cv_file", formData.cv_file);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/employee/details/api/CVAdd/${id}/`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("CV updated successfully!");
    } catch (error) {
      console.error("Error updating CV:", error);
      alert("Failed to update CV");
    }
  };

  if (!cv) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div className="container">
      <div className="form-container">
        <h2>Edit CV - {cv.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-group">
            <label>Reference</label>
            <input type="text" name="reference" value={formData.reference} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="form-control" />
          </div>

          <div className="form-group">
            <label>CV File (Leave empty to keep existing)</label>
            <input type="file" name="cv_file" onChange={handleFileChange} className="form-control" />
          </div>

          <button type="submit" className="btn-submit">Save</button>
        </form>
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

        .form-container h2 {
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

        .form-control {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .form-control:focus {
          outline: none;
          border-color: #0078d4;
          box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.2);
        }

        .btn-submit {
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

        .btn-submit:hover {
          background-color: #005fa3;
        }
      `}</style>
    </div>
  );
};

export default CVEdit;
