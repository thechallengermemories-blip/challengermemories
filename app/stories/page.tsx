"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { StoryCard } from '@/components/stories/StoryCard';
import { Pagination } from '@/components/stories/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import {CrewFooter} from "@/components/layout/crewfooter"

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef('');
  const storiesSectionRef = useRef<HTMLDivElement>(null);


  const fetchStories = useCallback(async (query: string, page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        mission: 'challenger',
        page: page.toString(),
        sort: '-createdAt',
        ...(query && { search: query }),
      });
      const response = await fetch(`/api/stories?${params.toString()}`);
      const result = await response.json();
      if (result.success) {
        setStories(result.data);
        setTotalPages(result.totalPages || 1);
      }
    } catch (err) {
      console.error('Archive synchronization failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchQuery === inputRef.current) return;
    const timer = setTimeout(() => {
      inputRef.current = searchQuery;
      setCurrentPage(1);
      fetchStories(searchQuery, 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchStories]);

  useEffect(() => {
    fetchStories(searchQuery, currentPage);
  }, [currentPage]); // eslint-disable-line

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30">

      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.025] mix-blend-overlay" />
      </div>

      <Navbar />

      {/* ── HERO HEADER ─────────────────────────────────────── */}
      <header className="relative pt-36 sm:pt-40 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.1),transparent_65%)]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/15 bg-sky-500/[0.04] backdrop-blur-md mb-10">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-sky-400/80 font-mono">
                Challenger Archive — January 28, 1986
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] tracking-tight mb-6">
              Where Memory<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-slate-200 to-slate-500">
                Refuses to Fade
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-400 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-14">
              Forty years on, the world still holds Challenger close. These are the memories people carry — from classrooms, living rooms, and lifetimes shaped by a single morning.
            </p>

          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl mx-auto relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 blur-xl opacity-50 rounded-full" />

            {/* Desktop */}
            <div className="relative hidden sm:flex bg-slate-950/60 border border-white/10 backdrop-blur-2xl rounded-full p-1.5 items-center shadow-2xl">
              <div className="pl-5 text-sky-500/50 flex-shrink-0">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories, names, stories..."
                className="flex-grow bg-transparent border-none py-4 px-4 text-white placeholder:text-slate-600 outline-none text-sm lg:text-base min-w-0"
              />
              <button className="flex-shrink-0 bg-sky-500 hover:bg-sky-400 text-slate-950 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
                Search
              </button>
            </div>

            {/* Mobile */}
            <div className="relative flex flex-col sm:hidden gap-3 bg-slate-950/60 border border-white/10 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl">
              <div className="flex items-center gap-3 px-1">
                <Search size={17} className="text-sky-500/50 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search memories..."
                  className="flex-grow bg-transparent border-none py-2 text-white placeholder:text-slate-600 outline-none text-base min-w-0"
                />
              </div>
              <button className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── STORIES GRID ────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-32">

        {/* Section label row */}
        <div ref={storiesSectionRef} className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-serif text-white">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Stories'}
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-light">
              {searchQuery
                ? `${stories.length} record${stories.length !== 1 ? 's' : ''} found`
                : 'Voices from across the world, preserved here'}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Live Archive</span>
            </div>
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Global Sync Active</span>
          </div>
        </div>

        {loading && (
  <>
    {/* Mission spinner */}
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative w-16 h-16">
        <svg className="absolute inset-0 animate-spin" style={{ animationDuration: '2.8s' }} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="rgba(56,189,248,0.12)" strokeWidth="1.5"/>
          <circle cx="32" cy="32" r="30" stroke="rgba(56,189,248,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="28 160"/>
          <circle cx="32" cy="2" r="2.5" fill="#38bdf8"/>
        </svg>
        <svg className="absolute inset-[10px]" style={{ animation: 'spin 1.8s linear infinite reverse' }} viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="18" stroke="rgba(56,189,248,0.35)" strokeWidth="1" strokeLinecap="round" strokeDasharray="12 100"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-sky-500/80" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-sky-400/60 uppercase mb-1">
          Syncing memory archive
        </p>
        <p className="font-mono text-[8px] tracking-[0.25em] text-sky-400/25 uppercase animate-pulse">
          transmission incoming
        </p>
      </div>
    </div>

    {/* Skeleton cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex flex-col gap-3 overflow-hidden">
          {/* scanline */}
          <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-sky-400/[0.05] to-transparent animate-[scan_2.8s_ease-in-out_infinite]"
               style={{ animationDelay: `${i * 0.35}s` }} />
          {/* corners */}
          {['top-2 left-2 border-t border-l','top-2 right-2 border-t border-r','bottom-2 left-2 border-b border-l','bottom-2 right-2 border-b border-r'].map((cls,j) => (
            <div key={j} className={`absolute w-2 h-2 ${cls} border-sky-400/20`} />
          ))}
          <p className="font-mono text-[8px] tracking-[0.18em] text-sky-400/20 uppercase">REC-00{i} · awaiting</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400/30 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            <div className="h-4 w-20 rounded-full bg-white/[0.04] border border-sky-400/10 animate-pulse" />
            <div className="h-4 w-12 rounded-full bg-white/[0.04] border border-sky-400/10 animate-pulse ml-auto" />
          </div>
          <div className="h-3 w-[85%] rounded bg-white/[0.04] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          <div className="h-3 w-[60%] rounded bg-white/[0.04] animate-pulse" />
          <div className="h-px bg-white/[0.04] my-1" />
          <div className="h-2.5 w-full rounded bg-white/[0.04] animate-pulse" />
          <div className="h-2.5 w-[80%] rounded bg-white/[0.04] animate-pulse" />
          <div className="h-2.5 w-[65%] rounded bg-white/[0.04] animate-pulse" />
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-px bg-sky-400/[0.08]" />
            <span className="font-mono text-[7px] tracking-[0.2em] text-sky-400/18 uppercase">awaiting transmission</span>
            <div className="flex-1 h-px bg-sky-400/[0.08]" />
          </div>
        </div>
      ))}
    </div>
  </>
)}

        {/* Stories */}
        {!loading && stories.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchQuery}-${currentPage}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {stories.map((s: any) => (
                <StoryCard key={s._id} story={s} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!loading && stories.length === 0 && (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
            <Search className="mx-auto text-slate-700 mb-4" size={40} />
            <p className="text-slate-500 font-serif italic text-xl">No records found in this sector of the archive.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 text-xs text-sky-500 hover:text-sky-400 uppercase tracking-widest font-mono transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && stories.length > 0 && (
         <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
           onPageChange={(page) => {
            setCurrentPage(page);
            storiesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        )}
      </section>
      <CrewFooter/>
    </main>
  );
};

export default StoriesPage;