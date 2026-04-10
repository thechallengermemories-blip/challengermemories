"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Story {
  _id: string;
  name: string;
  title: string;
  narrative: string;
  mission: 'challenger' | 'columbia';
  imageUrl?: string;
  createdAt: string;
}

export const StoriesGrid = ({ stories }: { stories: Story[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
      <AnimatePresence mode="popLayout">
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            layout
          >
            <Link href={`/stories/${story._id}`} className="group block h-full">
              <div className={cn(
                "relative h-full flex flex-col p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md transition-all duration-500",
                "hover:bg-slate-900/60 hover:border-white/10",
                story.mission === 'challenger' ? "hover:shadow-[0_0_40px_-15px_rgba(56,189,248,0.3)]" : "hover:shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)]"
              )}>
                
                {/* Image Preview (If exists) */}
                {story.imageUrl && (
                  <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
                    <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  </div>
                )}

                {/* Header: Mission & Time */}
                <div className="flex items-center justify-between mb-6">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                    story.mission === 'challenger' ? "text-sky-400 border-sky-400/30 bg-sky-400/5" : "text-purple-400 border-purple-400/30 bg-purple-400/5"
                  )}>
                    {story.mission}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono">
                    <Clock size={12} />
                    {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-white transition-colors leading-tight italic">
                  "{story.title}"
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 font-light">
                  {story.narrative}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-sky-400 transition-colors">
                      <User size={14} />
                    </div>
                    <span className="text-xs text-slate-300 font-medium tracking-wide">{story.name}</span>
                  </div>
                  <div className="text-slate-500 group-hover:translate-x-1 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
                   <ImageIcon size={40} strokeWidth={1} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};