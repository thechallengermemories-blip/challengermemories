"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Crosshair, Globe, Database } from "lucide-react";

const CREW = [
  {
    name: "Francis R. Scobee",
    role: "Commander",
    id: "CDR",
    seat: "01",
    bio: "Test pilot. Vietnam veteran. Led STS-51-L with quiet courage.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Scobee-fr.jpg",
  },
  {
    name: "Michael J. Smith",
    role: "Pilot",
    id: "PLT",
    seat: "02",
    bio: "Navy test pilot. Father of three. His first spaceflight.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Michael_Smith_%28NASA%29.jpg",
  },
  {
    name: "Ronald E. McNair",
    role: "Mission Specialist",
    id: "MS1",
    seat: "03",
    bio: "Physicist. Saxophonist. Second African American in space.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Ronald_Erwin_McNair.jpg",
  },
  {
    name: "Ellison S. Onizuka",
    role: "Mission Specialist",
    id: "MS2",
    seat: "04",
    bio: "Air Force colonel. First Asian American in space.",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Ellison_Shoji_Onizuka_%28NASA%29.jpg",
  },
  {
    name: "Judith A. Resnik",
    role: "Mission Specialist",
    id: "MS3",
    seat: "05",
    bio: "Electrical engineer. Second American woman in space.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Judith_A._Resnik%2C_official_portrait_%28cropped%29.jpg",
  },
  {
    name: "Gregory B. Jarvis",
    role: "Payload Specialist",
    id: "PS1",
    seat: "06",
    bio: "Satellite engineer for Hughes Aircraft. Dreamed of the cosmos.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/13/Gregory_Jarvis_%28NASA%29_cropped.jpg",
  },
  {
    name: "Christa McAuliffe",
    role: "Teacher in Space",
    id: "PS2",
    seat: "07",
    bio: "New Hampshire schoolteacher. Chosen from 11,000 to teach from orbit.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/ChristaMcAuliffe_%28cropped%29.jpg",
  },
];

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${(i * 17.3) % 100}%`,
  left: `${(i * 27.1) % 100}%`,
  size: i % 7 === 0 ? 2 : 1,
  opacity: 0.05 + (i % 5) * 0.03,
}));

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Native mouse move capture for lag-free background parallax shift
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 16; // Slight responsive shift
    const y = (clientY / height - 0.5) * 16;
    setMousePos({ x, y });
  };

  // Lens-Focus Animation Variants
  const focusTitleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      letterSpacing: "0.22em", 
      filter: "blur(15px)", 
      scale: 0.96 
    },
    visible: {
      opacity: 0.95,
      letterSpacing: "-0.015em",
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Cinematic smooth ease-out
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2.2, ease: "easeInOut", delay: 0.2 }
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#020617] text-white flex flex-col justify-between overflow-hidden px-6 py-12 md:px-12 lg:px-16 select-none"
    >
      
      {/* 1. Deep Space Atmosphere with Slow Starfield */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-500/5 blur-[120px] rounded-full" />
        
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/90" />
      </div>

      {/* 2. Interactive SVG Celestial Telemetry Grid (Parallax Enabled) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      >
        <svg className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] text-sky-500/5" viewBox="0 0 400 400">
          {/* Inner compass orbits */}
          <motion.circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" variants={lineVariants} initial="hidden" animate="visible" />
          <motion.circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" variants={lineVariants} initial="hidden" animate="visible" />
          <motion.circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 3" variants={lineVariants} initial="hidden" animate="visible" />
          
          {/* Intersection crosshair lines */}
          <motion.line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="0.5" variants={lineVariants} initial="hidden" animate="visible" />
          <motion.line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" variants={lineVariants} initial="hidden" animate="visible" />
          
          {/* Dynamic pulsing orbital memory nodes */}
          <g className="text-sky-400">
            <circle cx="340" cy="200" r="2.5" fill="currentColor" className="animate-ping [animation-duration:3s]" />
            <circle cx="340" cy="200" r="1.5" fill="currentColor" />
            <circle cx="98" cy="110" r="2.5" fill="currentColor" className="animate-ping [animation-duration:4s]" />
            <circle cx="98" cy="110" r="1.5" fill="currentColor" />
            <circle cx="260" cy="320" r="2" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* 3. Archival Layout Frame Borders */}
      <div className="absolute inset-6 md:inset-8 pointer-events-none z-10 border border-white/[0.02]">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10" />

        {/* Fine Architectural Sidebar Coordinates (Desktop) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-[8px] font-mono tracking-[0.3em] uppercase text-slate-500/60 [writing-mode:vertical-lr]">
          <div className="flex items-center gap-2">
            <Crosshair size={8} className="text-sky-400/50" />
            <span>KSC · LC-39B · 28.572° N 80.648° W</span>
          </div>
          <span>LAUNCH SYSTEM: OV-099</span>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-[8px] font-mono tracking-[0.3em] uppercase text-slate-500/60 [writing-mode:vertical-lr]">
          <div className="flex items-center gap-2">
            <Globe size={8} className="text-sky-400/50" />
            <span>PUBLIC ARCHIVE SYSTEM</span>
          </div>
          <span>RECORDING TIMELINE: 1986 — 2026</span>
        </div>
      </div>

      {/* 4. Upper Core Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-28 sm:pt-32 lg:pt-36 text-center flex flex-col items-center">
        
        {/* Archival Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-sky-500/25" />
          <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.4em] text-sky-400/80 font-semibold flex items-center gap-2">
            <Database size={10} className="text-sky-400/60" />
            Preserving Shared Human Memory
          </span>
          <div className="h-[1px] w-12 bg-sky-500/25" />
        </motion.div>

        {/* Lens-Focus Shifting Heading */}
        <motion.h1
          variants={focusTitleVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-6 select-text"
          style={{ willChange: "filter, letter-spacing, transform, opacity" }}
        >
          Challenger Memories
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-3xl text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-8 select-text"
        >
          The Challenger mission became part of millions of lives — in classrooms, homes, workplaces, and conversations across generations. Some remember watching it live. Others grew up hearing the stories afterward. This project exists to preserve those human experiences and explore how history continues to shape people long after a moment has passed.
        </motion.p>

        {/* Call to Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 flex flex-wrap justify-center gap-4 w-full"
        >
          <a
            href="/share-story"
            className="px-7 py-3 rounded-full bg-sky-500 text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.25)] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]"
          >
            Share Your Memory
          </a>
          <a
            href="/stories"
            className="px-7 py-3 rounded-full border border-white/10 bg-white/[0.02] text-slate-300 font-mono text-xs uppercase tracking-widest hover:bg-white/[0.07] hover:border-sky-500/30 hover:text-sky-400 transition-all duration-300"
          >
            Explore Memories
          </a>
        </motion.div>
      </div>

      {/* 5. The Unified Crew Grid (Zero-Lag CSS Sibling Dimming) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-16 lg:mt-24 mb-4">
        
        <div className="flex flex-col items-center mb-8">
          <p className="font-mono text-[9px] tracking-[0.3em] text-slate-500 uppercase">
            In Remembrance of the STS-51-L Crew
          </p>
          <div className="w-12 h-[1px] bg-sky-500/30 mt-2" />
        </div>

        {/* 
          Using parent hover trigger ("group/container").
          When hovering over the grid, all crew members dim to opacity 40%, 
          while the specific hovered card overrides this via native CSS to animate to scale and opacity 100%.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full group/container">
          {CREW.map((member) => (
            <div
              key={member.id}
              className="relative aspect-[3/4] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden group/card transition-all duration-500 ease-out hover:border-sky-500/40 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(56,189,248,0.18)] hover:!opacity-100 group-hover/container:opacity-40"
            >
              {/* Card Image and Gradients */}
              <div className="absolute inset-0 overflow-hidden bg-slate-950">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover select-none grayscale-[40%] transition-all duration-700 ease-out group-hover/card:grayscale-0 group-hover/card:scale-105 opacity-60 group-hover/card:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-transparent to-transparent z-10" />
                
                {/* Slow interactive overlay gradient inside card on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Individual Badges */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 opacity-50 group-hover/card:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[8px] bg-black/40 px-2 py-0.5 rounded border border-white/10 text-sky-400 font-medium tracking-wider">
                  {member.id}
                </span>
                <span className="font-mono text-[8px] text-slate-400">
                  {member.seat}
                </span>
              </div>

              {/* Bio & Details Slide-Up (No layout-shifting, 100% smooth GPU-bound CSS transition) */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end min-h-[95px] bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent z-20">
                <p className="font-mono text-[8px] tracking-widest text-sky-400 uppercase mb-1">
                  {member.role}
                </p>
                <h3 className="font-serif text-sm sm:text-base font-light text-white leading-tight">
                  {member.name.split(" ").slice(-1)[0]}
                  <span className="hidden group-hover/card:inline text-white/90">
                    , {member.name.split(" ").slice(0, -1).join(" ")}
                  </span>
                </h3>

                <div className="h-0 group-hover/card:h-12 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover/card:opacity-100">
                  <p className="font-serif text-[10px] text-slate-400 italic leading-snug pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}