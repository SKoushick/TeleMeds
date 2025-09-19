import React, { useState, useEffect } from 'react';
import './FindDoctors.css';

const FindDoctors = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGmail: '',
    patientGender: '',
    patientDob: '',
    patientCondition: ''
  });
  const [showCalendly, setShowCalendly] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Submit to Web3Forms
    const formDataToSend = new FormData();
    formDataToSend.append('access_key', 'be87fa2a-8410-40f2-9f6d-63b8c7915ea7');
    formDataToSend.append('patientName', formData.patientName);
    formDataToSend.append('patientAge', formData.patientAge);
    formDataToSend.append('patientGmail', formData.patientGmail);
    formDataToSend.append('patientGender', formData.patientGender);
    formDataToSend.append('patientDob', formData.patientDob);
    formDataToSend.append('patientCondition', formData.patientCondition);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setFormSubmitted(true);
        setShowCalendly(true);
        // Reset form
        setFormData({
          patientName: '',
          patientAge: '',
          patientGmail: '',
          patientGender: '',
          patientDob: '',
          patientCondition: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  useEffect(() => {
    if (showCalendly) {
      // Load Calendly script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        // Cleanup
        const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [showCalendly]);

  return (
    <div className="section">
      <div className="container">
        <h2>Find Doctors</h2>
        
        <div className="card">
          <h3>Book a Consultation</h3>
          <p>Fill out the form below to schedule a consultation with our qualified doctors.</p>
          
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="consultation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientName">Patient Name *</label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="patientAge">Patient Age *</label>
                  <input
                    type="number"
                    id="patientAge"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="patientGmail">Patient's Gmail *</label>
                <input
                  type="email"
                  id="patientGmail"
                  name="patientGmail"
                  value={formData.patientGmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientGender">Gender *</label>
                  <select
                    id="patientGender"
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="patientDob">Date of Birth *</label>
                  <input
                    type="date"
                    id="patientDob"
                    name="patientDob"
                    value={formData.patientDob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="patientCondition">Patient's Condition Description *</label>
                <textarea
                  id="patientCondition"
                  name="patientCondition"
                  value={formData.patientCondition}
                  onChange={handleInputChange}
                  required
                  placeholder="Please describe your current condition, symptoms, and any relevant medical history..."
                  rows="5"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Information
              </button>
            </form>
          ) : (
            <div className="success-message">
              <h4>✅ Information Submitted Successfully!</h4>
              <p>Your consultation request has been received. Please proceed to schedule your appointment below.</p>
            </div>
          )}
        </div>

        {showCalendly && (
          <div className="card">
            <h3>Schedule Your Appointment</h3>
            <p>Choose a convenient time for your consultation:</p>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/your-username/30min"
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>
        )}

        <div className="card">
          <h3>Doctor Prescription Upload</h3>
          <p>After your consultation, your doctor can upload your prescription here for your medicine orders.</p>
          <div className="prescription-upload-area">
            <div className="upload-placeholder">
              <h4>Doctor Prescription Upload</h4>
              <p>This feature will be available after your consultation</p>
              <button className="btn btn-success" disabled>
                Upload Prescription (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctors;
