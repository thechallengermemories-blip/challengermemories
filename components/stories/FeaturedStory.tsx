import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, User, Briefcase, Calendar, Layers } from 'lucide-react';

export const FeaturedStory = ({ story, reverse }: { story: any; reverse: boolean }) => {
  const images = story.images || [];

  const getIcon = (rel: string) => {
    if (rel === 'immediate-family') return <Heart size={16} className="text-rose-500" />;
    if (rel === 'friend') return <User size={16} className="text-sky-400" />;
    return <Briefcase size={16} className="text-indigo-400" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative group">
        {/* Multi-image Stack Effect */}
        <div className="relative aspect-[4/5] z-10 overflow-hidden rounded-2xl border border-white/20">
          <Image 
            src={images[0] || '/placeholder.jpg'} 
            alt={story.title} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2 text-[10px] font-mono text-white">
              <Layers size={12} /> +{images.length - 1} Photos
            </div>
          )}
        </div>
        
        {/* Background Decorative Frame */}
        <div className={`absolute -inset-4 border border-sky-500/20 rounded-3xl -z-10 translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0`} />
      </div>

      {/* Text Side */}
      <div className={`w-full md:w-1/2 ${reverse ? 'text-left' : 'text-left md:text-right'} flex flex-col ${reverse ? 'items-start' : 'items-start md:items-end'}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-sky-400 uppercase tracking-widest flex items-center gap-2">
            {getIcon(story.relation)} {story.relation?.replace('-', ' ')}
          </span>
          <div className="h-px w-12 bg-white/10" />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
             {new Date(story.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
          {story.title}
        </h3>
        
        <p className="text-slate-400 text-lg leading-relaxed font-light mb-8 max-w-xl">
          {story.content}
        </p>

        {/* Thumbnail Preview for Multi-images */}
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.slice(1, 4).map((img: string, i: number) => (
              <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};