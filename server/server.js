const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../build')));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/telemeds';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

// MongoDB Schemas
const prescriptionSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  fileName: String,
  filePath: String,
  uploadDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

const consultationSchema = new mongoose.Schema({
  patientName: String,
  patientAge: Number,
  patientEmail: String,
  patientGender: String,
  patientDob: Date,
  patientCondition: String,
  submissionDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

const healthRecordSchema = new mongoose.Schema({
  patientEmail: String,
  fileName: String,
  filePath: String,
  fileType: String,
  fileSize: Number,
  uploadDate: { type: Date, default: Date.now },
  category: { type: String, default: 'general' }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
const Consultation = mongoose.model('Consultation', consultationSchema);
const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

// Routes

// Prescription upload endpoint
app.post('/api/upload-prescription', upload.single('prescription'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const prescription = new Prescription({
      patientName: req.body.patientName || 'Unknown',
      patientEmail: req.body.patientEmail || 'unknown@example.com',
      fileName: req.file.originalname,
      filePath: req.file.path,
      status: 'pending'
    });

    await prescription.save();
    res.json({ 
      message: 'Prescription uploaded successfully',
      prescriptionId: prescription._id,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error('Prescription upload error:', error);
    res.status(500).json({ error: 'Failed to upload prescription' });
  }
});

// Health record upload endpoint
app.post('/api/upload-health-record', upload.single('healthRecord'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const healthRecord = new HealthRecord({
      patientEmail: req.body.patientEmail || 'unknown@example.com',
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      category: req.body.category || 'general'
    });

    await healthRecord.save();
    res.json({ 
      message: 'Health record uploaded successfully',
      recordId: healthRecord._id,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error('Health record upload error:', error);
    res.status(500).json({ error: 'Failed to upload health record' });
  }
});

// AI Chatbot endpoint with Gemini API
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call Gemini API
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a medical AI assistant. Please provide helpful, accurate, and safe medical advice for simple conditions. Remember to always recommend consulting a healthcare professional for serious concerns. User question: ${message}`
              }
            ]
          }
        ]
      })
    });

    if (!geminiResponse.ok) {
      throw new Error('Gemini API request failed');
    }

    const geminiData = await geminiResponse.json();
    const response = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I cannot provide a response at this time. Please consult a healthcare professional.';

    res.json({ response });
  } catch (error) {
    console.error('Chatbot API error:', error);
    
    // Fallback response
    const fallbackResponse = "I apologize, but I'm experiencing technical difficulties. For medical advice, please consult with a healthcare professional or try again later.";
    res.json({ response: fallbackResponse });
  }
});

// Get consultations
app.get('/api/consultations', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ submissionDate: -1 });
    res.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});

// Get prescriptions
app.get('/api/prescriptions', async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ uploadDate: -1 });
    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

// Get health records
app.get('/api/health-records', async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find().sort({ uploadDate: -1 });
    res.json(healthRecords);
  } catch (error) {
    console.error('Error fetching health records:', error);
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
});
