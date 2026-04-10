"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShieldCheck, Info, X, Camera, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const StoryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus styles specifically for the Challenger Sky-Blue theme
  const inputBaseStyles = cn(
    "w-full bg-slate-950/40 border border-white/10 rounded-2xl px-6 py-5 text-slate-100",
    "placeholder:text-slate-500/60 outline-none transition-all duration-300",
    "focus:bg-slate-900/60 focus:ring-1 focus:border-sky-500/50 focus:ring-sky-500/20"
  );

  const labelStyles = "text-[10px] uppercase tracking-[0.4em] text-sky-400/70 ml-1 font-mono font-semibold block mb-3";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("mission", "challenger");
      if (selectedFile) formData.append("image", selectedFile);

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        formRef.current?.reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-24 px-6 text-center"
      >
        <div className="inline-flex p-5 rounded-full mb-8 bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-serif text-white mb-6">Transmission Logged</h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Your tribute has been safely archived. It will remain a permanent part of the Challenger legacy.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-sky-400 hover:text-sky-300 underline underline-offset-8 decoration-sky-400/20 hover:decoration-sky-400 transition-all text-xs uppercase tracking-widest font-bold"
        >
          Submit Another Entry
        </button>
      </motion.div>
    );
  }

  return (
    <section className="pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-slate-900/30 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className={labelStyles}>Observer Name</label>
                  <input name="name" required type="text" placeholder="Identity or Anonymous" className={inputBaseStyles} />
                </div>
                <div className="space-y-1">
                  <label className={labelStyles}>Email Address</label>
                  <input name="email" type="email" placeholder="Verification purposes only" className={inputBaseStyles} />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Log Title</label>
                <input name="title" required type="text" placeholder="Title of your reflection..." className={cn(inputBaseStyles, "font-serif text-xl placeholder:font-sans")} />
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>The Narrative</label>
                <textarea name="narrative" required rows={8} placeholder="Share your memory, feelings, or a message to the crew..." className={cn(inputBaseStyles, "leading-relaxed resize-none font-sans")} />
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Visual Evidence</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                  />
                  <div className="border border-dashed border-white/10 group-hover:border-sky-500/30 rounded-2xl p-10 transition-all flex flex-col items-center justify-center bg-white/[0.01] group-hover:bg-sky-500/[0.02]">
                    {imagePreview ? (
                      <div className="relative w-full max-w-sm h-52 rounded-xl overflow-hidden shadow-2xl">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-red-500 transition-colors z-30"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="mb-4 text-sky-500/40 transition-transform group-hover:scale-110" size={32} />
                        <p className="text-slate-400 text-sm font-light">Attach a relevant photograph or tribute</p>
                        <p className="text-slate-600 text-[10px] mt-2 font-mono tracking-widest">LIMIT: 10MB (JPG, PNG)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative py-6 rounded-2xl bg-sky-500 text-slate-950 font-bold uppercase tracking-[0.5em] text-[11px] transition-all overflow-hidden group disabled:opacity-70"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                   {isSubmitting ? (
                     <><Loader2 size={16} className="animate-spin" /> Synchronizing...</>
                   ) : (
                     <><Sparkles size={14} /> Commit to Archive <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                   )}
                </div>
                <div className="absolute inset-0 bg-white/20 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </button>
            </form>
          </motion.div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden">
              <h3 className="text-white font-serif text-3xl mb-8 leading-tight">Archive <br />Protocol</h3>
              
              <ul className="space-y-8">
                {[
                  { label: "Respect", text: "Honoring the memory of the seven brave souls." },
                  { label: "Perspective", text: "How did this moment change your view of the stars?" },
                  { label: "Connection", text: "Shared human experience is the core of this archive." }
                ].map((tip, i) => (
                  <li key={i} className="group/item">
                    <span className="text-[9px] font-mono font-bold block mb-2 text-sky-500 uppercase tracking-widest">
                      Guideline 0{i+1}
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors">
                      {tip.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] border border-sky-500/10 bg-sky-500/5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-sky-500/50" size={20} />
                <span className="text-white text-[10px] font-mono uppercase tracking-[0.2em]">Secure Transmission</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Your entry is handled with reverence. Contact info is only used to verify authentic eyewitness accounts if needed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};