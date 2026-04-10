"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MessageSquare, Info, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    // INCREASED TOP PADDING: pt-32 for mobile, pt-48 for desktop
    <main className="bg-[#020617] min-h-screen pt-32 md:pt-48 pb-20 relative overflow-hidden">
      
      {/* Background Ambience - Adjusted to stay relative to the new padding */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* 1. Left Side: Content & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              {/* Added a small breadcrumb-style label for extra air */}
              <span className="text-sky-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Communication Portal</span>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Reach Out</h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light">
                Whether you have questions about the missions, want to contribute historical data, or simply wish to share a private thought, we are here to listen.
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoItem 
                icon={<Mail className="w-5 h-5" />} 
                title="General Inquiry" 
                detail="tribute@space-shuttle-memorial.org" 
              />
              <ContactInfoItem 
                icon={<MessageSquare className="w-5 h-5" />} 
                title="Story Submissions" 
                detail="stories@space-shuttle-memorial.org" 
              />
              <ContactInfoItem 
                icon={<Info className="w-5 h-5" />} 
                title="Historical Corrections" 
                detail="archive@space-shuttle-memorial.org" 
              />
            </div>

            <div className="pt-8 border-t border-slate-800/50">
               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4">Transmission Delay</p>
               <p className="text-sm text-slate-400 italic font-light">"As this is a memorial project run by volunteers, please allow 3-5 days for a personal response."</p>
            </div>
          </motion.div>

          {/* 2. Right Side: The Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Form Container */}
            <div className="p-8 md:p-12 rounded-[2.5rem] border border-slate-800 bg-slate-900/30 backdrop-blur-2xl shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-7"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          className="w-full bg-slate-950/40 border border-slate-800/60 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full bg-slate-950/40 border border-slate-800/60 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                      <select className="w-full bg-slate-950/40 border border-slate-800/60 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500/50 transition-all appearance-none text-sm cursor-pointer">
                        <option className="bg-slate-900">General Message</option>
                        <option className="bg-slate-900">Historical Correction</option>
                        <option className="bg-slate-900">Media Inquiry</option>
                        <option className="bg-slate-900">Technical Issue</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Share your thoughts with the community..."
                        className="w-full bg-slate-950/40 border border-slate-800/60 rounded-2xl px-5 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 transition-all resize-none text-sm"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full group relative overflow-hidden bg-white text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-sky-400 hover:text-white active:scale-[0.98]"
                    >
                      <span className="text-sm tracking-widest uppercase">Send Transmission</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-24 text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-sky-400" />
                    </div>
                    <h3 className="text-3xl font-serif text-white">Message Received</h3>
                    <p className="text-slate-400 max-w-xs mx-auto font-light leading-relaxed">
                      Thank you for reaching out. Your transmission has been safely received by our archives.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-sky-400 text-xs font-bold uppercase tracking-widest pt-8 hover:text-sky-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

/* Internal UI Component for Contact Details */
const ContactInfoItem = ({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) => (
  <div className="flex gap-5 group">
    <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-900 border border-slate-800/50 flex items-center justify-center text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/20 group-hover:bg-sky-500/5 transition-all duration-300">
      {icon}
    </div>
    <div className="flex flex-col justify-center">
      <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-1">{title}</p>
      <p className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{detail}</p>
    </div>
  </div>
);

export default ContactPage;