"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, User, Calendar } from 'lucide-react';

interface Story {
  _id: string;
  title: string;
  narrative: string;
  name: string;
  createdAt: string;
  mission: string;
  imageUrl?: string;
  role?: string;      // E.g., "Teacher", "Student", "Engineer"
  location?: string;  // E.g., "Texas", "Ohio", "Florida"
}

// Fallback data reflecting your requested example structure
const FALLBACK_STORIES: Story[] = [
  {
    _id: "rec-1",
    title: "A Quiet Command Center",
    narrative: "Before the telemetry screens lit up, the room held a cathedral-like quietness. Everyone understood the precision required to keep our pioneers safe...",
    name: "Elena Rostova",
    createdAt: "2026-06-20T14:30:00.000Z",
    mission: "Columbia",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    role: "Teacher",
    location: "Texas"
  },
  {
    _id: "rec-2",
    title: "Lessons in the Clouds",
    narrative: "As kids, we drew space shuttles on our notebooks. Years later, looking at those same designs fly, we realized that boundaries only exist where we choose to draw them...",
    name: "Marcus Vance",
    createdAt: "2026-06-18T09:15:00.000Z",
    mission: "Challenger",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    role: "Student",
    location: "Ohio"
  },
  {
    _id: "rec-3",
    title: "The Launchpad Reflection",
    narrative: "We stood miles away, yet the vibration rattled our chests. It wasn't just metal climbing into the heavens—it was our shared human ambition piercing the sky...",
    name: "David K. Harrison",
    createdAt: "2026-05-15T18:45:00.000Z",
    mission: "Challenger",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
    role: "Engineer",
    location: "Florida"
  }
];

// Dynamically generate styles based on the mission type
const getMissionStyles = (mission: string) => {
  const norm = mission?.toLowerCase() || '';
  if (norm.includes('challenger')) {
    return {
      color: "text-sky-400 border-sky-400/30 bg-sky-950/40",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.3)]",
      border: "group-hover:border-sky-500/40",
    };
  }
  if (norm.includes('columbia')) {
    return {
      color: "text-purple-400 border-purple-400/30 bg-purple-950/40",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]",
      border: "group-hover:border-purple-500/40",
    };
  }
  return {
    color: "text-amber-400 border-amber-400/30 bg-amber-950/40",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]",
    border: "group-hover:border-amber-500/40",
  };
};

// Generates fallback imagery if missing from database
const getFallbackImage = (index: number) => {
  const urls = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80"
  ];
  return urls[index % urls.length];
};

// Formats memory metadata to: "Month Year – Role from Location"
const formatMetadataLine = (story: Story): string => {
  try {
    const date = new Date(story.createdAt);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const role = story.role || "Observer";
    const location = story.location || "United States";
    return `${dateStr} – ${role} from ${location}`;
  } catch {
    return `Recent – Observer`;
  }
};

const calculateReadTime = (text: string): string => {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
};

export const RecentlyAddedMemories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRecentStories() {
      try {
        const res = await fetch('/api/stories?page=1&limit=3');
        const json = await res.json();
        
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setStories(json.data.slice(0, 3));
        } else {
          setStories(FALLBACK_STORIES);
        }
      } catch (error) {
        console.error("Failed to fetch recent stories:", error);
        setStories(FALLBACK_STORIES);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentStories();
  }, []);

  // Use the very first story as our visual Spotlight Card
  const spotlightStory = stories[0];

  return (
    <section className="py-24 px-6 bg-[#02040a] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Visual Spotlight Card */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-purple-400 mb-2"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </div>
              <Sparkles size={16} />
              <span className="uppercase tracking-[0.25em] text-xs font-semibold">Spotlight Archive</span>
            </motion.div>

            {isLoading ? (
              <div className="h-[480px] w-full rounded-[2.5rem] bg-slate-900/40 border border-slate-800 animate-pulse" />
            ) : spotlightStory ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Link href={`/stories/${spotlightStory._id}`} className="group block">
                  <div className={`
                    relative h-[480px] rounded-[2.5rem] overflow-hidden 
                    border border-slate-800/80 bg-slate-950/90
                    transition-all duration-500 flex flex-col justify-end
                    ${getMissionStyles(spotlightStory.mission).glow}
                    ${getMissionStyles(spotlightStory.mission).border}
                  `}>
                    
                    {/* Background Graphic */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img 
                        src={spotlightStory.imageUrl || getFallbackImage(0)} 
                        alt={spotlightStory.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out opacity-40 group-hover:opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div className={`px-4 py-1.5 rounded-full border text-[10px] uppercase tracking-widest font-bold ${getMissionStyles(spotlightStory.mission).color}`}>
                          {spotlightStory.mission}
                        </div>
                        <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded font-mono text-slate-400">
                          Primary Entry
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-3xl font-serif text-white leading-tight group-hover:text-purple-300 transition-colors">
                          "{spotlightStory.title}"
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 font-light">
                          {spotlightStory.narrative}
                        </p>
                        <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                              <User size={12} className="text-slate-400" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-white font-medium">{spotlightStory.name}</span>
                              <span className="text-[10px] text-slate-500 uppercase tracking-tight">
                                {formatMetadataLine(spotlightStory)}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">
                            {calculateReadTime(spotlightStory.narrative)}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ) : null}
          </div>

          {/* RIGHT COLUMN: Chronological "Recently Added" List */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full lg:min-h-[520px]">
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl font-serif text-white tracking-wide mb-8 border-b border-slate-800/80 pb-4"
              >
                Recently Added
              </motion.h2>

              <div className="space-y-6">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 w-full bg-slate-900/40 rounded-xl animate-pulse" />
                  ))
                ) : (
                  stories.map((story, index) => {
                    const missionStyles = getMissionStyles(story.mission);
                    return (
                      <motion.div
                        key={story._id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <Link href={`/stories/${story._id}`} className="group block">
                          <div className="flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-slate-800/50">
                            {/* Glowing Timeline Node */}
                            <div className="mt-1.5 relative flex items-center justify-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform duration-300" />
                            </div>
                            
                            <div className="space-y-1">
                              {/* The Specific Format: [Month Year] – [Role] from [Location] */}
                              <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                {formatMetadataLine(story)}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-semibold tracking-wider uppercase ${missionStyles.color}`}>
                                  {story.mission}
                                </span>
                                <span className="text-slate-600 text-xs">•</span>
                                <p className="text-xs text-slate-500 line-clamp-1 italic">
                                  "{story.title}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            {/* View All CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 lg:mt-auto pt-6 border-t border-slate-800/80"
            >
              <Link href="/stories" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <span>View All Memories</span>
                <ArrowRight size={16} className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};