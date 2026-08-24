import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const BookingForm = () => {
  const formRef = useRef();
  
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    channelUrl: '',
    instaUrl: '',
    views: 'Under 100k',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation: Check if either Email or Phone is provided
    if (!formData.email.trim() && !formData.phone.trim()) {
      setError('Please provide at least an Email Address or a Mobile Number so we can reach you.');
      return;
    }

    setIsSubmitting(true);

    // ==========================================
    // WEB3FORMS CONFIGURATION
    // Apni Access Key yahan dalein (web3forms.com se free milti hai)
    // ==========================================
    const ACCESS_KEY = "c774c2ad-be61-459f-91f3-5538aba6aa39"; 

    const submissionData = {
      access_key: ACCESS_KEY,
      subject: `New Client Application from ${formData.name}`,
      from_name: formData.name,
      email: formData.email || 'Not Provided',
      phone_number: formData.phone || 'Not Provided',
      channel_url: formData.channelUrl || 'Not Provided',
      insta_url: formData.instaUrl || 'Not Provided',
      monthly_views: formData.views,
      message: formData.message,
      to_email: 'retentionroom0@gmail.com'
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
      } else {
        setError(result.message || 'Something went wrong. Please try again later.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white font-sans min-h-screen flex flex-col selection:bg-[#4F46E5] selection:text-white">
      
      {/* Sleek Header Navbar */}
      <header className="w-full p-6 flex justify-between items-center absolute top-0 z-50">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse"></span>
          <span className="font-bold uppercase tracking-widest text-xs">Retention Room</span>
        </Link>
        <Link to="/" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center pt-28 pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Trust Building & Agency Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col justify-center">
            <span className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Elite Partnership</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Let's scale your <br />
              <span className="font-serif italic text-[#4F46E5]">Content Engine.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-medium max-w-md">
              We partner with high-tier creators and ambitious brands to engineer retention, optimize CTR, and dominate algorithmic feeds.
            </p>

            {/* Clean Professional Notes */}
            <div className="space-y-6 max-w-md bg-[#111111]/60 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Data-Backed Editing</h4>
                  <p className="text-xs text-gray-400">Every cut is designed around human psychology and audience drop-off metrics.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Rapid 24h Turnaround</h4>
                  <p className="text-xs text-gray-400">Consistent scaling without ever compromising on top-tier cinematic quality.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: The Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-[#111111] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Subtle glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5] opacity-10 blur-[100px] pointer-events-none"></div>

            {isSuccess ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Application Received.</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto text-sm">
                  Our team is reviewing your brief. We will reach out to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-white/10 text-white px-8 py-3 rounded-full font-bold text-xs hover:bg-white/20 transition-colors uppercase tracking-widest cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                
                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-medium">{error}</div>}

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email Input (Optional) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address <span className="text-gray-600 font-normal">(Optional)</span></label>
                    <input 
                      type="email" name="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="john@creator.com"
                      className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Mobile Number Input (Optional) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number <span className="text-gray-600 font-normal">(Optional)</span></label>
                    <input 
                      type="tel" name="phone"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* YouTube Channel URL Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">YouTube Channel URL <span className="text-gray-600 font-normal">(Optional if Insta provided)</span></label>
                  <input 
                    type="url" name="channelUrl"
                    value={formData.channelUrl} onChange={handleChange}
                    placeholder="https://youtube.com/@yourchannel"
                    className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                {/* Instagram Profile URL Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instagram Profile URL <span className="text-gray-600 font-normal">(Optional if YouTube provided)</span></label>
                  <input 
                    type="url" name="instaUrl"
                    value={formData.instaUrl} onChange={handleChange}
                    placeholder="https://instagram.com/yourhandle"
                    className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                {/* Monthly Views Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Monthly Views / Reach</label>
                  <select 
                    name="views" 
                    value={formData.views} onChange={handleChange}
                    className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="Under 100k">Under 100k</option>
                    <option value="100k - 500k">100k - 500k</option>
                    <option value="500k - 1M">500k - 1M</option>
                    <option value="1M+">1M+</option>
                  </select>
                </div>

                {/* Message / Brief Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Details / Goals</label>
                  <textarea 
                    name="message" required
                    value={formData.message} onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about your content, current bottlenecks, and goals..."
                    className="bg-[#0A0A0A] border border-white/15 p-4 rounded-xl text-white text-sm focus:border-[#4F46E5] focus:outline-none transition-all placeholder:text-gray-600 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-2 bg-[#4F46E5] text-white font-black py-4 rounded-xl hover:bg-[#4338CA] transition-colors uppercase tracking-widest text-xs flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Sending Brief...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default BookingForm;