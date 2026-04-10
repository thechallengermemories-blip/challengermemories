"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PenLine, Rocket, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StoryPageHeader = () => {
  return (
    <section className="pt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Mission Badge / Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-flex items-center justify-center mb-10"
        >
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full" />
          
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
            <Rocket className="w-10 h-10 text-sky-400" />
            
            {/* Spinning Orbit Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-r border-sky-500/40 m-1"
            />
          </div>
        </motion.div>

        {/* Mission Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-sky-500/50" />
          <span className="text-sky-400 font-mono text-[10px] uppercase tracking-[0.5em]">
            Mission STS-51-L
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-sky-500/50" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight"
        >
          Challenger <span className="italic font-light text-slate-400">Stories</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Seven heroes, one eternal mission. Share your memories, reflections, 
          or a tribute to the crew who reached for the stars.
        </motion.p>

        {/* Static Legacy Indicator (Replaces the Tabs) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <PenLine size={16} className="text-sky-400" />
          <span className="text-xs uppercase tracking-[0.2em] text-white font-medium">
            Contributing to the Legacy
          </span>
          <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-500">
            JAN 28, 1986
          </span>
        </motion.div>

        {/* Subtle Decorative Elements */}
        <div className="mt-16 flex items-center justify-center gap-8 opacity-20">
            {[...Array(3)].map((_, i) => (
                <Star key={i} size={12} className="text-sky-400 fill-sky-400" />
            ))}
        </div>
      </div>
    </section>
  );
};