"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowUpRight, Clock, User } from 'lucide-react';

const featuredStories = [
  {
    id: 1,
    title: "A Teacher's Silent Promise",
    excerpt: "I was in fifth grade when Christa McAuliffe was selected. She wasn't just an astronaut; she was our teacher in the stars...",
    author: "Sarah Jenkins",
    date: "Oct 12, 2023",
    mission: "Challenger",
    readTime: "4 min read",
    color: "text-sky-400",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.4)]",
  },
  {
    id: 2,
    title: "The Laboratory in the Sky",
    excerpt: "Working at Houston during STS-107 was the highlight of my career. The dedication of the Columbia crew to science was unparalleled...",
    author: "Dr. Robert Chen",
    date: "Sept 28, 2023",
    mission: "Columbia",
    readTime: "6 min read",
    color: "text-purple-400",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.4)]",
  },
  {
    id: 3,
    title: "The Day the Sky Stood Still",
    excerpt: "Every generation has a moment that defines their view of the heavens. For me, it was that cold January morning in Florida...",
    author: "Michael Vance",
    date: "Nov 05, 2023",
    mission: "Challenger",
    readTime: "5 min read",
    color: "text-sky-400",
    glow: "group-hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.4)]",
  }
];

export const FeaturedStories = () => {
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
              Stories of <span className="italic">Inspiration</span>
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

        {/* Stories Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Link href={`/stories/${story.id}`} className="group block h-full">
                <div className={`
                  h-full p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 
                  backdrop-blur-md transition-all duration-500 
                  hover:bg-slate-900/60 hover:border-slate-500/30
                  flex flex-col justify-between ${story.glow}
                `}>
                  
                  <div>
                    {/* Mission Tag */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`px-4 py-1.5 rounded-full border border-current ${story.color} bg-current/5`}>
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
                      {story.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-6 border-t border-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/10">
                        <User size={14} className="text-slate-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-white font-medium">{story.author}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{story.date}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 uppercase italic">
                      {story.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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