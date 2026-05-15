"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface PageHeaderProps {
  onSearch: (query: string) => void;
}

export const PageHeader = ({ onSearch }: PageHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lastSearchRef = useRef('');

  useEffect(() => {
    if (searchQuery === lastSearchRef.current) return;

    const timer = setTimeout(() => {
      lastSearchRef.current = searchQuery;
      onSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <header className="relative pt-34 sm:pt-32 md:pt-40 pb-8 md:pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.12),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full border border-sky-500/10 bg-sky-500/[0.03] backdrop-blur-md mb-6 sm:mb-8 max-w-[90vw]">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.5em] text-sky-400/80 font-mono whitespace-nowrap">
              Challenger Archive Connected
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 sm:mb-8 leading-tight tracking-tight">
            The Living <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-slate-500">
              Archive
            </span>
          </h1>
        </motion.div>

        {/* Search bar */}
        <div className="w-full max-w-2xl mx-auto mt-10 sm:mt-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 blur-xl opacity-50" />

          {/* Desktop: pill */}
          <div className="relative hidden sm:flex bg-slate-950/50 border border-white/10 backdrop-blur-2xl rounded-full p-1.5 items-center shadow-2xl">
            <div className="pl-5 text-sky-500/50 flex-shrink-0">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the collective memory..."
              className="flex-grow bg-transparent border-none py-4 px-4 text-white placeholder:text-slate-600 outline-none text-base lg:text-lg min-w-0"
            />
            <button className="flex-shrink-0 bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 lg:px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
              Explore
            </button>
          </div>

          {/* Mobile: stacked */}
          <div className="relative flex flex-col sm:hidden gap-3 bg-slate-950/50 border border-white/10 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl">
            <div className="flex items-center gap-3 px-1">
              <div className="text-sky-500/50 flex-shrink-0">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the collective memory..."
                className="flex-grow bg-transparent border-none py-2 text-white placeholder:text-slate-600 outline-none text-base min-w-0"
              />
            </div>
            <button className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
              Explore
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};