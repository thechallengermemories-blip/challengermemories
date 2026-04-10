"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, Sparkles, PenTool, Globe } from 'lucide-react';

export const CTAShareStory = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#020617]">
      {/* 1. COSMIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        {/* Animated Radial Pulse */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/20 rounded-full blur-[120px]" 
        />
        
        {/* Subtle Constellation Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 100 200 L 300 150 L 500 250 L 700 100"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 800 400 L 1000 350 L 1200 450"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* 2. MAIN CARD */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 md:p-20 rounded-[3rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl overflow-hidden text-center"
        >
          {/* Glass Decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Globe size={120} className="text-white" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-8"
          >
            <PenTool size={14} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">The Archive is Open</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Your story is a <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-purple-300">
              star in their legacy.
            </span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Where were you? How did their courage change your path? 
            Add your voice to the eternal tribute and help keep their 
            inspiration alive for the next generation of explorers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/share-story" className="group relative">
              {/* Button Pulse Effect */}
              <div className="absolute -inset-1 bg-sky-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <button className="relative px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                Write Your Story
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>

            <Link href="/stories" className="text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" />
              Browse the archive
            </Link>
          </div>

          {/* Bottom Badge Detail */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <span className="text-white font-serif text-2xl">Collective</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Memory</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-serif text-2xl">Global</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Inspiration</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-serif text-2xl">Eternal</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Legacy</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. SCROLL TRANSITION DECOR */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};