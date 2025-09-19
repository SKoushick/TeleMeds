# TeleMeds - Comprehensive Telemedicine Platform

A modern React-based telemedicine application with AI-powered medical assistance, prescription management, and health record storage.

## Features

### 🏥 Core Features
- **Buy Medicine**: Prescription verification and medicine ordering
- **Find Doctors**: Web3Forms integration with Calendly scheduling
- **AI ChatBot**: Gemini API-powered medical assistant
- **Health Records**: Digital storage and management of medical documents
- **About**: Comprehensive information about the platform

### 🛠️ Technology Stack

#### Frontend
- React.js 18
- JavaScript (ES6+)
- HTML5 & CSS3
- React Router for navigation
- Responsive design

#### Backend
- Node.js & Express.js
- MongoDB for database
- Multer for file uploads
- Google Gemini API for AI chatbot
- Web3Forms for form handling
- Calendly for appointment scheduling

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **Google Gemini API Key**
4. **Calendly Account** (for appointment scheduling)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TeleMeds
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/telemeds

# Gemini API Key
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Server Port
PORT=5000
```

### 4. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in your `.env` file

### 5. Set Up Calendly Integration
1. Create a [Calendly account](https://calendly.com)
2. Create a new event type
3. Get your Calendly embed URL
4. Update the Calendly URL in `src/components/FindDoctors.js`:
   ```javascript
   data-url="https://calendly.com/your-username/30min"
   ```

### 6. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

## Running the Application

### Development Mode
```bash
# Start the React development server
npm start

# In a separate terminal, start the backend server
npm run server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Mode
```bash
# Build the React app
npm run build

# Start the production server
npm run server
```

## API Endpoints

### Prescription Management
- `POST /api/upload-prescription` - Upload prescription files
- `GET /api/prescriptions` - Get all prescriptions

### Health Records
- `POST /api/upload-health-record` - Upload health record files
- `GET /api/health-records` - Get all health records

### AI Chatbot
- `POST /api/chatbot` - Send message to AI assistant

### Consultations
- `GET /api/consultations` - Get all consultation requests

## File Upload Configuration

The application supports:
- **Image files**: JPEG, JPG, PNG, GIF
- **Document files**: PDF
- **Maximum file size**: 10MB

## Web3Forms Integration

The "Find Doctors" form is integrated with Web3Forms using the access key: `be87fa2a-8410-40f2-9f6d-63b8c7915ea7`

## Security Features

- File type validation
- File size limits
- Local storage for health records (privacy-focused)
- Input sanitization
- CORS protection

## Troubleshooting

### Common Issues

1. **PowerShell Execution Policy Error**
   - Run PowerShell as Administrator
   - Execute: `Set-ExecutionPolicy RemoteSigned`
   - Try running npm commands again

2. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - Verify MongoDB is accessible on the specified port

3. **Gemini API Error**
   - Verify your API key is correct
   - Check if you have sufficient API quota
   - Ensure the API key has proper permissions

4. **File Upload Issues**
   - Check file size (must be under 10MB)
   - Verify file type is supported
   - Ensure uploads directory has write permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@telemeds.com
- Phone: +1 (555) 123-4567
- Live Chat: Available through the AI assistant

## Future Enhancements

- User authentication and profiles
- Real-time chat with doctors
- Payment integration
- Mobile app development
- Advanced AI features
- Multi-language support
