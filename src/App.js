import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BuyMedicine from './components/BuyMedicine';
import FindDoctors from './components/FindDoctors';
import AIChatBot from './components/AIChatBot';
import HealthRecords from './components/HealthRecords';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-medicine" element={<BuyMedicine />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/ai-chatbot" element={<AIChatBot />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
