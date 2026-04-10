import React from 'react';
import { StoryCard } from './StoryCard';
import { Pagination } from './Pagination';
import { Database, Search } from 'lucide-react';

export const PublicChronicles = ({ stories, loading, currentPage, totalPages, onPageChange }: any) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-serif text-white mb-4">Public Chronicles</h2>
          <p className="text-slate-400 font-light max-w-md">
            A collective archive of reflections and tributes from people across the world.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2">
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Live Archive</span>
           </div>
           <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Global Synchronization Active</span>
        </div>
      </div>

      {stories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s: any) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
        </>
      ) : !loading && (
        <div className="py-40 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
          <Search className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-slate-500 font-serif italic text-xl">No records found in this sector of the archive.</p>
        </div>
      )}
    </section>
  );
};