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
      <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-2 font-mono text-[#0052FF]">
        {displayCount}{suffix}
      </h3>
      <p className="text-xs text-[#0052FF] font-extrabold uppercase tracking-[0.2em]">{label}</p>
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

// 3 Unique Thumbnail Arrays for 3 Rows
const ytThumbnailsRow1 = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1550_5.jpg.jpg", title: "How I Scaled to 1M Subs" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486947/Untitled1554_2.jpg.jpg", title: "The Perfect Editing Workflow" }, 
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486946/Untitled1483.jpg.jpg", title: "Why Your Retention Sucks" }, 
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486944/Untitled1461.jpg.jpg", title: "Cinematic Color Grading" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486943/Untitled1347_2.jpg.jpg", title: "Extra Thumb 1" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/1_Crore_Raodmap.jpg.jpg", title: "Extra Thumb 2" }
];

const ytThumbnailsRow2 = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1518_2.jpg.jpg", title: "Vlog Editing Masterclass" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486941/Untitled1415.jpg.jpg", title: "Storytelling Secrets" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1788078135/Copy_of_Untitled1274_2.jpg", title: "Faceless Channel Growth" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486942/Untitled1292_4.jpg.jpg", title: "Algorithmic Secrets" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486880/Untitled992.jpg.jpg", title: "Extra Thumb 3" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486939/Untitled1327_7.jpg.jpg", title: "Extra Thumb 4" }
];

const ytThumbnailsRow3 = [
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1788078130/Copy_of_Untitled1271_1.jpg", title: "Extra Thumb 5" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1788078128/Untitled1593.jpg.jpg", title: "Extra Thumb 6" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1787486945/Untitled1518_2.jpg.jpg", title: "Extra Thumb 7" },
  { img: "https://res.cloudinary.com/pvw0f7rs/image/upload/v1788078130/Untitled1372_1.jpg", title: "Extra Thumb 8" }
];

const portraitReels = [
  { id: 1, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787493430/How_To_Bulid_Hook_motiongraphics_videoediting_aftereffect_editor.mp4", title: "Hook Building Masterclass" },
  { id: 2, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491254/shit4_2.mp4", title: "Viral Short Form Edit" },
  { id: 3, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491282/intro.mp4", title: "Cinematic Channel Intro" },
  { id: 4, videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1787491532/IMG_5832.mov", title: "High Retention Motion Graphics" }
];

const reviewVideos = [
  { id: 1, name: "Rittik baheti", role: "Education Creator", videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1788076640/IMG_5930.mov" },
  { id: 2, name: "Arpit Sharma", role: "Finance Creator", videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1788076292/Img_5178.mp4" },
  { id: 3, name: "Dr. Parth Goyal", role: "Education & Podcaster", videoUrl: "https://res.cloudinary.com/pvw0f7rs/video/upload/v1788077821/IMG_5941.mp4" }
];

// Exactly 7 Creator Partners with precise photos, names, feedback & links
const creatorPartners = [
  { 
    name: "Arpit Sharma", 
    category: "Finance Creator",
    feedback: "Their advanced YouTube channel management and structured SEO doubled our organic reach in under 3 months.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_12.34.43_PM_zacdks.jpg",
    link: "http://www.youtube.com/@arpitsharmai" 
  },
  { 
    name: "Creative Learning", 
    category: "Education",
    feedback: "The thumbnail engineering and psychological hook pacing completely transformed our CTR and viewer retention.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026978/WhatsApp_Image_2026-08-29_at_11.23.28_AM_ngsauw.jpg",
    link: "http://www.youtube.com/@creativelearning2.0" 
  },
  { 
    name: "Parth Goyal", 
    category: "Education",
    feedback: "Flawless video editing and retention strategies. Our long-form study lectures now maintain a flat drop-off graph.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_12.19.43_PM_rwicmp.jpg",
    link: "http://www.youtube.com/@ParthGoyal" 
  },
  { 
    name: "Sudhanshu MBBS", 
    category: "Medical & Health",
    feedback: "High-end cinematic editing combined with robust channel management. Absolutely top-tier execution.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_11.20.47_AM_mbzaem.jpg",
    link: "https://www.youtube.com/@SudhanshuMBBS" 
  },
  { 
    name: "Deepak AIIMS", 
    category: "Health & Education",
    feedback: "Their data-driven SEO framework and thumbnail psychology pushed our videos straight to the top of search rankings.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_12.27.12_PM_rtmkry.jpg",
    link: "http://www.youtube.com/@DeepakAIIMSonian" 
  },
  { 
    name: "Rittik Behati", 
    category: "Education",
    feedback: "Fast turnaround times and stunning color grading. They treat our channel like their own startup.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026976/WhatsApp_Image_2026-08-29_at_11.17.52_AM_e3vhli.jpg",
    link: "http://www.youtube.com/@RittikBaheti" 
  },
  { 
    name: "Your Nishant", 
    category: "Digital Creator",
    feedback: "From raw footage to viral storytelling masters. Our audience engagement metrics have never looked better.", 
    avatar: "https://res.cloudinary.com/doa6d6cyf/image/upload/v1788026977/WhatsApp_Image_2026-08-29_at_11.15.34_AM_vedwyx.jpg",
    link: "http://www.youtube.com/@yournishaant" 
  }
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

  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className={`${bgMain} ${textMain} font-sans min-h-screen relative overflow-x-hidden selection:bg-[#0052FF] selection:text-white w-full m-0 p-0`}>
      
      <style>{`
        @keyframes slideLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-slider-left { display: flex; width: 200%; animation: slideLeft 12s linear infinite; will-change: transform; }
        .animate-slider-right { display: flex; width: 200%; animation: slideRight 14s linear infinite; will-change: transform; }
        .animate-slider-left:hover, .animate-slider-right:hover { animation-play-state: running !important; }
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
              <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse"></span>
              Retention Room
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 drop-shadow-xl"
          >
            Content That Demands Attention. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-400">That Drives Results.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 font-medium leading-relaxed drop-shadow"
          >
            Data-driven video editing and scaling strategies for modern brands.
          </motion.p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/BookingForm" className="bg-[#0052FF] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 hover:bg-blue-700 transition-all shadow-xl">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SUCCESS STORIES (3-Row Distinct Thumbnail Marquee Restored & Fast) */}
      <section id="works" className={`w-full py-16 md:py-24 ${bgCard} border-b ${borderCol} overflow-hidden`}>
        <div className="text-center mb-10 px-4">
          <h2 className={`text-3xl md:text-5xl font-serif italic font-extrabold tracking-tight mb-2 ${textMain}`}>
            Let our <span className="text-[#0052FF]">Results Speak</span>
          </h2>
          <p className={`${textMuted} font-bold tracking-wide text-xs mt-2 flex items-center justify-center gap-2`}>
            <span>Visual Packaging</span> &bull; <span className="text-[#0052FF]">Swipe/Scroll Horizontally</span>
          </p>
        </div>
        
        <div className="relative w-full overflow-hidden flex flex-col gap-6">
          {/* Row 1: Left Marquee */}
          <div className="animate-slider-left flex gap-6 px-3">
            {[...ytThumbnailsRow1, ...ytThumbnailsRow1].map((item, i) => (
              <div key={`row1-${i}`} onClick={() => setActiveImage(item.img)} className={`w-[260px] sm:w-[400px] shrink-0 aspect-video rounded-2xl overflow-hidden cursor-pointer relative shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Row 2: Right Marquee */}
          <div className="animate-slider-right flex gap-6 px-3">
            {[...ytThumbnailsRow2, ...ytThumbnailsRow2].map((item, i) => (
              <div key={`row2-${i}`} onClick={() => setActiveImage(item.img)} className={`w-[260px] sm:w-[400px] shrink-0 aspect-video rounded-2xl overflow-hidden cursor-pointer relative shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Row 3: Left Marquee */}
          <div className="animate-slider-left flex gap-6 px-3">
            {[...ytThumbnailsRow3, ...ytThumbnailsRow3].map((item, i) => (
              <div key={`row3-${i}`} onClick={() => setActiveImage(item.img)} className={`w-[260px] sm:w-[400px] shrink-0 aspect-video rounded-2xl overflow-hidden cursor-pointer relative shadow-xl border ${borderCol} bg-black`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIRAL REELS SHOWCASE */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Short-Form</span>
            <h3 className={`text-3xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Viral Reels Showcase</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {portraitReels.map((reel) => {
              const videoId = `reel-${reel.id}`;
              const isMuted = activeVideoId !== videoId;

              return (
                <div key={reel.id} className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-black shadow-2xl border border-blue-900/10 md:max-w-[280px] md:mx-auto w-full">
                  <video 
                    src={reel.videoUrl} 
                    autoPlay 
                    loop 
                    muted={isMuted} 
                    playsInline 
                    aria-label={reel.title}
                    className="absolute inset-0 w-full h-full object-cover" 
                  >
                    <track kind="captions" src="" srcLang="en" label="English captions" default />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent p-3 flex flex-col justify-end">
                    <button 
                      aria-label="Toggle reel mute" 
                      onClick={() => setActiveVideoId(isMuted ? videoId : null)} 
                      className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#0052FF] text-xs self-end transition-colors shadow-md border border-white/20"
                    >
                      {isMuted ? "🔇" : "🔊"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LONG-FORM MASTERPIECE */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Long-Form Excellence</span>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Long Form Content</h3>
          </div>
          
          <div className={`relative w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-2xl mx-auto border ${borderCol}`}>
            <video 
              src="https://res.cloudinary.com/doa6d6cyf/video/upload/v1788084309/IMG_5940_hvmzw9_qi6ywt.mp4" 
              autoPlay 
              loop 
              muted={activeVideoId !== 'long-teaser'} 
              playsInline 
              aria-label="Cinematic long form teaser showcase"
              className="absolute inset-0 w-full h-full object-cover" 
            >
              <track kind="captions" src="" srcLang="en" label="English captions" default />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 md:p-8">
               <div className="flex justify-end">
                  <button 
                    aria-label="Toggle long video mute" 
                    onClick={() => setActiveVideoId(activeVideoId === 'long-teaser' ? null : 'long-teaser')} 
                    className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/30 flex items-center gap-1.5 text-white cursor-pointer hover:bg-[#0052FF] text-[11px] font-bold uppercase transition-colors shadow"
                  >
                    {activeVideoId === 'long-teaser' ? "🔊 Unmuted" : "🔇 Muted"}
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEW VIDEOS */}
      <section id="testimonials" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Client Results</span>
            <h3 className={`text-3xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Don't just take our word for it</h3>
          </div>
          
          <div className="flex sm:grid sm:grid-cols-3 gap-6 md:gap-8 overflow-x-auto sm:overflow-x-visible no-scrollbar pb-4 sm:pb-0 px-2 sm:px-0 max-w-5xl mx-auto">
            {reviewVideos.map((review) => {
              const videoId = `review-${review.id}`;
              const isMuted = activeVideoId !== videoId;

              return (
                <div key={review.id} className="min-w-[260px] sm:min-w-0 flex-1 group relative rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[3/4] bg-black shadow-2xl border border-blue-900/10 shrink-0">
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
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#0052FF] text-xs z-10 transition-colors border border-white/20 shadow-md"
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 flex flex-col justify-end">
                    <h3 className="text-white font-extrabold text-lg drop-shadow">{review.name}</h3>
                    <p className="text-blue-300 font-bold text-xs uppercase tracking-wider drop-shadow">{review.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5.1 TRUSTED CREATOR PARTNERS SECTION (Laptop: 4 top, 3 bottom | Mobile: 2-2-2-1 layout) */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Partner Network</span>
            <h3 className={`text-3xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Trusted by Top Channels</h3>
            <p className={`${textMuted} text-xs md:text-sm font-medium mt-2`}>Click any partner card to visit their official channel/profile.</p>
          </div>

          {/* Desktop/Laptop Layout (Unchanged: 4 top, 3 bottom) */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto mb-6">
              {creatorPartners.slice(0, 4).map((partner, idx) => (
                <motion.a 
                  key={idx} 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={`${bgPureWhite} p-6 rounded-2xl border ${borderCol} shadow-sm flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#0052FF]/60 hover:shadow-md relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-500/10">
                      <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow shrink-0">
                        <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-black ${textMain} group-hover:text-blue-500 transition-colors leading-tight`}>{partner.name}</h4>
                        <span className="text-[10px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 block">{partner.category}</span>
                      </div>
                    </div>
                    <p className={`${textMuted} text-xs leading-relaxed font-medium mb-4`}>"{partner.feedback}"</p>
                  </div>
                  <div className="pt-2 border-t border-slate-500/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider relative z-10">
                    <span className="text-gray-400 group-hover:text-[#0052FF] transition-colors">Visit &rarr;</span>
                    <span className="text-blue-500 font-extrabold">Verified</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
              {creatorPartners.slice(4, 7).map((partner, idx) => (
                <motion.a 
                  key={idx} 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={`${bgPureWhite} p-6 rounded-2xl border ${borderCol} shadow-sm flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#0052FF]/60 hover:shadow-md relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-500/10">
                      <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow shrink-0">
                        <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-black ${textMain} group-hover:text-blue-500 transition-colors leading-tight`}>{partner.name}</h4>
                        <span className="text-[10px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 block">{partner.category}</span>
                      </div>
                    </div>
                    <p className={`${textMuted} text-xs leading-relaxed font-medium mb-4`}>"{partner.feedback}"</p>
                  </div>
                  <div className="pt-2 border-t border-slate-500/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider relative z-10">
                    <span className="text-gray-400 group-hover:text-[#0052FF] transition-colors">Visit &rarr;</span>
                    <span className="text-blue-500 font-extrabold">Verified</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile / Phone Layout (Exact 2-2-2-1 Row Structure) */}
          <div className="block lg:hidden">
            {/* Row 1: 2 Partners */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {creatorPartners.slice(0, 2).map((partner, idx) => (
                <motion.a 
                  key={idx} 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={`${bgPureWhite} p-3 rounded-xl border ${borderCol} shadow-sm flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
                >
                  <div>
                    <div className="flex flex-col items-center text-center mb-2 pb-2 border-b border-slate-500/10">
                      <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow mb-1.5">
                        <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                      </div>
                      <h4 className={`text-[11px] font-black ${textMain} leading-tight`}>{partner.name}</h4>
                      <span className="text-[8px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 block">{partner.category}</span>
                    </div>
                    <p className={`${textMuted} text-[10px] leading-relaxed font-medium mb-3 text-center line-clamp-3`}>"{partner.feedback}"</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-500/10 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-gray-400">Visit &rarr;</span>
                    <span className="text-blue-500 font-extrabold">Verified</span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Row 2: 2 Partners */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {creatorPartners.slice(2, 4).map((partner, idx) => (
                <motion.a 
                  key={idx} 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={`${bgPureWhite} p-3 rounded-xl border ${borderCol} shadow-sm flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
                >
                  <div>
                    <div className="flex flex-col items-center text-center mb-2 pb-2 border-b border-slate-500/10">
                      <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow mb-1.5">
                        <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                      </div>
                      <h4 className={`text-[11px] font-black ${textMain} leading-tight`}>{partner.name}</h4>
                      <span className="text-[8px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 block">{partner.category}</span>
                    </div>
                    <p className={`${textMuted} text-[10px] leading-relaxed font-medium mb-3 text-center line-clamp-3`}>"{partner.feedback}"</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-500/10 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-gray-400">Visit &rarr;</span>
                    <span className="text-blue-500 font-extrabold">Verified</span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Row 3: 2 Partners */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {creatorPartners.slice(4, 6).map((partner, idx) => (
                <motion.a 
                  key={idx} 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={`${bgPureWhite} p-3 rounded-xl border ${borderCol} shadow-sm flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
                >
                  <div>
                    <div className="flex flex-col items-center text-center mb-2 pb-2 border-b border-slate-500/10">
                      <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow mb-1.5">
                        <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                      </div>
                      <h4 className={`text-[11px] font-black ${textMain} leading-tight`}>{partner.name}</h4>
                      <span className="text-[8px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 block">{partner.category}</span>
                    </div>
                    <p className={`${textMuted} text-[10px] leading-relaxed font-medium mb-3 text-center line-clamp-3`}>"{partner.feedback}"</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-500/10 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-gray-400">Visit &rarr;</span>
                    <span className="text-blue-500 font-extrabold">Verified</span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Row 4: 1 Centered Partner */}
            <div className="flex justify-center">
              {creatorPartners.slice(6, 7).map((partner, idx) => (
                <motion.a 
                  key={idx} 
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className={`${bgPureWhite} p-3 rounded-xl border ${borderCol} shadow-sm flex flex-col justify-between group cursor-pointer relative overflow-hidden w-full max-w-[220px]`}
                >
                  <div>
                    <div className="flex flex-col items-center text-center mb-2 pb-2 border-b border-slate-500/10">
                      <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#0052FF] to-blue-400 shadow mb-1.5">
                        <img src={partner.avatar} alt={partner.name} className="w-full h-full rounded-full object-cover bg-black" />
                      </div>
                      <h4 className={`text-[11px] font-black ${textMain} leading-tight`}>{partner.name}</h4>
                      <span className="text-[8px] text-[#0052FF] font-bold uppercase tracking-wider mt-0.5 block">{partner.category}</span>
                    </div>
                    <p className={`${textMuted} text-[10px] leading-relaxed font-medium mb-3 text-center line-clamp-3`}>"{partner.feedback}"</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-500/10 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-gray-400">Visit &rarr;</span>
                    <span className="text-blue-500 font-extrabold">Verified</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section id="services" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Our Expertise</span>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Built for Algorithm Domination</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {coreServices.map((service, index) => (
              <div key={index} className={`relative group ${bgPureWhite} p-5 md:p-8 rounded-2xl border ${borderCol} shadow-sm flex flex-col h-full hover:shadow-md transition-shadow`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#0052FF] mb-4 md:mb-5">{service.icon}</div>
                <h3 className={`text-base md:text-lg font-extrabold ${textMain} mb-2`}>{service.title}</h3>
                <p className={`${textMuted} text-[11px] md:text-sm font-semibold leading-relaxed mb-4 md:mb-6 flex-1`}>{service.desc}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] md:text-xs font-bold px-2.5 py-0.5 md:px-3 md:py-1 rounded bg-blue-100 text-[#0052FF] border border-blue-300">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS */}
      <section className={`w-full py-12 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Retention Lift", value: "95%" },
            { label: "Views Scaled", value: "50M+" },
            { label: "Elite Creators", value: "40+" },
            { label: "CTR Boost", value: "12.8x" }
          ].map((stat, idx) => (
            <AnimatedCounter key={idx} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* 8. WORKFLOW */}
      <section className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Workflow</span>
            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Our Proven Protocol</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {workflowSteps.map((item, index) => (
              <div key={index} className={`${bgPureWhite} p-5 md:p-8 rounded-2xl border ${borderCol} shadow-sm flex flex-col h-full`}>
                 <h3 className={`text-base md:text-xl font-black ${textMain} mb-2 md:mb-3`}>{item.title}</h3>
                 <p className={`${textMuted} text-[11px] md:text-sm font-semibold leading-relaxed`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LEADERSHIP */}
      <section className={`w-full py-20 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight mb-2">Meet the creators behind</h2>
          <p className="text-3xl sm:text-4xl font-serif italic font-extrabold text-[#0052FF] mb-12">
            Retention Room
          </p>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div onClick={() => setActiveImage("https://res.cloudinary.com/doa6d6cyf/image/upload/v1787471741/file_00000000cacc8211a11dfbddeefaa6c0_xhfmmk.png")} className="w-full max-w-[220px] h-60 sm:h-72 rounded-t-[100px] sm:rounded-t-[140px] rounded-b-[30px] overflow-hidden mb-4 bg-blue-50 shadow-xl cursor-pointer border border-blue-900/10">
                <img src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787471741/file_00000000cacc8211a11dfbddeefaa6c0_xhfmmk.png" alt="Prince, Founder of Retention Room" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className={`text-lg sm:text-xl font-extrabold ${textMain}`}>Prince</h3>
              <p className="text-[#0052FF] text-xs sm:text-sm font-bold tracking-wider">Founder</p>
            </div>

            <div className="flex flex-col items-center">
              <div onClick={() => setActiveImage("https://res.cloudinary.com/doa6d6cyf/image/upload/v1787472280/ChatGPT_Image_Aug_23_2026_01_32_56_PM_xtr414.png")} className="w-full max-w-[220px] h-60 sm:h-72 rounded-t-[100px] sm:rounded-t-[140px] rounded-b-[30px] overflow-hidden mb-4 bg-blue-50 shadow-xl cursor-pointer border border-blue-900/10">
                <img src="https://res.cloudinary.com/doa6d6cyf/image/upload/v1787472280/ChatGPT_Image_Aug_23_2026_01_32_56_PM_xtr414.png" alt="Rishabh Thakur, Co-Founder of Retention Room" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className={`text-lg sm:text-xl font-extrabold ${textMain}`}>Rishabh Thakur</h3>
              <p className="text-[#0052FF] text-xs sm:text-sm font-bold tracking-wider">Co-Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ABOUT US */}
      <section id="about" className={`w-full py-16 md:py-24 px-4 md:px-6 ${bgCard} border-b ${borderCol}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-3 block">About Us</span>
          <h2 className={`text-3xl md:text-5xl font-serif italic font-extrabold ${textMain} tracking-tight leading-[1.1] mb-6`}>
            Engineered for <span className="text-[#0052FF]">Absolute Mastery</span>
          </h2>
          <p className={`${textMuted} text-base md:text-lg font-semibold leading-relaxed max-w-2xl mx-auto mb-6`}>
            Retention Room is an elite post-production and digital growth agency. We specialize in high-retention video editing, psychological thumbnail engineering, advanced SEO, and complete YouTube channel management.
          </p>
          <p className={`${textMuted} text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto`}>
            Our data-backed strategies ensure that every frame and thumbnail is optimized to hook viewers, skyrocket click-through rates, and dominate platform algorithms.
          </p>
        </div>
      </section>

      {/* 11. DIRECT CONTACT */}
      <section className={`w-full py-16 px-4 md:px-6 ${bgPureWhite} border-b ${borderCol}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#0052FF] text-xs font-bold uppercase tracking-widest mb-2 block">Direct Access</span>
            <h2 className={`text-3xl sm:text-4xl font-serif italic font-extrabold ${textMain} tracking-tight`}>Connect Instantly</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${bgCard} p-6 rounded-2xl border ${borderCol} shadow-lg flex flex-col justify-between`}>
              <div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>Project Inquiries</h3>
                <p className={`${textMuted} text-xs font-semibold mb-6`}>Instant connection for project quotes.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+919463631484" className="py-2.5 bg-[#0052FF] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-blue-700 transition-colors">Call</a>
                <a href="https://wa.me/919463631484" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#0052FF] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-blue-700 transition-colors">WhatsApp</a>
              </div>
            </div>

            <div className={`${bgCard} p-6 rounded-2xl border ${borderCol} shadow-lg flex flex-col justify-between`}>
              <div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>Strategy Consultations</h3>
                <p className={`${textMuted} text-xs font-semibold mb-6`}>Connect for creative direction.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+917665627495" className="py-2.5 bg-[#0052FF] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-blue-700 transition-colors">Call</a>
                <a href="https://wa.me/917665627495" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#0052FF] text-white rounded-xl font-bold text-xs text-center uppercase hover:bg-blue-700 transition-colors">WhatsApp</a>
              </div>
            </div>

            <div className={`${bgCard} p-6 rounded-2xl border ${borderCol} shadow-lg flex flex-col justify-between`}>
              <div>
                <h3 className={`text-lg font-extrabold ${textMain} mb-2`}>Instagram Social</h3>
                <p className={`${textMuted} text-xs font-semibold mb-6`}>Explore our cinematic reels & edits.</p>
              </div>
              <a href="https://www.instagram.com/retentionroom?igsi=MTl2dXplcGIydzgwZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#0052FF] text-white rounded-xl font-bold text-xs text-center uppercase block hover:bg-blue-700 transition-colors shadow">View Instagram</a>
            </div>
          </div>
        </div>
      </section>

      {/* 12. PRE-FOOTER CTA */}
      <section className={`w-full py-16 px-4 md:px-6 ${bgCard}`}>
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#0052FF] border border-blue-400/30 shadow-2xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-serif italic font-black mb-4 tracking-tighter">Ready to dominate?</h2>
          <p className="text-blue-100 max-w-lg mx-auto mb-8 font-semibold text-sm">Transform your channel's retention trajectory with our elite editing protocol.</p>
          <Link to="/BookingForm" className="inline-block bg-white text-[#0052FF] px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl">Start a Project</Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer">
            <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden p-2" onClick={(e) => e.stopPropagation()}>
              <img src={activeImage} alt="Fullscreen preview" className="w-full h-auto max-h-[85vh] object-contain mx-auto" />
              <button aria-label="Close lightbox" onClick={() => setActiveImage(null)} className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-full cursor-pointer">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;