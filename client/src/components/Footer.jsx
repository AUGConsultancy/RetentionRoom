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
      {/* Universal Adaptive Footer (Looks flawless in both Light & Dark modes) */}
      <footer className="bg-[#0F1117] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden transition-colors duration-500">
        
        {/* Subtle background ambient glow */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F46E5] opacity-10 blur-[120px] pointer-events-none"></div>

        {/* Top Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 relative z-10">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <a href="#" className="font-black text-2xl tracking-tighter text-white">
              RETENTION<span className="text-[#818CF8]">ROOM</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              Engineering high-retention video content. Specializing in cinematic edits, color grading, and algorithm-driven scaling for modern brands.
            </p>
            
            {/* Direct Contact Numbers & Actions */}
            <div className="mt-2 flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Direct Inquiry Lines</span>
              
              {/* Line 1 */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-[#38BDF8]">+91 94636 31484</span>
                <a href="tel:+919463631484" className="px-3 py-1 bg-white/10 hover:bg-[#4F46E5] text-xs font-bold rounded-lg transition-all">Call</a>
                <a href="https://wa.me/919463631484" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-bold rounded-lg transition-all">WhatsApp</a>
              </div>

              {/* Line 2 */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-[#38BDF8]">+91 76656 27495</span>
                <a href="tel:+917665627495" className="px-3 py-1 bg-white/10 hover:bg-[#4F46E5] text-xs font-bold rounded-lg transition-all">Call</a>
                <a href="https://wa.me/917665627495" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-bold rounded-lg transition-all">WhatsApp</a>
              </div>
            </div>

            {/* Social Icons (Instagram & Email) */}
            <div className="flex items-center gap-3 mt-2">
              <a 
                href="https://www.instagram.com/retentionroom?igsi=MTl2dXplcGIydzgwZQ%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>

              <a 
                href="mailto:retentionroom0@gmail.com" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#4F46E5] hover:border-[#4F46E5] transition-all"
                aria-label="Email Us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Full Navigation Links (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-[10px]">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Home</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Services</a></li>
              <li><a href="/#works" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Work</a></li>
              <li><a href="/#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Testimonials</a></li>
              <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About</a></li>
              <li><a href="/BookingForm" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Book a Call</a></li>
            </ul>
          </div>

          {/* Quick Newsletter / Email Box & Consultation CTA (Span 5) */}
          <div className="md:col-span-5 flex flex-col justify-between bg-[#161922] p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5] opacity-10 blur-3xl pointer-events-none"></div>
            
            <div>
              <h4 className="text-white font-bold mb-2 text-lg">Book Free Consultant Now</h4>
              <p className="text-gray-400 text-xs mb-5">Drop your email to get a direct callback or schedule your strategy session.</p>
            </div>

            {isSubscribed ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs font-bold text-center mb-4">
                ✓ Brief received! We will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input 
                  type="email" 
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email address..." 
                  className="bg-[#0A0A0A] border border-white/15 px-4 py-3.5 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none flex-1 placeholder:text-gray-600"
                />
                <button 
                  type="submit" 
                  className="bg-[#4F46E5] text-white px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#4338CA] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] shrink-0 cursor-pointer"
                >
                  Send
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </form>
            )}

            <Link
              to="/BookingForm"
              className="block w-full text-center bg-white text-[#0A0A0A] py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-200 transition-colors shadow-md"
            >
              Book Free Consultation Now →
            </Link>
          </div>

        </div>
        
        {/* Bottom Bar: Copyright & Agency Card Trigger */}
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* Copyright */}
          <p className="text-[11px] text-gray-500 font-medium order-2 md:order-1">
            © {new Date().getFullYear()} Retention Room. All rights reserved.
          </p>

          {/* Agency Credit Button */}
          <div className="order-1 md:order-2">
            <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
              Designed & Developed by 
              <button 
                onClick={() => setIsAgencyCardOpen(true)}
                className="font-bold text-white hover:text-[#818CF8] transition-colors underline decoration-white/30 hover:decoration-[#818CF8] underline-offset-4 focus:outline-none cursor-pointer"
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
              className="relative w-full max-w-[400px] bg-[#111111] text-white rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/15 overflow-hidden z-10"
            >
              {/* Card Header (Dark Luxury Profile) */}
              <div className="bg-[#171615] px-8 pt-8 pb-6 relative overflow-hidden border-b border-white/10">
                <div className="absolute top-[-50%] right-[-20%] w-40 h-40 bg-[#4F46E5] rounded-full blur-[50px] opacity-40 pointer-events-none"></div>
                
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-black text-white tracking-tight">AUG<span className="text-[#818CF8]">.</span></h4>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-1.5">Digital Growth Partners</p>
                  </div>
                  <button 
                    onClick={() => setIsAgencyCardOpen(false)}
                    className="text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all focus:outline-none backdrop-blur-md cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Card Body & Punchy Copy */}
              <div className="p-8">
                <p className="text-gray-300 text-sm font-semibold leading-relaxed mb-6 border-l-2 border-[#4F46E5] pl-4">
                  We architect digital excellence. From high-converting websites to robust scalable systems, we build digital infrastructure that drives real growth for modern brands.
                </p>
                
                {/* Action Links */}
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://afterusglobal.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center justify-between w-full px-5 py-3.5 bg-white/5 hover:bg-[#4F46E5] text-white rounded-2xl font-bold text-sm transition-all duration-300 border border-white/10 hover:border-[#4F46E5]"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[#818CF8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                      </svg>
                      Visit Website
                    </span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="tel:+918002468432" 
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-[13px] transition-all border border-white/10"
                    >
                      <svg className="w-4 h-4 text-[#818CF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      Call Us
                    </a>
                    
                    <a 
                      href="https://wa.me/918002468432" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-2xl font-bold text-[13px] transition-all shadow-[0_8px_16px_rgba(37,211,102,0.2)]"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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