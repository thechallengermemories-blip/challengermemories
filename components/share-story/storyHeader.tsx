"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Rocket, Star, HelpCircle, ArrowRight, Palette, Camera, Film, Mic, ImageIcon, Pencil, FileImage } from "lucide-react";
import { PROMPT_CATEGORIES, PromptCategory } from "./promptsData";

interface HeaderProps {
  onSelectPrompt: (prompt: string) => void;
  selectedPrompt: string | null;
}

const MULTIMEDIA_IDEAS = [
  {
    icon: Camera,
    title: "Personal Photographs",
    description: "A photo of yourself or your family on that morning. Your classroom, your living room TV, the newspaper front page you kept.",
    accent: "sky",
  },
  {
    icon: Pencil,
    title: "Drawings & Sketches",
    description: "Artwork you made as a child in response to the event, or something you've created since to process the memory.",
    accent: "violet",
  },
  {
    icon: Film,
    title: "Home Video Footage",
    description: "Any home video that captures the atmosphere of that day — even if Challenger isn't the focus, context is everything.",
    accent: "amber",
  },
  {
    icon: Mic,
    title: "Voice Recordings",
    description: "Record yourself reading your story aloud. A grandparent's voice narrating their memory is irreplaceable history.",
    accent: "emerald",
  },
  {
    icon: ImageIcon,
    title: "Scanned Documents",
    description: "School assignments, journal pages, newspaper clippings, or letters written around the time of the mission.",
    accent: "rose",
  },
  {
    icon: FileImage,
    title: "Memorial Objects",
    description: "Photograph a patch, pin, book, or any keepsake connected to your memory of the Challenger mission.",
    accent: "sky",
  },
];

const accentMap: Record<string, { border: string; bg: string; icon: string; badge: string }> = {
  sky:    { border: "border-sky-500/20",    bg: "bg-sky-500/[0.04]",    icon: "text-sky-400",    badge: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  violet: { border: "border-violet-500/20", bg: "bg-violet-500/[0.04]", icon: "text-violet-400", badge: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  amber:  { border: "border-amber-500/20",  bg: "bg-amber-500/[0.04]",  icon: "text-amber-400",  badge: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  emerald:{ border: "border-emerald-500/20",bg: "bg-emerald-500/[0.04]",icon: "text-emerald-400",badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  rose:   { border: "border-rose-500/20",   bg: "bg-rose-500/[0.04]",   icon: "text-rose-400",   badge: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
};

export const StoryPageHeader: React.FC<HeaderProps> = ({ onSelectPrompt, selectedPrompt }) => {
  const [activeTab, setActiveTab] = useState<string>("eyewitness");

  const currentCategory = PROMPT_CATEGORIES.find((cat) => cat.id === activeTab) || PROMPT_CATEGORIES[0];
  const isArtTab = activeTab === "art";

  return (
    <section className="pt-28 pb-16 px-6 relative overflow-hidden bg-[#020617] text-white">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        {isArtTab && (
          <div className="absolute top-[20%] left-[40%] w-[40%] h-[40%] bg-violet-500/8 blur-[140px] rounded-full transition-opacity duration-700" />
        )}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
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

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-white mb-6 tracking-tight"
        >
          Share Your <span className="italic font-light text-slate-400">Challenger Story</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-12 mx-auto"
        >
          Your personal reflections, family stories, and classroom memories protect the human legacy of STS-51-L.
          Whether you witnessed the mission or inherited its memory, your voice belongs in this permanent public archive.
        </motion.p>

        {/* Prompt Engine */}
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

          {/* Tabs */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6 border-b border-white/5 pb-5">
            {PROMPT_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeTab === cat.id;
              const isArt = cat.id === "art";
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                    isActive && isArt
                      ? "bg-violet-500/10 border border-violet-500/30 text-violet-400"
                      : isActive
                      ? "bg-sky-500/10 border border-sky-500/30 text-sky-400"
                      : "bg-white/[0.01] border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <IconComponent
                    size={12}
                    className={isActive && isArt ? "text-violet-400" : isActive ? "text-sky-400" : "text-slate-500"}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <p className="text-left text-xs text-slate-400 mb-6 italic pl-1">
            &ldquo;{currentCategory.tagline}&rdquo;
          </p>

          {/* Content area */}
          <AnimatePresence mode="wait">
            {isArtTab ? (
              /* ── Art / Multimedia Panel ── */
              <motion.div
                key="art-panel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {/* Intro callout */}
                <div className="mb-6 p-4 rounded-2xl bg-violet-500/[0.05] border border-violet-500/15 flex gap-3 items-start text-left">
                  <Palette size={16} className="text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                    Words aren't the only way to archive a memory. Upload photographs, drawings, recordings, or scanned documents
                    alongside your story — or let a single image speak on its own. Every format is welcome.
                  </p>
                </div>

                {/* Media idea grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
                  {MULTIMEDIA_IDEAS.map((idea, index) => {
                    const colors = accentMap[idea.accent] ?? accentMap.sky;
                    const Icon = idea.icon;
                    return (
                      <motion.div
                        key={idea.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-4 rounded-2xl border ${colors.border} ${colors.bg} flex flex-col gap-3 group hover:brightness-110 transition-all duration-300`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${colors.badge}`}>
                          <Icon size={14} />
                        </div>
                        <div>
                          <p className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5 ${colors.icon}`}>
                            {idea.title}
                          </p>
                          <p className="text-slate-400 text-xs leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                            {idea.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA nudge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500"
                >
                  <span>Use the attachment field in the form below to upload your media</span>
                  <ArrowRight size={10} className="text-violet-400" />
                </motion.div>
              </motion.div>
            ) : (
              /* ── Regular Prompt Grid ── */
              <motion.div
                key={`prompts-${activeTab}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 gap-4 text-left"
              >
                {currentCategory.prompts.map((prompt, index) => {
                  const isPinned = selectedPrompt === prompt;
                  return (
                    <motion.div
                      key={`${currentCategory.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Divider */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-20">
          {[...Array(3)].map((_, i) => (
            <Star key={i} size={10} className="text-sky-400 fill-sky-400" />
          ))}
        </div>
      </div>
    </section>
  );
};