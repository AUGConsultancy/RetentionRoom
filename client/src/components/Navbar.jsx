import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Bulletproof section scroller
  const handleScrollToSection = (sectionId) => {
    setIsOpen(false);
    
    const scrollToEl = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn(`Element with id "${sectionId}" not found on the page.`);
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToEl, 300);
    } else {
      scrollToEl();
    }
  };

  const navLinks = [
    { 
      name: "Home", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      action: () => { setIsOpen(false); if(location.pathname !== "/") { navigate("/"); } else { window.scrollTo({ top: 0, behavior: "smooth" }); } } 
    },
    { 
      name: "Services", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      action: () => handleScrollToSection("services") 
    },
    { 
      name: "Work", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      action: () => handleScrollToSection("works") 
    },
    { 
      name: "Results", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      action: () => { setIsOpen(false); navigate("/results"); } 
    },
    { 
      name: "Testimonials", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
      action: () => handleScrollToSection("testimonials") 
    },
    { 
      name: "About", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      action: () => handleScrollToSection("about") 
    },
    { 
      name: "Book Call", 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      action: () => handleScrollToSection("booking") 
    },
  ];

  return (
    <>
      {/* ========================================================= */}
      {/* LEFT FLOATING TRIGGER: Original Logo + 3-Line Menu Button */}
      {/* ========================================================= */}
      <div 
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
        onMouseEnter={() => setIsOpen(true)}
      >
        {/* Original Logo Link Container */}
        <Link
          to="/"
          className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center bg-[#111111]/90 backdrop-blur-xl border border-white/15 hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Yahan apni original logo image ka path ya URL paste kar dena */}
          <img 
            src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787468298/WhatsApp_Image_2026-08-22_at_7.38.32_PM-removebg-preview_hhssd7.png" 
            alt="Logo" 
            className="w-full h-full object-cover" 
          />
        </Link>

        {/* 3-Line Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-2xl bg-[#111111]/90 backdrop-blur-xl border border-white/15 text-white flex flex-col items-center justify-center gap-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 transition-all group cursor-pointer"
          aria-label="Open Navigation"
        >
          <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-6 transition-all"></span>
          <span className="w-3.5 h-[2px] bg-white rounded-full group-hover:w-6 transition-all"></span>
          <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-6 transition-all"></span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SIDEBAR DRAWER (Optimized & Compact Width for Professional Look) */}
      {/* ========================================================= */}
      <div 
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0A0A0A]/95 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between shadow-[20px_0_50px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Top: Brand Header & Close */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="tracking-tight font-black text-white text-sm uppercase tracking-widest">
              Retention<span className="text-[#818CF8]">Room</span>
            </span>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Options List */}
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 px-3.5 py-3 rounded-xl transition-all bg-transparent border-none cursor-pointer group text-left"
              >
                <span className="text-[#818CF8] group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box Inside Sidebar */}
        <div className="pt-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-3">
            <p className="text-[11px] text-gray-400 font-medium mb-2.5">Ready to scale your content?</p>
            <Link
              to="/BookingForm"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-[#4F46E5] text-white py-2.5 rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-[#4338CA] transition-colors shadow-lg"
            >
              Book Free Consultation
            </Link>
          </div>
          <p className="text-[9px] text-gray-500 text-center uppercase tracking-widest">© 2026 Retention Room</p>
        </div>
      </div>

      {/* Backdrop overlay for mobile when drawer is open */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
        ></div>
      )}
    </>
  );
};

export default Navbar;