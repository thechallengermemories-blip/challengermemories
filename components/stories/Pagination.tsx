"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-20 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2 px-6 py-2 bg-slate-900/40 border border-white/5 rounded-2xl">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-10 h-10 rounded-xl text-[10px] font-mono font-bold transition-all",
                currentPage === page 
                  ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                  : "text-slate-500 hover:text-slate-200"
              )}
            >
              {page.toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-20 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};