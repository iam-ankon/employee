import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebars from './sidebars';

const API_URL = "http://192.168.4.54:8000/api/employee/details/api/interviews/";

const Interviews = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const { name, position_for, age, email, phone, reference } = location.state || {};
  const [formData, setFormData] = useState({
    name: name || '',
    position_for: position_for || '',
    age: age || '',
    email: email || '',
    phone: phone || '',
    reference: reference || '',
    place: "",
    interview_date: "",
    education: '',
    job_knowledge: '',
    work_experience: '',
    communication: '',
    personality: '',
    potential: '',
    general_knowledge: '',
    assertiveness: '',
    interview_mark: "",
    interview_result: "",
    interview_notes: "",
    current_remuneration: "",
    expected_package: "",
    notice_period_required: "",
    recommendation: "",
    immediate_recruitment: false || "",
    on_hold: false || "",
    no_good: false || "",
    final_selection_remarks: "",

  });
  // Function to calculate the interview mark based on boolean fields
  const calculateInterviewMark = (formData) => {
    let score = 0;

    // Directly use the input values for each field, rather than adding fixed scores
    if (formData.education) score += formData.education;
    if (formData.job_knowledge) score += formData.job_knowledge;
    if (formData.work_experience) score += formData.work_experience;
    if (formData.communication) score += formData.communication;
    if (formData.personality) score += formData.personality;
    if (formData.potential) score += formData.potential;
    if (formData.general_knowledge) score += formData.general_knowledge;
    if (formData.assertiveness) score += formData.assertiveness;

    // Ensure the score is between 0 and 100
    const interviewMark = Math.min(Math.max(score, 0), 100);

    // Automatically set interview result based on the mark
    let interviewResult = '';
    if (interviewMark <= 35) {
      interviewResult = 'Poor';
    } else if (interviewMark <= 60) {
      interviewResult = 'Adequate';
    } else if (interviewMark <= 85) {
      interviewResult = 'Good';
    } else {
      interviewResult = 'Outstanding';
    }

    return { interviewMark, interviewResult };
  };

  useEffect(() => {
    // Show popup whenever interviewData changes
    if (formData.interview_mark || formData.interview_result) {
      setShowPopup(true);
    }
  }, [formData]);

  // Fetching interview data
  useEffect(() => {
    if (location.state && location.state.interview) {
      setSelectedInterview(location.state.interview);
      setFormData(location.state.interview);
    }
  }, [location]);

  useEffect(() => {
    const cvDetails = location.state;  // Get the CV details passed via location.state
    if (cvDetails) {
      // Pre-fill form with CV details
      setFormData({
        name: cvDetails.name || "",
        position_for: cvDetails.position_for || "",
        age: cvDetails.age || "",
        email: cvDetails.email || "",
        phone: cvDetails.phone || "",
        reference: cvDetails.reference || "",
        place: "",
        interview_date: "",
        education: '',
        job_knowledge: '',
        work_experience: '',
        communication: '',
        personality: '',
        potential: '',
        general_knowledge: '',
        assertiveness: '',
        interview_mark: "",
        interview_result: "",
        interview_notes: "",
        current_remuneration: "",
        expected_package: "",
        notice_period_required: "",
        recommendation: "",
        immediate_recruitment: false || "",
        on_hold: false || "",
        no_good: false || "",
        final_selection_remarks: "",
      });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedValue = isNaN(value) ? value : parseInt(value) || "";

      const updatedFormData = {
        ...prev,
        [name]: updatedValue,
      };

      // List of integer fields that should trigger recalculation
      const integerFields = [
        "education",
        "job_knowledge",
        "work_experience",
        "communication",
        "personality",
        "potential",
        "general_knowledge",
        "assertiveness",
      ];

      // If the field updated is in the integer fields list, recalculate the interview mark
      if (integerFields.includes(name)) {
        const { interviewMark, interviewResult } = calculateInterviewMark(updatedFormData);
        updatedFormData.interview_mark = interviewMark;  // Set the calculated interview mark
        updatedFormData.interview_result = interviewResult;  // Set the interview result (Poor, Adequate, etc.)
      }

      return updatedFormData;
    });
  };




  useEffect(() => {
    if (location.state) {
      console.log("Received CV Details:", location.state);
      setFormData((prev) => ({
        ...prev,
        name: location.state.name || "",
        position_for: location.state.position_for || "",
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
        position_for: selectedInterview.position_for || "",
        age: selectedInterview.age || "",
        reference: selectedInterview.reference || "",
        email: selectedInterview.email || "",
        phone: selectedInterview.phone || "",
        interview_date: selectedInterview.interview_date
          ? new Date(selectedInterview.interview_date).toISOString().slice(0, 16)
          : "",
        place: selectedInterview.place || "",
        education: selectedInterview.education || "",
        job_knowledge: selectedInterview.job_knowledge || "",
        work_experience: selectedInterview.work_experience || "",
        communication: selectedInterview.communication || "",
        personality: selectedInterview.personality || "",
        potential: selectedInterview.potential || "",
        general_knowledge: selectedInterview.general_knowledge || "",
        assertiveness: selectedInterview.assertiveness || "",
        interview_mark: selectedInterview.interview_mark ?? "", // Ensure non-null value
        interview_result: selectedInterview.interview_result ?? "",
        interview_notes: selectedInterview.interview_notes ?? "",
        current_remuneration: selectedInterview.current_remuneration || "",
        expected_package: selectedInterview.expected_package || "",
        notice_period_required: selectedInterview.notice_period_required || "",
        recommendation: selectedInterview.recommendation || "",
        immediate_recruitment: selectedInterview.immediate_recruitment || false,
        on_hold: selectedInterview.on_hold || false,
        no_good: selectedInterview.no_good || false,
        final_selection_remarks: selectedInterview.final_selection_remarks || "",
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

  const handleLetterSend = (selectedInterview) => {
    navigate("/add-letter", {
      state: {
        name: selectedInterview.name,
        email: selectedInterview.email
      }
    });
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

      return response.data; // Return the response data for further processing
    } catch (error) {
      console.error("Error submitting interview:", error);
      showToast("Error submitting interview", "error");
      return null; // Return null in case of error
    }
  };


  const handleInterviewAction = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    const actionType = selectedInterview ? "Update" : "Create";
    const isConfirmed = window.confirm(`Are you sure you want to ${actionType} this interview?`);

    if (isConfirmed) {
      const newInterview = await handleSubmit(e); // Get interview response

      if (!selectedInterview && newInterview?.id) {
        navigate(`/interviews?interview_id=${newInterview.id}`, { replace: true });
      } else {
        // Scroll to top of the page before reloading
        window.scrollTo(0, 0); // Scroll to top
        window.location.reload(); // Reload the page after updating
      }
    }
  };


  const handleSelectedAsEmployee = (selectedInterview) => {
    console.log(selectedInterview); // Log to ensure data is correct
    navigate("/add-employee", {
      state: {
        name: selectedInterview.name,
        position_for: selectedInterview.position_for,
        email: selectedInterview.email,
        phone: selectedInterview.phone,
      },
    });
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
      position_for: location.state?.position_for || "",
      age: location.state?.age || "",
      email: location.state?.email || "",
      phone: location.state?.phone || "",
      reference: location.state?.reference || "",
      place: "",
      interview_date: "",
      education: "",
      job_knowledge: "",
      work_experience: "",
      communication: "",
      personality: "",
      potential: "",
      general_knowledge: "",
      assertiveness: "",
      interview_mark: "",
      interview_result: "",
      interview_notes: "",
      current_remuneration: "",
      expected_package: "",
      notice_period_required: "",
      recommendation: "",
      immediate_recruitment: false,
      on_hold: false,
      no_good: false,
      final_selection_remarks: "",
    });
  };


  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const printInterview = (interview) => {
    const printContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.2;
              color: #333;
              background-color: #fff;
              margin: 0;
              padding: 10px;
              font-size: 12px;
            }
            .container {
              width: 100%;
              max-width: 800px;
              margin: auto;
              padding: 10px;
            }
            h2 {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 5px;
              margin-bottom: 10px;
              font-size: 16px;
            }
            .details-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .details-item {
              width: 48%;
              margin-bottom: 5px;
            }
            .label {
              font-weight: bold;
              color: #2a2a2a;
            }
            .value {
              color: #555;
            }
            .vertical-container {
              margin-top: 10px;
              border: 1px solid #333;
              padding: 5px;
              background-color: #f9f9f9;
              page-break-inside: avoid;
            }
            .vertical-container .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 3px;
              padding: 3px;
            }
            .footer {
              text-align: center;
              margin-top: 10px;
              font-size: 10px;
              color: #777;
            }
            .final-selection {
              margin-top: 15px;
              padding: 10px;
              border: 1px solid #333;
              background-color: #f1f1f1;
              text-align: center;
              font-weight: bold;
            }
            .signature-container {
              margin-top: 20px;
              border: 1px solid #333;
              padding: 10px;
              background-color: #f1f1f1;
              page-break-inside: avoid;
            }
            .spacer {
              height: 0.8in; /* Creates a 1-inch vertical gap */
            }

            .signature-box {
              height: 50px;
              width: 200px;
              border: 1px solid #999;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>${interview.name}'s Interview</h2>
  
            <div class="details-container">
              <div class="details-item"><span class="label">Position:</span> ${interview.position_for}</div>
              <div class="details-item"><span class="label">Age:</span> ${interview.age}</div>
              <div class="details-item"><span class="label">Reference:</span> ${interview.reference}</div>
              <div class="details-item"><span class="label">Email:</span> ${interview.email}</div>
              <div class="details-item"><span class="label">Phone:</span> ${interview.phone}</div>
              <div class="details-item"><span class="label">Interview Date:</span> ${new Date(interview.interview_date).toLocaleString()}</div>
              <div class="details-item"><span class="label">Place:</span> ${interview.place}</div>
            </div>
  
            <div class="vertical-container">
              <div class="item"><span class="label">Current Remuneration:</span> ${interview.current_remuneration}</div>
              <div class="item"><span class="label">Expected Package:</span> ${interview.expected_package}</div>
              <div class="item"><span class="label">Notice Period Required:</span> ${interview.notice_period_required}</div>
            </div>
  
            <div class="vertical-container">
              <div class="item"><span class="label">Education:</span> ${interview.education}</div>
              <div class="value">Qualification, special courses & training, projects, reports, surveys, technical knowledge, etc.</div>
              
              <div class="item"><span class="label">Job Knowledge:</span> ${interview.job_knowledge}</div>
              <div class="value">Technical capability, in-depth knowledge, know-how, etc.</div>
              
              <div class="item"><span class="label">Work Experience:</span> ${interview.work_experience}</div>
              <div class="value">With special reference to the function for which they are being interviewed.</div>
              
              <div class="item"><span class="label">Communication:</span> ${interview.communication}</div>
              <div class="value">Language, speech, flexibility, smartness, punctuation, etc.</div>
              
              <div class="item"><span class="label">Personality:</span> ${interview.personality}</div>
              <div class="value">Impression created regarding administrative/leadership/communication skills, look, dress sense, etc.</div>
              
              <div class="item"><span class="label">Potential:</span> ${interview.potential}</div>
              <div class="value">Ambition, enthusiasm, attitude, motivation, initiative, career growth potential.</div>
              
              <div class="item"><span class="label">General Knowledge:</span> ${interview.general_knowledge}</div>
              <div class="value">Interests, hobbies, reading, computer skills, etc.</div>
              
              <div class="item"><span class="label">Assertiveness:</span> ${interview.assertiveness}</div>
              <div class="value">Positive approach, smoothness, flexibility, etc.</div>
            </div>
  
            <div class="vertical-container">
              <div class="item"><span class="label">Interview Mark:</span> ${interview.interview_mark}</div>
              <div class="item"><span class="label">Result:</span> ${interview.interview_result}</div>
            </div>
  
            <div class="vertical-container">
              <div class="item"><span class="label">Recommendation:</span> ${interview.recommendation}</div>
              <div class="item"><span class="label">Immediate Recruitment:</span> ${interview.immediate_recruitment ? "Yes" : "No"}</div>
              <div class="item"><span class="label">On Hold:</span> ${interview.on_hold ? "Yes" : "No"}</div>
              <div class="item"><span class="label">No Good:</span> ${interview.no_good ? "Yes" : "No"}</div>
              <div class="item"><span class="label">MD Sir Notes:</span> ${interview.interview_notes || "No notes available"}</div>
            </div>
  
            <!-- Final Selection Remarks Section -->
            
  
            <!-- Signature Section -->
            <div class="signature-container">
              <div class="item">
                <span class="label">Final Selection Remarks:</span> ${interview.final_selection_remarks || "No remarks provided"}
              </div>
              <div class="spacer"></div> <!-- 1-inch gap -->
              <div class="item">
                <div class="signature-box"></div> <!-- Signature box above text -->
                <span class="label">Interviewer's Signature:</span>
              </div>
            </div>
            <div class="footer">
              <p>Interview details printed by the HR system</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };




  const printAllInterviews = () => {
    const printWindow = window.open("", "Print All Interviews", "width=800,height=800");
    let allInterviewsContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.2;
              color: #333;
              background-color: #fff;
              margin: 0;
              padding: 10px;
              font-size: 12px;
            }
            .container {
              width: 100%;
              max-width: 800px;
              margin: auto;
              padding: 10px;
            }
            h2 {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 5px;
              margin-bottom: 10px;
              font-size: 16px;
            }
            .details-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .details-item {
              width: 48%;
              margin-bottom: 5px;
            }
            .label {
              font-weight: bold;
              color: #2a2a2a;
            }
            .value {
              color: #555;
            }
            .vertical-container {
              margin-top: 10px;
              border: 1px solid #333;
              padding: 5px;
              background-color: #f9f9f9;
              page-break-inside: avoid;
            }
            .vertical-container .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 3px;
              padding: 3px;
            }
            .footer {
              text-align: center;
              margin-top: 10px;
              font-size: 10px;
              color: #777;
            }
            .final-selection {
              margin-top: 15px;
              padding: 10px;
              border: 1px solid #333;
              background-color: #f1f1f1;
              text-align: center;
              font-weight: bold;
            }
            .signature-container {
              margin-top: 20px;
              border: 1px solid #333;
              padding: 10px;
              background-color: #f1f1f1;
              page-break-inside: avoid;
            }
            .spacer {
              height: 0.8in;
            }
            .signature-box {
              height: 50px;
              width: 200px;
              border: 1px solid #999;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>All Interviews</h2>
    `;

    // Loop through each interview and add their details
    interviews.forEach((interview) => {
      allInterviewsContent += `
        <h2>${interview.name}'s Interview</h2>
        <div class="details-container">
          <div class="details-item"><span class="label">Position:</span> ${interview.position_for}</div>
          <div class="details-item"><span class="label">Age:</span> ${interview.age}</div>
          <div class="details-item"><span class="label">Reference:</span> ${interview.reference}</div>
          <div class="details-item"><span class="label">Email:</span> ${interview.email}</div>
          <div class="details-item"><span class="label">Phone:</span> ${interview.phone}</div>
          <div class="details-item"><span class="label">Interview Date:</span> ${new Date(interview.interview_date).toLocaleString()}</div>
          <div class="details-item"><span class="label">Place:</span> ${interview.place}</div>
        </div>
  
        <div class="vertical-container">
          <div class="item"><span class="label">Current Remuneration:</span> ${interview.current_remuneration}</div>
          <div class="item"><span class="label">Expected Package:</span> ${interview.expected_package}</div>
          <div class="item"><span class="label">Notice Period Required:</span> ${interview.notice_period_required}</div>
        </div>
  
        <div class="vertical-container">
          <div class="item"><span class="label">Education:</span> ${interview.education}</div>
          <div class="value">Qualification, special courses & training, projects, reports, surveys, technical knowledge, etc.</div>
          
          <div class="item"><span class="label">Job Knowledge:</span> ${interview.job_knowledge}</div>
          <div class="value">Technical capability, in-depth knowledge, know-how, etc.</div>
          
          <div class="item"><span class="label">Work Experience:</span> ${interview.work_experience}</div>
          <div class="value">With special reference to the function for which they are being interviewed.</div>
          
          <div class="item"><span class="label">Communication:</span> ${interview.communication}</div>
          <div class="value">Language, speech, flexibility, smartness, punctuation, etc.</div>
          
          <div class="item"><span class="label">Personality:</span> ${interview.personality}</div>
          <div class="value">Impression created regarding administrative/leadership/communication skills, look, dress sense, etc.</div>
          
          <div class="item"><span class="label">Potential:</span> ${interview.potential}</div>
          <div class="value">Ambition, enthusiasm, attitude, motivation, initiative, career growth potential.</div>
          
          <div class="item"><span class="label">General Knowledge:</span> ${interview.general_knowledge}</div>
          <div class="value">Interests, hobbies, reading, computer skills, etc.</div>
          
          <div class="item"><span class="label">Assertiveness:</span> ${interview.assertiveness}</div>
          <div class="value">Positive approach, smoothness, flexibility, etc.</div>
        </div>
  
        <div class="vertical-container">
          <div class="item"><span class="label">Interview Mark:</span> ${interview.interview_mark}</div>
          <div class="item"><span class="label">Result:</span> ${interview.interview_result}</div>
        </div>
  
        <div class="vertical-container">
          <div class="item"><span class="label">Recommendation:</span> ${interview.recommendation}</div>
          <div class="item"><span class="label">Immediate Recruitment:</span> ${interview.immediate_recruitment ? "Yes" : "No"}</div>
          <div class="item"><span class="label">On Hold:</span> ${interview.on_hold ? "Yes" : "No"}</div>
          <div class="item"><span class="label">No Good:</span> ${interview.no_good ? "Yes" : "No"}</div>
          <div class="item"><span class="label">MD Sir Notes:</span> ${interview.interview_notes || "No notes available"}</div>
        </div>
  
        <div class="signature-container">
          <div class="item">
            <span class="label">Final Selection Remarks:</span> ${interview.final_selection_remarks || "No remarks provided"}
          </div>
          <div class="spacer"></div>
          <div class="item">
            <div class="signature-box"></div>
            <span class="label">Interviewer's Signature:</span>
          </div>
        </div>
        <hr />
      `;
    });

    allInterviewsContent += `
      <div class="footer">
        <p>Interview details printed by the HR system</p>
      </div>
    </body>
  </html>
  `;

    printWindow.document.write(allInterviewsContent);
    printWindow.document.close();
    printWindow.print();
  };



  const style = {
    container: {
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      height: "92vh",
      overflow: "hidden",
      backgroundColor: "#f0f0f0",
      color: "#333",
      fontSize: "16px",
      lineHeight: "1.5",
      
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      justifyContent: "space-between",
      zIndex: 1,
      overflowY: "auto",
      overflowX: "hidden",    
    },
    sidebar: {
      width: "280px",
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
      display: 'flex',
      flexWrap: 'wrap', // Allow fields to wrap to the next line if necessary
      gap: '20px', // Add space between fields
      justifyContent: 'space-between', // Distribute the items evenly
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
    btnSend: {
      padding: "10px",
      backgroundColor: "#ffc107", // Yellow color
      color: "black", // Better contrast with yellow
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    btnInvite: {
      padding: "10px",
      backgroundColor: "#6f42c1", // Yellow color
      color: "white", // Better contrast with yellow
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
      padding: "20px",
    },

    infocontainer: {
      display: "flex",
      justifycontent: "space-between",
      flexDirection: "column",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "space-between",
    },
    section: {
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "#f9f9f9",
    },
    detailsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    detailsItem: {
      width: "45%",
      marginBottom: "10px",
      fontSize: "14px",
    },
    label: {
      fontWeight: "bold",
      color: "#2a2a2a",
    },
    containerr: {
      width: "85%",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: "1.6",
      color: "#333",
    },
    infoItem: {
      marginBottom: "10px",
      padding: "10px",
      borderBottom: "1px solid #eee",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    infoItemLast: {
      borderBottom: "none",
    },
    infoLabel: {
      fontWeight: "bold",
      color: "#2a2a2a",
    },
    infoValue: {
      color: "#555",
    },
    verticalContainer: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "#f9f9f9",
    },
    item: {
      padding: "10px",
      borderBottom: "1px solid #eee",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
    },
    description: {
      fontSize: "12px",
      color: "#666",
      marginTop: "5px",
    },
    subHeading: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#2a2a2a",
      marginBottom: "10px",
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "12px",
      color: "#777",
    },



  };


  return (
    <div
      style={{
        ...style.container,
        marginLeft: showPopup ? "-250px" : "0", // Move left when the popup is visible
        transition: "margin-left 0.7s ease", // Smooth transition effect
      }}
    >
      <div style={{ display: 'flex' }}>
        <Sidebars />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {/* Your page content here */}
        </div>
      </div>
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
            <h2 className="header">{selectedInterview.name}'s Interview</h2>

            {/* Section 1: Basic Info */}
            <div style={style.containerr}>

              <div style={style.section}>
                <div style={style.detailsContainer}>
                  <div style={style.detailsItem}><span style={style.label}>Position:</span> {selectedInterview.position_for}</div>
                  <div style={style.detailsItem}><span style={style.label}>Age:</span> {selectedInterview.age}</div>
                  <div style={style.detailsItem}><span style={style.label}>Reference:</span> {selectedInterview.reference}</div>
                  <div style={style.detailsItem}><span style={style.label}>Email:</span> {selectedInterview.email}</div>
                  <div style={style.detailsItem}><span style={style.label}>Phone:</span> {selectedInterview.phone}</div>
                  <div style={style.detailsItem}><span style={style.label}>Interview Date:</span> {new Date(selectedInterview.interview_date).toLocaleString()}</div>
                  <div style={style.detailsItem}><span style={style.label}>Place:</span> {selectedInterview.place}</div>
                </div>
              </div>

              {/* Section 2: Remuneration */}
              <div style={style.section}>
                <div style={style.detailsContainer}>
                  <div style={style.detailsItem}><span style={style.label}>Current Remuneration:</span> {selectedInterview.current_remuneration}</div>
                  <div style={style.detailsItem}><span style={style.label}>Expected Package:</span> {selectedInterview.expected_package}</div>
                  <div style={style.detailsItem}><span style={style.label}>Notice Period Required:</span> {selectedInterview.notice_period_required}</div>
                </div>
              </div>

              {/* Section 3: Evaluation Criteria */}
              <div style={style.section}>
                <h3 style={style.subHeading}>Evaluation Criteria</h3>
                <div style={style.verticalContainer}>
                  <div style={style.item}><span style={style.label}>Education:</span> {selectedInterview.education} <p style={style.description}>Qualification, special courses and training, projects, reports, surveys, technical knowledge, etc.</p></div>
                  <div style={style.item}><span style={style.label}>Job Knowledge:</span> {selectedInterview.job_knowledge} <p style={style.description}>Technical capability, in-depth knowledge, know-how.</p></div>
                  <div style={style.item}><span style={style.label}>Work Experience:</span> {selectedInterview.work_experience} <p style={style.description}>With special reference to function for which he is being interviewed.</p></div>
                  <div style={style.item}><span style={style.label}>Communication:</span> {selectedInterview.communication} <p style={style.description}>Language, speech, flexibility, smartness, punctuality, etc.</p></div>
                  <div style={style.item}><span style={style.label}>Personality:</span> {selectedInterview.personality} <p style={style.description}>Impression created regarding administrative/leadership/communication skills, look, dress sense, etc.</p></div>
                  <div style={style.item}><span style={style.label}>Potential:</span> {selectedInterview.potential} <p style={style.description}>Ambition, enthusiasm, attitude, motivation, initiative, and career aspirations.</p></div>
                  <div style={style.item}><span style={style.label}>General Knowledge:</span> {selectedInterview.general_knowledge} <p style={style.description}>Interests, hobbies, reading habits, computer skills, etc.</p></div>
                  <div style={style.item}><span style={style.label}>Assertiveness:</span> {selectedInterview.assertiveness} <p style={style.description}>Positive approach, smoothness, flexibility, etc.</p></div>
                </div>
              </div>

              {/* Section 4: Interview Result */}
              <div style={style.section}>
                <div style={style.detailsContainer}>
                  <div style={style.detailsItem}><span style={style.label}>Interview Mark:</span> {selectedInterview.interview_mark}</div>
                  <div style={style.detailsItem}><span style={style.label}>Interview Result:</span> {selectedInterview.interview_result}</div>
                </div>
              </div>

              {/* Section 5: Decision & Notes */}
              <div style={style.section}>
                <div style={style.detailsContainer}>
                  <div style={style.detailsItem}><span style={style.label}>Recommendation:</span> {selectedInterview.recommendation}</div>
                  <div style={style.detailsItem}><span style={style.label}>Immediate Recruitment:</span> {selectedInterview.immediate_recruitment ? "Yes" : "No"}</div>
                  <div style={style.detailsItem}><span style={style.label}>On Hold:</span> {selectedInterview.on_hold ? "Yes" : "No"}</div>
                  <div style={style.detailsItem}><span style={style.label}>No Good:</span> {selectedInterview.no_good ? "Yes" : "No"}</div>
                  <div style={style.detailsItem}><span style={style.label}>MD Sir Notes:</span> {selectedInterview.interview_notes || "No notes available"}</div>
                  <div style={style.detailsItem}><span style={style.label}>Final Selection Remarks:</span> {selectedInterview.final_selection_remarks || "No remarks provided"}</div>
                </div>
              </div>

              <div style={style.footer}>
                <p>Interview details printed by the HR system</p>
              </div>
            </div>


            <div style={style.buttonContainer}>
              <button style={style.btnInvite} onClick={() => handleInviteMail(selectedInterview)}>
                (1)Invite for interview
              </button>
              <button style={style.btnSend} onClick={() => handleSendMail(selectedInterview)}>
                (2)Sent Mail to MD Sir
              </button>
              <button style={{ ...style.button, ...style.buttonPrint }} onClick={() => handleLetterSend(selectedInterview)}>
                (3)Send Letters
              </button>
              <button
                style={{ ...style.button, ...style.buttonPrint }}
                onClick={() => handleSelectedAsEmployee(selectedInterview)}
              >
                (4)Selected as Employee
              </button>
              <button onClick={() => printInterview(selectedInterview)} style={style.button}>
                Print Interview
              </button>
              <button style={style.btnDelete} onClick={() => handleDelete(selectedInterview.id)}>
                Delete Interview
              </button>
            </div>

          </div>
        ) : (
          <h2>Create New Interview</h2>
        )}

        {/* Right Container (Popup) */}
        <div style={{ flex: 0.3 }}>
          {showPopup && (
            <div
              style={{
                position: "fixed",
                top: "25%",
                left: "80%",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
                zIndex: 1000,
              }}
            >
              <h3>Interview Updated</h3>
              <p><strong>Interview Mark:</strong> {formData.interview_mark}</p>
              <p><strong>Interview Result:</strong> {formData.interview_result}</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          )}
        </div>


        <form style={style.interviewForm} onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>
          <div>
            <label>Position for</label>
            <input
              type="text"
              name="position_for"
              value={formData.position_for}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>
          <div>
            <label>Reference</label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>

          <div>
            <label>Interview Date</label>
            <input
              type="datetime-local"
              name="interview_date"
              value={formData.interview_date}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>

          <div>
            <label>Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              style={style.input}
            />
          </div>
          <div>
            <label>Education (Max 20)</label>
            <input
              type="number"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              style={style.input}
              max="20"
              disabled={selectedInterview === null}
            />
          </div>

          <div>
            <label>Job Knowledge (Max 20)</label>
            <input
              type="number"
              name="job_knowledge"
              value={formData.job_knowledge}
              onChange={handleInputChange}
              style={style.input}
              max="20"
              disabled={selectedInterview === null}
            />
          </div>

          <div>
            <label>Work Experience (Max 10)</label>
            <input
              type="number"
              name="work_experience"
              value={formData.work_experience}
              onChange={handleInputChange}
              style={style.input}
              max="10"
              disabled={selectedInterview === null}
            />
          </div>

          <div>
            <label>Communication (Max 10)</label>
            <input
              type="number"
              name="communication"
              value={formData.communication}
              onChange={handleInputChange}
              style={style.input}
              max="10"
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>Personality (Max 10)</label>
            <input
              type="number"
              name="personality"
              value={formData.personality}
              onChange={handleInputChange}
              style={style.input}
              max="10"
              disabled={selectedInterview === null}
            />
          </div>

          <div>
            <label>Potential (Max 10)</label>
            <input
              type="number"
              name="potential"
              value={formData.potential}
              onChange={handleInputChange}
              style={style.input}
              max="10"
              disabled={selectedInterview === null}
            />
          </div>

          <div>
            <label>General Knowledge (Max 10)</label>
            <input
              type="number"
              name="general_knowledge"
              value={formData.general_knowledge}
              onChange={handleInputChange}
              style={style.input}
              max="10"
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>Assertiveness (Max 10)</label>
            <input
              type="number"
              name="assertiveness"
              value={formData.assertiveness}
              onChange={handleInputChange}
              style={style.input}
              max="10"
              disabled={selectedInterview === null}
            />
          </div>


          <div>
            <label>Current Remuneration</label>
            <input
              type="text"
              name="current_remuneration"
              value={formData.current_remuneration}
              onChange={handleInputChange}
              style={style.input}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>Expected Package</label>
            <input
              type="text"
              name="expected_package"
              value={formData.expected_package}
              onChange={handleInputChange}
              style={style.input}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>Notice Period Required</label>
            <input
              type="text"
              name="notice_period_required"
              value={formData.notice_period_required}
              onChange={handleInputChange}
              style={style.input}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>HR Recommendation</label>
            <input
              type="text"
              name="recommendation"
              value={formData.recommendation}
              onChange={handleInputChange}
              style={style.input}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>Immediate Recruitment</label>
            <input
              type="checkbox"
              name="immediate_recruitment"
              checked={formData.immediate_recruitment}
              onChange={(e) => setFormData({ ...formData, immediate_recruitment: e.target.checked })}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>On Hold</label>
            <input
              type="checkbox"
              name="on_hold"
              checked={formData.on_hold}
              onChange={(e) => setFormData({ ...formData, on_hold: e.target.checked })}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>No Good</label>
            <input
              type="checkbox"
              name="no_good"
              checked={formData.no_good}
              onChange={(e) => setFormData({ ...formData, no_good: e.target.checked })}
              disabled={selectedInterview === null}
            />
          </div>

          <div>
            <label>MD Sir Notes</label>
            <textarea
              type="text"
              name="interview_notes"
              value={formData.interview_notes}
              onChange={handleInputChange}
              style={style.input}
              disabled={selectedInterview === null}
            />
          </div>
          <div>
            <label>Final Selection Remarks</label>
            <textarea
              name="final_selection_remarks"
              value={formData.final_selection_remarks}
              onChange={handleInputChange}
              style={style.input}
              disabled={selectedInterview === null}
            />
          </div>


        </form>
        <div>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white' }}
            onClick={handleInterviewAction}
          >
            {selectedInterview ? "Update Interview" : "Create Interview"}
          </button>
        </div>
      </div>
    </div >
  );
};

export default Interviews;
