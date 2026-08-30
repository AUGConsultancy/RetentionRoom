import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isAgencyCardOpen, setIsAgencyCardOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isAgencyCardOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isAgencyCardOpen]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) return;
    console.log("Quick Lead Captured:", userEmail);
    setIsSubscribed(true);
    setUserEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <>
      {/* Footer styled with Logo-Matched Vibrant Royal Blue Theme */}
      <footer className="bg-[#0052FF] text-white pt-10 pb-6 border-t border-blue-400/20 relative overflow-hidden transition-colors duration-500">
        
        {/* Subtle background ambient glow */}
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white opacity-10 blur-[100px] pointer-events-none"></div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 relative z-10 items-start">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 flex flex-col gap-3 text-center md:text-left items-center md:items-start">
            <a href="#" className="font-black text-xl tracking-tighter text-white">
              RETENTION<span className="text-blue-200">ROOM</span>
            </a>
            <p className="text-blue-100 text-xs leading-relaxed max-w-xs font-semibold">
              Engineering high-retention video content, cinematic edits, and algorithm-driven scaling for modern brands.
            </p>
            
            {/* Quick Contact Line */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[11px] uppercase tracking-widest text-blue-100 font-extrabold">Inquiries:</span>
              <a href="tel:+917665627495" className="text-xs font-bold text-white hover:underline">+91 7665627495</a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-1">
              <a 
                href="https://www.instagram.com/retentionroom?igsi=MTl2dXplcGIydzgwZQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>

              <a 
                href="mailto:retentionroom0@gmail.com" 
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-blue-700 hover:border-white transition-all"
                aria-label="Email Us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links (Span 3) */}
          <nav className="md:col-span-3 text-center md:text-left" aria-label="Footer Navigation">
            <h2 className="text-white font-extrabold mb-3 uppercase tracking-widest text-[11px]">Navigation</h2>
            <ul className="flex flex-wrap md:flex-col justify-center gap-x-6 gap-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white transition-colors text-xs font-semibold">Home</Link></li>
              <li><a href="/#services" className="text-blue-100 hover:text-white transition-colors text-xs font-semibold">Services</a></li>
              <li><a href="/#works" className="text-blue-100 hover:text-white transition-colors text-xs font-semibold">Work</a></li>
              <li><a href="/#testimonials" className="text-blue-100 hover:text-white transition-colors text-xs font-semibold">Testimonials</a></li>
              <li><a href="/#about" className="text-blue-100 hover:text-white transition-colors text-xs font-semibold">About</a></li>
              <li><Link to="/BookingForm" className="text-blue-100 hover:text-white transition-colors text-xs font-semibold">Book a Call</Link></li>
            </ul>
          </nav>

          {/* Compact Newsletter / Consultation Box (Span 5) */}
          <div className="md:col-span-5 flex flex-col justify-between bg-[#0040CC] p-5 sm:p-6 rounded-2xl border border-white/20 relative overflow-hidden shadow-lg">
            <div>
              <h2 className="text-white font-extrabold mb-1 text-sm">Strategy Session</h2>
              <p className="text-blue-100 text-[11px] font-medium mb-3">Drop your email for a direct callback or book instantly.</p>
            </div>

            {isSubscribed ? (
              <div className="p-2.5 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-[11px] font-bold text-center mb-3">
                ✓ Brief received! We will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-3">
                <input 
                  type="email" 
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter email address..." 
                  aria-label="Email address for strategy session"
                  className="bg-[#002DB3] border border-white/30 px-3 py-2.5 rounded-xl text-white text-xs font-medium focus:border-white focus:outline-none flex-1 placeholder:text-blue-200/60"
                />
                <button 
                  type="submit" 
                  aria-label="Submit email address"
                  className="bg-white text-[#0052FF] px-5 py-2.5 rounded-xl font-extrabold uppercase tracking-widest text-[11px] hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer shrink-0"
                >
                  Send
                </button>
              </form>
            )}

            <Link
              to="/BookingForm"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors shadow"
            >
              Book Free Consultation Now →
            </Link>
          </div>

        </div>
        
        {/* Bottom Bar: Copyright & Agency Card Trigger */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 border-t border-blue-400/20 flex flex-col md:flex-row items-center justify-between gap-3 relative z-10 text-center md:text-left">
          
          <p className="text-[11px] text-blue-100 font-semibold order-2 md:order-1">
            © {new Date().getFullYear()} Retention Room. All rights reserved.
          </p>

          <div className="order-1 md:order-2">
            <p className="text-[11px] text-blue-100 font-semibold flex items-center justify-center md:justify-start gap-1">
              Designed & Developed by 
              <button 
                onClick={() => setIsAgencyCardOpen(true)}
                className="font-bold text-white hover:text-blue-200 transition-colors underline decoration-white/40 underline-offset-2 focus:outline-none cursor-pointer"
              >
                Aug Consultancy
              </button>
            </p>
          </div>
        </div>
      </footer>

      {/* Screen-Centered Premium Agency Modal */}
      <AnimatePresence>
        {isAgencyCardOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsAgencyCardOpen(false)}
            />

            {/* Centered Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[380px] bg-[#FFFFFF] text-[#0F172A] rounded-[2rem] shadow-2xl border border-blue-900/10 overflow-hidden z-10"
            >
              {/* Card Header */}
              <div className="bg-[#0052FF] text-white px-6 pt-6 pb-5 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">AUG<span className="text-blue-200">.</span></h3>
                    <p className="text-blue-100 text-[10px] uppercase tracking-widest font-bold mt-1">Digital Growth Partners</p>
                  </div>
                  <button 
                    onClick={() => setIsAgencyCardOpen(false)}
                    aria-label="Close modal"
                    className="text-white/90 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all focus:outline-none cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6 bg-[#FDFBF7]">
                <p className="text-[#334155] text-xs font-semibold leading-relaxed mb-5 border-l-2 border-[#0052FF] pl-3">
                  We architect digital excellence. From high-converting websites to robust scalable systems, we build digital infrastructure that drives real growth for modern brands.
                </p>
                
                {/* Action Links */}
                <div className="flex flex-col gap-2.5">
                  <a 
                    href="https://afterusglobal.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center justify-between w-full px-4 py-3 bg-[#0052FF] hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow"
                  >
                    <span className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                      </svg>
                      Visit Website
                    </span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    <a 
                      href="tel:+918002468432" 
                      className="flex items-center justify-center gap-1.5 w-full py-3 bg-white hover:bg-gray-100 text-[#0F172A] border border-blue-900/15 rounded-xl font-bold text-xs transition-all shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      Call Us
                    </a>
                    
                    <a 
                      href="https://wa.me/918002468432" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-1.5 w-full py-3 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-xl font-bold text-xs transition-all shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Chat
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}