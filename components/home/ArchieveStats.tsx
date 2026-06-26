"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe2, Sparkles, Database } from 'lucide-react';

interface Stats {
  memoriesCount: number;
  statesCount: number;
  countriesCount: number;
}

const FALLBACK_STATS: Stats = {
  memoriesCount: 32,
  statesCount: 15,
  countriesCount: 2
};

export const ArchiveStatistics = () => {
  const [stats, setStats] = useState<Stats>(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const json = await res.json();
        
        if (json.success && json.data) {
          setStats(json.data);
        } else {
          setStats(FALLBACK_STATS);
        }
      } catch {
        setStats(FALLBACK_STATS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Orbital Rings - matching the FeaturedStories component */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Simplified Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sky-400 mb-2"
          >
            <Sparkles size={16} />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold">The Archive Today</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white tracking-tight"
          >
            A Shared <span className="italic font-light text-slate-400">Journey</span>
          </motion.h2>
        </div>

        {/* Simplified, Clean Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center relative">
          
          {/* STAT 1: Memories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-slate-900/20 border border-slate-800/40 backdrop-blur-sm hover:border-slate-700/50 transition-colors group"
          >
            <div className="p-3.5 rounded-full bg-sky-500/5 border border-sky-400/10 text-sky-400 mb-6 group-hover:scale-105 transition-transform">
              <Database size={20} />
            </div>
            <div className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight">
              {isLoading ? "—" : stats.memoriesCount}
            </div>
            <span className="text-sm font-medium text-slate-300 uppercase tracking-widest">
              Memories Preserved
            </span>
            <p className="text-xs text-slate-500 mt-2 max-w-[200px]">
              Tributes, personal stories, and digital records submitted by the community.
            </p>
          </motion.div>

          {/* STAT 2: States */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-slate-900/20 border border-slate-800/40 backdrop-blur-sm hover:border-slate-700/50 transition-colors group"
          >
            <div className="p-3.5 rounded-full bg-sky-500/5 border border-sky-400/10 text-sky-400 mb-6 group-hover:scale-105 transition-transform">
              <MapPin size={20} />
            </div>
            <div className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight">
              {isLoading ? "—" : stats.statesCount}
            </div>
            <span className="text-sm font-medium text-slate-300 uppercase tracking-widest">
              States Represented
            </span>
            <p className="text-xs text-slate-500 mt-2 max-w-[200px]">
              Geographic footprint across the United States.
            </p>
          </motion.div>

          {/* STAT 3: Countries */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center p-8 rounded-3xl bg-slate-900/20 border border-slate-800/40 backdrop-blur-sm hover:border-slate-700/50 transition-colors group"
          >
            <div className="p-3.5 rounded-full bg-sky-500/5 border border-sky-400/10 text-sky-400 mb-6 group-hover:scale-105 transition-transform">
              <Globe2 size={20} />
            </div>
            <div className="text-5xl md:text-6xl font-serif text-white mb-2 tracking-tight">
              {isLoading ? "—" : stats.countriesCount}
            </div>
            <span className="text-sm font-medium text-slate-300 uppercase tracking-widest">
              Countries Represented
            </span>
            <p className="text-xs text-slate-500 mt-2 max-w-[200px]">
              Connecting perspectives and records from around the world.
            </p>
          </motion.div>

        </div>

        {/* Minimal border separation block at the bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-[0.5px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"
        />

      </div>
    </section>
  );
};