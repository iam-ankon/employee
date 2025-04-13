import React, { useEffect, useState } from 'react';
import { getEmailLogs, deleteAllEmailLogs } from '../api/employeeApi'; // API functions

const EmailLog = () => {
  const [emailLogs, setEmailLogs] = useState([]);

  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const response = await getEmailLogs();
        setEmailLogs(response.data);
      } catch (error) {
        console.error('Error fetching email logs', error);
      }
    };

    fetchEmailLogs();
  }, []);

  const handleDeleteAll = async () => {
    try {
      await deleteAllEmailLogs();
      setEmailLogs([]);
      alert('All email logs have been deleted');
    } catch (error) {
      console.error('Error deleting all email logs', error);
      alert('Error deleting all email logs');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>HR Work</div>
        <a href="/cv-add" style={styles.sidebarLink}>Add CV</a>
        <a href="/interviews" style={styles.sidebarLink}>Interviews</a>
        <a href="/employee" style={styles.sidebarLink}>Employee</a>
        <a href="/attendance" style={styles.sidebarLink}>Attendance</a>
        <a href="/employee_leave" style={styles.sidebarLink}>Employee Leave</a>
        <a href="/performanse_appraisal" style={styles.sidebarLink}>Performance Appraisal</a>
        <a href="/finance-provision" style={styles.sidebarLink}>Finance Provision</a>
        <a href="/employee-termination" style={styles.sidebarLink}>Employee Termination</a>
        <a href="/letter-send" style={styles.sidebarLink}>Send Letter</a>
        <a href="/email-logs" style={{ ...styles.sidebarLink, backgroundColor: "#e1eaff" }}>Email Logs</a>
        <a href="/tad-groups" style={styles.sidebarLink}>TAD Groups</a>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>Email Logs</h2>
        <button onClick={handleDeleteAll} style={styles.deleteAllBtn}>Delete All Emails</button>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Subject</th>
              <th>Sent At</th>
            </tr>
          </thead>
          <tbody>
            {emailLogs.length > 0 ? (
              emailLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.recipient}</td>
                  <td>{log.subject}</td>
                  <td>{new Date(log.sent_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={styles.noLogs}>No email logs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  sidebar: {
    width: "230px",
    backgroundColor: "#f3f6fb",
    height: "100vh",
    padding: "20px 15px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
  },
  sidebarHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#0078D4",
  },
  sidebarLink: {
    display: "block",
    padding: "10px",
    margin: "5px 0",
    textDecoration: "none",
    color: "#333",
    borderRadius: "6px",
    transition: "0.3s",
  },
  sidebarLinkHover: {
    backgroundColor: "#e1eaff",
  },
  content: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '2rem',
    color: '#0078d4',
    marginBottom: '20px',
  },
  deleteAllBtn: {
    backgroundColor: '#e53e3e',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  noLogs: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
  },
};

export default EmailLog;
