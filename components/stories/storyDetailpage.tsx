"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Share2, ArrowLeft, Quote, ChevronRight, Zap, Info, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function StoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    fetch(`/api/stories/${id}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 border-t-2 border-sky-500 rounded-full" />
        <div className="absolute inset-2 border-b-2 border-purple-500 rounded-full opacity-50" />
      </motion.div>
      <span className="text-[10px] uppercase tracking-[0.5em] text-sky-500/70 animate-pulse font-mono">Synchronizing Neural Link</span>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-white font-serif text-2xl mb-4">Transmission Lost</h2>
      <p className="text-slate-400 mb-8 font-light">The requested memory entry could not be retrieved from the archive.</p>
      <button onClick={() => router.back()} className="text-sky-400 flex items-center gap-2 hover:underline font-mono text-xs tracking-widest">
        <ArrowLeft size={16} /> RETURN TO ARCHIVES
      </button>
    </div>
  );

  const { data: story, related } = data;
  const isChallenger = story.mission === 'challenger';
  const themeColor = isChallenger ? "text-sky-400" : "text-purple-400";
  const themeBg = isChallenger ? "bg-sky-500" : "bg-purple-500";
  const themeBorder = isChallenger ? "border-sky-500/20" : "border-purple-500/20";
  const themeGlow = isChallenger ? "shadow-[0_0_50px_-12px_rgba(14,165,233,0.2)]" : "shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)]";

  return (
    <main className="bg-[#020617] min-h-screen selection:bg-sky-500/30 overflow-x-hidden">
      {/* Reading Progress Bar */}
      <motion.div className={cn("fixed top-0 left-0 right-0 h-1 z-[100] origin-left", themeBg)} style={{ scaleX }} />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {story.imageUrl ? (
            <div className="relative w-full h-full">
              <Image 
                src={story.imageUrl} 
                alt={story.title} 
                fill 
                className="object-cover scale-105 opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/20 to-[#020617]" />
            </div>
          ) : (
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617]" />
          )}
        </div>

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col items-center text-center gap-6 md:gap-10"
          >
            <Link href="/stories" className="group flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-slate-400" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-mono text-slate-300">Archive Index</span>
            </Link>

            <div className="space-y-6">
               <motion.div className={cn("px-4 py-1.5 rounded-full border text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold inline-block backdrop-blur-sm", 
                isChallenger ? "border-sky-500/30 text-sky-400 bg-sky-500/10" : "border-purple-500/30 text-purple-400 bg-purple-500/10")}>
                Mission Phase: {story.mission}
              </motion.div>
              
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] italic max-w-5xl tracking-tight text-balance">
                {story.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8">
               <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-500 text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-mono">Observer</span>
                  <span className="text-white font-light text-sm md:text-lg tracking-wide">{story.name}</span>
               </div>
               <div className="hidden md:block w-px h-10 bg-white/10" />
               <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-500 text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-mono">Timestamp</span>
                  <span className="text-white font-light text-sm md:text-lg tracking-wide">
                    {new Date(story.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Narrative Content */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] gap-16">
          
          {/* Metadata Sidebar (Desktop) */}
          <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
            <div className={cn("p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md", themeGlow)}>
              <div className="flex items-center gap-2 mb-6">
                <Info size={14} className={themeColor} />
                <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold">Signal Intel</h4>
              </div>
              <div className="space-y-5">
                {[
                  { label: 'Transmission', value: 'Decrypted' },
                  { label: 'Integrity', value: 'High' },
                  { label: 'Network', value: 'Deep-Space' },
                  { label: 'Ref-ID', value: `${id?.toString().slice(-8).toUpperCase()}` },
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 uppercase tracking-tight">{item.label}</span>
                    <span className="text-[11px] text-slate-200 font-mono tracking-wider">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Narrative Text */}
          <article className="relative">
            <Quote className={cn("absolute -left-6 md:-left-20 -top-8 opacity-10", themeColor)} size={120} />
            <div className="prose prose-invert prose-lg md:prose-2xl max-w-none">
              <p className="text-slate-200 leading-[1.8] md:leading-[2.1] font-light text-lg md:text-2xl 
                first-letter:text-7xl md:first-letter:text-8xl first-letter:font-serif first-letter:mr-3 
                md:first-letter:mr-4 first-letter:float-left first-letter:text-white whitespace-pre-line drop-shadow-sm">
                {story.narrative}
              </p>
            </div>

            {/* Mobile Metadata Summary */}
            <div className="lg:hidden mt-16 p-6 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-slate-500 font-mono">Memory Fragment</p>
                  <p className="text-xs text-slate-300 font-mono">ARCHIVE-ID: {id?.toString().slice(-8).toUpperCase()}</p>
               </div>
               <ShieldCheck size={20} className={themeColor} />
            </div>

            {/* Share Card */}
            <div className="mt-24 md:mt-40">
              <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-center bg-slate-900/40 border border-white/5">
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none", themeBg)} />
                <Share2 className="text-slate-500 mx-auto mb-6" size={28} />
                <h4 className="text-white font-serif text-3xl md:text-5xl mb-6 italic tracking-tight">Preserve the Legacy</h4>
                <p className="text-slate-400 text-sm md:text-lg max-w-md mx-auto mb-10 font-light leading-relaxed">
                  Every shared story ensures that these moments are never lost to the vacuum of time.
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {['Twitter', 'Copy Transmission', 'Network'].map((platform) => (
                    <button key={platform} className="flex-1 md:flex-none px-8 md:px-12 py-4 rounded-full border border-white/10 text-[9px] md:text-[10px] uppercase tracking-widest text-slate-300 hover:bg-white hover:text-black hover:border-white transition-all duration-500 font-mono">
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Decorative Right Gutter */}
          <aside className="hidden lg:flex flex-col items-center sticky top-32 h-fit">
             <div className="flex flex-col gap-12 items-center">
                <div className={cn("w-px h-40 bg-gradient-to-b from-transparent via-current to-transparent", themeColor)} />
                <span className="[writing-mode:vertical-rl] text-[9px] uppercase tracking-[1em] text-slate-600 font-mono rotate-180 opacity-50">
                  End of Fragment
                </span>
             </div>
          </aside>
        </div>
      </section>

      {/* Related Entries */}
      {related && related.length > 0 && (
        <section className="py-24 px-6 border-t border-white/5 bg-[#01040a]/80">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16 gap-4 text-center">
                <Zap size={20} className={themeColor} />
                <h2 className="text-3xl md:text-5xl font-serif text-white italic tracking-tight">Syncing Related Memories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item: any) => (
                <Link key={item._id} href={`/stories/${item._id}`} className="group block h-full">
                   <div className="h-full p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 group-hover:border-white/20 group-hover:bg-slate-900/70 transition-all duration-500 flex flex-col">
                      <div className={cn("w-16 h-0.5 mb-10 transition-all duration-700 group-hover:w-full", themeBg)} />
                      <h3 className="text-white font-serif text-2xl mb-4 leading-snug transition-colors group-hover:text-white">
                        "{item.title}"
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-3 font-light leading-relaxed mb-10 flex-grow">
                        {item.narrative}
                      </p>
                      <div className={cn("flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-mono transition-colors", themeColor)}>
                        Access Entry <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}