"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Rocket, Users, Globe, Star, BookOpen, Quote, Sparkles, Compass } from 'lucide-react';
import { CreatorsSection } from './CreatorsSection';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden select-none">
      {/* Background Ambient Space Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Page Header */}  
      <section className="relative pt-32 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs uppercase tracking-widest mb-6">
            <Compass size={12} className="text-sky-400" />
            <span>About The Project</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight select-text">
            Preserving the <span className="italic text-sky-400">Legacy</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed select-text">
            This tribute is dedicated to the 7 brave souls of STS-51-L, 
            and to the generations of dreamers inspired by their final frontier.
          </p>
        </motion.div>
      </section>

      {/* 2. Our Philosophy Section (Replaces Old Purpose Text + Keeps & Upgrades Graphic) */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Philosophy Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8 select-text"
          >
            {/* Header Badge */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  <BookOpen className="text-sky-400 w-5 h-5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-sky-400 font-semibold">
                  Our Philosophy
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
                History Belongs to Ordinary People
              </h2>
            </div>

            {/* Main Paragraphs */}
            <div className="space-y-5 text-slate-300 font-light text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-white font-normal">Challenger Memories</strong> is an independent, volunteer-led educational project dedicated to preserving the personal memories inspired by the Space Shuttle Challenger mission and its crew.
              </p>
              <p>
                This project is based on a simple belief: <span className="text-sky-300">history is not only preserved through official documents, but also through the experiences of ordinary people.</span>
              </p>
            </div>

            {/* Christa McAuliffe Educational Quote Block */}
            <div className="relative group rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex gap-3 items-start mb-2">
                <Quote size={22} className="text-sky-400 shrink-0 mt-1" />
                <p className="font-serif text-slate-200 italic text-sm sm:text-base leading-relaxed">
                  &ldquo;Christa McAuliffe encouraged students to learn history through journals, letters, and firsthand accounts of everyday people.&rdquo;
                </p>
              </div>
              
              <p className="text-xs text-slate-400 font-light pl-8 leading-relaxed">
                Challenger Memories extends that educational philosophy into the digital age by creating a living archive where individuals can share how Challenger has influenced their lives, education, careers, and perspectives.
              </p>
            </div>

            {/* Goal Statement Banner */}
            <div className="rounded-xl bg-gradient-to-r from-sky-500/10 via-slate-900/80 to-purple-500/10 border border-sky-500/20 p-5 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
                <Sparkles size={14} className="animate-pulse" />
                <span>Our Core Purpose</span>
              </div>
              <p className="text-slate-200 font-serif text-base sm:text-lg">
                Our goal is not simply to remember January 28, 1986.
              </p>
              <p className="text-sky-300 text-xs sm:text-sm font-light leading-relaxed">
                Our goal is to preserve how Challenger continues to inspire curiosity, learning, resilience, and exploration across generations.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Enhanced STS-51-L Visual Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-sky-400/10 to-purple-500/20 rounded-[3.5rem] blur-xl opacity-70" />

            <div className="relative aspect-square rounded-[3rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-between p-8 sm:p-12 overflow-hidden shadow-2xl">
              
              {/* Telemetry Grid Background Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle SVG Orbital Circles */}
              <svg className="absolute inset-0 w-full h-full text-sky-500/10 pointer-events-none" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
              </svg>

              {/* Top Graphic Header Tag */}
              <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                <span>Living Archive</span>
                <span className="text-sky-400 font-semibold">1986 — 2026</span>
              </div>

              {/* Central Globe & Mission Badge */}
              <div className="text-center relative z-10 my-auto">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full" />
                  <Globe className="w-20 h-20 sm:w-24 sm:h-24 text-sky-400/80 relative z-10 mx-auto animate-pulse [animation-duration:4s]" />
                </div>

                <div className="text-3xl sm:text-4xl font-serif text-white tracking-[0.35em] uppercase font-light">
                  STS-51-L
                </div>
                <div className="text-[10px] font-mono tracking-[0.4em] text-sky-400/80 uppercase mt-2">
                  Space Shuttle Challenger
                </div>
              </div>

              {/* Bottom 7 Crew Stars Representation */}
              <div className="relative z-10 w-full pt-4 border-t border-white/5 flex flex-col items-center gap-2">
                <div className="flex justify-center items-center gap-2.5">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="group/star relative"
                    >
                      <Star 
                        size={12} 
                        className="text-sky-400 fill-sky-400/30 group-hover/star:fill-sky-400 transition-all duration-300" 
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-[9px] font-mono tracking-[0.3em] text-slate-500 uppercase">
                  7 Crew Members · Forever Remembered
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Historical Context */}
      <section className="py-24 bg-slate-900/20 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center text-3xl font-serif text-white mb-16 italic">The Mission</h2>
          
          <MissionContextCard 
            title="Challenger // January 28, 1986" 
            description="STS-51-L was set to be a milestone in history—the first time a teacher and civilian, Christa McAuliffe, would enter orbit. Though the journey was cut short, it unified a global audience and redefined the resilience of the human spirit in our quest to reach for the stars."
            icon={<Rocket className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* 4. Creators Section */}
      <CreatorsSection />

      {/* 5. Credits/Community Section */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto select-text"
        >
            <Users className="w-8 h-8 text-sky-400/40 mx-auto mb-6" />
            <h3 className="text-xl font-serif text-white mb-4">A Community Tribute</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-lg mx-auto font-light">
                Our goal is to provide a dignified space for the public 
                to record where they were, what they felt, and what they learned—turning a moment of silence into an eternal conversation.
            </p>
            <div className="flex justify-center gap-6 items-center">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-800" />
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.6em] font-mono">Ad Astra</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-800" />
            </div>
        </motion.div>
      </section>
    </main>
  );
};

/* Internal UI Component for Mission Cards */ 
interface MissionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const MissionContextCard = ({ title, description, icon }: MissionCardProps) => (
  <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-8 hover:border-sky-500/20 transition-all duration-300 select-text">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-serif text-white">{title}</h3>
    </div>
    <p className="text-slate-400 text-base leading-relaxed font-light">
      {description}
    </p>
  </div>
);

export default AboutPage;