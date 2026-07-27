"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, GraduationCap, BookOpen, Orbit, Globe } from "lucide-react";

const PERSPECTIVES = [
  {
    num: "01",
    label: "Classroom Memory",
    icon: GraduationCap,
    text: "Perhaps you remember watching Challenger from your classroom.",
    color: "sky",
  },
  {
    num: "02",
    label: "Educational Legacy",
    icon: BookOpen,
    text: "Perhaps a teacher introduced you to Christa McAuliffe years later.",
    color: "violet",
  },
  {
    num: "03",
    label: "Sparked Interest",
    icon: Orbit,
    text: "Perhaps Challenger inspired your interest in science, education, engineering, or space exploration.",
    color: "amber",
  },
  {
    num: "04",
    label: "Inherited History",
    icon: Globe,
    text: "Perhaps you discovered the story through your family, a museum, a book, or popular culture.",
    color: "emerald",
  },
];

const colorStyles: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  sky:     { border: "hover:border-sky-500/30",     bg: "bg-sky-500/[0.02]",     text: "text-sky-400",     badge: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  violet:  { border: "hover:border-violet-500/30",  bg: "bg-violet-500/[0.02]",  text: "text-violet-400",  badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  amber:   { border: "hover:border-amber-500/30",   bg: "bg-amber-500/[0.02]",   text: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  emerald: { border: "hover:border-emerald-500/30", bg: "bg-emerald-500/[0.02]", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
};

export const WhyYourStoryMatters: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="my-10 max-w-4xl mx-auto text-left"
    >
      {/* Glass Card Container */}
      <div className="relative rounded-3xl bg-slate-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-xl overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Badge & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-sky-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">
              <Heart size={12} className="text-sky-400 shrink-0" />
              <span>Inclusive Memory Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              Why Your Story Matters
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono tracking-wider">
            <Sparkles size={12} className="text-sky-400 shrink-0" />
            <span>Every Perspective Belongs</span>
          </div>
        </div>

        {/* Opening Reassurance Statement */}
        <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed mb-6">
          You do not need to have worked for NASA or witnessed the launch firsthand for your story to matter.
        </p>

        {/* 4 "Perhaps..." Scenarios Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {PERSPECTIVES.map((item, idx) => {
            const style = colorStyles[item.color] || colorStyles.sky;
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                className={`p-4 rounded-2xl border border-white/5 ${style.bg} ${style.border} transition-all duration-300 flex flex-col justify-between group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-md border ${style.badge}`}>
                    {item.num}
                  </span>
                  <Icon size={14} className={`${style.text} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1 font-semibold">
                    {item.label}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed font-light group-hover:text-slate-100 transition-colors">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Verbatim Text Box */}
        <div className="pt-5 border-t border-white/5 space-y-2">
          <p className="text-slate-200 text-sm font-medium leading-relaxed">
            Every perspective contributes to our understanding of Challenger’s lasting impact.
          </p>
          <p className="text-slate-400 text-xs font-light leading-relaxed">
            Your memory becomes part of a growing public archive that helps future generations understand not only what happened—but how it continues to shape lives today.
          </p>
        </div>

      </div>
    </motion.div>
  );
};