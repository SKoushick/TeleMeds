import React, { useState } from 'react';
import './BuyMedicine.css';

const BuyMedicine = () => {
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionFile(file);
      setUploadStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prescriptionFile) {
      setUploadStatus('Please select a prescription file');
      return;
    }

    const formData = new FormData();
    formData.append('prescription', prescriptionFile);

    try {
      setUploadStatus('Uploading prescription...');
      
      // Here you would typically send to your backend
      // const response = await fetch('/api/upload-prescription', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Simulate upload
      setTimeout(() => {
        setUploadStatus('Prescription uploaded successfully! You can now proceed with your medicine order.');
        setPrescriptionFile(null);
        document.getElementById('prescription-file').value = '';
      }, 2000);
      
    } catch (error) {
      setUploadStatus('Error uploading prescription. Please try again.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h2>Buy Medicine</h2>
        
        <div className="card">
          <div className="prescription-info">
            <h3>Prescription Required</h3>
            <p>
              Before buying any medicine, a doctor's prescription is important for your safety. 
              Please upload your valid prescription to proceed with your medicine order.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="prescription-form">
            <div className="file-upload">
              <input
                type="file"
                id="prescription-file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="prescription-file">
                <div className="upload-text">📄 Upload Prescription</div>
                <div className="upload-subtext">
                  Click to select your prescription file (Image or PDF)
                </div>
              </label>
            </div>

            {prescriptionFile && (
              <div className="file-info">
                <p><strong>Selected file:</strong> {prescriptionFile.name}</p>
                <p><strong>File size:</strong> {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Upload Prescription
            </button>

            {uploadStatus && (
              <div className={`status-message ${uploadStatus.includes('Error') ? 'error' : 'success'}`}>
                {uploadStatus}
              </div>
            )}
          </form>
        </div>

        <div className="card">
          <h3>Medicine Order Process</h3>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Upload Prescription</h4>
                <p>Upload a clear image or PDF of your doctor's prescription</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Verification</h4>
                <p>Our team will verify your prescription for authenticity</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Order Confirmation</h4>
                <p>Once verified, you can proceed with your medicine order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyMedicine;
