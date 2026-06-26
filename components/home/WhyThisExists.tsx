"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Quote, Globe, Heart, Send, PenTool } from 'lucide-react';

export const WhyChallengerMemoriesExists = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll-linked effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-32 px-6 flex items-center justify-center bg-[#020617] overflow-hidden"
    >
      {/* 1. COSMIC BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Parallax ambient color glows */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" 
        />
        
        {/* Subtle noise and constellation paths */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 100 300 L 300 250 L 500 350 L 700 200"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: VISUAL COMPOSITION & STATS (5 Cols) */}
          <motion.div 
            style={{ opacity }}
            className="lg:col-span-5 relative"
          >
            {/* Main Image with Glass Frame */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl bg-slate-950">
              <img 
                src="/shuttle.webp" 
                alt="Space Shuttle Ascent" 
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>

            {/* Floating Info Card 1: Shared Humanity */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute -top-6 -right-6 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block z-20 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-500/20 rounded-full text-sky-400">
                  <Globe size={16} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400">Shared Humanity</p>
                  <p className="text-white text-xs font-semibold">Global Legacy</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Info Card 2: Inspiration */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-6 -left-6 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block z-20 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-full text-purple-400">
                  <Heart size={16} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400">Preservation</p>
                  <p className="text-white text-xs font-semibold">Keep Memories Alive</p>
                </div>
              </div>
            </motion.div>

            {/* Numerical Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-10 mt-8 justify-center lg:justify-start"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white">7</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500">Heroes Honored</span>
              </div>
              <div className="w-[1px] h-12 bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white">∞</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500">Shared Memories</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: CORE MISSION, QUOTE, & CALL TO ACTION (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Mission Label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-sky-400"
            >
              <PenTool size={16} />
              <span className="uppercase tracking-[0.4em] text-xs font-bold">Why We Exist</span>
            </motion.div>

            {/* Main Header */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-white leading-tight"
            >
              Why Challenger Memories Exists
            </motion.h2>

            {/* Unified Philosophy Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 leading-relaxed text-lg font-light"
            >
              Challenger Memories preserves personal memories of the STS-51-L mission while honoring the seven brave crew members. 
              These collective testimonies help future generations understand how the Challenger voyage affected people around the world, 
              ensuring that their shared humanity and spirit of exploration continue to fuel dreams for generations to come.
            </motion.p>

            {/* Reagan's Tribute Quote Block */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative pl-8 border-l-2 border-sky-500/40 py-1 my-2"
            >
              <Quote className="absolute top-0 left-[-10px] text-slate-800 pointer-events-none" size={32} />
              <p className="text-base text-slate-400 font-light leading-relaxed italic mb-3">
                "...the crew of the space shuttle Challenger honored us by the manner in which they lived their lives. We will never forget them... as they prepared for their journey and waved goodbye and 'slipped the surly bonds of earth' to 'touch the face of God.'"
              </p>
              <p className="text-[10px] uppercase tracking-widest text-sky-500 font-bold">— President Ronald Reagan, 1986</p>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mt-4"
            >
              <Link href="/share-story" className="group relative">
                {/* Visual pulse glow backing the submit button */}
                <div className="absolute -inset-1 bg-sky-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                
                <button className="relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95">
                  Write Your Memory
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </Link>

              <Link 
                href="/stories" 
                className="text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-2"
              >
                <Sparkles size={14} className="text-purple-400" />
                Browse the Archive
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Decorative background Latin footer phrase (Ad Astra - To the stars) */}
      <div className="absolute bottom-4 right-0 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[14vw] font-serif text-white whitespace-nowrap leading-none uppercase">
          Ad Astra
        </h2>
      </div>
    </section>
  );
};