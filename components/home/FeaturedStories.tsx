"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowUpRight, Clock, User } from 'lucide-react';

// Keep the original static stories as a fallback if the DB is empty or during API failures
const FALLBACK_STORIES = [
  {
    _id: "1",
    title: "A Teacher's Silent Promise",
    narrative: "I was in fifth grade when Christa McAuliffe was selected. She wasn't just an astronaut; she was our teacher in the stars...",
    name: "Sarah Jenkins",
    createdAt: "2023-10-12T00:00:00.000Z",
    mission: "Challenger",
  },
  {
    _id: "2",
    title: "The Laboratory in the Sky",
    narrative: "Working at Houston during STS-107 was the highlight of my career. The dedication of the Columbia crew to science was unparalleled...",
    name: "Dr. Robert Chen",
    createdAt: "2023-09-28T00:00:00.000Z",
    mission: "Columbia",
  },
  {
    _id: "3",
    title: "The Day the Sky Stood Still",
    narrative: "Every generation has a moment that defines their view of the heavens. For me, it was that cold January morning in Florida...",
    name: "Michael Vance",
    createdAt: "2023-11-05T00:00:00.000Z",
    mission: "Challenger",
  }
];

// Helper: Dynamically map styles based on the mission
const getMissionStyles = (mission: string) => {
  const norm = mission?.toLowerCase() || '';
  if (norm.includes('challenger')) {
    return {
      color: "text-sky-400 border-sky-400/30 bg-sky-400/5",
      glow: "group-hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.4)]",
    };
  }
  if (norm.includes('columbia')) {
    return {
      color: "text-purple-400 border-purple-400/30 bg-purple-400/5",
      glow: "group-hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.4)]",
    };
  }
  // Default style for other missions
  return {
    color: "text-amber-400 border-amber-400/30 bg-amber-400/5",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.4)]",
  };
};

// Helper: Estimate read time based on narrative length
const calculateReadTime = (text: string): string => {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

// Helper: Format Mongo timestamp to a friendly format
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
};

export const FeaturedStories = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFeaturedStories() {
      try {
        const res = await fetch('/api/stories?page=1');
        const json = await res.json();
        
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Take only the first 3 latest published stories
          setStories(json.data.slice(0, 3));
        } else {
          // Fallback if DB is empty
          setStories(FALLBACK_STORIES);
        }
      } catch (error) {
        console.error("Failed to fetch featured stories:", error);
        // Fallback in case of network or API error
        setStories(FALLBACK_STORIES);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedStories();
  }, []);

  return (
    <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Orbital Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-white/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sky-400 mb-4"
            >
              <MessageSquare size={18} />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Voices of the People</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-white"
            >
              Featured  <span className="italic">Memories</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/stories" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
              <span className="text-sm uppercase tracking-widest font-medium">View Archive</span>
              <div className="p-2 rounded-full border border-slate-800 group-hover:border-white transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic / Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Shimmer skeletons displayed during loading
            Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            stories.map((story, index) => {
              const styles = getMissionStyles(story.mission);
              return (
                <motion.div
                  key={story._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <Link href={`/stories/${story._id}`} className="group block h-full">
                    <div className={`
                      h-full p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 
                      backdrop-blur-md transition-all duration-500 
                      hover:bg-slate-900/60 hover:border-slate-500/30
                      flex flex-col justify-between ${styles.glow}
                    `}>
                      
                      <div>
                        {/* Mission Tag */}
                        <div className="flex items-center justify-between mb-8">
                          <div className={`px-4 py-1.5 rounded-full border ${styles.color}`}>
                            <span className="text-[10px] uppercase tracking-widest font-bold">
                              {story.mission}
                            </span>
                          </div>
                          <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
                            <Clock size={16} />
                          </div>
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-4 leading-tight group-hover:text-sky-400 transition-colors">
                          "{story.title}"
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">
                          {story.narrative}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-6 border-t border-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/10">
                            <User size={14} className="text-slate-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-white font-medium">{story.name}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">
                              {formatDate(story.createdAt)}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 uppercase italic">
                          {calculateReadTime(story.narrative)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        {/* CTA Section below grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent"
        />
      </div>
    </section>
  );
};

// Shimmer Loader Card Component
const SkeletonCard = () => (
  <div className="h-[380px] p-8 rounded-[2.5rem] bg-slate-900/20 border border-slate-800/50 animate-pulse flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="h-6 w-24 bg-slate-800 rounded-full" />
        <div className="h-4 w-4 bg-slate-800 rounded-full" />
      </div>
      <div className="h-8 bg-slate-800 rounded-md w-3/4 mb-4" />
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
        <div className="h-4 bg-slate-800 rounded w-2/3" />
      </div>
    </div>
    <div className="pt-6 border-t border-slate-800/50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 bg-slate-800 rounded w-16" />
          <div className="h-2.5 bg-slate-800 rounded w-12" />
        </div>
      </div>
      <div className="h-3 bg-slate-800 rounded w-12" />
    </div>
  </div>
);