import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to TeleMeds</h1>
            <p>Your comprehensive telemedicine platform for all your healthcare needs</p>
            <div className="hero-buttons">
              <Link to="/find-doctors" className="btn btn-primary">Find Doctors</Link>
              <Link to="/ai-chatbot" className="btn btn-success">AI Assistant</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Buy Medicine</h3>
              <p>Order medicines with proper prescription verification for your safety</p>
              <Link to="/buy-medicine" className="btn">Learn More</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Find Doctors</h3>
              <p>Connect with qualified doctors for online consultations</p>
              <Link to="/find-doctors" className="btn">Book Appointment</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI ChatBot</h3>
              <p>Get instant medical advice for simple conditions and wounds</p>
              <Link to="/ai-chatbot" className="btn">Chat Now</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Health Records</h3>
              <p>Store and manage your medical records and prescriptions</p>
              <Link to="/health-records" className="btn">View Records</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
