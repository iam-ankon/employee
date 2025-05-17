import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditInquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    inquiry_no: '',
    order_type: '',
    garment: '',
    gender: '',
    fabric1: '',
    fabric2: '',
    fabric3: '',
    fabric4: '',
    received_date: '',
    proposed_shipment_date: '',
    commission: '',
    fabric_price: '',
    fabric_consumption: '',
    printing_price: '',
    washing_price: '',
    other_price: '',
    cm_price: '',
    fub_pace: '',
    fub_in_dz: '',
    remarks: '',
    local_remarks: '',
    buyer_remarks: '',
    wash_description: '',
    techrefdate: '',
    target_price: '',
    confirmed_price: '',
    confirmed_price_date: '',
    season: '',
    year: '',
    current_status: 'pending',
    color: '',
    color_total: '',
    order_no: '',
    order_qty: '',
    order_remarks: ''
  });

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await axios.get(`http://192.168.4.54:8000/api/merchandiser/api/inquiry/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching inquiry:', error);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.4.54:8000/api/merchandiser/api/inquiry/${id}/`, formData);
      navigate(`/inquiries/${id}`);
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Edit Inquiry #{formData.inquiry_no}</h1>
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Inquiry Number</label>
          <input
            type="number"
            name="inquiry_no"
            value={formData.inquiry_no}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Order Type</label>
          <select
            name="order_type"
            value={formData.order_type}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Select Order Type</option>
            <option value="advertisement">Advertisement</option>
            <option value="programmer">Programmer</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Garment Type</label>
          <select
            name="garment"
            value={formData.garment}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Select Garment Type</option>
            <option value="all">All</option>
            <option value="knit">Knit</option>
            <option value="woven">Woven</option>
            <option value="sweater">Sweater</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Select Gender</option>
            <option value="all">All</option>
            <option value="blanks">Blanks</option>
            <option value="ladies">Ladies</option>
            <option value="bag">Bag</option>
            <option value="boy">Boy</option>
            <option value="girls">Girls</option>
            <option value="mama">Mama</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
          <select
            name="current_status"
            value={formData.current_status}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="pending">Pending</option>
            <option value="quoted">Quoted</option>
            <option value="running">Running</option>
            <option value="Suppliersinformed">Suppliers Informed</option>
            <option value="all">All</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Received Date</label>
          <input
            type="date"
            name="received_date"
            value={formData.received_date}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate(`/inquiries/${id}`)}
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#f44336', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ 
              padding: '10px 15px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer'
            }}
          >
            Update Inquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInquiry;