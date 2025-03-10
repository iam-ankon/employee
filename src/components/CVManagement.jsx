import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCVManagement, deleteCVManagement } from "../api/employeeApi";

const CVManagement = () => {
  const [cvs, setCvs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVs = async () => {
      const response = await getCVManagement();
      setCvs(response.data);
    };
    fetchCVs();
  }, []);

  const handleAddCV = () => {
    navigate("/add-cv");
  };

  const handleEditCV = (cvId) => {
    navigate(`/edit-cv/${cvId}`);
  };

  const handleDeleteCV = async (cvId) => {
    if (window.confirm("Are you sure you want to delete this Letter?")) {
      try {
        await deleteCVManagement(cvId);
        setCvs(cvs.filter((cv) => cv.id !== cvId));
        alert("Letter deleted successfully!");
      } catch (error) {
        console.error("Error deleting Letter:", error);
        alert("Failed to delete Letter. Please try again.");
      }
    }
  };

  const filteredCVs = cvs.filter((cv) =>
    cv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sidebar">
        <h2>HR Work</h2>
        <ul>
          <li><a href="/employees" className="block py-2 hover:text-gray-300">Employees</a></li>
          <li><a href="/attendance" className="block py-2 hover:text-gray-300">Attendance</a></li>
          <li><a href="/email-logs" className="block py-2 hover:text-gray-300">Email Logs</a></li>
          <li><a href="/interviews" className="block py-2 hover:text-gray-300">Interviews</a></li>
          <li><a href="/cv-management" className="block py-2 hover:text-gray-300">CV Management</a></li>
        </ul>
      </div>

      <div className="main-content flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <h2 className="heading">Letter Send</h2>

          {/* Search Field */}
          <div className="search-container mb-6">
            <input
              type="text"
              placeholder="Search Letter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input px-4 py-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          {/* Add CV Button */}
          <button
            onClick={handleAddCV}
            className="add-button mb-6"
          >
            Send Email
          </button>

          <div className="card-container">
            {filteredCVs.map((cv) => (
              <div key={cv.id} className="card">
                <h3 className="text-xl font-semibold mb-2">{cv.name}</h3>
                <p className="text-gray-700 mb-2">Email: {cv.email}</p>
                <p className="text-gray-700 mb-2">Letter Type: {cv.letter_type}</p>
                <p className="text-gray-700">
                  Letter File:{" "}
                  {cv.letter_file ? (
                    <a
                      href={cv.letter_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Letter
                    </a>
                  ) : (
                    "No File"
                  )}
                </p>

                <div className="button-container">
                  <button
                    onClick={() => handleEditCV(cv.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteCV(cv.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content {
          display: flex;
          flex-direction: column;
          padding: 40px;
          background-color: #f4f7fc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          align-items: center;
        }

        .heading {
          font-size: 2.5rem;
          margin-bottom: 30px;
          font-weight: bold;
          color: #0078d4;
          text-align: center;
        }

        .search-container {
          max-width: 400px;
          margin-bottom: 20px;
        }

        .search-input {
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          width: 100%;
          transition: border 0.2s ease;
        }

        .search-input:focus {
          border-color: #3182ce;
          outline: none;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin-top: 30px;
        }

        .card {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .add-button {
          background-color: #28a745;
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .add-button:hover {
          background-color: #218838;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          align-items: center;
        }

        .edit-button {
          background-color: #fbc02d;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .edit-button:hover {
          background-color: #f9a825;
        }

        .delete-button {
          background-color: #e57373;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .delete-button:hover {
          background-color: #d32f2f;
        }

        .sidebar {
          background-color: #2d3748;
          color: white;
          padding: 20px;
          width: 250px;
          height: 100vh;
        }

        .sidebar h2 {
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 20px;
        }

        .sidebar ul {
          list-style-type: none;
          padding: 0;
        }

        .sidebar ul li {
          margin-bottom: 15px;
        }

        .sidebar ul li a {
          display: block;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          color: white;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .sidebar ul li a:hover {
          background-color: #4a5568;
          color: #edf2f7;
        }
      `}</style>
    </div>
  );
};

export default CVManagement;
