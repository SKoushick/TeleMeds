import React, { useState, useRef, useEffect } from 'react';
import './AIChatBot.css';

const AIChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI medical assistant. I can help you with simple medical conditions, wound care, and provide general health advice. How can I assist you today?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      // Call backend API for Gemini response
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      
      // Fallback response for demo purposes
      const fallbackResponse = getFallbackResponse(userMessage);
      setMessages(prev => [...prev, { text: fallbackResponse, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('wound') || lowerMessage.includes('cut') || lowerMessage.includes('injury')) {
      return "For minor wounds, clean the area with soap and water, apply an antiseptic, and cover with a clean bandage. If the wound is deep, bleeding heavily, or shows signs of infection, please consult a healthcare professional immediately.";
    } else if (lowerMessage.includes('headache')) {
      return "For mild headaches, try resting in a dark room, applying a cold compress, or taking over-the-counter pain relievers. If headaches are severe, frequent, or accompanied by other symptoms, please see a doctor.";
    } else if (lowerMessage.includes('fever')) {
      return "For mild fever, rest, stay hydrated, and monitor your temperature. If fever is high (over 101°F/38.3°C) or persists for more than 3 days, please consult a healthcare provider.";
    } else if (lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
      return "For cold and flu symptoms, rest, stay hydrated, use a humidifier, and consider over-the-counter medications for symptom relief. If symptoms are severe or persist, please see a doctor.";
    } else {
      return "I understand you're asking about a medical concern. While I can provide general information, please remember that I'm an AI assistant and cannot replace professional medical advice. For serious symptoms or concerns, please consult with a healthcare professional.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Hello! I'm your AI medical assistant. I can help you with simple medical conditions, wound care, and provide general health advice. How can I assist you today?",
        sender: 'bot'
      }
    ]);
  };

  return (
    <div className="section">
      <div className="container">
        <h2>AI ChatBot</h2>
        
        <div className="card">
          <div className="chatbot-info">
            <h3>Medical AI Assistant</h3>
            <p>
              Our AI ChatBot can help you with simple medical conditions, wound care advice, 
              and general health information. Please note that this is for informational purposes only 
              and should not replace professional medical advice.
            </p>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <h4>AI Medical Assistant</h4>
              <button onClick={clearChat} className="clear-btn">Clear Chat</button>
            </div>
            
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <div className="message-content">
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about simple medical conditions..."
                className="chat-input"
                disabled={isLoading}
              />
              <button 
                onClick={sendMessage} 
                className="btn btn-primary"
                disabled={isLoading || !inputMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>What I Can Help With</h3>
          <div className="capabilities-grid">
            <div className="capability">
              <div className="capability-icon">🩹</div>
              <h4>Wound Care</h4>
              <p>Basic wound cleaning and bandaging advice</p>
            </div>
            <div className="capability">
              <div className="capability-icon">🤒</div>
              <h4>Common Symptoms</h4>
              <p>Headaches, fever, cold, and flu guidance</p>
            </div>
            <div className="capability">
              <div className="capability-icon">💊</div>
              <h4>Medication Info</h4>
              <p>General information about common medications</p>
            </div>
            <div className="capability">
              <div className="capability-icon">⚠️</div>
              <h4>Emergency Guidance</h4>
              <p>When to seek immediate medical attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;
