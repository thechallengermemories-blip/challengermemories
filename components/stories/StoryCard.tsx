import React from 'react';
import Image from 'next/image';
import { Quote, ArrowUpRight } from 'lucide-react';

export const StoryCard = ({ story }: { story: any }) => {
  return (
    <div className="group relative bg-[#0f172a]/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-sky-500/40 transition-all duration-700">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        {story.imageUrl ? (
          <Image 
            src={story.imageUrl} 
            alt={story.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent" />
            <Quote className="text-white/5 w-16 h-16 rotate-12" />
          </div>
        )}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-80" />
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">
             {new Date(story.createdAt).getFullYear()}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <h3 className="text-xl font-serif text-white mb-3 group-hover:text-sky-400 transition-colors duration-300 flex items-center justify-between">
          {story.title}
          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-sky-400" />
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 font-light mb-6">
          {story.content}
        </p>

        <div className="flex items-center gap-3 pt-6 border-t border-white/5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
            {story.authorName?.charAt(0) || 'A'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-200 font-medium tracking-wide">
               {story.authorName || 'Anonymous Witness'}
            </span>
            <span className="text-[10px] text-sky-500/60 font-mono uppercase tracking-tighter">
              Verified Contributor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};