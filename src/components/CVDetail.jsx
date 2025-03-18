import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const CVDetail = () => {
    const { id } = useParams();
    const [cvDetails, setCvDetails] = useState(null);
    const qrCodeRef = useRef(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchCVDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/employee/details/api/CVAdd/${id}/`);
                setCvDetails(response.data);
            } catch (error) {
                console.error("Error fetching CV details:", error);
            }
        };

        fetchCVDetails();
    }, [id]);

    const generateQRCode = async () => {
        if (qrCodeRef.current && cvDetails) {
            const qrCanvas = qrCodeRef.current;
            const qrCodeImage = qrCanvas.toDataURL("image/png");

            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/employee/details/api/CVAdd/${id}/update-cv-with-qr/`,
                    {
                        qr_code: qrCodeImage,
                    },
                    { responseType: "arraybuffer" }
                );

                const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const pdfWindow = window.open(pdfUrl, "_blank");
                pdfWindow.print();
            } catch (error) {
                console.error("Error updating CV with QR code:", error);
            }
        }
    };

    const handleSelectForInterview = () => {
        if (cvDetails) {
            navigate("/interviews", {
                state: { ...cvDetails }, // Pass the latest CV details dynamically
            });
        } else {
            console.error("No CV details available to send.");
        }
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f5f7",
        },
        card: {
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
        },
        header: {
            fontSize: "24px",
            color: "#0078D4",
            marginBottom: "20px",
        },
        details: {
            fontSize: "16px",
            marginBottom: "10px",
        },
        link: {
            color: "#0078D4",
            textDecoration: "none",
            fontWeight: "bold",
        },
        qrContainer: {
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
        },
        buttonContainer: {
            marginTop: "20px",
            display: "flex",
            flexDirection: "column", // Stack buttons vertically
            gap: "10px", // Space between buttons
        },
        button: {
            padding: "10px 20px",
            backgroundColor: "#0078D4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#005ea6",
        },
    };

    return (
        <div style={styles.container}>
            {cvDetails ? (
                <div style={styles.card}>
                    <h2 style={styles.header}>CV Details</h2>
                    <div style={styles.details}>
                        <p><strong>Name:</strong> {cvDetails.name}</p>
                        <p><strong>Age:</strong> {cvDetails.age}</p>
                        <p><strong>Email:</strong> {cvDetails.email}</p>
                        <p><strong>Phone:</strong> {cvDetails.phone}</p>
                        <p><strong>Reference:</strong> {cvDetails.reference}</p>
                        <p>
                            <a href={cvDetails.cv_file} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                View CV
                            </a>
                        </p>
                    </div>

                    {/* QR Code section */}
                    <div style={styles.qrContainer}>
                        <QRCodeCanvas
                            ref={qrCodeRef}
                            value={`http://localhost:5173/interviews/${id}`} // Dynamic interview page URL
                            size={200}
                        />
                    </div>


                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.button}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                            onClick={generateQRCode}
                        >
                            Attach to CV
                        </button>

                        {/* New button to select for interview */}
                        <button
                            style={styles.button}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                            onClick={handleSelectForInterview} // Pass data to Interview page
                        >
                            Selected for Interview
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading CV details...</p>
            )}
        </div>
    );
};

export default CVDetail;
