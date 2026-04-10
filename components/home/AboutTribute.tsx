"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Quote, Globe, Heart } from 'lucide-react';

export const AboutTribute = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 flex items-center justify-center bg-[#020617] overflow-hidden"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" 
        />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT COLUMN: VISUAL COMPOSITION */}
          <motion.div 
            style={{ opacity }}
            className="relative"
          >
            {/* Main Image with Glass Frame */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
              <img 
                src="/shuttle.webp" 
                alt="Earth from Space" 
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>

            {/* Floating Info Card 1 */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute -top-10 -right-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block z-20"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-500/20 rounded-full text-sky-400">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Global Impact</p>
                  <p className="text-white font-medium">Shared Humanity</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Info Card 2 */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-6 -left-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block z-20"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                  <Heart size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Tribute Purpose</p>
                  <p className="text-white font-medium">Keep Memories Alive</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: TEXT CONTENT */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-sky-400"
            >
              <Sparkles size={18} />
              <span className="uppercase tracking-[0.4em] text-xs font-bold">Why This Exists</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif text-white leading-tight"
            >
              We are a way for the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Cosmos</span> to know itself.
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative pl-10 border-l border-slate-800"
            >
              <Quote className="absolute top-0 left-[-15px] text-slate-800" size={40} />
              <p className="text-xl text-slate-300 font-light leading-relaxed italic mb-6">
                "The crew of the space shuttle Challenger honored us by the manner in which they lived their lives. We will never forget them, nor the last time we saw them, this morning, as they prepared for their journey and waved goodbye and 'slipped the surly bonds of earth' to 'touch the face of God.'"
              </p>
              <p className="text-sm uppercase tracking-widest text-sky-500 font-semibold">— Ronald Reagan, 1986</p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 leading-relaxed text-lg"
            >
              This website is not just a digital archive; it is a collective pulse of inspiration. 
              The stories shared here bridge the gap between the stars and our hearts, ensuring that 
              the courage of the 14 brave souls continues to fuel the dreams of explorers for 
              generations to come.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-10 mt-4"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white">14</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500">Heroes Honored</span>
              </div>
              <div className="w-[1px] h-12 bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white">∞</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500">Inspiration Shared</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative Text behind everything */}
      <div className="absolute bottom-10 right-0 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20vw] font-serif text-white whitespace-nowrap leading-none uppercase">
          Ad Astra
        </h2>
      </div>
    </section>
  );
};