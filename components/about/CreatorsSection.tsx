"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, Variants } from 'framer-motion';
import { GraduationCap, Code, Telescope, MapPin, ArrowUpRight } from 'lucide-react';

const CREATORS = [
  {
  name: "Andrea Hamel",
  role: "Special Education Teacher & Tutor",
  location: "Massachusetts, USA",
  bio: "Massachusetts-licensed educator and independent archival researcher. She served as Grace Corrigan’s personal assistant and conducted the preliminary processing of the Christa Corrigan McAuliffe Collection before its donation to the Archives at Framingham State University. She founded and leads Challenger Memories, preserving the history, personal stories, and legacy of the Space Shuttle Challenger STS-51-L crew.",
  icon: GraduationCap,
  link: null,
  nodeId: "NODE // 01",
  coordinates: "42.3601° N, 71.0589° W"
},
  {
    name: "Vivek Joshi",
    role: "Lead Full-Stack Developer",
    location: "India",
    bio: "The technical architect behind this platform. Vivek engineered the website from the ground up, writing clean, performant code to build a lasting digital archive.",
    icon: Code,
    link: "https://portfolio.vivekjoshi.online/",
    nodeId: "NODE // 02",
    coordinates: "20.5937° N, 78.9629° E"
  },
  {
    name: "Naren",
    role: "Space Enthusiast & Researcher",
    location: "India",
    bio: "A college student fueled by a deep fascination for astronautics and astrophysics. Naren curated crucial historical insights to ensure the tribute remains accurate and inspiring.",
    icon: Telescope,
    link: null,
    nodeId: "NODE // 03",
    coordinates: "22.3511° N, 78.6677° E"
  },
];

// High-end spring physics configuration for butter-smooth rotation
const SPRING_CONFIG = { damping: 20, stiffness: 120, mass: 0.8 };

function CreatorCard({ creator }: { creator: typeof CREATORS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values to drive the 3D card tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Smooth springs to eliminate jittery mouse tracking
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [12, -12]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-12, 12]), SPRING_CONFIG);

  // Coordinates for driving the spotlight cursor-glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Dynamic radial spotlight computed purely via GPU transitions to avoid component re-renders
  const spotlightBg = useTransform(
    [glowX, glowY],
    ([xVal, yVal]) => `radial-gradient(220px circle at ${xVal}px ${yVal}px, rgba(56, 189, 248, 0.08), transparent 85%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize position coordinates (between -0.5 and 0.5)
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    tiltX.set(relativeX - 0.5);
    tiltY.set(relativeY - 0.5);

    // Compute pixel positioning for target-light gradient
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const IconComponent = creator.icon;

  const CardContent = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-slate-950/40 backdrop-blur-md border border-white/5 hover:border-sky-500/30 rounded-3xl p-8 transition-colors duration-500 flex flex-col justify-between h-[380px] overflow-hidden shadow-2xl select-none"
    >
      {/* Dynamic Cursor-Glow Spotlight */}
      <motion.div
        style={{ background: spotlightBg }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Cybernetic Wireframe Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-sky-500/40 group-hover:w-4 group-hover:h-4 transition-all duration-300 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-sky-500/40 group-hover:w-4 group-hover:h-4 transition-all duration-300 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10 group-hover:border-sky-500/40 group-hover:w-4 group-hover:h-4 transition-all duration-300 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-sky-500/40 group-hover:w-4 group-hover:h-4 transition-all duration-300 rounded-br-lg" />

      {/* Retro Sci-fi Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] transition-opacity duration-500 pointer-events-none z-0" />

      {/* Infinite Laser HUD Scanline */}
      {isHovered && (
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: "250%" }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent pointer-events-none z-0"
        />
      )}

      {/* Card Header (Deep Space Depth) */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/5 border border-sky-500/10 flex items-center justify-center text-sky-400/85 group-hover:scale-110 group-hover:text-sky-400 group-hover:border-sky-500/30 transition-all duration-500 shadow-[0_0_15px_rgba(56,189,248,0)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 group-hover:text-sky-500/50 transition-colors duration-300">
              {creator.nodeId}
            </span>
            <span className="text-[8px] font-mono text-slate-600">
              {creator.coordinates}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-white mb-1 group-hover:text-sky-300 transition-colors duration-300 flex items-center gap-1.5">
          {creator.name}
          {creator.link && (
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          )}
        </h3>
        
        <span className="text-[10px] text-sky-400/80 font-mono uppercase tracking-wider block mb-4">
          {creator.role}
        </span>
        
        <p className="text-slate-400 text-sm font-light leading-relaxed">
          {creator.bio}
        </p>
      </div>

      {/* Card Footer (Slight depth offset) */}
      <div 
        className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-slate-500 text-xs relative z-10"
        style={{ transform: "translateZ(15px)" }}
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-500/50 transition-colors duration-300" />
          <span className="group-hover:text-slate-300 transition-colors duration-300">{creator.location}</span>
        </div>
        
        {creator.link ? (
          <span className="text-[9px] font-mono text-sky-400 group-hover:text-sky-300 group-hover:glow-sky underline decoration-sky-500/20 underline-offset-4 tracking-wider">
            PORTFOLIO // ACCESS
          </span>
        ) : (
          <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
            SECURE_NODE
          </span>
        )}
      </div>
    </motion.div>
  );

  // Render a clickable anchor tag if a link is provided, otherwise render a neutral wrapper
  if (creator.link) {
    return (
      <a 
        href={creator.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block focus:outline-none focus:ring-1 focus:ring-sky-500/30 rounded-3xl"
      >
        {CardContent}
      </a>
    );
  }

  return <div>{CardContent}</div>;
}

export function CreatorsSection() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-sky-500/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs text-sky-400 font-mono tracking-[0.4em] uppercase block mb-3">
              Telemetry & Logistics
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Behind the Archive
            </h2>
            <div className="w-12 h-px bg-sky-500/40 mx-auto mb-6 animate-pulse" />
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
              This memorial was conceptualized, designed, and built by a collaborative 
              group driven to keep the legacy of STS-51-L alive.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {CREATORS.map((creator, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CreatorCard creator={creator} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}