import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Results from './pages/Results';
import Booking from './pages/BookingForm';

function App() {
  return (
    <Router>
      {/* Luxury Theme Applied: Cream Background, Dark Text, Custom Highlight Color */}
      <div className="min-h-screen bg-[#FAF8F5] text-[#171615] flex flex-col font-sans selection:bg-[#A39281] selection:text-white">
        
        {/* Global Navbar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Results" element={<Results />} />
            <Route path="/BookingForm" element={<Booking />} />
          </Routes>
        </main>

        {/* Global Footer (with your Aug Consultancy card) */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;