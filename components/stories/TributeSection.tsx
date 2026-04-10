import React from 'react';
import { motion } from 'framer-motion';
import { TributeCard } from './TributeCard';

export const TributeSection = ({ stories, title, subtitle, description, icon: Icon, layout, accentColor }: any) => {
  const isRightHeading = layout === "right";

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 ${isRightHeading ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Sticky Heading Area */}
        <div className="w-full lg:w-1/3">
          <motion.div 
            initial={{ opacity: 0, x: isRightHeading ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`sticky top-32 space-y-6 ${isRightHeading ? 'lg:text-right' : 'lg:text-left'} text-center`}
          >
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${accentColor.bg} border ${accentColor.border}`}>
              <Icon size={16} className={accentColor.text} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-300">
                {subtitle}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              {title}
            </h2>
            
            <p className="text-slate-400 font-light leading-relaxed italic max-w-sm mx-auto lg:mx-0 text-lg">
              "{description}"
            </p>

            <div className={`hidden lg:flex ${isRightHeading ? 'justify-end' : 'justify-start'} pt-8`}>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Stories Grid Area */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story: any, idx: number) => (
              <motion.div
                key={story.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 2) * 0.15 }}
                viewport={{ once: true }}
              >
                <TributeCard story={story} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};