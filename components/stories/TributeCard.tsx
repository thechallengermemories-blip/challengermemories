import React from 'react';
import Image from 'next/image';
import { Quote, Calendar, ArrowRight, CheckCircle2, Rocket } from 'lucide-react';

export const TributeCard = ({ story }: any) => {
  return (
    <div className="group relative flex flex-col h-[550px] rounded-3xl overflow-hidden bg-[#0f172a] border border-white/10 transition-all duration-500 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10">
      
      {/* Image Section - Increased to 45% for better visibility */}
      <div className="relative h-[45%] w-full bg-slate-900 overflow-hidden">
        {story.imageUrl ? (
          <Image 
            src={story.imageUrl} 
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-all duration-1000 group-hover:scale-110"
            priority={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
            <Rocket size={48} className="text-white/10" />
          </div>
        )}
        
        {/* Subtle Overlay to ensure text legibility if any overlaps */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-500/30">
            <Calendar size={10} />
            {new Date(story.createdAt).getFullYear()}
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <div className="text-[9px] font-bold uppercase tracking-widest text-white bg-sky-600/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
            {story.relation?.replace('-', ' ')}
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="relative flex-1 p-6 flex flex-col justify-between">
        {/* Quote Icon Backdrop */}
        <Quote className="absolute top-4 right-6 text-white/5 w-16 h-16 pointer-events-none" />

        <div className="space-y-3">
          <h3 className="text-xl font-serif text-white leading-tight group-hover:text-sky-300 transition-colors">
            {story.title}
          </h3>
          
          <div className="relative">
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed italic line-clamp-6">
              "{story.narrative}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                {story.name?.charAt(0) || 'A'}
              </div>
              {story.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-[#0f172a]">
                  <CheckCircle2 size={10} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-100">{story.name || 'Anonymous'}</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Archive Witness
              </span>
            </div>
          </div>

          <div className="p-2 rounded-full border border-white/5 group-hover:border-sky-500/50 group-hover:bg-sky-500/10 transition-all">
            <ArrowRight size={16} className="text-slate-500 group-hover:text-sky-400" />
          </div>
        </div>
      </div>
    </div>
  );
};