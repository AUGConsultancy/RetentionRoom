import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlay } from 'react-icons/hi2';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36 bg-[#FAF8F5]">
      {/* Grid backdrop (Subtle Cream/Grey Grid) */}
      <div 
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)]" 
        style={{
          backgroundImage: `linear-gradient(to right, #E9E4DC 1px, transparent 1px), linear-gradient(to bottom, #E9E4DC 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient retention graph, trending up, behind copy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] opacity-40">
        <svg
          viewBox="0 0 1200 420"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="retentionFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A39281" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#A39281" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,380 C150,360 220,300 320,270 C420,240 480,300 580,250 C680,200 740,120 860,110 C960,100 1050,60 1200,20 L1200,420 L0,420 Z"
            fill="url(#retentionFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          />
          <motion.path
            d="M0,380 C150,360 220,300 320,270 C420,240 480,300 580,250 C680,200 740,120 860,110 C960,100 1050,60 1200,20"
            fill="none"
            stroke="#A39281"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#E9E4DC] bg-white/60 backdrop-blur-md px-4 py-1.5 mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A39281] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A39281]"></span>
          </span>
          <span className="text-xs font-bold tracking-wide text-[#57534E] uppercase">
            Now booking Q4 growth slots
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-bold text-[13vw] leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span className="block text-[#171615]">You Create.</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#171615] to-[#A39281]">
            We Handle The Algorithm.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-7 max-w-2xl text-base md:text-lg text-[#57534E] font-medium"
        >
          We engineer retention and scale your channel so you can focus on
          making videos. Thumbnails, edits, scripts, and strategy — run by
          people obsessed with your CTR.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#book"
            whileHover={{ scale: 1.04, boxShadow: '0 15px 30px rgba(23,22,21,0.15)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#171615] px-7 py-3.5 font-semibold text-[#FAF8F5] transition-all"
          >
            Book a Growth Call
          </motion.a>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 rounded-full border border-[#E9E4DC] bg-white px-7 py-3.5 font-medium text-[#57534E] hover:text-[#171615] hover:border-[#D4C9BA] shadow-sm transition-all"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF8F5] group-hover:bg-[#E9E4DC] transition-colors">
              <HiOutlinePlay className="text-sm text-[#171615]" />
            </span>
            See what we do
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-bold uppercase tracking-widest text-[#A39281]"
        >
          <span>Trusted by 40+ creators</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4C9BA]" />
          <span>+20M views generated</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4C9BA]" />
          <span>95% avg retention lift</span>
        </motion.div>
      </div>
    </section>
  );
}