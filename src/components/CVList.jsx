import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CVList = () => {
    const [cvs, setCvs] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/employee/details/api/CVAdd/");
                setCvs(response.data);
            } catch (error) {
                console.error("Error fetching CVs:", error);
            }
        };

        fetchCVs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/employee/details/api/CVAdd/${id}/`);
            setCvs(cvs.filter((cv) => cv.id !== id));
        } catch (error) {
            console.error("Error deleting CV:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/cv-edit/${id}`);
    };

    // Filter CVs based on the search query
    const filteredCvs = cvs.filter((cv) =>
        cv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>CV Management</h2>
                <ul>
                    <li>
                        <Link to="/cv-add" className="block py-2 hover:text-gray-300">Add CV</Link>
                    </li>
                    <li>
                        <Link to="/cv-list" className="block py-2 hover:text-gray-300">View CVs</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h2 className="text-3xl font-bold mb-6">All CVs</h2>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search by Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CV File</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCvs.map((cv) => (
                                <tr key={cv.id}>
                                    <td>{cv.name}</td>
                                    <td>
                                        <a href={cv.cv_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            View CV
                                        </a>
                                    </td>
                                    <td>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                                            onClick={() => handleEdit(cv.id)}
                                        >
                                            Edit
                                        </button>
                                        <span className="mx-2"></span> {/* Space between buttons */}
                                        <button
                                            className="!bg-red-500 text-white px-3 py-1 rounded hover:!bg-red-600 transition duration-200"
                                            onClick={() => handleDelete(cv.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
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
        .main-content {
          flex: 1;
          padding: 30px;
          background-color: #f7fafc;
          overflow: auto;
        }
        .main-content h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 30px;
        }
        .table-container {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #0078d4;
          color: white;
        }
        tr:hover {
          background-color: #f1f1f1;
        }

        .search-bar {
          padding: 10px;
          margin-bottom: 20px;
          width: 100%;
          max-width: 500px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
      `}</style>
        </div>
    );
};

export default CVList;
