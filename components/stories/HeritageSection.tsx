import React from 'react';
import { motion } from 'framer-motion';
import { TributeCard } from './TributeCard';

export const TributeSection = ({ stories, title, subtitle, description, icon: Icon, isReversed, accent }: any) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      
      {/* Narrative Side */}
      <motion.div 
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-2/5 space-y-6 text-center lg:text-left"
      >
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${accent} border border-white/10`}>
          <Icon size={16} className="text-white/80" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/90">{subtitle}</span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
          {title}
        </h2>
        
        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0 italic">
          "{description}"
        </p>

        {/* Floating Decorative Element */}
        <div className="pt-8 hidden lg:block">
           <div className="h-20 w-px bg-gradient-to-b from-sky-500/50 to-transparent mx-auto lg:ml-0" />
        </div>
      </motion.div>

      {/* Stories Content Side */}
      <div className="w-full lg:w-3/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story: any, idx: number) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <TributeCard story={story} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};