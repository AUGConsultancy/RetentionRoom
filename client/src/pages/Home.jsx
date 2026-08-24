import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// --- Reusable Animations ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- Animated Counter Component for Stats ---
const AnimatedCounter = ({ value, label, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericVal = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const increment = numericVal / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericVal) {
          setCount(numericVal);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericVal]);

  const displayCount = numericVal % 1 !== 0 
    ? count.toFixed(1) 
    : Math.floor(count);

  return (
    <div ref={ref} className="px-2 md:px-4 py-6">
      <h3 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-2 font-mono bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-white via-gray-200 to-gray-400' : 'bg-gradient-to-r from-[#0F172A] via-[#334155] to-[#1E293B]'}`}>
        {displayCount}{suffix}
      </h3>
      <p className="text-[10px] md:text-xs text-[#6366F1] font-black uppercase tracking-[0.25em]">{label}</p>
    </div>
  );
};

// --- Mock Data ---
const heroImages = [
  "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486943/Untitled1347_2.jpg.jpg",
  "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/1_Crore_Raodmap.jpg.jpg",
  "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486880/Untitled992.jpg.jpg",
  "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486939/Untitled1327_7.jpg.jpg"
];

// TOP ROW THUMBNAILS (4 Distinct Images)
const ytThumbnailsTop = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1550_5.jpg.jpg", title: "How I Scaled to 1M Subs", time: "12:45" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486947/Untitled1554_2.jpg.jpg", title: "The Perfect Editing Workflow", time: "08:20" }, 
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486946/Untitled1483.jpg.jpg", title: "Why Your Retention Sucks", time: "15:10" }, 
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486944/Untitled1461.jpg.jpg", title: "Cinematic Color Grading", time: "10:05" }, 
];

// BOTTOM ROW THUMBNAILS (4 Completely Different Images)
const ytThumbnailsBottom = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1518_2.jpg.jpg", title: "Vlog Editing Masterclass", time: "22:15" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/Untitled1415.jpg.jpg", title: "Storytelling Secrets", time: "14:30" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/1_Crore_Raodmap.jpg.jpg", title: "Faceless Channel Growth", time: "18:40" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486942/Untitled1292_4.jpg.jpg", title: "Algorithmic Secrets", time: "09:15" }
];

const portraitReels = [
  {  videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787493430/How_To_Bulid_Hook_motiongraphics_videoediting_aftereffect_editor.mp4" },
  {  videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491254/shit4_2.mp4" },
  {  videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491282/intro.mp4" },
  {  videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491532/IMG_5832.mov" }
];

const reviewVideos = [
  { 
    id: 1, 
    name: "Sarah Jenkins", 
    role: "YouTuber (1.2M Subs)", 
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
  },
  { 
    id: 2, 
    name: "Marcus Doe", 
    role: "Fitness Coach", 
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
  },
  { 
    id: 3, 
    name: "Emily Chen", 
    role: "Tech Reviewer", 
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
  },
  { 
    id: 4, 
    name: "David Kim", 
    role: "Finance Creator", 
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
  }
];

// --- 4-Step Protocol Data ---
const workflowSteps = [
  { title: "Data Discovery", desc: "We analyze audience metrics to pinpoint exact retention drop-offs." },
  { title: "Cinematic Editing", desc: "Engineering narrative pacing and visual hooks that keep viewers glued." },
  { title: "A/B Testing", desc: "Rigorous testing of thumbnails and hooks to maximize Click-Through Rates." },
  { title: "Scale & Dominate", desc: "You receive algorithm-optimized videos ready to explode channel growth." }
];

// --- 8 Premium Services ---
const coreServices = [
  {
    title: "Premium Video Editing",
    desc: "High-retention editing for YouTube, VSLs, and Documentaries. We focus on pacing, storytelling, and cinematic color grading to keep viewers hooked.",
    tags: ["Pacing", "Color Grade", "Sound Design"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  },
  {
    title: "Short-Form Viral Clips",
    desc: "Highly addictive, fast-paced vertical content designed to hack the algorithm and drive massive reach on TikTok, Reels, and YouTube Shorts.",
    tags: ["Hooks", "Captions", "Retention"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
  },
  {
    title: "Thumbnail Engineering",
    desc: "Click-optimized thumbnail design and title structuring backed by human psychology and rigorous A/B testing for maximum Click-Through Rate (CTR).",
    tags: ["CTR Focus", "A/B Testing", "Psychology"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  },
  {
    title: "Podcast Production",
    desc: "Full-stack podcast editing. Multicam switching, audio mastering, and engaging cutaways to keep your listeners and viewers hooked for hours.",
    tags: ["Multicam", "Audio Mastering", "Pacing"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
  },
  {
    title: "Trailer & Teaser Editing",
    desc: "High-impact, cinematic trailers designed to build massive hype. Perfect for course launches, documentaries, and big brand announcements.",
    tags: ["Hype", "Sound Design", "Cinematic"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
  },
  {
    title: "Social Media Management",
    desc: "End-to-end channel management. From SEO-optimized uploads and scheduling to community engagement and deep data analytics reporting.",
    tags: ["SEO", "Analytics", "Strategy"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
  },
  {
    title: "Scriptwriting & Hooks",
    desc: "We write data-backed scripts and psychological hooks that guarantee your viewers stay past the critical first 5 seconds of your video.",
    tags: ["Scripting", "Hooks", "Copywriting"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
  },
  {
    title: "Content Repurposing",
    desc: "Transform your podcasts and long-form videos into 15+ viral short-form assets. Extracting the highest-value moments for omnichannel growth.",
    tags: ["Repurposing", "Omnichannel", "Efficiency"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  }
];

const Home = () => {
  const navigate = useNavigate();

  // Theme Toggle State
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const bgMain = isDark ? "bg-[#0A0A0A]" : "bg-[#FFFFFF]"; 
  const bgCard = isDark ? "bg-[#111111]" : "bg-[#F8FAFC]";
  const textMain = isDark ? "text-white" : "text-[#0F172A]"; 
  const textMuted = isDark ? "text-gray-400" : "text-[#475569]"; 
  const borderCol = isDark ? "border-white/10" : "border-slate-100"; 

  // Hero Background Smooth Crossfade Logic
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  // Video Player Logic for Philosophy Section
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Long Form Mute State
  const [longMuted, setLongMuted] = useState(true);
  const longVideoRef = useRef(null);

  const toggleLongMute = () => {
    if (longVideoRef.current) {
      longVideoRef.current.muted = !longMuted;
      setLongMuted(!longMuted);
    }
  };

  // Lightbox Modal State
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className={`${bgMain} ${textMain} font-sans min-h-screen relative overflow-x-hidden selection:bg-[#4F46E5] selection:text-white transition-colors duration-500 w-full m-0 p-0`}>
      
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

      {/* Marquee Animations */}
      <style>{`
        @keyframes slideLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-slider-left { display: flex; width: 200%; animation: slideLeft 40s linear infinite; }
        .animate-slider-right { display: flex; width: 200%; animation: slideRight 45s linear infinite; }
        .animate-slider-left:hover, .animate-slider-right:hover { animation-play-state: paused; }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 md:pt-40 pb-24 md:pb-32 px-4 md:px-6 min-h-[85vh] md:min-h-[95vh] flex flex-col justify-center text-center overflow-hidden bg-black m-0">
        <div className="absolute inset-0 z-0 w-full h-full">
          {heroImages.map((img, index) => (
            <motion.img
              key={index} src={img} initial={{ opacity: 0 }}
              animate={{ opacity: index === heroIndex ? 0.6 : 0, scale: index === heroIndex ? 1 : 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-black/30 w-full h-full"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 md:mb-6">
            <span className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4F46E5] animate-pulse"></span>
              Retention Room
            </span>
          </motion.div>

          <motion.h1 
  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
  className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 md:mb-8 drop-shadow-md"
>
  Content That Demands Attention. <br />
  <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#818CF8]">That Drives Results.</span>
</motion.h1>

<motion.p 
  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
  className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 font-normal leading-relaxed drop-shadow"
>
  Data-driven video editing and scaling strategies for modern brands.
</motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/BookingForm" className="bg-[#4F46E5] text-white px-8 md:px-12 py-3.5 md:py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-[#4338CA] transition-all shadow-[0_0_40px_rgba(79,70,229,0.5)]">
              Start a Project
            </Link>
            <Link to="/results" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 md:px-12 py-3.5 md:py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-md cursor-pointer">
              View Results &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol} transition-colors duration-500 relative z-20 m-0`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col lg:flex-row gap-12 items-center">
            
            <motion.div variants={fadeUp} className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto lg:mx-0 relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#4F46E5]/30 shadow-[0_0_40px_rgba(79,70,229,0.15)] group shrink-0">
              <video ref={videoRef} src="https://res.cloudinary.com/pvw0f7rs/video/upload/v1787489320/IMG_5825.mp4" autoPlay loop muted={isMuted} playsInline className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button onClick={toggleMute} className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-[#4F46E5] transition-colors z-10 cursor-pointer text-white">
                {isMuted ? "🔇" : "🔊"}
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col justify-center text-center lg:text-left">
              <span className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Our Philosophy</span>
              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black ${textMain} tracking-tight leading-[1.1] mb-6`}>
                We edit for the <span className="font-serif italic text-[#4F46E5]">human brain</span>.
              </h2>
              <p className={`${textMuted} text-base md:text-lg mb-8 font-medium`}>
                We analyze pacing, craft psychological hooks, and build narrative structures that keep retention graphs flat. 
              </p>
              <ul className="space-y-4 inline-block text-left mx-auto lg:mx-0">
                {["Algorithmic Hook Engineering", "A/B Tested Pacing Strategies", "Cinematic Color & Sound"].map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 font-bold ${textMain} text-sm md:text-base`}>
                    <svg className="w-5 h-5 text-[#4F46E5] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT US */}
      <section id="about" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgMain} border-b ${borderCol} transition-colors duration-500 relative z-20 m-0`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            <motion.div variants={fadeUp} className="w-full lg:w-3/5 flex flex-col justify-center text-center lg:text-left">
              <span className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-4">About Us: Retention Room</span>
              <h2 className={`text-3xl md:text-5xl font-extrabold ${textMain} tracking-tight leading-[1.1] mb-6`}>
                We don't just edit videos. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#C084FC]">We engineer viral growth.</span>
              </h2>
              <p className={`${textMuted} text-base md:text-lg mb-8 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0`}>
                We are a specialized post-production powerhouse for elite creators and ambitious brands. When you partner with us, you aren't just getting an editor—you're getting a dedicated team that understands audience psychology and rapid execution.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className={`relative w-full lg:w-2/5 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border ${borderCol} mx-auto max-w-[400px] lg:max-w-md shrink-0`}>
              <img src="https://images.unsplash.com/photo-1627244714766-94dab62ed964?fm=jpg&q=60&w=3000&auto=format&fit=crop" alt="Editor at Work" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90"></div>
              <div className="absolute bottom-5 left-5 right-5">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-xl">
                   <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                     Dedicated Editing Lab
                   </h4>
                   <p className="text-gray-300 text-xs font-medium">Equipped to handle high-volume 4K rendering & rapid scaling.</p>
                 </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES (Marquee) */}
      <section id="works" className={`w-full py-16 md:py-28 ${bgCard} relative z-20 overflow-hidden border-b ${borderCol} transition-colors duration-500 m-0`}>
        <div className="text-center mb-10 px-4">
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight font-serif italic mb-2 ${textMain}`}>
            Let our <span className="text-[#4F46E5]">Results Speak</span>
          </h2>
          <p className={`${textMuted} font-bold uppercase tracking-widest text-[10px] md:text-xs mt-4`}>High-Converting Visual Packaging (Click to view)</p>
        </div>
        
        <div className="relative w-full overflow-hidden flex flex-col gap-6 m-0 p-0">
          <div className="animate-slider-left flex gap-6 px-3">
            {[...ytThumbnailsTop, ...ytThumbnailsTop].map((item, i) => (
              <motion.div key={`top-${i}`} whileHover={{ scale: 1.03 }} onClick={() => setActiveImage(item.img)} className={`w-[320px] sm:w-[450px] md:w-[28vw] shrink-0 aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer relative group shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            ))}
          </div>

          <div className="animate-slider-right flex gap-6 px-3">
            {[...ytThumbnailsBottom, ...ytThumbnailsBottom].map((item, i) => (
              <motion.div key={`bottom-${i}`} whileHover={{ scale: 1.03 }} onClick={() => setActiveImage(item.img)} className={`w-[320px] sm:w-[450px] md:w-[28vw] shrink-0 aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer relative group shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIRAL REELS SHOWCASE (Each card has independent mute/unmute) */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgMain} relative z-20 border-b ${borderCol} transition-colors duration-500 m-0`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Short-Form</h2>
            <h3 className={`text-3xl md:text-5xl font-black ${textMain} tracking-tight`}>Viral Reels Showcase.</h3>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {portraitReels.map((reel) => {
              const [reelMuted, setReelMuted] = useState(true);
              return (
                <motion.div key={reel.id} variants={fadeUp} whileHover={{ scale: 1.02 }} className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[9/16] bg-black shadow-xl w-full max-w-[280px] sm:max-w-none mx-auto border border-white/10">
                  <video src={reel.videoUrl} autoPlay loop muted={reelMuted} playsInline className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                      {/* <div>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-white text-[9px] font-bold mb-1.5 shadow-md inline-block">1.2M Views</span>
                        <h4 className="text-white font-bold text-base leading-tight">{reel.title}</h4>
                      </div> */}
                      <button onClick={() => setReelMuted(!reelMuted)} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white cursor-pointer hover:bg-[#4F46E5] transition-colors">
                        {reelMuted ? "🔇" : "🔊"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================== */}
{/* ============================================== */}
{/* 6. LONG-FORM MASTERPIECE */}
{/* ============================================== */}
<section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol} transition-colors duration-500 relative z-20 m-0`}>
  <div className="max-w-7xl mx-auto px-4">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12 md:mb-16">
      <h2 className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Long-Form Excellence</h2>
      <h3 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${textMain} tracking-tight`}>Cinematic Deep Dives.</h3>
    </motion.div>
    
    <motion.div 
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
      whileHover={{ scale: 1.01 }}
      className={`group relative w-full aspect-[4/3] sm:aspect-video md:aspect-[18/9] min-h-[450px] md:min-h-[550px] rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black shadow-2xl mx-auto border ${borderCol} flex flex-col justify-end`}
    >
      <video ref={longVideoRef} src="https://res.cloudinary.com/pvw0f7rs/video/upload/v1787489877/Teaser.mp4" autoPlay loop muted={longMuted} playsInline className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">
         <div className="relative w-full flex items-center justify-end">
            {/* Mute/Unmute Button positioned cleanly at the Bottom-Right Corner */}
            <button onClick={toggleLongMute} className="px-5 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white cursor-pointer hover:bg-[#4F46E5] hover:border-[#4F46E5] transition-all shadow-2xl font-bold text-xs uppercase tracking-wider">
              {longMuted ? "🔇 Mute" : "🔊 Unmute"}
            </button>
         </div>
      </div>
    </motion.div>
  </div>
</section>
      {/* 7. REVIEW VIDEOS (Each review card has independent mute/unmute) */}
      <section id="testimonials" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgMain} border-b ${borderCol} transition-colors duration-500 m-0`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Client Results</h2>
            <h3 className={`text-3xl md:text-5xl font-extrabold ${textMain} tracking-tight`}>Don't just take our word for it.</h3>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {reviewVideos.map((review) => {
              const [reviewMuted, setReviewMuted] = useState(true);

              return (
                <motion.div key={review.id} variants={fadeUp} className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[3/4] bg-black shadow-xl w-full max-w-[280px] sm:max-w-none mx-auto border border-white/10">
                  <video 
                    src={review.videoUrl} 
                    autoPlay 
                    loop 
                    muted={reviewMuted} 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                  />
                  
                  <button 
                    onClick={() => setReviewMuted(!reviewMuted)} 
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#4F46E5] transition-colors z-10 border border-white/20 text-xs"
                  >
                    {reviewMuted ? "🔇" : "🔊"}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-5 flex flex-col justify-end pointer-events-none">
                    <h4 className="text-white font-bold text-base">{review.name}</h4>
                    <p className="text-[#4F46E5] text-[10px] font-bold uppercase tracking-wider">{review.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 8. EXTENDED AGENCY SERVICES */}
      <section id="services" className={`w-full py-16 md:py-24 px-4 md:px-6 relative z-20 ${bgCard} border-b ${borderCol} transition-colors duration-500 m-0`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Our Expertise</h2>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${textMain} tracking-tight`}>Built for Algorithm Domination.</h3>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <motion.div key={index} variants={fadeUp} whileHover={{ scale: 1.02 }} className={`relative group ${bgMain} p-6 md:p-8 rounded-2xl md:rounded-[2rem] border ${borderCol} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full`}>
                <div className="w-12 h-12 rounded-full bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5] mb-5 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors duration-300">{service.icon}</div>
                <h4 className={`text-lg md:text-xl font-bold ${textMain} mb-2`}>{service.title}</h4>
                <p className={`${textMuted} text-xs md:text-sm leading-relaxed mb-6 flex-1`}>{service.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag, i) => (
                    <span key={i} className={`text-[9px] md:text-[10px] font-bold px-2 py-1 rounded bg-[#4F46E5]/10 text-[#4F46E5] border ${isDark ? 'border-[#4F46E5]/20' : 'border-transparent'}`}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. PERFORMANCE STATS */}
      <section className={`w-full py-12 md:py-20 ${bgMain} relative z-20 border-b ${borderCol} transition-colors duration-500 m-0`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className={`max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center md:divide-x ${borderCol}`}>
          {[
            { label: "Retention Lift", value: "95%" },
            { label: "Views Scaled", value: "50M+" },
            { label: "Elite Creators", value: "40+" },
            { label: "CTR Boost", value: "3.2x" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <AnimatedCounter value={stat.value} label={stat.label} isDark={isDark} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 10. HOW WE WORK */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 relative z-20 ${bgCard} border-b ${borderCol} transition-colors duration-500 m-0`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Workflow</h2>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black ${textMain} tracking-tight`}>Our Proven Protocol.</h3>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {workflowSteps.map((item, index) => (
              <motion.div key={index} variants={fadeUp} whileHover={{ scale: 1.02 }} className={`${bgMain} p-8 rounded-2xl md:rounded-[2rem] border ${borderCol} shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-center`}>
                 <div>
                   <h4 className={`text-xl font-black ${textMain} mb-3`}>{item.title}</h4>
                   <p className={`${textMuted} text-sm leading-relaxed font-medium`}>{item.desc}</p>
                 </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 11. LEADERSHIP SECTION */}
      <section className={`w-full py-28 px-4 md:px-6 ${bgMain} border-b ${borderCol} relative z-20 transition-colors duration-500 m-0`}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <h3 className={`text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight ${textMain} mb-2`}>
              Meet the creators behind
            </h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#C084FC]">
              The Creators
            </h2>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto items-center justify-center">
            
            <motion.div variants={fadeUp} className="flex flex-col items-center text-center group">
              <div onClick={() => setActiveImage("https://res.cloudinary.com/doa6d6cyf/image/upload/v1787471741/file_00000000cacc8211a11dfbddeefaa6c0_xhfmmk.png")} className="relative w-56 h-72 md:w-64 md:h-80 rounded-t-[160px] rounded-b-[40px] overflow-hidden mb-6 bg-[#EAE4DC] shadow-xl cursor-pointer hover:scale-105 transition-transform duration-500 border border-black/10">
                <img src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787471741/file_00000000cacc8211a11dfbddeefaa6c0_xhfmmk.png" alt="Prince" className="w-full h-full object-cover object-top" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </div>
              <div>
                <h4 className={`text-2xl font-bold ${textMain} mb-1 tracking-tight`}>Prince</h4>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Founder</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-center text-center group">
              <div onClick={() => setActiveImage("https://res.cloudinary.com/doa6d6cyf/image/upload/v1787472280/ChatGPT_Image_Aug_23_2026_01_32_56_PM_xtr414.png")} className="relative w-56 h-72 md:w-64 md:h-80 rounded-t-[160px] rounded-b-[40px] overflow-hidden mb-6 bg-[#EAE4DC] shadow-xl cursor-pointer hover:scale-105 transition-transform duration-500 border border-black/10">
                <img src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787472280/ChatGPT_Image_Aug_23_2026_01_32_56_PM_xtr414.png" alt="Rishabh Thakur" className="w-full h-full object-cover object-top" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </div>
              <div>
                <h4 className={`text-2xl font-bold ${textMain} mb-1 tracking-tight`}>Rishabh Thakur</h4>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Co-Founder</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 12. DIRECT CONTACT */}
      <section className={`w-full py-20 px-4 md:px-6 ${bgCard} border-b ${borderCol} relative z-20 m-0`}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-[#4F46E5] text-[10px] font-black uppercase tracking-[0.2em] mb-3 inline-block">Direct Access</span>
            <h2 className={`text-3xl sm:text-4xl md:text-6xl font-black ${textMain} tracking-tight mb-4`}>
              Connect With Us <span className="font-serif italic text-[#4F46E5]">Instantly.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }} className={`${bgMain} p-8 rounded-3xl border ${borderCol} shadow-xl flex flex-col justify-between`}>
              <div>
                <h3 className={`text-xl font-bold ${textMain} mb-2`}>Call Now</h3>
                <p className={`${textMuted} text-sm mb-6`}>Instant connection for urgent project inquiries and discussions.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:+919463631484" className="py-3 bg-[#4F46E5] text-white rounded-xl font-bold text-xs text-center uppercase">Call</a>
                <a href="https://wa.me/919463631484" target="_blank" rel="noopener noreferrer" className="py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs text-center uppercase">WhatsApp</a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }} className={`${bgMain} p-8 rounded-3xl border ${borderCol} shadow-xl flex flex-col justify-between`}>
              <div>
                <h3 className={`text-xl font-bold ${textMain} mb-2`}>Call Now</h3>
                <p className={`${textMuted} text-sm mb-6`}>Connect for creative direction, pacing, and strategy consultations.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:+917665627495" className="py-3 bg-[#4F46E5] text-white rounded-xl font-bold text-xs text-center uppercase">Call</a>
                <a href="https://wa.me/917665627495" target="_blank" rel="noopener noreferrer" className="py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs text-center uppercase">WhatsApp</a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }} className={`${bgMain} p-8 rounded-3xl border ${borderCol} shadow-xl flex flex-col justify-between`}>
              <div>
                <h3 className={`text-xl font-bold ${textMain} mb-2`}>Instagram Social</h3>
                <p className={`${textMuted} text-sm mb-6`}>Explore our cinematic reels, edits, and behind-the-scenes work.</p>
              </div>
              <a href="https://www.instagram.com/retentionroom?igsi=MTl2dXplcGIydzgwZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-xl font-bold text-xs text-center uppercase block">View Instagram ID</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 13. PRE-FOOTER CTA */}
      <section id="booking" className={`w-full py-16 md:py-28 px-4 md:px-6 relative z-20 ${bgCard} transition-colors duration-500 m-0`}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-[#050505] border border-[#4F46E5]/30 shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">Ready to dominate?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-10 font-medium">Transform your channel's retention trajectory with our elite editing protocol.</p>
          <Link to="/BookingForm" className="inline-block bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">Start a Project</Link>
        </motion.div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer">
            <div className="relative max-w-5xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden p-2" onClick={(e) => e.stopPropagation()}>
              <img src={activeImage} alt="Preview" className="w-full h-auto max-h-[85vh] object-contain mx-auto" />
              <button onClick={() => setActiveImage(null)} className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-full">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;