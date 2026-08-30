import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// Exactly 3 Testimonial Videos matching Home section
const reviewVideos = [
  { id: 1, name: "Sarah Jenkins", role: "YouTuber (1.2M Subs)", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, name: "Marcus Doe", role: "Fitness Coach", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, name: "Emily Chen", role: "Tech Reviewer", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
];

// Exactly 7 Creator Partners with SEO, Thumbnail, Editing & Channel Management focus
const creatorPartners = [
  { 
    name: "Arpit Sharma",  
    feedback: "Their advanced YouTube channel management and structured SEO doubled our organic reach in under 3 months.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_12.34.43_PM_zacdks.jpg",
    link: "http://www.youtube.com/@arpitsharmai" 
  },
  { 
    name: "Creative Learning", 
    
    feedback: "The thumbnail engineering and psychological hook pacing completely transformed our CTR and viewer retention.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026978/WhatsApp_Image_2026-08-29_at_11.23.28_AM_ngsauw.jpg",
    link: "http://www.youtube.com/@creativelearning2.0" 
  },
  { 
    name: "Parth Goyal", 
    
    feedback: "Flawless video editing and retention strategies. Our long-form study lectures now maintain a flat drop-off graph.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_12.19.43_PM_rwicmp.jpg",
    link: "http://www.youtube.com/@ParthGoyal" 
  },
  { 
    name: "Sudhanshu MBBS", 
     
    feedback: "High-end cinematic editing combined with robust channel management. Absolutely top-tier execution.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_11.20.47_AM_mbzaem.jpg",
    link: "https://www.youtube.com/@SudhanshuMBBS" 
  },
  { 
    name: "Deepak AIIMS", 
     
    feedback: "Their data-driven SEO framework and thumbnail psychology pushed our videos straight to the top of search rankings.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_12.27.12_PM_rtmkry.jpg",
    link: "http://www.youtube.com/@DeepakAIIMSonian" 
  },
  { 
    name: "Rittik Behati", 
   
    feedback: "Fast turnaround times and stunning color grading. They treat our channel like their own startup.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_11.17.52_AM_e3vhli.jpg",
    link: "http://www.youtube.com/@RittikBaheti" 
  },
  { 
    name: "Your Nishant", 
    
    feedback: "From raw footage to viral storytelling masters. Our audience engagement metrics have never looked better.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026977/WhatsApp_Image_2026-08-29_at_11.15.34_AM_vedwyx.jpg",
    link: "http://www.youtube.com/@yournishaant" 
  }
];

const Results = () => {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const bgMain = isDark ? "bg-[#0A0A0A]" : "bg-[#FFFFFF]";
  const bgCard = isDark ? "bg-[#111111]" : "bg-[#F8FAFC]";
  const textMain = isDark ? "text-white" : "text-[#0F172A]";
  const textMuted = isDark ? "text-gray-400" : "text-[#475569]";
  const borderCol = isDark ? "border-white/10" : "border-slate-100";

  // Global Active Audio/Video Manager State for Testimonial Videos
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <div className={`${bgMain} ${textMain} font-sans min-h-screen pb-32 relative overflow-x-hidden selection:bg-[#0052FF] selection:text-white transition-colors duration-500 w-full m-0 p-0`}>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* THEME TOGGLE BUTTON */}
      <button 
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="fixed bottom-6 right-6 z-50 p-3 md:p-4 rounded-full bg-[#0052FF] text-white shadow-[0_0_20px_rgba(0,82,255,0.5)] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        )}
      </button>

      {/* 1. HERO SECTION (Balanced and identical scaling for both Mobile & Desktop) */}
      <div className="relative w-full min-h-[75vh] md:min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 mb-24 md:mb-32 overflow-hidden bg-black border-b border-white/10 m-0 pt-20 pb-16 md:pt-24 md:pb-24">
        
        {/* Animated 3D Floating Colorful Cards & Random 3D Cubes Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85">
          
          {/* Card 1: Blue - Retention Room */}
          <motion.div 
            animate={{ x: [-120, 180, -120], y: [-70, 120, -70], rotate: [-12, 18, -12] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] left-[8%] w-56 sm:w-72 h-36 sm:h-44 rounded-3xl bg-gradient-to-br from-[#0052FF] to-blue-800 p-4 sm:p-6 shadow-[0_0_60px_rgba(0,82,255,0.4)] border border-white/20 flex flex-col justify-between"
          >
            <span className="text-white/70 font-mono text-[10px] sm:text-xs uppercase tracking-widest">Protocol 01</span>
            <h4 className="text-white font-black text-xl sm:text-2xl tracking-tighter">RETENTION ROOM</h4>
            <div className="flex justify-between items-center text-white/80 text-[9px] sm:text-[10px] font-bold">
              <span>ALGORITHM HACK</span>
              <span>+95% LIFT</span>
            </div>
          </motion.div>

          {/* Card 2: Cream / Gold - RR */}
          <motion.div 
            animate={{ x: [150, -150, 150], y: [100, -100, 100], rotate: [12, -18, 12] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[18%] right-[10%] w-48 sm:w-60 h-28 sm:h-36 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-300 p-4 sm:p-5 shadow-[0_0_60px_rgba(251,191,36,0.3)] border border-white/40 flex flex-col justify-between text-neutral-900"
          >
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60">Elite Asset</span>
            <h4 className="font-black text-3xl sm:text-4xl tracking-tighter">RR.</h4>
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase">
              <span>HIGH CTR</span>
              <span>SCALE 50M+</span>
            </div>
          </motion.div>

          {/* Card 3: Royal Blue Accent */}
          <motion.div 
            animate={{ x: [-100, 140, -100], y: [180, -70, 180], rotate: [-18, 12, -18] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[12%] left-[12%] w-52 sm:w-64 h-32 sm:h-40 rounded-3xl bg-gradient-to-br from-blue-600 to-[#0040CC] p-4 sm:p-6 shadow-[0_0_60px_rgba(0,82,255,0.4)] border border-white/20 flex flex-col justify-between"
          >
            <span className="text-white/70 font-mono text-[10px] sm:text-xs uppercase tracking-widest">Post-Production</span>
            <h4 className="text-white font-black text-xl sm:text-2xl tracking-tighter">EDITING LAB</h4>
            <div className="flex justify-between items-center text-white/80 text-[9px] sm:text-[10px] font-bold">
              <span>CINEMATIC</span>
              <span>24H TURNAROUND</span>
            </div>
          </motion.div>

          {/* Card 4: Indigo - Retention Room */}
          <motion.div 
            animate={{ x: [120, -120, 120], y: [-120, 150, -120], rotate: [22, -12, 22] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[15%] right-[8%] w-56 sm:w-72 h-36 sm:h-44 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-900 p-4 sm:p-6 shadow-[0_0_60px_rgba(79,70,229,0.4)] border border-white/20 flex flex-col justify-between"
          >
            <span className="text-white/70 font-mono text-[10px] sm:text-xs uppercase tracking-widest">Masterclass</span>
            <h4 className="text-white font-black text-xl sm:text-2xl tracking-tighter">RETENTION ROOM</h4>
            <div className="flex justify-between items-center text-white/80 text-[9px] sm:text-[10px] font-bold">
              <span>A/B TESTED</span>
              <span>DOMINATE</span>
            </div>
          </motion.div>

          {/* --- 4 Random Colorful Floating 3D Cubes --- */}
          <motion.div 
            animate={{ x: [-200, 220, -150, -200], y: [-150, -80, 180, -150], rotateX: [0, 180, 360, 0], rotateY: [0, 90, 270, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] left-[30%] w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-[#0052FF] shadow-[0_0_30px_rgba(0,82,255,0.6)] border border-white/40"
          ></motion.div>

          <motion.div 
            animate={{ x: [180, -220, 150, 180], y: [120, -150, -90, 120], rotateX: [360, 180, 0, 360], rotateY: [270, 90, 0, 270] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[50%] right-[25%] w-14 sm:w-20 h-14 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-700 shadow-[0_0_35px_rgba(0,82,255,0.6)] border border-white/40"
          ></motion.div>

          <motion.div 
            animate={{ x: [-150, 180, -200, -150], y: [160, 80, -140, 160], rotateX: [90, 270, 360, 90], rotateY: [180, 360, 90, 180] }}
            transition={{ duration: 21, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[35%] left-[35%] w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-tr from-blue-400 to-teal-600 shadow-[0_0_25px_rgba(52,211,153,0.6)] border border-white/40"
          ></motion.div>

          <motion.div 
            animate={{ x: [140, -180, 190, 140], y: [-180, 140, 90, -180], rotateX: [180, 0, 270, 180], rotateY: [90, 180, 360, 90] }}
            transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
            className="absolute top-[25%] right-[35%] w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-[#0052FF] shadow-[0_0_30px_rgba(0,82,255,0.6)] border border-white/40"
          ></motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#0052FF] opacity-20 blur-[150px] pointer-events-none"></div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-28 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] mb-4 sm:mb-6 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse"></span>
            Verified Impact &middot; Live Growth Pulse
          </span>
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4 sm:mb-6 text-white drop-shadow-2xl">
            Results & <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-400">Testimonials</span>
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg mb-6 sm:mb-8">
            Data-backed metrics, elite partner reviews, and proven algorithmic scaling stories engineered for modern creators.
          </p>

          <div className="inline-flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xl">
            <span>⚡ 95% Retention Lift</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>🚀 50M+ Views Scaled</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* 2. TESTIMONIAL REVIEW VIDEOS SECTION (Exact 3 Videos with Horizontal Scroll & Smart Audio) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mb-24 sm:mb-32">
          <div className="text-center mb-10 sm:mb-12">
            <h3 className={`text-2xl md:text-4xl font-serif italic font-extrabold tracking-tight ${textMain} mb-2`}>What Creators Say</h3>
            <p className={`${textMuted} text-xs md:text-sm font-medium`}>Direct feedback from channel partners scaling with us.</p>
          </div>

          <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible no-scrollbar pb-4 sm:pb-0 px-2 sm:px-0 max-w-5xl mx-auto">
            {reviewVideos.map((review) => {
              const videoId = `results-review-${review.id}`;
              const isMuted = activeVideoId !== videoId;

              return (
                <div key={review.id} className="min-w-[240px] sm:min-w-0 flex-1 group relative rounded-2xl overflow-hidden aspect-[3/4] bg-black shadow-xl border border-blue-900/10 shrink-0">
                  <video 
                    src={review.videoUrl} 
                    autoPlay 
                    loop 
                    muted={isMuted} 
                    playsInline 
                    aria-label={`Testimonial video from ${review.name}`}
                    className="absolute inset-0 w-full h-full object-cover" 
                  >
                    <track kind="captions" src="" srcLang="en" label="English captions" default />
                  </video>
                  
                  <button 
                    aria-label="Toggle review mute" 
                    onClick={() => setActiveVideoId(isMuted ? videoId : null)} 
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#0052FF] text-xs z-10 transition-colors border border-white/20 shadow-md"
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-white font-extrabold text-base drop-shadow">{review.name}</h3>
                    <p className="text-blue-300 font-bold text-xs uppercase tracking-wider drop-shadow">{review.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. TRUSTED CREATOR PARTNERS SHOWCASE (2x2 Grid on Mobile, 4-col on Laptop) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mb-24 sm:mb-32">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-[#0052FF] text-[10px] font-black uppercase tracking-[0.2em] mb-2 inline-block">Partner Network</span>
            <h3 className={`text-2xl md:text-4xl font-serif italic font-extrabold tracking-tight ${textMain} mb-2`}>Trusted by Top Channels</h3>
            <p className={`${textMuted} text-xs md:text-sm font-medium`}>Click any partner card to visit their official channel/profile.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {creatorPartners.map((partner, idx) => (
              <motion.a 
                key={idx} 
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp} 
                whileHover={{ scale: 1.03 }}
                className={`${bgCard} p-4 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border ${borderCol} shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#0052FF]/60 hover:shadow-2xl relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0052FF] opacity-5 blur-xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-500/10 text-center sm:text-left">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full p-0.5 sm:p-1 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow-md shrink-0">
                      <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-base font-black ${textMain} group-hover:text-blue-500 transition-colors leading-tight`}>{partner.name}</h4>
                      <span className="text-[9px] sm:text-[10px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 sm:mt-1 block">{partner.category}</span>
                    </div>
                  </div>
                  <p className={`${textMuted} text-[11px] sm:text-xs md:text-sm leading-relaxed font-medium mb-4 sm:mb-6 text-center sm:text-left`}>"{partner.feedback}"</p>
                </div>
                <div className="pt-2 sm:pt-3 border-t border-slate-500/10 flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider relative z-10">
                  <span className="text-gray-400 group-hover:text-[#0052FF] transition-colors">Visit Channel &rarr;</span>
                  <span className="text-blue-500 font-extrabold">Verified</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 4. PROFESSIONAL BOOKING CTA SECTION */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-r from-[#0052FF] to-[#0033A0] border border-blue-400/30 rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-20 blur-[100px] pointer-events-none"></div>
          <h2 className="text-2xl md:text-4xl font-serif italic font-black text-white mb-3 tracking-tight">Ready to scale your channel?</h2>
          <p className="text-blue-100 text-xs md:text-sm max-w-md mx-auto mb-8 font-medium">
            Book your free consultation session today and let's map out your retention strategy.
          </p>
          <Link 
            to="/BookingForm" 
            className="inline-block bg-white text-[#0052FF] px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-blue-50 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer"
          >
            Book Free Consultation Now
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Results;