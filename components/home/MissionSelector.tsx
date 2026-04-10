"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Calendar } from 'lucide-react';

const missions = [
  {
    id: 'challenger',
    title: 'Challenger',
    subtitle: 'Mission STS-51-L',
    date: 'January 28, 1986',
    crew: '7 Members',
    description: 'Honoring the crew who inspired a generation of explorers and teachers to reach for the stars.',
    image: '/space.webp',
    color: 'group-hover:shadow-[0_0_50px_-12px_rgba(56,189,248,0.3)]',
    accent: 'text-sky-400',
    link: '/challenger',
  }
];

export const MissionSelector = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/5 blur-[120px] rounded-full" />
        {/* Kept a subtle purple glow for depth, or you can remove it */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-sky-500" />
            <span className="text-sky-500 uppercase tracking-[0.3em] text-xs font-semibold">The Mission</span>
            <div className="h-[1px] w-12 bg-sky-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            Explore the <span className="italic">Legacy</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed"
          >
            Explore the history, the courage, and the lasting impact of this 
            pivotal moment in human space exploration.
          </motion.p>
        </div>

        {/* Mission Card - Centered Layout */}
        <div className="flex justify-center">
          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl" // Constraints width so it doesn't get too wide on desktop
            >
              <Link href={mission.link} className="group block relative">
                <div className={`
                  relative h-[550px] md:h-[650px] overflow-hidden rounded-[2.5rem] 
                  border border-white/10 bg-slate-900 transition-all duration-700 
                  ${mission.color}
                `}>
                  
                  {/* IMAGE LAYER */}
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-transparent to-transparent z-10" />
                    
                    <img 
                      src={mission.image} 
                      alt={mission.title}
                      className="w-full h-full object-cover filter grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
                    />
                  </div>

                  {/* CONTENT LAYER */}
                  <div className="relative z-20 h-full p-8 md:p-14 flex flex-col justify-between">
                    
                    <div className="flex justify-between items-start">
                      <div className="px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">
                          {mission.subtitle}
                        </span>
                      </div>
                      <Star className="text-white/20 group-hover:text-white/60 transition-colors" size={24} />
                    </div>

                    <div>
                      <motion.div className="flex flex-col gap-4 mb-6">
                         <h3 className="text-5xl md:text-7xl font-serif text-white">
                           {mission.title}
                         </h3>
                         
                         <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                               <Calendar size={16} className={mission.accent} />
                               <span>{mission.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                               <Users size={16} className={mission.accent} />
                               <span>{mission.crew}</span>
                            </div>
                         </div>
                      </motion.div>

                      <p className="text-slate-300 text-lg font-light leading-relaxed mb-10 max-w-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {mission.description}
                      </p>

                      <div className="flex items-center gap-4 text-white font-semibold">
                        <span className="text-xs uppercase tracking-[0.2em]">Enter Tribute</span>
                        <div className="h-[1px] w-12 bg-white/30 group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                        <div className={`p-3 rounded-full border border-white/20 group-hover:border-white transition-colors`}>
                          <ArrowRight size={18} className={mission.accent} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-[2.5rem] transition-all duration-700 m-4 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};