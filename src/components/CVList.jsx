import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const CVList = () => {
    const [cvs, setCvs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
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

    // Generate Barcode
 

    // Filter CVs based on the search query
    const filteredCvs = cvs.filter((cv) =>
        cv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const styles = {
        container: { padding: "20px" },
        header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        buttonContainer: {
            display: "flex",
            gap: "10px",
            width: "fit-content",
            marginTop: "10px"
        },
        searchInput: { padding: "8px", marginBottom: "10px", width: "250px" },
        addButton: {
            padding: "10px 15px",
            backgroundColor: "#0078D4",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: "auto"
        },
        printButton: {
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            width: "auto"
        },
        printLogo: { width: "20px", height: "20px", marginRight: "8px" },
        table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
        th: { backgroundColor: "#0078D4", color: "white", padding: "10px" },
        td: { padding: "10px", borderBottom: "1px solid #ddd", cursor: "pointer" },
        actionButton: { marginRight: "5px", padding: "5px 10px", cursor: "pointer" },
        deleteButton: { backgroundColor: "#d9534f", color: "white", border: "none" },
        
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2>All CVs</h2>
                <div style={styles.buttonContainer}>
                    <Link to="/cv-add" style={styles.addButton}>Add CV</Link>
                    
                </div>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                style={styles.searchInput}
                placeholder="Search by Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Table */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Position For</th>
                            <th style={styles.th}>Age</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Phone</th>
                            <th style={styles.th}>Reference</th>
                            <th style={styles.th}>CV File</th>
                            <th style={styles.th}>Barcode</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCvs.map((cv) => (
                            <tr key={cv.id}>
                                <td style={styles.td}>{cv.name}</td>
                                <td style={styles.td}>{cv.position_for}</td>
                                <td style={styles.td}>{cv.age}</td>
                                <td style={styles.td}>{cv.email}</td>
                                <td style={styles.td}>{cv.phone}</td>
                                <td style={styles.td}>{cv.reference}</td>
                                <td style={styles.td}>
                                    <a href={cv.cv_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View CV
                                    </a>
                                </td>
                                <td style={styles.td}>
                                    
                                    <Link
                                        to={`/cv-detail/${cv.id}`}
                                        style={{
                                            padding: "10px 15px",
                                            backgroundColor: "#0078D4",
                                            color: "white",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                         Barcode
                                    </Link>
                                </td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.actionButton}
                                        onClick={() => handleEdit(cv.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={styles.deleteButton}
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
    );
};

export default CVList;
