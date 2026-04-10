"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { User, Quote } from 'lucide-react';
import Link from 'next/link';

export const FamilySection = ({ stories }: { stories: any }) => {
  const categories = [
    { id: 'type1', label: 'Immediate Family', subtitle: 'The Personal Legacy' },
    { id: 'type2', label: 'Close Friends', subtitle: 'Stories of Bond' },
    { id: 'type3', label: 'NASA Colleagues', subtitle: 'Professional Tributes' },
  ];

  return (
    <div className="space-y-32">
      {categories.map((cat, idx) => (
        <div key={cat.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-start`}>
          {/* Section Label */}
          <div className="w-full md:w-1/4 sticky top-32">
            <h3 className="text-4xl font-serif text-white mb-2 leading-tight">{cat.label}</h3>
            <p className="text-sky-400/60 font-mono text-[10px] uppercase tracking-widest">{cat.subtitle}</p>
            <div className="h-px w-full bg-gradient-to-r from-sky-500/50 to-transparent mt-6" />
          </div>

          {/* Stories Horizontal Scroll or Grid */}
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories[cat.id]?.map((story: any, sIdx: number) => (
              <Link href={`/stories/${story._id}`} key={story._id}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 overflow-hidden"
                >
                  <Quote className="absolute top-6 right-8 text-sky-500/10 group-hover:text-sky-500/20 transition-colors" size={60} />
                  
                  <div className="relative z-10">
                    <p className="text-lg text-slate-300 font-light italic mb-8 line-clamp-4 leading-relaxed">
                      "{story.narrative}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <User size={16} className="text-sky-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{story.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Verified Relation</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};