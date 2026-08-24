import React from 'react';

const services = [
  {
    id: 1,
    title: "Thumbnails",
    desc: "Scroll-stopping visual hooks built on contrast, curiosity, and CTR data. We don't guess, we test.",
    tag: "Click-Through",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop" 
  },
  {
    id: 2,
    title: "Video Editing",
    desc: "Pacing, sound design, and cut points engineered to hold viewers past the crucial first 30 seconds.",
    tag: "Retention",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Scripting",
    desc: "Structured storytelling with open loops and payoffs that keep the algorithm—and the viewer—engaged.",
    tag: "Storytelling",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Strategy",
    desc: "Full-channel roadmaps: upload cadence, topic clustering, and deep analytics reviews every single week.",
    tag: "Growth",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  }
];

const ServicesCard = () => {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      
      {/* Section Header with Elegant Typography */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
          Our <span className="font-serif italic text-brand-accent font-medium">Expertise</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Everything you need to scale your channel, managed under one roof.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            {/* Image Section */}
            <div className="h-56 relative overflow-hidden bg-slate-50">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Tag (Light theme style) */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md shadow-sm rounded-full text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                  {service.tag}
                </span>
              </div>
            </div>

            {/* Text Section */}
            <div className="p-8 flex-grow flex flex-col bg-white">
              <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 font-sans text-sm leading-relaxed mb-6 flex-grow">
                {service.desc}
              </p>
              
              {/* Explore Link */}
              <div className="mt-auto flex items-center gap-2 text-brand-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span> <span className="text-lg leading-none">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ServicesCard;