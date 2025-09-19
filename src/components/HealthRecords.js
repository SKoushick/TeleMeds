import React, { useState, useEffect } from 'react';
import './HealthRecords.css';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('healthRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadStatus('');
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadStatus('Uploading...');

    try {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(uploadFile);
      
      // Create new record object
      const newRecord = {
        id: Date.now(),
        name: uploadFile.name,
        type: uploadFile.type,
        size: uploadFile.size,
        uploadDate: new Date().toISOString(),
        previewUrl: previewUrl,
        category: 'prescription' // You could add a category selector
      };

      // Add to records
      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      
      // Save to localStorage
      localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
      
      setUploadStatus('File uploaded successfully!');
      setUploadFile(null);
      document.getElementById('health-record-file').value = '';
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deleteRecord = (recordId) => {
    const updatedRecords = records.filter(record => record.id !== recordId);
    setRecords(updatedRecords);
    localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h2>Health Records</h2>
        
        <div className="card">
          <h3>Upload Health Records</h3>
          <p>
            Store your medical records, prescriptions, and health documents here. 
            All files are stored locally on your device for privacy.
          </p>
          
          <div className="upload-section">
            <div className="file-upload-area">
              <input
                type="file"
                id="health-record-file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="health-record-file">
                <div className="upload-icon">📁</div>
                <div className="upload-text">Choose File</div>
                <div className="upload-subtext">
                  Upload images or PDF files of your health records
                </div>
              </label>
            </div>

            {uploadFile && (
              <div className="file-preview">
                <h4>Selected File:</h4>
                <p><strong>Name:</strong> {uploadFile.name}</p>
                <p><strong>Size:</strong> {formatFileSize(uploadFile.size)}</p>
                <p><strong>Type:</strong> {uploadFile.type}</p>
              </div>
            )}

            <button 
              onClick={handleUpload} 
              className="btn btn-primary"
              disabled={!uploadFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Record'}
            </button>

            {uploadStatus && (
              <div className={`status-message ${uploadStatus.includes('Error') ? 'error' : 'success'}`}>
                {uploadStatus}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Your Health Records</h3>
          <p>Manage your stored health records and documents</p>
          
          {records.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h4>No Records Yet</h4>
              <p>Upload your first health record to get started</p>
            </div>
          ) : (
            <div className="records-grid">
              {records.map((record) => (
                <div key={record.id} className="record-item">
                  <div className="record-preview">
                    {record.type.startsWith('image/') ? (
                      <img src={record.previewUrl} alt={record.name} />
                    ) : (
                      <div className="file-icon">📄</div>
                    )}
                  </div>
                  
                  <div className="record-info">
                    <h4>{record.name}</h4>
                    <p className="record-meta">
                      {formatFileSize(record.size)} • {formatDate(record.uploadDate)}
                    </p>
                    <p className="record-category">
                      Category: {record.category}
                    </p>
                  </div>
                  
                  <div className="record-actions">
                    <button 
                      onClick={() => window.open(record.previewUrl, '_blank')}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => deleteRecord(record.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3>Record Categories</h3>
          <div className="categories-info">
            <div className="category-item">
              <div className="category-icon">💊</div>
              <div>
                <h4>Prescriptions</h4>
                <p>Doctor's prescriptions and medication lists</p>
              </div>
            </div>
            <div className="category-item">
              <div className="category-icon">🏥</div>
              <div>
                <h4>Medical Reports</h4>
                <p>Lab results, X-rays, and medical test reports</p>
              </div>
            </div>
            <div className="category-item">
              <div className="category-icon">📋</div>
              <div>
                <h4>Health History</h4>
                <p>Previous medical conditions and treatments</p>
              </div>
            </div>
            <div className="category-item">
              <div className="category-icon">💉</div>
              <div>
                <h4>Vaccination Records</h4>
                <p>Immunization records and vaccine certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
