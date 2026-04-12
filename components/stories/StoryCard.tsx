import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowUpRight, Clock } from 'lucide-react';

export const StoryCard = ({ story }: { story: any }) => {
  // Use story.id or story._id depending on your database schema
  const storyId = story.id || story._id;

  return (
    <Link href={`/stories/${storyId}`} className="group block h-full">
      <div className="relative h-full bg-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-sky-500/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] flex flex-col">
        
        {/* Image Section */}
        <div className="relative h-64 w-full overflow-hidden">
          {story.imageUrl ? (
            <>
              <Image 
                src={story.imageUrl} 
                alt={story.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Dark Gradient Overlay for Image Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent" />
              <Quote className="text-white/5 w-16 h-16 rotate-12 transition-transform group-hover:rotate-0 duration-700" />
            </div>
          )}
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-sky-500/10 backdrop-blur-md border border-sky-500/30 rounded-full text-[10px] font-mono text-sky-400 uppercase tracking-widest">
              {story.category || 'Archive'}
            </span>
          </div>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
            <Clock size={10} className="text-sky-400" />
            <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">
               {new Date(story.createdAt).getFullYear()}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl font-serif text-white group-hover:text-sky-400 transition-colors duration-300 leading-tight">
              {story.title}
            </h3>
            <div className="mt-1 p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-sky-500 group-hover:border-sky-500 transition-all duration-300">
              <ArrowUpRight size={16} className="text-white group-hover:scale-110" />
            </div>
          </div>
          
          {/* Enhanced Description Area */}
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-light mb-8 group-hover:text-slate-300 transition-colors">
            {story.narrative}
          </p>

          {/* Spacer to push footer to bottom */}
          <div className="mt-auto">
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-2 ring-white/5">
                  {story.name?.charAt(0) || 'A'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-200 font-medium tracking-wide">
                     {story.name || 'Anonymous Witness'}
                  </span>
                  <span className="text-[10px] text-sky-500/60 font-mono uppercase tracking-tighter">
                    Verified Contributor
                  </span>
                </div>
              </div>

              {/* Hidden "Read" hint that slides in on hover */}
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                Read Story
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};