"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Rocket, MapPin } from 'lucide-react';

interface MissionHeroProps {
  title: string;
  missionCode: string;
  description: string;
  date: string;
  crewCount: number;
  orbiter: string;
  site: string;
}

const MissionHero = ({
  title = "Challenger",
  missionCode = "STS-51-L",
  description = "A journey beyond the horizon, dedicated to the seven souls who expanded the boundaries of human endeavor. Their legacy continues to light the path for generations of explorers.",
  date = "January 28, 1986",
  crewCount = 7,
  orbiter = "Challenger OV-099",
  site = "Kennedy Space Center, FL"
}: MissionHeroProps) => {
  const { scrollY } = useScroll();
  
  // Parallax effects for the background and content
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617] py-20 px-4">
      {/* 1. Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        
        {/* CSS Starfield Effect */}
        <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        boxShadow: '0 0 10px white',
                        animation: `pulse ${Math.random() * 3 + 2}s infinite`
                    }}
                />
            ))}
        </div>
      </div>

      {/* 2. Main Content Container */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-5xl w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge / Mission Code */}
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-sky-400 border border-sky-500/30 bg-sky-500/5 rounded-full backdrop-blur-md">
            Mission {missionCode}
          </span>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight">
            The <span className="italic text-slate-200">{title}</span> Legacy
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light mb-12">
            {description}
          </p>
        </motion.div>

        {/* 3. Floating Stats Bar (Premium Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 p-1 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl"
        >
          <StatBox icon={<Calendar className="w-4 h-4" />} label="Launch Date" value={date} />
          <StatBox icon={<Users className="w-4 h-4" />} label="Crew Members" value={`${crewCount} Heroes`} />
          <StatBox icon={<Rocket className="w-4 h-4" />} label="Spacecraft" value={orbiter} />
          <StatBox icon={<MapPin className="w-4 h-4" />} label="Location" value={site} isLast />
        </motion.div>
      </motion.div>

      {/* 4. Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Explore Story</span>
        <div className="w-px h-12 bg-gradient-to-b from-sky-500 to-transparent" />
      </motion.div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};

/* Internal Sub-component for Stats */
const StatBox = ({ icon, label, value, isLast = false }: { icon: React.ReactNode, label: string, value: string, isLast?: boolean }) => (
  <div className={`flex flex-col items-center justify-center py-6 px-4 ${!isLast ? 'md:border-r border-slate-800' : ''}`}>
    <div className="flex items-center gap-2 text-sky-400/80 mb-1">
      {icon}
      <span className="text-[10px] uppercase tracking-widest font-semibold">{label}</span>
    </div>
    <span className="text-sm md:text-base text-slate-100 font-medium">{value}</span>
  </div>
);

export default MissionHero;