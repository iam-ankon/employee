import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../merchandiser/Sidebar.jsx";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://192.168.4.54:8000/api/merchandiser/api/inquiry/');
        setInquiries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await axios.delete(`http://192.168.4.54:8000/api/merchandiser/api/inquiry/${id}/`);
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      } catch (error) {
        console.error('Error deleting inquiry:', error);
        alert('Failed to delete inquiry.');
      }
    }
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    (inquiry.inquiry_no?.toString().includes(searchTerm) ||
      inquiry.order_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.garment?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusColors = {
    pending: '#FF9800',
    quoted: '#2196F3',
    running: '#4CAF50',
    default: '#9E9E9E',
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: '#555' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#333', fontSize: '28px', fontWeight: '600' }}>📝 Inquiry List</h1>
          <Link to="/inquiries/add" style={{
            background: 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: '500',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: '0.3s ease'
          }}>
            ➕ Add New Inquiry
          </Link>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '25px' }}>
          <input
            type="text"
            placeholder="🔍 Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 15px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#eef2f7' }}>
                {['Inquiry No', 'Order Type', 'Garment', 'Status', 'Actions'].map((title, index) => (
                  <th key={index} style={{
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#333',
                    borderBottom: '2px solid #ddd',
                    
                  }}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map(inquiry => (
                  <tr key={inquiry.id} style={{ borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
                    <td style={{ padding: '14px', fontSize: '15px' ,textAlign: 'center'}}>{inquiry.inquiry_no}</td>
                    <td style={{ padding: '14px', fontSize: '15px',textAlign: 'center' }}>{inquiry.order_type}</td>
                    <td style={{ padding: '14px', fontSize: '15px',textAlign: 'center' }}>{inquiry.garment}</td>
                    <td style={{ padding: '14px',textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#fff',
                        backgroundColor: statusColors[inquiry.current_status] || statusColors.default,
                        textTransform: 'capitalize'
                      }}>
                        {inquiry.current_status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Link to={`/inquiries/${inquiry.id}`} style={{
                        color: '#1976D2',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: '0.2s',
                      }}>
                        🔍 View
                      </Link>
                      <button onClick={() => handleDelete(inquiry.id)} style={{
                        color: '#D32F2F',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: '0.2s',
                      }}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
