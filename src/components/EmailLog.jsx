import React, { useEffect, useState } from 'react';
import { getEmailLogs, deleteAllEmailLogs } from '../api/employeeApi'; // Importing the API functions

const EmailLog = () => {
  const [emailLogs, setEmailLogs] = useState([]);

  // Fetch email logs when the component mounts
  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const response = await getEmailLogs();
        setEmailLogs(response.data);  // Store the fetched logs in state
      } catch (error) {
        console.error('Error fetching email logs', error);
      }
    };

    fetchEmailLogs();  // Call the fetch function
  }, []);

  // Handle delete all email logs
  const handleDeleteAll = async () => {
    try {
      await deleteAllEmailLogs();  // Call the API to delete all email logs
      setEmailLogs([]);  // Clear the logs from the state
      alert('All email logs have been deleted');
    } catch (error) {
      console.error('Error deleting all email logs', error);
      alert('Error deleting all email logs');
    }
  };

  return (
    <div className="email-log">
      <h2>Email Logs</h2>
      
      {/* Button to delete all email logs */}
      <button
        onClick={handleDeleteAll}
        className="delete-all-btn"
      >
        Delete All Emails
      </button>
      
      {/* Displaying email logs in a table */}
      <table className="log-table">
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
              <td colSpan="3" className="no-logs">No email logs found</td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>{`
        .email-log {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
          max-width: 1000px;
          margin: auto;
        }

        h2 {
          font-size: 2rem;
          color: #0078d4;
          margin-bottom: 20px;
        }

        .log-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .log-table th,
        .log-table td {
          padding: 12px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 1rem;
          text-align: left;
        }

        .log-table th {
          background-color: #0078d4;
          color: white;
        }

        .log-table tr:hover {
          background-color: #f1f1f1;
        }

        .log-table td {
          color: #333;
        }

        .delete-all-btn {
          background-color: #e53e3e;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-bottom: 20px;
        }

        .delete-all-btn:hover {
          background-color: #c53030;
        }

        .no-logs {
          text-align: center;
          color: #999;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .email-log {
            padding: 15px;
          }

          .log-table th,
          .log-table td {
            padding: 10px;
          }

          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EmailLog;
