import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate  } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/employee/details/api/interviews/";

const Interviews = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const { name, age, email, phone, reference } = location.state || {};
  const [formData, setFormData] = useState({
    name: name || '',
    age: age || '',
    email: email || '',
    phone: phone || '',
    reference: reference || '',
    interview_date: "",
    interviewee_confirmed: false,
    feedback_provided: false,
    english_proficiency: false,
    good_behaviour: false,
    relevant_skills: false,
    cultural_fit: false,
    clarity_of_communication: false,
    interview_questions: "",
    interview_mark: "",
    interview_result: "",
    interview_notes: ""
  });
  // Function to calculate the interview mark based on boolean fields
  const calculateInterviewMark = (formData) => {
    let score = 0;
    const totalFields = 5; // Total number of boolean fields

    // If the boolean field is true, add points
    if (formData.english_proficiency) score += 20;
    if (formData.good_behaviour) score += 20;
    if (formData.relevant_skills) score += 20;
    if (formData.cultural_fit) score += 20;
    if (formData.clarity_of_communication) score += 20;

    // Ensure the score is between 0 and 100
    const interviewMark = Math.min(Math.max(score, 0), 100);

    // Automatically set interview result based on the mark
    const interviewResult = interviewMark >= 80 ? "Passed" : "Failed";

    return { interviewMark, interviewResult };
  };

  // Fetching interview data
  useEffect(() => {
    if (location.state && location.state.interview) {
      setSelectedInterview(location.state.interview);
      setFormData(location.state.interview);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // If any boolean field is changed, recalculate the interview mark and result
    if (
      name === "english_proficiency" ||
      name === "good_behaviour" ||
      name === "relevant_skills" ||
      name === "cultural_fit" ||
      name === "clarity_of_communication"
    ) {
      const { interviewMark, interviewResult } = calculateInterviewMark(newFormData);
      newFormData.interview_mark = interviewMark;
      newFormData.interview_result = interviewResult;
    }

    setFormData(newFormData);
  };

  useEffect(() => {
    if (location.state) {
      console.log("Received CV Details:", location.state);
      setFormData((prev) => ({
        ...prev,
        name: location.state.name || "",
        age: location.state.age || "",
        email: location.state.email || "",
        phone: location.state.phone || "",
        reference: location.state.reference || "",
      }));
    }
  }, [location]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const interviewId = params.get("interview_id");

    if (interviewId) {
      const foundInterview = interviews.find((intv) => intv.id.toString() === interviewId);
      if (foundInterview) {
        setSelectedInterview(foundInterview);
      }
    }
  }, [location.search, interviews]);

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
    navigate(`/interviews?interview_id=${interview.id}`, { replace: true });
  };


  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (location.state) {
      setSelectedInterview(location.state);  // Set the received data into state
    }
  }, [location]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    if (selectedInterview) {
      console.log("Setting Form Data:", selectedInterview); // 🔍 Debugging
      setFormData({
        name: selectedInterview.name || "",
        age: selectedInterview.age || "",
        reference: selectedInterview.reference || "",
        email: selectedInterview.email || "",
        phone: selectedInterview.phone || "",
        interview_date: selectedInterview.interview_date
          ? new Date(selectedInterview.interview_date).toISOString().slice(0, 16)
          : "",
        interviewee_confirmed: selectedInterview.interviewee_confirmed || false,
        feedback_provided: selectedInterview.feedback_provided || false,
        english_proficiency: selectedInterview.english_proficiency || false,
        good_behaviour: selectedInterview.good_behaviour || false,
        relevant_skills: selectedInterview.relevant_skills || false,
        cultural_fit: selectedInterview.cultural_fit || false,
        clarity_of_communication: selectedInterview.clarity_of_communication || false,
        interview_questions: selectedInterview.interview_questions || "",
        interview_mark: selectedInterview.interview_mark ?? "", // Ensure non-null value
        interview_result: selectedInterview.interview_result ?? "",
        interview_notes: selectedInterview.interview_notes ?? "",
      });
    } else {
      resetForm();
    }
  }, [selectedInterview]);




  const fetchInterviews = () => {
    axios
      .get(API_URL)
      .then((response) => setInterviews(response.data))
      .catch((error) => showToast("Error fetching data", "error"));
  };

  const handleSendMail = (selectedInterview) => {
    navigate('/mailmdsir', { state: selectedInterview });
  };

  const handleInviteMail = (selectedInterview) => {
    navigate('/invitemail', { state: selectedInterview });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key] ?? ""); // Ensure no null values
    });

    try {
      let response;
      if (selectedInterview) {
        response = await axios.put(`${API_URL}${selectedInterview.id}/`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Interview updated successfully", "success");
      } else {
        response = await axios.post(API_URL, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Interview added successfully", "success");
      }

      console.log("Updated Interview Response:", response.data); // 🔍 Debugging

      fetchInterviews();
      resetForm();
    } catch (error) {
      console.error("Error submitting interview:", error);
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
      name: location.state?.name || "",
      age: location.state?.age || "",
      email: location.state?.email || "",
      phone: location.state?.phone || "",
      reference: location.state?.reference || "",
      interview_date: "",
      interviewee_confirmed: false,
      feedback_provided: false,
      english_proficiency: false,
      good_behaviour: false,
      relevant_skills: false,
      cultural_fit: false,
      clarity_of_communication: false,
      interview_questions: "",
      interview_mark: "",
      interview_result: "",
      interview_notes: "",
    });
  };


  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const printInterview = (interview) => {
    const printContent = `
      <h2>${interview.name}'s Interview</h2>
      <p><strong>Age:</strong> ${interview.age}</p>
      <p><strong>Reference:</strong> ${interview.reference}</p>
      <p><strong>Email:</strong> ${interview.email}</p>
      <p><strong>Phone:</strong> ${interview.phone}</p>
      <p><strong>Interview Date:</strong> ${new Date(interview.interview_date).toLocaleString()}</p>
      <p><strong>Interview Mark:</strong> ${interview.interview_mark}</p>
      <p><strong>Result:</strong> ${interview.interview_result}</p>
      <p><strong>Notes:</strong> ${interview.interview_notes || "No notes available"}</p>
      <p><strong>Feedback Provided:</strong> ${interview.feedback_provided ? "Yes" : "No"}</p>
      <p><strong>English Proficiency:</strong> ${interview.english_proficiency ? "Yes" : "No"}</p>
      <p><strong>Good Behavior:</strong> ${interview.good_behaviour ? "Yes" : "No"}</p>
      <p><strong>Relevant Skills:</strong> ${interview.relevant_skills ? "Yes" : "No"}</p>
      <p><strong>Cultural Fit:</strong> ${interview.cultural_fit ? "Yes" : "No"}</p>
      <p><strong>Clarity of Communication:</strong> ${interview.clarity_of_communication ? "Yes" : "No"}</p>
      <p><strong>Interview Questions:</strong> ${interview.interview_questions || "No questions recorded"}</p>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(printContent);
    newWindow.print();
    newWindow.close();
  };

  const printAllInterviews = () => {
    const printWindow = window.open("", "Print All Interviews", "width=800,height=800");
    let allInterviewsContent = "<h2>All Interviews</h2>";

    interviews.forEach((interview) => {
      allInterviewsContent += `
        <div>
          <p><strong>Name:</strong> ${interview.name}</p>
          <p><strong>Age:</strong> ${interview.age}</p>
          <p><strong>Reference:</strong> ${interview.reference}</p>
          <p><strong>Email:</strong> ${interview.email}</p>
          <p><strong>Phone:</strong> ${interview.phone}</p>
          <p><strong>Interview Date:</strong> ${new Date(interview.interview_date).toLocaleString()}</p>
          <p><strong>Interview Mark:</strong> ${interview.interview_mark}</p>
          <p><strong>Result:</strong> ${interview.interview_result}</p>
          <p><strong>Notes:</strong> ${interview.interview_notes || "No notes available"}</p>
          <p><strong>Feedback Provided:</strong> ${interview.feedback_provided ? "Yes" : "No"}</p>
          <p><strong>English Proficiency:</strong> ${interview.english_proficiency ? "Yes" : "No"}</p>
          <p><strong>Good Behavior:</strong> ${interview.good_behaviour ? "Yes" : "No"}</p>
          <p><strong>Relevant Skills:</strong> ${interview.relevant_skills ? "Yes" : "No"}</p>
          <p><strong>Cultural Fit:</strong> ${interview.cultural_fit ? "Yes" : "No"}</p>
          <p><strong>Clarity of Communication:</strong> ${interview.clarity_of_communication ? "Yes" : "No"}</p>
          <p><strong>Interview Questions:</strong> ${interview.interview_questions || "No questions recorded"}</p>
        </div>
        <hr />
      `;
    });

    printWindow.document.write(allInterviewsContent);
    printWindow.document.close();
    printWindow.print();
  };

  const style = {
    container: {
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      height: "100vh",
    },
    sidebar: {
      width: "280px",
      backgroundColor: "#f3f3f3",
      borderRight: "1px solid #ddd",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
    sidebarHeader: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    link: {
      color: "#0078D4",
      textDecoration: "none",
      fontWeight: "bold",
    },
    searchInput: {
      padding: "8px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    button: {
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#0078d4",
      color: "white",
      cursor: "pointer",
    },
    buttonPrint: {
      backgroundColor: "#28a745",
    },
    interviewItem: {
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
    },
    interviewItemHover: {
      backgroundColor: "#e0e0e0",
    },
    content: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
    },
    interviewDetails: {
      marginBottom: "20px",
    },
    interviewForm: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    btnSubmit: {
      padding: "10px",
      backgroundColor: "#0078d4",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    btnDelete: {
      padding: "10px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    toast: {
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    successToast: {
      backgroundColor: "#28a745",
      color: "white",
    },
    errorToast: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px", // Adjust gap between buttons
    },
  };



  return (
    <div style={style.container}>
      <div style={style.sidebar}>
        <div style={style.sidebarHeader}>
          <h2>Interviews</h2>
        </div>
        <input
          type="text"
          placeholder="Search by Candidate"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={style.searchInput}
        />
        <button style={style.button} onClick={resetForm}>
          + Create New Interview
        </button>
        <button style={{ ...style.button, ...style.buttonPrint }} onClick={printAllInterviews}>
          🖨️ Print All Interviews
        </button>
        <ul className="interview-list">
          {interviews
            .filter((interview) =>
              interview.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((interview) => (
              <li
                key={interview.id}
                style={style.interviewItem}
                onClick={() => handleInterviewClick(interview)}
              >
                {interview.name}
              </li>
            ))}
        </ul>
      </div>

      <div style={style.content}>
        {toast && (
          <div
            style={{
              ...style.toast,
              ...(toast.type === "error" ? style.errorToast : style.successToast),
            }}
          >
            {toast.message}
          </div>
        )}
        {selectedInterview ? (
          <div>
            <h2>{selectedInterview.name}</h2>
            <p><strong>Name:</strong> {selectedInterview.name}</p>
            <p><strong>Age:</strong> {selectedInterview.age}</p>
            <p><strong>Reference:</strong> {selectedInterview.reference}</p>
            <p><strong>Email:</strong> {selectedInterview.email}</p>
            <p><strong>Phone:</strong> {selectedInterview.phone}</p>
            <p><strong>Interview Date:</strong> {new Date(selectedInterview.interview_date).toLocaleString()}</p>
            <p><strong>Interview Mark:</strong> {selectedInterview.interview_mark}</p>
            <p><strong>Interview Result:</strong> {selectedInterview.interview_result}</p>
            <p><strong>Interview Notes:</strong> {selectedInterview.interview_notes || "No notes available"}</p>
            <p><strong>Feedback Provided:</strong> {selectedInterview.feedback_provided ? "Yes" : "No"}</p>
            <p><strong>English Proficiency:</strong> {selectedInterview.english_proficiency ? "Yes" : "No"}</p>
            <p><strong>Good Behavior:</strong> {selectedInterview.good_behaviour ? "Yes" : "No"}</p>
            <p><strong>Relevant Skills:</strong> {selectedInterview.relevant_skills ? "Yes" : "No"}</p>
            <p><strong>Cultural Fit:</strong> {selectedInterview.cultural_fit ? "Yes" : "No"}</p>
            <p><strong>Clarity of Communication:</strong> {selectedInterview.clarity_of_communication ? "Yes" : "No"}</p>
            <p><strong>Interview Questions:</strong> {selectedInterview.interview_questions || "No questions recorded"}</p>
            <div style={style.buttonContainer}>
              <button onClick={() => printInterview(selectedInterview)} style={style.button}>
                Print Interview
              </button>
              <button style={style.btnDelete} onClick={() => handleDelete(selectedInterview.id)}>
                Delete Interview
              </button>
              <button style={style.btnDelete} onClick={() => handleSendMail(selectedInterview)}>
                Sent Mail
              </button>
              <button style={style.btnDelete} onClick={() => handleInviteMail(selectedInterview)}>
                Invite for interview
              </button>
            </div>

          </div>
        ) : (
          <h2>Create New Interview</h2>
        )}

        <form style={style.interviewForm} onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={style.input}
            readOnly
          />

          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Reference</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Interview Date</label>
          <input
            type="datetime-local"
            name="interview_date"
            value={formData.interview_date}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Interview Mark</label>
          <input
            type="number"
            name="interview_mark"
            value={formData.interview_mark}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Interview Result</label>
          <input
            type="text"
            name="interview_result"
            value={formData.interview_result}
            onChange={handleInputChange}
            style={style.input}
          />

          <label>Interview Notes</label>
          <textarea
            name="interview_notes"
            value={formData.interview_notes}
            onChange={handleInputChange}
            style={style.input}
          />

          <div>
            <label>Feedback Provided</label>
            <input
              type="checkbox"
              name="feedback_provided"
              checked={formData.feedback_provided}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>English Proficiency</label>
            <input
              type="checkbox"
              name="english_proficiency"
              checked={formData.english_proficiency}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Good Behavior</label>
            <input
              type="checkbox"
              name="good_behaviour"
              checked={formData.good_behaviour}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Relevant Skills</label>
            <input
              type="checkbox"
              name="relevant_skills"
              checked={formData.relevant_skills}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Cultural Fit</label>
            <input
              type="checkbox"
              name="cultural_fit"
              checked={formData.cultural_fit}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Clarity of Communication</label>
            <input
              type="checkbox"
              name="clarity_of_communication"
              checked={formData.clarity_of_communication}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Interview Questions</label>
            <textarea
              name="interview_questions"
              value={formData.interview_questions}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>

          <button type="submit" style={style.btnSubmit}>
            {selectedInterview ? "Update Interview" : "Create Interview"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Interviews;
