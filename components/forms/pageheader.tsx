"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Rocket, X, Cpu } from 'lucide-react';

interface PageHeaderProps {
  onSearch: (query: string) => void;
}

export const PageHeader = ({ onSearch }: PageHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lastSearchRef = useRef(''); // Track last search to prevent loops

  useEffect(() => {
    // Only trigger if the query is different from the last one sent
    if (searchQuery === lastSearchRef.current) return;

    const timer = setTimeout(() => {
      lastSearchRef.current = searchQuery;
      onSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <header className="relative pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.12),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/10 bg-sky-500/[0.03] backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-sky-400/80 font-mono">Challenger Archive Connected</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight tracking-tight">
  The Living <br />
  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-slate-500">
    Archive
  </span>
</h1>
        </motion.div>

        <div className="max-w-2xl mx-auto mt-16 relative">
  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 blur-xl opacity-50" />
  <div className="relative bg-slate-950/50 border border-white/10 backdrop-blur-2xl rounded-full p-1.5 flex items-center shadow-2xl">
    <div className="pl-6 text-sky-500/50">
      <Search size={20} />
    </div>
    <input 
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search the collective memory..."
      className="flex-grow bg-transparent border-none py-4 px-4 text-white placeholder:text-slate-600 outline-none text-lg"
    />
    <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
      Explore
    </button>
  </div>
</div>
      </div>
    </header>
  );
};