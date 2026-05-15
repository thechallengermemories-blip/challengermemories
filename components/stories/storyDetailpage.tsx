"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ChevronRight, Loader2, Sparkles, Info, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function StoryDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/stories/${id}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch { setError(true); } 
      finally { setLoading(false); }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#020617]"><Loader2 className="animate-spin text-sky-500" /></div>;
  if (error || !data) return <div className="h-screen flex items-center justify-center text-slate-300 bg-[#020617]">Entry not found.</div>;

  const { data: story, related } = data;
  const isChallenger = story.mission === 'challenger';
  const accentColor = isChallenger ? "text-sky-400" : "text-purple-400";
  const bgAccent = isChallenger ? "bg-sky-500" : "bg-purple-500";
  const ringColor = isChallenger ? "border-sky-500/20" : "border-purple-500/20";

  return (
    <main className="bg-[#020617] min-h-screen text-slate-100 selection:bg-white/10">
      <motion.div className={cn("fixed top-0 left-0 right-0 h-1 z-[100] origin-left", bgAccent)} style={{ scaleX }} />

      <article className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <Link href="/stories" className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all mb-16 group font-mono text-xs uppercase tracking-widest">
          <div className="w-8 h-[1px] bg-slate-700 group-hover:w-12 transition-all" />
          Back to Archives
        </Link>

        <header className="mb-16">
          <div className={cn("inline-flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-[0.3em]", accentColor)}>
            <Sparkles size={12} /> {story.mission} Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tighter mb-10 max-w-4xl text-white">{story.title}</h1>
        </header>

       {/* Featured Image - Clickable (Clean version) */}
        <section className="relative mb-24">
          <div 
            onClick={() => setIsModalOpen(true)}
            // Added cursor-zoom-in to indicate interactivity
            className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden border border-white/5 bg-[#0a0f1d] cursor-zoom-in group"
          >
            <Image 
              src={story.imageUrl} 
              alt={story.title} 
              fill 
              // Removed scale-105 group-hover transition 
              // so the image stays static and fully visible
              className="object-contain p-4" 
              priority 
              sizes="100vw"
            />
            {/* The text overlay has been completely removed */}
          </div>
        </section>

        {/* --- Image Modal --- */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setIsModalOpen(false)}
            >
              {/* Close button remains, but it's minimal */}
              <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={32} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative w-full h-full max-w-6xl max-h-[90vh]"
                // Added stopPropagation so clicking the image doesn't close the modal
                onClick={(e) => e.stopPropagation()}
              >
                <Image 
                  src={story.imageUrl} 
                  alt={story.title} 
                  fill 
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Image Modal --- */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
              onClick={() => setIsModalOpen(false)}
            >
              <button className="absolute top-8 right-8 text-white/70 hover:text-white">
                <X size={32} />
              </button>
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full h-full max-w-5xl max-h-[80vh]"
              >
                <Image 
                  src={story.imageUrl} 
                  alt={story.title} 
                  fill 
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rest of the layout... */}
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-8 text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-12">
              <span>Observer: {story.name}</span>
              <span>Date: {new Date(story.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
              {story.narrative}
            </div>
          </div>
          
          <aside className="lg:col-span-1">
            <div className={cn("sticky top-20 p-8 rounded-3xl border bg-slate-900/30 backdrop-blur-sm", ringColor)}>
              <div className="flex items-center gap-2 mb-6">
                <Info size={16} className={accentColor} />
                <h3 className="text-white font-serif text-xl">Entry Details</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                This record belongs to the {story.mission} archives. Visual data has been preserved in its original aspect ratio.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}