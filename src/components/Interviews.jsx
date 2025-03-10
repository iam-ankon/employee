import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/employee/details/api/interviews/";

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [formData, setFormData] = useState({
    candidate: "",
    interview_date: "",
    interview_result: "",
    interview_notes: "",
    interview_pdf: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null); // Toast state

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = () => {
    axios
      .get(API_URL)
      .then((response) => setInterviews(response.data))
      .catch((error) => showToast("Error fetching data", "error"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, interview_pdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (selectedInterview) {
        await axios.put(`${API_URL}${selectedInterview.id}/`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Interview updated successfully", "success");
      } else {
        await axios.post(API_URL, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Interview added successfully", "success");
      }
      fetchInterviews();
      resetForm();
    } catch (error) {
      showToast("Error submitting interview", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        showToast("Interview deleted successfully", "success");
        fetchInterviews();
        resetForm();
      } catch (error) {
        showToast("Error deleting interview", "error");
      }
    }
  };

  const resetForm = () => {
    setSelectedInterview(null);
    setFormData({
      candidate: "",
      interview_date: "",
      interview_result: "",
      interview_notes: "",
      interview_pdf: null,
    });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Hide after 3 seconds
  };

  const printInterview = (interview) => {
    const printWindow = window.open("", "Print Interview", "width=600,height=600");
    printWindow.document.write(`
      <h2>Interview Details</h2>
      <p><strong>Candidate:</strong> ${interview.candidate}</p>
      <p><strong>Date:</strong> ${new Date(interview.interview_date).toLocaleString()}</p>
      <p><strong>Result:</strong> ${interview.interview_result}</p>
      <p><strong>Notes:</strong> ${interview.interview_notes || "No notes available"}</p>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const printAllInterviews = () => {
    const printWindow = window.open("", "Print All Interviews", "width=800,height=600");
    printWindow.document.write("<h2>All Interviews</h2>");
    interviews.forEach((interview) => {
      printWindow.document.write(`
        <p><strong>Candidate:</strong> ${interview.candidate}</p>
        <p><strong>Date:</strong> ${new Date(interview.interview_date).toLocaleString()}</p>
        <p><strong>Result:</strong> ${interview.interview_result}</p>
        <p><strong>Notes:</strong> ${interview.interview_notes || "No notes available"}</p>
        <hr />
      `);
    });
    printWindow.document.close();
    printWindow.print();
  };

  // Inline styles
  const styles = {
    container: { display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" },
    sidebar: { width: "300px", backgroundColor: "#f3f3f3", padding: "20px", borderRight: "2px solid #ddd", overflowY: "auto" },
    sidebarTitle: { fontSize: "18px", marginBottom: "10px" },
    list: { listStyleType: "none", padding: "0" },
    listItem: { padding: "10px", cursor: "pointer", borderRadius: "5px", transition: "background 0.3s ease" },
    content: { flex: 1, padding: "20px" },
    contentTitle: { fontSize: "24px", marginBottom: "10px" },
    contentText: { fontSize: "16px", margin: "5px 0" },
    link: { display: "inline-block", marginTop: "10px", color: "#0078d4", textDecoration: "none" },
    form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "200px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" },
    input: { padding: "8px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "5px" },
    button: { padding: "10px", fontSize: "14px", backgroundColor: "#0078d4", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" },
    deleteButton: { backgroundColor: "#d9534f" },
    newButton: { backgroundColor: "#28a745", marginBottom: "10px" },
    label: { fontSize: "14px", marginBottom: "5px" },
    search: { padding: "8px", fontSize: "14px", marginBottom: "10px" },
    toast: {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px",
      backgroundColor: "#28a745",
      color: "#fff",
      borderRadius: "5px",
      display: "inline-block",
    },
    errorToast: { backgroundColor: "#d9534f" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Interviews</h2>
        <input
          type="text"
          placeholder="Search by Candidate"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.search}
        />
        <button style={{ ...styles.button, ...styles.newButton }} onClick={resetForm}>
          + Create New Interview
        </button>
        <button style={{ ...styles.button, marginBottom: "10px" }} onClick={printAllInterviews}>
          🖨️ Print All Interviews
        </button>
        <ul style={styles.list}>
          {interviews
            .filter((interview) =>
              interview.candidate.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((interview) => (
              <li
                key={interview.id}
                style={styles.listItem}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#dcdcdc")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                onClick={() => setSelectedInterview(interview)}
              >
                {interview.candidate}
              </li>
            ))}
        </ul>
      </div>

      <div style={styles.content}>
        {toast && (
          <div style={{ ...styles.toast, ...(toast.type === "error" ? styles.errorToast : {}) }}>
            {toast.message}
          </div>
        )}

        {selectedInterview ? (
          <div>
            <h2 style={styles.contentTitle}>{selectedInterview.candidate}</h2>
            <p style={styles.contentText}>
              <strong>Date:</strong> {new Date(selectedInterview.interview_date).toLocaleString()}
            </p>
            <p style={styles.contentText}>
              <strong>Result:</strong> {selectedInterview.interview_result}
            </p>
            <p style={styles.contentText}>
              <strong>Notes:</strong> {selectedInterview.interview_notes || "No notes available"}
            </p>
            {selectedInterview.interview_pdf && (
              <a
                href={selectedInterview.interview_pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                View CV PDF
              </a>


            )}

            <button style={{ ...styles.button, ...styles.deleteButton, marginTop: "10px" }} onClick={() => handleDelete(selectedInterview.id)}>
              Delete Interview
            </button>
            <button style={{ ...styles.button, marginTop: "10px" }} onClick={() => printInterview(selectedInterview)}>
              🖨️ Print Interview
            </button>
          </div>
        ) : (
          <p style={styles.contentText}>Select an interview to view details</p>
        )}

        <h2 style={styles.contentTitle}>{selectedInterview ? "Edit Interview" : "Add Interview"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Candidate Name</label>
            <input type="text" name="candidate" value={formData.candidate} onChange={handleInputChange} style={styles.input} required />
          </div>
          <div>
            <label style={styles.label}>Interview Date</label>
            <input type="datetime-local" name="interview_date" value={formData.interview_date} onChange={handleInputChange} style={styles.input} required />
          </div>
          <div>
            <label style={styles.label}>Interview Result</label>
            <textarea name="interview_result" value={formData.interview_result} onChange={handleInputChange} style={styles.input} required />
          </div>
          <div>
            <label style={styles.label}>Interview Notes</label>
            <textarea name="interview_notes" value={formData.interview_notes} onChange={handleInputChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>CV PDF</label>
            <input type="file" name="interview_pdf" onChange={handleFileChange} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>{selectedInterview ? "Update Interview" : "Add Interview"}</button>
        </form>
      </div>
    </div>
  );
};

export default Interviews;
