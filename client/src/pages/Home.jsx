import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// --- Reusable Animations ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

// --- Animated Counter Component for Stats ---
const AnimatedCounter = ({ value, label }) => {
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
    <div ref={ref} className="px-3 py-6">
      <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-2 font-mono text-[#1E3A8A]">
        {displayCount}{suffix}
      </h3>
      <p className="text-xs text-[#1D4ED8] font-extrabold uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
};

// --- Mock Data ---
const heroImages = [
  { url: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486943/Untitled1347_2.jpg.jpg", alt: "Creator workspace setup with editing timeline" },
  { url: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/1_Crore_Raodmap.jpg.jpg", alt: "Channel growth roadmap and analytics graph" },
  { url: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486880/Untitled992.jpg.jpg", alt: "Cinematic video editing color grading suite" },
  { url: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486939/Untitled1327_7.jpg.jpg", alt: "High-converting video thumbnail design preview" }
];

const ytThumbnailsTop = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1550_5.jpg.jpg", title: "How I Scaled to 1M Subs" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486947/Untitled1554_2.jpg.jpg", title: "The Perfect Editing Workflow" }, 
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486946/Untitled1483.jpg.jpg", title: "Why Your Retention Sucks" }, 
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486944/Untitled1461.jpg.jpg", title: "Cinematic Color Grading" }, 
];

const ytThumbnailsBottom = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1518_2.jpg.jpg", title: "Vlog Editing Masterclass" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/Untitled1415.jpg.jpg", title: "Storytelling Secrets" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/1_Crore_Raodmap.jpg.jpg", title: "Faceless Channel Growth" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486942/Untitled1292_4.jpg.jpg", title: "Algorithmic Secrets" }
];

const portraitReels = [
  { id: 1, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787493430/How_To_Bulid_Hook_motiongraphics_videoediting_aftereffect_editor.mp4", title: "Hook Building Masterclass" },
  { id: 2, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491254/shit4_2.mp4", title: "Viral Short Form Edit" },
  { id: 3, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491282/intro.mp4", title: "Cinematic Channel Intro" },
  { id: 4, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491532/IMG_5832.mov", title: "High Retention Motion Graphics" }
];

const reviewVideos = [
  { id: 1, name: "Sarah Jenkins", role: "YouTuber (1.2M Subs)", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, name: "Marcus Doe", role: "Fitness Coach", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, name: "Emily Chen", role: "Tech Reviewer", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, name: "David Kim", role: "Finance Creator", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
];

const workflowSteps = [
  { title: "Data Discovery", desc: "We analyze audience metrics to pinpoint exact retention drop-offs." },
  { title: "Cinematic Editing", desc: "Engineering narrative pacing and visual hooks that keep viewers glued." },
  { title: "A/B Testing", desc: "Rigorous testing of thumbnails and hooks to maximize Click-Through Rates." },
  { title: "Scale & Dominate", desc: "You receive algorithm-optimized videos ready to explode channel growth." }
];

const coreServices = [
  {
    title: "Premium Video Editing",
    desc: "High-retention editing for YouTube, VSLs, and Documentaries with cinematic pacing.",
    tags: ["Pacing", "Color Grade"],
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  },
  {
    title: "Short-Form Viral Clips",
    desc: "Fast-paced vertical content designed to hack the algorithm on TikTok and Reels.",
    tags: ["Hooks", "Captions"],
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
  },
  {
    title: "Thumbnail Engineering",
    desc: "Click-optimized thumbnail design backed by psychology for maximum CTR.",
    tags: ["CTR Focus", "A/B Testing"],
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  },
  {
    title: "Podcast Production",
    desc: "Full-stack podcast editing with multicam switching and audio mastering.",
    tags: ["Multicam", "Audio"],
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
  }
];

const Home = () => {
  const navigate = useNavigate();

  const bgMain = "bg-[#FDFBF7]";       
  const bgCard = "bg-[#F4F1EA]";       
  const bgPureWhite = "bg-[#FFFFFF]";  
  const textMain = "text-[#0F172A]";   
  const textMuted = "text-[#334155]";  
  const borderCol = "border-blue-900/15"; 

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const [longMuted, setLongMuted] = useState(true);
  const longVideoRef = useRef(null);
  const toggleLongMute = () => {
    if (longVideoRef.current) {
      longVideoRef.current.muted = !longMuted;
      setLongMuted(!longMuted);
    }
  };

  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className={`${bgMain} ${textMain} font-sans min-h-screen relative overflow-x-hidden selection:bg-[#1D4ED8] selection:text-white w-full m-0 p-0`}>
      
      <style>{`
        @keyframes slideLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-slider-left { display: flex; width: 200%; animation: slideLeft 18s linear infinite; }
        .animate-slider-right { display: flex; width: 200%; animation: slideRight 20s linear infinite; }
        .animate-slider-left:hover, .animate-slider-right:hover { animation-play-state: paused; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-36 pb-28 md:py-44 px-4 md:px-6 min-h-[90vh] md:min-h-[95vh] flex flex-col justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 w-full h-full">
          {heroImages.map((item, index) => (
            <motion.img
              key={index} 
              src={item.url} 
              alt={item.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === heroIndex ? 0.65 : 0, scale: index === heroIndex ? 1 : 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full px-4 pt-6">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/40 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
              Retention Room
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 drop-shadow-xl"
          >
            Content That Demands Attention. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#F3E8FF] to-[#C084FC]">That Drives Results.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 font-medium leading-relaxed drop-shadow"
          >
            Data-driven video editing and scaling strategies for modern brands.
          </motion.p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/BookingForm" className="bg-[#2563EB] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 hover:bg-[#1D4ED8] transition-all shadow-xl">
              Start a Project
            </Link>
            <Link to="/results" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-md">
              View Results &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full max-w-[300px] md:max-w-[340px] mx-auto relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#2563EB]/30 shadow-2xl group shrink-0">
              <video 
                ref={videoRef} 
                src="https://res.cloudinary.com/pvw0f7rs/video/upload/v1787489320/IMG_5825.mp4" 
                autoPlay 
                loop 
                muted={isMuted} 
                playsInline 
                aria-label="Philosophy video demonstration"
                className="absolute inset-0 w-full h-full object-cover" 
              >
                <track kind="captions" src="" srcLang="en" label="English captions" default />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button aria-label="Toggle mute" onClick={toggleMute} className="absolute bottom-4 right-4 w-12 h-12 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white cursor-pointer hover:bg-[#1D4ED8] text-base transition-colors">
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>

            <div className="flex flex-col justify-center text-center lg:text-left">
              <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-3">Our Philosophy</span>
              <h2 className={`text-3xl md:text-5xl font-black ${textMain} tracking-tight leading-[1.1] mb-6`}>
                We edit for the <span className="font-serif italic text-[#1D4ED8]">human brain</span>.
              </h2>
              <p className={`${textMuted} text-base md:text-lg mb-8 font-semibold`}>
                We analyze pacing, craft psychological hooks, and build narrative structures that keep retention graphs flat. 
              </p>
              <ul className="space-y-3 inline-block text-left mx-auto lg:mx-0">
                {["Algorithmic Hook Engineering", "A/B Tested Pacing Strategies", "Cinematic Color & Sound"].map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 font-bold ${textMain} text-sm md:text-base`}>
                    <svg className="w-5 h-5 text-[#1D4ED8] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US */}
      <section id="about" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-3/5 flex flex-col justify-center text-center lg:text-left">
              <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-3">About Us</span>
              <h2 className={`text-3xl md:text-5xl font-extrabold ${textMain} tracking-tight leading-[1.1] mb-6`}>
                We don't just edit videos. <br className="hidden md:block" />
                <span className="text-[#1E3A8A]">We engineer viral growth.</span>
              </h2>
              <p className={`${textMuted} text-base md:text-lg font-semibold leading-relaxed max-w-2xl mx-auto lg:mx-0`}>
                We are a specialized post-production powerhouse for elite creators. When you partner with us, you get a dedicated team that understands audience psychology.
              </p>
            </div>

            <div className={`relative w-full lg:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border ${borderCol} mx-auto max-w-[400px] shrink-0`}>
              <img src="https://images.unsplash.com/photo-1627244714766-94dab62ed964?fm=jpg&q=60&w=3000&auto=format&fit=crop" alt="Editor working in a dedicated video editing and color grading studio lab" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5">
                 <div className="bg-black/60 backdrop-blur-md border border-white/40 px-4 py-3 rounded-xl shadow-lg">
                   <h3 className="text-white font-extrabold text-sm mb-1 flex items-center gap-2">
                     <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                     Dedicated Editing Lab
                   </h3>
                   <p className="text-gray-200 font-medium text-xs">High-volume 4K rendering & rapid scaling.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES */}
      <section id="works" className={`w-full py-16 md:py-24 ${bgCard} border-b ${borderCol} overflow-hidden`}>
        <div className="text-center mb-10 px-4">
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight font-serif italic mb-2 ${textMain}`}>
            Let our <span className="text-[#1D4ED8]">Results Speak</span>
          </h2>
          <p className={`${textMuted} font-bold tracking-wide text-xs mt-2 flex items-center justify-center gap-2`}>
            <span>Visual Packaging</span> &bull; <span className="text-[#1D4ED8]">Swipe/Scroll Horizontally</span>
          </p>
        </div>
        
        <div className="relative w-full overflow-hidden flex flex-col gap-6">
          <div className="animate-slider-left flex gap-6 px-3">
            {[...ytThumbnailsTop, ...ytThumbnailsTop].map((item, i) => (
              <div key={`top-${i}`} onClick={() => setActiveImage(item.img)} className={`w-[260px] sm:w-[400px] shrink-0 aspect-video rounded-2xl overflow-hidden cursor-pointer relative shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <div className="animate-slider-right flex gap-6 px-3">
            {[...ytThumbnailsBottom, ...ytThumbnailsBottom].map((item, i) => (
              <div key={`bottom-${i}`} onClick={() => setActiveImage(item.img)} className={`w-[260px] sm:w-[400px] shrink-0 aspect-video rounded-2xl overflow-hidden cursor-pointer relative shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIRAL REELS SHOWCASE */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-2 block">Short-Form</span>
            <h3 className={`text-3xl md:text-5xl font-black ${textMain} tracking-tight`}>Viral Reels Showcase</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {portraitReels.map((reel) => {
              const [reelMuted, setReelMuted] = useState(true);
              return (
                <div key={reel.id} className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-black shadow-xl border border-blue-900/10">
                  <video 
                    src={reel.videoUrl} 
                    autoPlay 
                    loop 
                    muted={reelMuted} 
                    playsInline 
                    aria-label={reel.title}
                    className="absolute inset-0 w-full h-full object-cover" 
                  >
                    <track kind="captions" src="" srcLang="en" label="English captions" default />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <button aria-label="Toggle reel mute" onClick={() => setReelMuted(!reelMuted)} className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#1D4ED8] text-sm self-end transition-colors">
                      {reelMuted ? "🔇" : "🔊"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LONG-FORM MASTERPIECE */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-2 block">Long-Form Excellence</span>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${textMain} tracking-tight`}>Cinematic Deep Dives</h3>
          </div>
          
          <div className={`relative w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-2xl mx-auto border ${borderCol}`}>
            <video 
              ref={longVideoRef} 
              src="https://res.cloudinary.com/pvw0f7rs/video/upload/v1787489877/Teaser.mp4" 
              autoPlay 
              loop 
              muted={longMuted} 
              playsInline 
              aria-label="Cinematic long form teaser showcase"
              className="absolute inset-0 w-full h-full object-cover" 
            >
              <track kind="captions" src="" srcLang="en" label="English captions" default />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 md:p-8">
               <div className="flex justify-end">
                  <button aria-label="Toggle long video mute" onClick={toggleLongMute} className="px-5 py-3 rounded-full bg-black/80 backdrop-blur-md border border-white/30 flex items-center gap-2 text-white cursor-pointer hover:bg-[#1D4ED8] text-xs font-bold uppercase transition-colors shadow">
                    {longMuted ? "🔇 Mute" : "🔊 Unmute"}
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEW VIDEOS */}
      <section id="testimonials" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-2 block">Client Results</span>
            <h3 className={`text-3xl md:text-5xl font-extrabold ${textMain} tracking-tight`}>Don't just take our word for it</h3>
          </div>
          
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible no-scrollbar pb-4 sm:pb-0 px-2 sm:px-0">
            {reviewVideos.map((review) => {
              const [reviewMuted, setReviewMuted] = useState(true);
              return (
                <div key={review.id} className="min-w-[240px] sm:min-w-0 flex-1 group relative rounded-2xl overflow-hidden aspect-[3/4] bg-black shadow-xl border border-blue-900/10 shrink-0">
                  <video 
                    src={review.videoUrl} 
                    autoPlay 
                    loop 
                    muted={reviewMuted} 
                    playsInline 
                    aria-label={`Testimonial video from ${review.name}`}
                    className="absolute inset-0 w-full h-full object-cover" 
                  >
                    <track kind="captions" src="" srcLang="en" label="English captions" default />
                  </video>
                  
                  <button aria-label="Toggle review mute" onClick={() => setReviewMuted(!reviewMuted)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#1D4ED8] text-sm z-10 transition-colors">
                    {reviewMuted ? "🔇" : "🔊"}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 flex flex-col justify-end">
                    <h3 className="text-white font-extrabold text-base drop-shadow">{review.name}</h3>
                    <p className="text-blue-300 font-bold text-xs uppercase tracking-wider drop-shadow">{review.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SERVICES */}
      <section id="services" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-2 block">Our Expertise</span>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${textMain} tracking-tight`}>Built for Algorithm Domination</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <div key={index} className={`relative group ${bgPureWhite} p-6 md:p-8 rounded-2xl border ${borderCol} shadow-sm flex flex-col h-full hover:shadow-md transition-shadow`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#1D4ED8] mb-5">{service.icon}</div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>{service.title}</h3>
                <p className={`${textMuted} text-xs md:text-sm font-semibold leading-relaxed mb-6 flex-1`}>{service.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1 rounded bg-blue-100 text-[#1E3A8A] border border-blue-300">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STATS */}
      <section className={`w-full py-12 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Retention Lift", value: "95%" },
            { label: "Views Scaled", value: "50M+" },
            { label: "Elite Creators", value: "40+" },
            { label: "CTR Boost", value: "3.2x" }
          ].map((stat, idx) => (
            <AnimatedCounter key={idx} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* 10. WORKFLOW */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-2 block">Workflow</span>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black ${textMain} tracking-tight`}>Our Proven Protocol</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((item, index) => (
              <div key={index} className={`${bgPureWhite} p-8 rounded-2xl border ${borderCol} shadow-sm`}>
                 <h3 className={`text-xl font-black ${textMain} mb-3`}>{item.title}</h3>
                 <p className={`${textMuted} text-sm font-semibold leading-relaxed`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. LEADERSHIP */}
      <section className={`w-full py-20 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight mb-2">Meet the creators behind</h2>
          <p className="text-3xl sm:text-4xl font-serif italic font-extrabold text-[#1E3A8A] mb-12">
            Retention Room
          </p>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div onClick={() => setActiveImage("https://res.cloudinary.com/doa6d6cyf/image/upload/v1787471741/file_00000000cacc8211a11dfbddeefaa6c0_xhfmmk.png")} className="w-full max-w-[220px] h-60 sm:h-72 rounded-t-[100px] sm:rounded-t-[140px] rounded-b-[30px] overflow-hidden mb-4 bg-blue-50 shadow-xl cursor-pointer border border-blue-900/10">
                <img src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787471741/file_00000000cacc8211a11dfbddeefaa6c0_xhfmmk.png" alt="Prince, Founder of Retention Room" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className={`text-lg sm:text-xl font-extrabold ${textMain}`}>Prince</h3>
              <p className="text-[#1D4ED8] text-xs sm:text-sm font-bold tracking-wider">Founder</p>
            </div>

            <div className="flex flex-col items-center">
              <div onClick={() => setActiveImage("https://res.cloudinary.com/doa6d6cyf/image/upload/v1787472280/ChatGPT_Image_Aug_23_2026_01_32_56_PM_xtr414.png")} className="w-full max-w-[220px] h-60 sm:h-72 rounded-t-[100px] sm:rounded-t-[140px] rounded-b-[30px] overflow-hidden mb-4 bg-blue-50 shadow-xl cursor-pointer border border-blue-900/10">
                <img src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787472280/ChatGPT_Image_Aug_23_2026_01_32_56_PM_xtr414.png" alt="Rishabh Thakur, Co-Founder of Retention Room" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className={`text-lg sm:text-xl font-extrabold ${textMain}`}>Rishabh Thakur</h3>
              <p className="text-[#1D4ED8] text-xs sm:text-sm font-bold tracking-wider">Co-Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. DIRECT CONTACT */}
      <section className={`w-full py-16 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-2 block">Direct Access</span>
            <h2 className={`text-3xl sm:text-4xl font-black ${textMain} tracking-tight`}>Connect Instantly</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${bgPureWhite} p-6 rounded-2xl border ${borderCol} shadow-lg flex flex-col justify-between`}>
              <div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>Project Inquiries</h3>
                <p className={`${textMuted} text-xs font-semibold mb-6`}>Instant connection for project quotes.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+919463631484" className="py-2.5 bg-[#1E3A8A] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-[#1D4ED8]">Call</a>
                <a href="https://wa.me/919463631484" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#1E3A8A] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-[#1D4ED8]">WhatsApp</a>
              </div>
            </div>

            <div className={`${bgPureWhite} p-6 rounded-2xl border ${borderCol} shadow-lg flex flex-col justify-between`}>
              <div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>Strategy Consultations</h3>
                <p className={`${textMuted} text-xs font-semibold mb-6`}>Connect for creative direction.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+917665627495" className="py-2.5 bg-[#1E3A8A] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-[#1D4ED8]">Call</a>
                <a href="https://wa.me/917665627495" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#1E3A8A] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-[#1D4ED8]">WhatsApp</a>
              </div>
            </div>

            <div className={`${bgPureWhite} p-6 rounded-2xl border ${borderCol} shadow-lg flex flex-col justify-between`}>
              <div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>Instagram Social</h3>
                <p className={`${textMuted} text-xs font-semibold mb-6`}>Explore our cinematic reels & edits.</p>
              </div>
              <a href="https://www.instagram.com/retentionroom?igsi=MTl2dXplcGIydzgwZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#1E3A8A] text-white rounded-xl font-bold text-xs text-center uppercase block hover:bg-[#1D4ED8]">View Instagram</a>
            </div>
          </div>
        </div>
      </section>

      {/* 13. PRE-FOOTER CTA */}
      <section className={`w-full py-16 px-4 md:px-6 ${bgCard}`}>
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#1E3A8A] border border-blue-400/30 shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Ready to dominate?</h2>
          <p className="text-blue-100 max-w-lg mx-auto mb-8 font-semibold text-sm">Transform your channel's retention trajectory with our elite editing protocol.</p>
          <Link to="/BookingForm" className="inline-block bg-white text-[#1E3A8A] px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl">Start a Project</Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer">
            <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden p-2" onClick={(e) => e.stopPropagation()}>
              <img src={activeImage} alt="Fullscreen preview" className="w-full h-auto max-h-[85vh] object-contain mx-auto" />
              <button aria-label="Close lightbox" onClick={() => setActiveImage(null)} className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-full">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;