import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="section">
      <div className="container">
        <h2>About TeleMeds</h2>
        
        <div className="card">
          <div className="about-hero">
            <h3>Your Comprehensive Telemedicine Platform</h3>
            <p className="hero-description">
              TeleMeds is designed to revolutionize healthcare accessibility by providing 
              a complete digital health ecosystem. From prescription management to AI-powered 
              medical assistance, we're committed to making quality healthcare available to everyone.
            </p>
          </div>
        </div>

        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To bridge the gap between patients and healthcare providers through innovative 
            technology, ensuring that quality medical care is accessible, convenient, and 
            reliable for everyone, regardless of their location or circumstances.
          </p>
        </div>

        <div className="card">
          <h3>Key Features</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">💊</div>
              <h4>Prescription Management</h4>
              <p>Secure prescription verification and medicine ordering with proper documentation</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">👨‍⚕️</div>
              <h4>Doctor Consultations</h4>
              <p>Connect with qualified healthcare professionals for online consultations</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🤖</div>
              <h4>AI Medical Assistant</h4>
              <p>24/7 AI-powered support for basic medical queries and wound care advice</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <h4>Health Records</h4>
              <p>Digital storage and management of your medical history and documents</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Technology Stack</h3>
          <div className="tech-stack">
            <div className="tech-category">
              <h4>Frontend</h4>
              <div className="tech-items">
                <span className="tech-item">React.js</span>
                <span className="tech-item">JavaScript</span>
                <span className="tech-item">HTML5</span>
                <span className="tech-item">CSS3</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h4>Backend</h4>
              <div className="tech-items">
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express.js</span>
                <span className="tech-item">MongoDB</span>
                <span className="tech-item">RESTful APIs</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h4>AI & Integration</h4>
              <div className="tech-items">
                <span className="tech-item">Google Gemini API</span>
                <span className="tech-item">Web3Forms</span>
                <span className="tech-item">Calendly</span>
                <span className="tech-item">Multer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Privacy & Security</h3>
          <div className="privacy-features">
            <div className="privacy-item">
              <div className="privacy-icon">🔒</div>
              <div>
                <h4>Data Encryption</h4>
                <p>All sensitive data is encrypted using industry-standard protocols</p>
              </div>
            </div>
            
            <div className="privacy-item">
              <div className="privacy-icon">🏠</div>
              <div>
                <h4>Local Storage</h4>
                <p>Health records are stored locally on your device for maximum privacy</p>
              </div>
            </div>
            
            <div className="privacy-item">
              <div className="privacy-icon">👤</div>
              <div>
                <h4>User Control</h4>
                <p>You have complete control over your data and can delete it anytime</p>
              </div>
            </div>
            
            <div className="privacy-item">
              <div className="privacy-icon">🛡️</div>
              <div>
                <h4>HIPAA Compliant</h4>
                <p>We follow healthcare data protection standards and best practices</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Contact & Support</h3>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h4>Email Support</h4>
                <p>support@telemeds.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Phone Support</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <h4>Live Chat</h4>
                <p>Available 24/7 through our AI assistant</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📅</div>
              <div>
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="footer-info">
            <h3>Get Started Today</h3>
            <p>
              Join thousands of users who trust TeleMeds for their healthcare needs. 
              Start your journey towards better health management today.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Start Free Trial</button>
              <button className="btn btn-success">Schedule Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
