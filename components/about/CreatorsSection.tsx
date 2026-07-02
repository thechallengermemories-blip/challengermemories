"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code, Telescope, MapPin, ArrowUpRight, Aperture, Eye } from 'lucide-react';

const CREATORS = [
  {
    name: "Andrea Hamel",
    role: "Teacher And Archival Researcher",
    location: "Massachusetts, USA",
    bio: "Massachusetts-licensed educator and independent archival researcher. She served as Grace Corrigan’s personal assistant and conducted the preliminary processing of the Christa Corrigan McAuliffe Collection before its donation to the Archives at Framingham State University. She founded and leads Challenger Memories, preserving the history, personal stories, and legacy of the Space Shuttle Challenger STS-51-L crew.",
    icon: GraduationCap,
    link: null,
    frameNumber: "FRM-51L-01",
    coordinates: "42.3601° N, 71.0589° W",
    spectralColor: "rgba(14, 165, 233, 0.08)" // Deep Sky Blue Backlight
  },
  {
  name: "Vivek Joshi",
  role: "Lead Full-Stack Developer",
  location: "India",
  bio: "The technical architect behind this platform. Vivek designs and builds production-grade web applications end-to-end — from database architecture to pixel-perfect UI — specializing in React, Next.js, and Node.js ecosystems. He engineered this entire archive from the ground up, translating a sensitive, high-stakes brief into clean, performant, and maintainable code. Available for freelance and contract work.",
  icon: Code,
  link: "https://portfolio.vivekjoshi.online/",
  frameNumber: "FRM-51L-02",
  coordinates: "20.5937° N, 78.9629° E",
  spectralColor: "rgba(56, 189, 248, 0.08)" // Light Sky Blue Backlight
},
  {
    name: "Naren",
    role: "Space Enthusiast & Researcher",
    location: "India",
    bio: "A college student fueled by a deep fascination for astronautics and astrophysics. Naren curated crucial historical insights to ensure the tribute remains accurate and inspiring.",
    icon: Telescope,
    link: null,
    frameNumber: "FRM-51L-03",
    coordinates: "22.3511° N, 78.6677° E",
    spectralColor: "rgba(3, 105, 161, 0.08)" // Celestial Navy Blue Backlight
  },
];

// Sprocket design for the film negative framing
function FilmSprockets() {
  return (
    <div className="flex flex-col justify-between h-full py-2 select-none pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="w-3 h-2 rounded-[1px] bg-slate-950 border border-slate-800/40" />
      ))}
    </div>
  );
}

export function CreatorsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCreator = CREATORS[activeIndex];
  const IconComponent = activeCreator.icon;

  return (
    <section className="py-24 md:py-32 bg-slate-950 border-t border-slate-900 relative overflow-hidden text-slate-400">
      
      {/* Matte Light Leaks */}
      <div className="absolute top-0 left-1/3 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-900 pb-10 gap-6">
          <div className="max-w-xl">
            <span className="text-xs text-slate-500 font-mono tracking-[0.3em] uppercase block mb-3">
              COLOPHON / INDEXED REGISTRY
            </span>
            <h2 className="text-4xl font-serif text-white tracking-tight leading-tight">
              Behind the Digital Archive
            </h2>
          </div>
          <div className="flex items-center gap-2.5 text-slate-500 font-mono text-[10px] tracking-wider">
            <Aperture className="w-4 h-4 text-sky-500/40 animate-spin-slow" />
            <span>ARCHIVE ENGINE V.51L</span>
          </div>
        </div>

        {/* Console Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive 35mm Filmstrip Reel (4-Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-500 uppercase px-1">
              <span>ARCHIVE REEL SLIDES</span>
              <span>SELECT CELL</span>
            </div>

            {/* Film Carrier Container */}
            <div className="relative border border-slate-900 rounded-3xl bg-slate-900/10 backdrop-blur p-4 overflow-hidden flex flex-col gap-3">
              
              {/* Overlay lines to frame the carrier */}
              <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-slate-900/40 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-10 w-[1px] bg-slate-900/40 pointer-events-none" />

              {CREATORS.map((creator, index) => {
                const isActive = activeIndex === index;
                const SlideIcon = creator.icon;

                return (
                  <button
                    key={creator.name}
                    onClick={() => setActiveIndex(index)}
                    className="relative flex items-stretch w-full rounded-2xl overflow-hidden text-left outline-none transition-all duration-300"
                  >
                    {/* Active highlighted status borders */}
                    <div className={`absolute inset-0 border transition-colors duration-500 rounded-2xl pointer-events-none z-20 ${
                      isActive ? "border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.05)]" : "border-transparent group-hover:border-slate-800"
                    }`} />

                    {/* Sprocket Rail Left */}
                    <div className="w-10 bg-slate-900 flex justify-center border-r border-slate-950/80">
                      <FilmSprockets />
                    </div>

                    {/* Center Slide Negative Content */}
                    <div className={`flex-1 p-5 transition-all duration-500 flex flex-col justify-between min-h-[110px] relative ${
                      isActive ? "bg-sky-950/20 text-sky-400" : "bg-slate-950/40 hover:bg-slate-900/20 text-slate-500 hover:text-slate-300"
                    }`}>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[9px] tracking-widest opacity-80">
                          {creator.frameNumber}
                        </span>
                        <SlideIcon className={`w-4 h-4 ${isActive ? "text-sky-300" : "text-slate-500"}`} />
                      </div>

                      <div className="mt-4">
                        <h3 className="text-lg font-serif tracking-wide">{creator.name}</h3>
                        <span className="text-[9px] font-mono tracking-wider uppercase block opacity-60 mt-1">
                          {creator.role}
                        </span>
                      </div>
                    </div>

                    {/* Sprocket Rail Right */}
                    <div className="w-10 bg-slate-900 flex justify-center border-l border-slate-950/80">
                      <FilmSprockets />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-End Lightbox Projection Screen (7-Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-500 uppercase px-1">
              <span>PROJECTOR DISPLAY</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-sky-500/40" />
                ACTIVE FRAME RESOLUTION
              </span>
            </div>

            {/* Main Lightbox Body */}
            <div className="relative border border-slate-900 rounded-3xl bg-slate-900/15 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between overflow-hidden min-h-[460px] h-full shadow-2xl">
              
              {/* Ambient backlight dynamic glow */}
              <div 
                className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none animate-pulse"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${activeCreator.spectralColor}, transparent 75%)`
                }}
              />

              {/* Physical Camera calibration corners & markings */}
              <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-slate-800" />
              <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-slate-800" />
              <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-slate-800" />
              <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-slate-800" />
              
              {/* Calibration Center Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-900/40 pointer-events-none select-none font-sans text-lg font-light">
                [ + ]
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCreator.name}
                  initial={{ filter: "blur(6px) brightness(1.6)", opacity: 0, scale: 0.99 }}
                  animate={{ filter: "blur(0px) brightness(1)", opacity: 1, scale: 1 }}
                  exit={{ filter: "blur(4px) brightness(0.8)", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex flex-col justify-between h-full flex-1"
                >
                  {/* Slide Dossier Header Metadata */}
                  <div>
                    <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-5">
                      <span className="font-mono text-[9px] tracking-widest text-slate-500">
                        SOURCE RECORD / {activeCreator.frameNumber}
                      </span>
                      <span className="font-mono text-[9px] text-slate-500">
                        {activeCreator.coordinates}
                      </span>
                    </div>

                    {/* Creator Identity Title */}
                    <div className="mb-6">
                      {activeCreator.link ? (
                        <a 
                          href={activeCreator.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/title inline-flex items-center gap-2"
                        >
                          <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide group-hover/title:text-sky-300 transition-colors">
                            {activeCreator.name}
                          </h3>
                          <ArrowUpRight className="w-6 h-6 text-slate-500 group-hover/title:text-sky-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                        </a>
                      ) : (
                        <h3 className="text-3xl md:text-4xl font-serif text-slate-100 tracking-wide">
                          {activeCreator.name}
                        </h3>
                      )}
                      
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mt-2">
                        {activeCreator.role}
                      </span>
                    </div>

                    {/* Bio Copy */}
                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed font-sans max-w-xl">
                      {activeCreator.bio}
                    </p>
                  </div>

                  {/* Slide Dossier Foot controls */}
                  <div className="mt-12 pt-5 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      <span>{activeCreator.location}</span>
                    </div>

                    {activeCreator.link ? (
                      <a 
                        href={activeCreator.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-sky-400 hover:text-sky-300 border-b border-slate-800 hover:border-sky-500/40 pb-0.5 transition-colors"
                      >
                        VIEW PORTFOLIO 
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        SECURE LOG FILE
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Diagnostic Metadata Footer */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-slate-600 gap-4">
          <span>FRAME MATRIX PROJECTIONS // MECHANICAL CAROUSEL LOCK STATE: SECURED</span>
          <span>STABLE COORDINATE CHANNELS</span>
        </div>

      </div>
    </section>
  );
}