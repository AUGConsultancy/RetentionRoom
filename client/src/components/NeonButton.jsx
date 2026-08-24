import React from "react";

const NeonButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative group px-7 py-3 rounded-full text-sm font-semibold text-[#FAF8F5] bg-[#171615] transition-all duration-300 hover:-translate-y-1 focus:outline-none ${className}`}
    >
      {/* Luxury Warm Glow Effect behind the button */}
      <span className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-[#C2B5A5] to-[#A39281]"></span>
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {text}
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
    </button>
  );
};

export default NeonButton;