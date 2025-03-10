import React, { useState, useEffect } from "react";
import { getFinanceProvisions, addFinanceProvision, updateFinanceProvision, deleteFinanceProvision } from "../api/employeeApi"; // Adjust according to your file structure

const FinanceProvision = () => {
  const [provisions, setProvisions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editProvision, setEditProvision] = useState(null);
  const [newProvision, setNewProvision] = useState({
    employee: "",
    email: "",
    payroll_pdf: null,
  });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch the finance provisions on load
  useEffect(() => {
    const fetchProvisions = async () => {
      try {
        const response = await getFinanceProvisions();
        setProvisions(response.data);
      } catch (error) {
        console.error("Error fetching finance provisions:", error);
      }
    };
    fetchProvisions();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteFinanceProvision(id);
      setProvisions(provisions.filter((provision) => provision.id !== id));
    } catch (error) {
      console.error("Error deleting finance provision:", error);
    }
  };

  // Handle Edit
  const handleEdit = (provision) => {
    setEditProvision(provision);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditProvision(null);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewProvision({
      employee: "",
      email: "",
      payroll_pdf: null,
    });
  };

  // Handle Edit Form Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employee", editProvision.employee);
    formData.append("email", editProvision.email);
    if (editProvision.payroll_pdf) {
      formData.append("payroll_pdf", editProvision.payroll_pdf);
    }

    try {
      await updateFinanceProvision(editProvision.id, formData);
      setProvisions(
        provisions.map((item) =>
          item.id === editProvision.id ? editProvision : item
        )
      );
      setIsModalOpen(false);
      setEditProvision(null);
    } catch (error) {
      console.error("Error editing finance provision:", error);
    }
  };

  // Handle Add Form Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employee", newProvision.employee);
    formData.append("email", newProvision.email);
    if (newProvision.payroll_pdf) {
      formData.append("payroll_pdf", newProvision.payroll_pdf);
    }

    try {
      const response = await addFinanceProvision(formData);
      setProvisions([...provisions, response.data]);
      setIsAddModalOpen(false);
      setNewProvision({
        employee: "",
        email: "",
        payroll_pdf: null,
      });
    } catch (error) {
      console.error("Error adding finance provision:", error);
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (editProvision) {
      setEditProvision({
        ...editProvision,
        [name]: type === "file" ? files[0] : value,
      });
    } else if (newProvision) {
      setNewProvision({
        ...newProvision,
        [name]: type === "file" ? files[0] : value,
      });
    }
  };

  // Filter provisions based on the search query
  const filteredProvisions = provisions.filter(
    (provision) =>
      provision.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provision.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      <h2 className="heading">Finance Provision</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Employee Name or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <button onClick={() => setIsAddModalOpen(true)} className="add-button">
        Add New Provision
      </button>

      <div className="card-container">
        {filteredProvisions.map((provision) => (
          <div key={provision.id} className="card">
            <h3>{provision.employee}</h3>
            <p>Email: {provision.email}</p>
            <div>
              <h4>Payroll PDF:</h4>
              {provision.payroll_pdf ? (
                <>
                  <p className="text-gray-700">
                    Payroll PDF:{" "}
                    <a
                      href={provision.payroll_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Payroll PDF
                    </a>
                  </p>
                </>
              ) : (
                <p>No file chosen</p>
              )}
            </div>
            <div className="button-container">
              <button onClick={() => handleEdit(provision)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(provision.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editProvision && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Finance Provision</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Employee Name:
                <input
                  type="text"
                  name="employee"
                  value={editProvision.employee || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editProvision.email || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Payroll PDF:
                <input
                  type="file"
                  name="payroll_pdf"
                  onChange={handleInputChange}
                />
                {editProvision.payroll_pdf && <span>Current File: {editProvision.payroll_pdf.name}</span>}
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleModalClose}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Add New Finance Provision Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Finance Provision</h3>
            <form onSubmit={handleAddSubmit}>
              <label>
                Company Name:
                <input
                  type="text"
                  name="employee"
                  value={newProvision.employee}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newProvision.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Payroll PDF:
                <input
                  type="file"
                  name="payroll_pdf"
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Add Provision</button>
              <button type="button" onClick={handleAddModalClose}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* CSS Styling */}
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

        .search-bar {
          padding: 10px;
          margin-bottom: 20px;
          width: 100%;
          max-width: 500px;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-bottom: 30px;
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
          background-color: #fbc02d; /* Yellow */
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
          background-color: #e53935; /* Red */
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .delete-button:hover {
          background-color: #c62828;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-y: auto;
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-height: 80%;
          overflow-y: auto;
        }
        .modal-content form {
          display: flex;
          flex-direction: column;
        }
        .modal-content form input {
          margin-bottom: 10px;
          padding: 8px;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .modal-content form button {
          padding: 10px;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        } 
          
        .modal-content form button[type="submit"] {
          background-color: #0078d4;
          color: white;
        }

        .modal-content form button[type="button"] {
          background-color: #d9534f;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default FinanceProvision;
