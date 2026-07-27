import React from "react";
import { BookOpen, Quote, Sparkles } from "lucide-react";

export function WhyThisProjectExists() {
  return (
    <section className="relative w-full bg-[#020617] text-white py-20 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-sky-500/30" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-sky-400 font-semibold flex items-center gap-2">
            <BookOpen size={12} className="text-sky-400/70" />
            Project Purpose
          </span>
          <div className="h-[1px] w-8 bg-sky-500/30" />
        </div>

        {/* Main Title */}
        <h2 className="text-center font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
          History Lives Through People
        </h2>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-10">
          
          {/* Left / Top Narrative Text */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 font-light text-base sm:text-lg leading-relaxed">
            <p>
              The Challenger mission is remembered through photographs, news reports, official records, and historical accounts. Equally important are the memories carried by the people whose lives were touched by the mission.
            </p>
            <p>
              Every memory—whether from someone who watched the launch live in 1986 or someone inspired decades later—adds another voice to the story of Challenger’s enduring legacy.
            </p>
          </div>

          {/* Right / Bottom Featured Quote Box (Christa McAuliffe Inspiration) */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
            
            <div className="relative rounded-2xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
              <Quote className="w-8 h-8 text-sky-400/40 mb-4" />
              
              <blockquote className="font-serif text-sm sm:text-base text-slate-200 italic leading-relaxed mb-4">
                &ldquo;Inspired by educator Christa McAuliffe’s belief that history is best understood through the experiences of ordinary people, Challenger Memories preserves these personal stories so they remain accessible to future generations.&rdquo;
              </blockquote>

              <div className="flex items-center gap-2 text-xs font-mono text-sky-400/80 uppercase tracking-wider">
                <Sparkles size={12} className="text-sky-400" />
                <span>Honoring STS-51-L Legacy</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}