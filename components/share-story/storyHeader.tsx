"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Rocket, Star, HelpCircle, ArrowRight } from "lucide-react";
import { PROMPT_CATEGORIES, PromptCategory } from "./promptsData"; // adjust import path as needed

interface HeaderProps {
  onSelectPrompt: (prompt: string) => void;
  selectedPrompt: string | null;
}

export const StoryPageHeader: React.FC<HeaderProps> = ({ onSelectPrompt, selectedPrompt }) => {
  const [activeTab, setActiveTab] = useState<string>("eyewitness");

  const currentCategory = PROMPT_CATEGORIES.find((cat) => cat.id === activeTab) || PROMPT_CATEGORIES[0];

  return (
    <section className="pt-28 pb-16 px-6 relative overflow-hidden bg-[#020617] text-white">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Archival Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-sky-500/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.40em] text-sky-400/80 font-semibold flex items-center gap-2">
            <Rocket size={12} className="text-sky-400/60" />
            Public Memory Registry
          </span>
          <div className="h-[1px] w-12 bg-sky-500/25" />
        </motion.div>

        {/* Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-white mb-6 tracking-tight"
        >
          Share Your <span className="italic font-light text-slate-400">Challenger Story</span>
        </motion.h1>

        {/* Narrative Intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-12 mx-auto"
        >
          Your personal reflections, family stories, and classroom memories protect the human legacy of STS-51-L. 
          Whether you witnessed the mission or inherited its memory, your voice belongs in this permanent public archive.
        </motion.p>

        {/* Interactive Prompt Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-4xl mx-auto bg-slate-900/30 border border-white/5 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
            <HelpCircle size={14} className="text-sky-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 font-semibold">
              Need inspiration? Choose a lens to guide you
            </span>
          </div>

          {/* Perspective Selector Tabs */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6 border-b border-white/5 pb-5">
            {PROMPT_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? "bg-sky-500/10 border border-sky-500/30 text-sky-400"
                      : "bg-white/[0.01] border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <IconComponent size={12} className={isActive ? "text-sky-400" : "text-slate-500"} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <p className="text-left text-xs text-slate-400 mb-6 italic pl-1">
            &ldquo;{currentCategory.tagline}&rdquo;
          </p>

          {/* Prompt Grid */}
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <AnimatePresence mode="wait">
              {currentCategory.prompts.map((prompt, index) => {
                const isPinned = selectedPrompt === prompt;
                return (
                  <motion.div
                    key={`${currentCategory.id}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => onSelectPrompt(prompt)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group h-full ${
                      isPinned
                        ? "bg-sky-500/[0.06] border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.05)]"
                        : "bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                      {prompt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                        Prompt 0{index + 1}
                      </span>
                      <span className="text-[10px] font-mono text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        {isPinned ? "Selected Guide" : "Write this story"} <ArrowRight size={10} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-20">
          {[...Array(3)].map((_, i) => (
            <Star key={i} size={10} className="text-sky-400 fill-sky-400" />
          ))}
        </div>
      </div>
    </section>
  );
};