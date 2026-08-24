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

const reviewVideos = [
  { id: 1, name: "Sarah Jenkins", role: "YouTuber (1.2M Subs)", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=800&fit=crop" },
  { id: 2, name: "Marcus Doe", role: "Fitness Coach", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=800&fit=crop" },
  { id: 3, name: "Emily Chen", role: "Tech Reviewer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=800&fit=crop" },
  { id: 4, name: "David Kim", role: "Finance Creator", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=800&fit=crop" }
];

const creatorPartners = [
  { 
    name: "TechVault", 
    category: "Tech & Gadgets", 
    feedback: "Retention Room completely transformed our pacing. View duration doubled within weeks.", 
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop",
    link: "https://youtube.com" 
  },
  { 
    name: "AlphaVlogs", 
    category: "Lifestyle & Travel", 
    feedback: "The absolute best editing team. Zero micro-management needed, pure plug-and-play.", 
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    link: "https://instagram.com" 
  },
  { 
    name: "WealthHacks", 
    category: "Finance & Crypto", 
    feedback: "CTR skyrocketed by 3.2x thanks to their obsessive thumbnail and hook engineering.", 
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    link: "https://youtube.com" 
  },
  { 
    name: "FitJourney", 
    category: "Health & Fitness", 
    feedback: "Our short-form clips cross 1M+ views consistently now. Absolute game changer.", 
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    link: "https://instagram.com" 
  },
  { 
    name: "MindsetShift", 
    category: "Podcast & Growth", 
    feedback: "Multicam podcast edits are crisp, immersive, and keep listeners glued till the very end.", 
    logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    link: "https://youtube.com" 
  },
  { 
    name: "GameSphere", 
    category: "Gaming & Esports", 
    feedback: "Fast-paced cuts and sound design are top-tier. Our audience engagement is at an all-time high.", 
    logo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
    link: "https://youtube.com" 
  },
  { 
    name: "ChefStudio", 
    category: "Food & Cooking", 
    feedback: "Cinematic color grading makes every recipe video look like a high-end Netflix documentary.", 
    logo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    link: "https://instagram.com" 
  },
  { 
    name: "StartupPulse", 
    category: "Business & SaaS", 
    feedback: "Professional, fast, and data-driven. They understand the YouTube algorithm inside out.", 
    logo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
    link: "https://youtube.com" 
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

  return (
    <div className={`${bgMain} ${textMain} font-sans min-h-screen pb-32 relative overflow-x-hidden selection:bg-[#4F46E5] selection:text-white transition-colors duration-500 w-full m-0 p-0`}>
      
      {/* THEME TOGGLE BUTTON */}
      <button 
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="fixed bottom-6 right-6 z-50 p-3 md:p-4 rounded-full bg-[#4F46E5] text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        )}
      </button>

      {/* 1. FULL-SCREEN 3D FLOATING CARDS & COLORFUL CUBES HERO SECTION */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 mb-32 overflow-hidden bg-black border-b border-white/10 m-0 pt-24 pb-24">
        
        {/* Animated 3D Floating Colorful Cards & Random 3D Cubes Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85">
          
          {/* Card 1: Blue - Retention Room */}
          <motion.div 
            animate={{ x: [-120, 180, -120], y: [-70, 120, -70], rotate: [-12, 18, -12] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] left-[8%] w-72 h-44 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-6 shadow-[0_0_60px_rgba(37,99,235,0.4)] border border-white/20 flex flex-col justify-between"
          >
            <span className="text-white/70 font-mono text-xs uppercase tracking-widest">Protocol 01</span>
            <h4 className="text-white font-black text-2xl tracking-tighter">RETENTION ROOM</h4>
            <div className="flex justify-between items-center text-white/80 text-[10px] font-bold">
              <span>ALGORITHM HACK</span>
              <span>+95% LIFT</span>
            </div>
          </motion.div>

          {/* Card 2: Cream / Gold - RR */}
          <motion.div 
            animate={{ x: [150, -150, 150], y: [100, -100, 100], rotate: [12, -18, 12] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[18%] right-[10%] w-60 h-36 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-300 p-5 shadow-[0_0_60px_rgba(251,191,36,0.3)] border border-white/40 flex flex-col justify-between text-neutral-900"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">Elite Asset</span>
            <h4 className="font-black text-4xl tracking-tighter">RR.</h4>
            <div className="flex justify-between items-center text-[10px] font-black uppercase">
              <span>HIGH CTR</span>
              <span>SCALE 50M+</span>
            </div>
          </motion.div>

          {/* Card 3: Pink - Editing */}
          <motion.div 
            animate={{ x: [-100, 140, -100], y: [180, -70, 180], rotate: [-18, 12, -18] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[12%] left-[12%] w-64 h-40 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-700 p-6 shadow-[0_0_60px_rgba(244,63,94,0.4)] border border-white/20 flex flex-col justify-between"
          >
            <span className="text-white/70 font-mono text-xs uppercase tracking-widest">Post-Production</span>
            <h4 className="text-white font-black text-2xl tracking-tighter">EDITING LAB</h4>
            <div className="flex justify-between items-center text-white/80 text-[10px] font-bold">
              <span>CINEMATIC</span>
              <span>24H TURNAROUND</span>
            </div>
          </motion.div>

          {/* Card 4: Red - Retention Room */}
          <motion.div 
            animate={{ x: [120, -120, 120], y: [-120, 150, -120], rotate: [22, -12, 22] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[15%] right-[8%] w-72 h-44 rounded-3xl bg-gradient-to-br from-red-600 to-orange-700 p-6 shadow-[0_0_60px_rgba(220,38,38,0.4)] border border-white/20 flex flex-col justify-between"
          >
            <span className="text-white/70 font-mono text-xs uppercase tracking-widest">Masterclass</span>
            <h4 className="text-white font-black text-2xl tracking-tighter">RETENTION ROOM</h4>
            <div className="flex justify-between items-center text-white/80 text-[10px] font-bold">
              <span>A/B TESTED</span>
              <span>DOMINATE</span>
            </div>
          </motion.div>

          {/* --- 4 Random Colorful Floating 3D Cubes --- */}
          {/* Cube 1: Cyan Cube */}
          <motion.div 
            animate={{ x: [-200, 220, -150, -200], y: [-150, -80, 180, -150], rotateX: [0, 180, 360, 0], rotateY: [0, 90, 270, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] left-[30%] w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(6,182,212,0.6)] border border-white/40"
          ></motion.div>

          {/* Cube 2: Purple Cube */}
          <motion.div 
            animate={{ x: [180, -220, 150, 180], y: [120, -150, -90, 120], rotateX: [360, 180, 0, 360], rotateY: [270, 90, 0, 270] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[50%] right-[25%] w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-700 shadow-[0_0_35px_rgba(168,85,247,0.6)] border border-white/40"
          ></motion.div>

          {/* Cube 3: Emerald Cube */}
          <motion.div 
            animate={{ x: [-150, 180, -200, -150], y: [160, 80, -140, 160], rotateX: [90, 270, 360, 90], rotateY: [180, 360, 90, 180] }}
            transition={{ duration: 21, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[35%] left-[35%] w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-600 shadow-[0_0_25px_rgba(52,211,153,0.6)] border border-white/40"
          ></motion.div>

          {/* Cube 4: Yellow/Orange Cube */}
          <motion.div 
            animate={{ x: [140, -180, 190, 140], y: [-180, 140, 90, -180], rotateX: [180, 0, 270, 180], rotateY: [90, 180, 360, 90] }}
            transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
            className="absolute top-[25%] right-[35%] w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-[0_0_30px_rgba(250,204,21,0.6)] border border-white/40"
          ></motion.div>

          {/* Central ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4F46E5] opacity-20 blur-[150px] pointer-events-none"></div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-4xl mx-auto px-4 py-28 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse"></span>
            Verified Impact &middot; Live Growth Pulse
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-2xl">
            Results & <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#818CF8]">Testimonials</span>
          </h1>
          <p className="text-gray-200 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg mb-8">
            Data-backed metrics, elite partner reviews, and proven algorithmic scaling stories engineered for modern creators.
          </p>

          <div className="inline-flex items-center gap-6 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-2xl">
            <span>⚡ 95% Retention Lift</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>🚀 50M+ Views Scaled</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* 2. TESTIMONIAL REVIEW VIDEOS SECTION */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mb-32">
          <div className="text-center mb-12">
            <h3 className={`text-2xl md:text-4xl font-extrabold tracking-tight ${textMain} mb-2`}>What Creators Say</h3>
            <p className={`${textMuted} text-xs md:text-sm font-medium`}>Direct feedback from channel partners scaling with us.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewVideos.map((review) => (
              <motion.div key={review.id} variants={fadeUp} className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[3/4] bg-[#111] cursor-pointer transition-all duration-300 shadow-xl w-full max-w-[280px] sm:max-w-none mx-auto border border-white/10">
                <img src={review.img} alt={review.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-[#4F46E5] transition-all duration-300">
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-5 flex flex-col justify-end">
                  <h4 className="text-white font-bold text-base">{review.name}</h4>
                  <p className="text-[#818CF8] text-[10px] font-bold uppercase tracking-wider">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3. TRUSTED CREATOR PARTNERS SHOWCASE */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="mb-32">
          <div className="text-center mb-12">
            <span className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-2 inline-block">Partner Network</span>
            <h3 className={`text-2xl md:text-4xl font-extrabold tracking-tight ${textMain} mb-2`}>Trusted by Top Channels</h3>
            <p className={`${textMuted} text-xs md:text-sm font-medium`}>Click any partner card to visit their official channel/profile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creatorPartners.map((partner, idx) => (
              <motion.a 
                key={idx} 
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp} 
                whileHover={{ scale: 1.03 }}
                className={`${bgCard} p-8 rounded-[2.5rem] border ${borderCol} shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#4F46E5]/60 hover:shadow-2xl relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#4F46E5] opacity-5 blur-xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-500/10">
                    <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-tr from-[#4F46E5] to-[#9333EA] shadow-md shrink-0">
                      <img src={partner.logo} alt={partner.name} className="w-full h-full rounded-xl object-cover bg-black" />
                    </div>
                    <div>
                      <h4 className={`text-base font-black ${textMain} group-hover:text-[#818CF8] transition-colors leading-tight`}>{partner.name}</h4>
                      <span className="text-[10px] text-[#4F46E5] font-bold uppercase tracking-wider mt-1 block">{partner.category}</span>
                    </div>
                  </div>
                  <p className={`${textMuted} text-xs md:text-sm leading-relaxed font-medium mb-6`}>"{partner.feedback}"</p>
                </div>
                <div className="pt-3 border-t border-slate-500/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider relative z-10">
                  <span className="text-gray-400 group-hover:text-white transition-colors">Visit Channel &rarr;</span>
                  <span className="text-green-500">● Active</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 4. PROFESSIONAL BOOKING CTA SECTION */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-r from-[#111] to-[#1a1528] border border-[#4F46E5]/30 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#4F46E5] opacity-20 blur-[100px] pointer-events-none"></div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">Ready to scale your channel?</h2>
          <p className="text-gray-300 text-xs md:text-sm max-w-md mx-auto mb-8 font-medium">
            Book your free consultation session today and let's map out your retention strategy.
          </p>
          <Link 
            to="/BookingForm" 
            className="inline-block bg-[#4F46E5] text-white px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-[#4338CA] hover:scale-105 transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)] cursor-pointer"
          >
            Book Free Consultation Now
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Results;