"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Quote, Clock } from 'lucide-react';

interface Story {
  _id: string;
  title: string;
  narrative: string;
  name: string;
  createdAt: string;
}

// Fallback used only if the DB is empty or the API call fails
const FALLBACK_STORIES: Story[] = [
  {
    _id: "1",
    title: "The Day the Classroom Fell Silent",
    narrative: "I was in third grade, watching the grainy TV screen. Our teacher, Mrs. Gable, didn't say a word for an hour. It was the first time I realized how brave explorers truly are...",
    name: "Sarah J. Miller",
    createdAt: "2023-10-12T00:00:00.000Z",
  },
  {
    _id: "2",
    title: "A Letter to Christa McAuliffe",
    narrative: "You weren't just an astronaut; you were our teacher. Because of you, I spent thirty years in the classroom teaching my students to reach for the stars...",
    name: "Robert Chen",
    createdAt: "2024-01-28T00:00:00.000Z",
  },
  {
    _id: "3",
    title: "The Blue Suit in my Dreams",
    narrative: "My father worked on the SRB seals. The weight of that day stayed with our family, but so did the pride of what those seven souls stood for...",
    name: "David Vance",
    createdAt: "2023-11-05T00:00:00.000Z",
  }
];

// Helper: friendly date
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

// Helper: estimate read time from narrative length
const calculateReadTime = (text: string): string => {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const StoriesPreviewList = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch('/api/stories?page=1');
        const json = await res.json();

        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setStories(json.data.slice(0, 3));
        } else {
          setStories(FALLBACK_STORIES);
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        setStories(FALLBACK_STORIES);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStories();
  }, []);

  return (
    <section className="py-24 px-4 bg-[#020617] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-sky-400" />
              <span className="text-sky-400 font-bold uppercase tracking-[0.2em] text-xs">Voices of Remembrance</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Community Stories</h2>
          </div>
          
          <Link 
            href="/stories" 
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">Read all tributes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => <StoryCardSkeleton key={index} />)
          ) : (
            stories.map((story, index) => (
              <StoryCard key={story._id} story={story} index={index} />
            ))
          )}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-sky-500" />
            </div>
            <div>
                <h4 className="text-xl text-white font-medium">Have a memory to share?</h4>
                <p className="text-slate-400 text-sm">Your memory helps keep their legacy alive for future generations.</p>
            </div>
          </div>
          <Link href="/share-story">
            <button className="px-8 py-4 bg-white text-black hover:bg-sky-400 hover:text-white transition-all duration-300 rounded-full font-semibold text-sm">
                Share your memories
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const StoryCard = ({ story, index }: { story: Story, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/stories/${story._id}`}>
        <div className="group relative h-full p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-500 flex flex-col">
          {/* Quote Icon Background */}
          <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Quote className="w-12 h-12 text-white" />
          </div>

          {/* Card Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">
                    {story.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                    <p className="text-sm text-slate-200 font-medium">{story.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {calculateReadTime(story.narrative)}
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-serif text-white mb-4 group-hover:text-sky-300 transition-colors leading-snug">
              {story.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 italic">
              "{story.narrative}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500">{formatDate(story.createdAt)}</span>
            <span className="text-xs font-bold text-sky-500/80 group-hover:text-sky-400 flex items-center gap-1 uppercase tracking-widest">
                Read More <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Shimmer skeleton shown while the real stories load
const StoryCardSkeleton = () => (
  <div className="h-full p-8 rounded-2xl border border-slate-800 bg-slate-900/40 animate-pulse flex flex-col">
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-slate-800" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 bg-slate-800 rounded w-20" />
          <div className="h-2.5 bg-slate-800 rounded w-14" />
        </div>
      </div>
      <div className="h-6 bg-slate-800 rounded-md w-3/4 mb-4" />
      <div className="space-y-2">
        <div className="h-3.5 bg-slate-800 rounded w-full" />
        <div className="h-3.5 bg-slate-800 rounded w-5/6" />
        <div className="h-3.5 bg-slate-800 rounded w-2/3" />
      </div>
    </div>
    <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
      <div className="h-3 bg-slate-800 rounded w-16" />
      <div className="h-3 bg-slate-800 rounded w-20" />
    </div>
  </div>
);

export default StoriesPreviewList;