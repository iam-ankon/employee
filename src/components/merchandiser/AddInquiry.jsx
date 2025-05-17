import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../merchandiser/Sidebar.jsx";

const AddInquiry = () => {
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
      await axios.post('http://192.168.4.54:8000/api/merchandiser/api/inquiry/', formData);
      navigate('/inquiries');
    } catch (error) {
      console.error('Error adding inquiry:', error);
    }
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa'
  };

  const formWrapperStyle = {
    flex: 1,
    padding: '50px',
    marginLeft: '20px'
  };

  const formHeaderStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eaeaea'
  };

  const sectionContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    padding: '25px',
    marginBottom: '20px',
    borderLeft: '4px solid #3498db'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#3498db',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center'
  };

  const sectionIconStyle = {
    marginRight: '10px',
    fontSize: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  };

  const inputGroupStyle = {
    marginBottom: '15px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#555',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    transition: 'all 0.3s',
    backgroundColor: '#f9f9f9'
  };

  const inputFocusStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    transition: 'all 0.3s',
    backgroundColor: '#f9f9f9'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M5 8l5 5 5-5z\' fill=\'%23555\'/></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '15px'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '30px'
  };

  const buttonStyle = {
    padding: '12px 25px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e74c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2ecc71',
    color: 'white',
    '&:hover': {
      backgroundColor: '#27ae60'
    }
  };

  const renderField = (label, name, type = 'text') => (
    <div style={inputGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        style={inputStyle}
        // onFocus={(e) => e.target.style = {...inputStyle, ...inputFocusStyle}}
        // onBlur={(e) => e.target.style = inputStyle}
      />
    </div>
  );

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={formWrapperStyle}>
        <h2 style={formHeaderStyle}>Add New Inquiry</h2>
        
        {/* Basic Information Section */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>
            <span style={sectionIconStyle}>📋</span>
            Basic Information
          </h3>
          <div style={gridStyle}>
            {renderField("Inquiry Number", "inquiry_no", "number")}
            {renderField("Order No", "order_no")}
            {renderField("Order Quantity", "order_qty")}
            {renderField("Order Type", "order_type")}
            {renderField("Garment Type", "garment")}
            {renderField("Gender", "gender")}
            {renderField("Color", "color")}
            {renderField("Color Total", "color_total")}
            {renderField("Season", "season")}
            {renderField("Year", "year")}
          </div>
        </div>

        {/* Dates Section */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>
            <span style={sectionIconStyle}>📅</span>
            Dates
          </h3>
          <div style={gridStyle}>
            {renderField("Received Date", "received_date", "date")}
            {renderField("Proposed Shipment Date", "proposed_shipment_date", "date")}
            {renderField("Tech Ref Date", "techrefdate", "date")}
            {renderField("Confirmed Price Date", "confirmed_price_date", "date")}
          </div>
        </div>

        {/* Pricing Section */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>
            <span style={sectionIconStyle}>💰</span>
            Pricing
          </h3>
          <div style={gridStyle}>
            {renderField("Commission", "commission")}
            {renderField("Fabric Price", "fabric_price")}
            {renderField("Fabric Consumption", "fabric_consumption")}
            {renderField("Printing Price", "printing_price")}
            {renderField("Washing Price", "washing_price")}
            {renderField("Other Price", "other_price")}
            {renderField("CM Price", "cm_price")}
            {renderField("FUB per Piece", "fub_pace")}
            {renderField("FUB in Dz", "fub_in_dz")}
            {renderField("Target Price", "target_price")}
            {renderField("Confirmed Price", "confirmed_price")}
          </div>
        </div>

        {/* Fabric Details Section */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>
            <span style={sectionIconStyle}>🧵</span>
            Fabric Details
          </h3>
          <div style={gridStyle}>
            {renderField("Fabric 1", "fabric1")}
            {renderField("Fabric 2", "fabric2")}
            {renderField("Fabric 3", "fabric3")}
            {renderField("Fabric 4", "fabric4")}
          </div>
        </div>

        {/* Status & Remarks Section */}
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>
            <span style={sectionIconStyle}>📝</span>
            Status & Remarks
          </h3>
          <div style={gridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Status</label>
              <select
                name="current_status"
                value={formData.current_status}
                onChange={handleChange}
                style={selectStyle}
                // onFocus={(e) => e.target.style = {...selectStyle, ...inputFocusStyle}}
                // onBlur={(e) => e.target.style = selectStyle}
              >
                <option value="pending">Pending</option>
                <option value="quoted">Quoted</option>
                <option value="running">Running</option>
                <option value="Suppliersinformed">Suppliers Informed</option>
                <option value="all">All</option>
              </select>
            </div>
            {renderField("Order Remarks", "order_remarks")}
          </div>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              style={textareaStyle}
            //   onFocus={(e) => e.target.style = {...textareaStyle, ...inputFocusStyle}}
            //   onBlur={(e) => e.target.style = textareaStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Local Remarks</label>
            <textarea
              name="local_remarks"
              value={formData.local_remarks}
              onChange={handleChange}
              style={textareaStyle}
            //   onFocus={(e) => e.target.style = {...textareaStyle, ...inputFocusStyle}}
            //   onBlur={(e) => e.target.style = textareaStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Buyer Remarks</label>
            <textarea
              name="buyer_remarks"
              value={formData.buyer_remarks}
              onChange={handleChange}
              style={textareaStyle}
            //   onFocus={(e) => e.target.style = {...textareaStyle, ...inputFocusStyle}}
            //   onBlur={(e) => e.target.style = textareaStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Wash Description</label>
            <textarea
              name="wash_description"
              value={formData.wash_description}
              onChange={handleChange}
              style={textareaStyle}
            //   onFocus={(e) => e.target.style = {...textareaStyle, ...inputFocusStyle}}
            //   onBlur={(e) => e.target.style = textareaStyle}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div style={buttonGroupStyle}>
          <button
            type="button"
            onClick={() => navigate('/inquiries')}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            style={submitButtonStyle}
          >
            Save Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInquiry;