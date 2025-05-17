import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DetailsInquiry = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://192.168.4.54:8000/api/merchandiser/api/inquiry/${id}/`);
        setInquiry(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inquiry:', error);
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!inquiry) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Inquiry not found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>Inquiry Details #{inquiry.inquiry_no}</h1>
        <div>
          <Link to={`/inquiries/${id}/edit`} style={{ 
            marginRight: '10px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            textDecoration: 'none'
          }}>
            Edit
          </Link>
          <Link to="/inquiries" style={{ 
            backgroundColor: '#607d8b', 
            color: 'white', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            textDecoration: 'none'
          }}>
            Back to List
          </Link>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Basic Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <p style={{ margin: '5px 0' }}><strong>Order Type:</strong> {inquiry.order_type}</p>
            <p style={{ margin: '5px 0' }}><strong>Garment:</strong> {inquiry.garment}</p>
            <p style={{ margin: '5px 0' }}><strong>Gender:</strong> {inquiry.gender}</p>
          </div>
          <div>
            <p style={{ margin: '5px 0' }}><strong>Status:</strong> 
              <span style={{
                padding: '3px 8px',
                borderRadius: '12px',
                backgroundColor: inquiry.current_status === 'pending' ? '#ff9800' : 
                                inquiry.current_status === 'quoted' ? '#2196F3' : 
                                inquiry.current_status === 'running' ? '#4CAF50' : '#9E9E9E',
                color: 'white',
                fontSize: '0.8em',
                marginLeft: '10px'
              }}>
                {inquiry.current_status}
              </span>
            </p>
            <p style={{ margin: '5px 0' }}><strong>Received Date:</strong> {inquiry.received_date}</p>
            <p style={{ margin: '5px 0' }}><strong>Proposed Shipment Date:</strong> {inquiry.proposed_shipment_date}</p>
          </div>
        </div>

        <h2 style={{ color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Fabric Information</h2>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '5px 0' }}><strong>Fabric 1:</strong> {inquiry.fabric1}</p>
          <p style={{ margin: '5px 0' }}><strong>Fabric 2:</strong> {inquiry.fabric2}</p>
          <p style={{ margin: '5px 0' }}><strong>Fabric 3:</strong> {inquiry.fabric3}</p>
          <p style={{ margin: '5px 0' }}><strong>Fabric 4:</strong> {inquiry.fabric4}</p>
        </div>

        <h2 style={{ color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Pricing Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <p style={{ margin: '5px 0' }}><strong>Fabric Price:</strong> {inquiry.fabric_price}</p>
            <p style={{ margin: '5px 0' }}><strong>Printing Price:</strong> {inquiry.printing_price}</p>
            <p style={{ margin: '5px 0' }}><strong>Washing Price:</strong> {inquiry.washing_price}</p>
          </div>
          <div>
            <p style={{ margin: '5px 0' }}><strong>CM Price:</strong> {inquiry.cm_price}</p>
            <p style={{ margin: '5px 0' }}><strong>Other Price:</strong> {inquiry.other_price}</p>
            <p style={{ margin: '5px 0' }}><strong>Target Price:</strong> {inquiry.target_price}</p>
          </div>
        </div>

        <h2 style={{ color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Additional Information</h2>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '5px 0' }}><strong>Season:</strong> {inquiry.season}</p>
          <p style={{ margin: '5px 0' }}><strong>Year:</strong> {inquiry.year}</p>
          <p style={{ margin: '5px 0' }}><strong>Color:</strong> {inquiry.color}</p>
        </div>

        <h2 style={{ color: '#555', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Remarks</h2>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '15px', 
          borderRadius: '4px', 
          border: '1px solid #ddd',
          marginBottom: '20px'
        }}>
          {inquiry.remarks || 'No remarks provided'}
        </div>
      </div>
    </div>
  );
};

export default DetailsInquiry;