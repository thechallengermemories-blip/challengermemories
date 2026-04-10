"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Rocket, Users, Globe, Star } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="bg-[#020617] min-h-screen pt-24 pb-12 overflow-hidden">
      {/* 1. Page Header */}
      <section className="relative px-4 py-20 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-sky-600/10 to-transparent blur-3xl pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            Preserving the <span className="italic text-sky-400">Legacy</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            This tribute is dedicated to the 7 brave souls of STS-51-L, 
            and to the generations of dreamers inspired by their final frontier.
          </p>
        </motion.div>
      </section>

      {/* 2. Tribute Purpose Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
              <Heart className="text-sky-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif text-white">Why This Archive Exists</h2>
            <p className="text-slate-400 leading-relaxed">
              History is often recorded in cold dates and technical reports, but the true impact of the 
              Challenger mission lives in the personal memories of those who watched from Earth.
            </p>
            <p className="text-slate-400 leading-relaxed font-light">
              We built this platform to move beyond the tragedy and focus on the <strong>human story</strong>. 
              By sharing these chronicles, we ensure that the names <span className="text-white">Scobee, Smith, McNair, Onizuka, Resnik, Jarvis, and McAuliffe</span> are carried forward by those they inspired.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/20 flex items-center justify-center p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
            <div className="text-center relative z-10">
                <Globe className="w-20 h-20 text-sky-500/20 mx-auto mb-6 animate-pulse" />
                <div className="text-4xl font-serif text-white/10 uppercase tracking-[0.3em]">STS-51-L</div>
                <div className="mt-4 flex justify-center gap-2">
                    {[...Array(7)].map((_, i) => (
                        <Star key={i} size={10} className="text-sky-500/40 fill-sky-500/20" />
                    ))}
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Historical Context */}
      <section className="py-24 bg-slate-900/10 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center text-3xl font-serif text-white mb-16 italic">The Mission</h2>
          
          <MissionContextCard 
            title="Challenger // January 28, 1986" 
            description="STS-51-L was set to be a milestone in history—the first time a teacher and civilian, Christa McAuliffe, would enter orbit. Though the journey was cut short, it unified a global audience and redefined the resilience of the human spirit in our quest for the stars."
            icon={<Rocket className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* 4. Credits Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
            <Users className="w-8 h-8 text-sky-400/40 mx-auto mb-6" />
            <h3 className="text-xl font-serif text-white mb-4">A Community Tribute</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-12 max-w-lg mx-auto font-light">
                This is a non-profit archival project. Our goal is to provide a dignified space for the public 
                to record where they were and how they felt, turning a moment of silence into an eternal conversation.
            </p>
            <div className="flex justify-center gap-6 items-center">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-800" />
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.6em] font-mono">Ad Astra</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-800" />
            </div>
        </motion.div>
      </section>
    </main>
  );
};

/* Internal UI Component for Mission Cards */
const MissionContextCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
  <div className="p-10 rounded-[2.5rem] border border-white/5 bg-slate-950/40 backdrop-blur-sm hover:border-sky-500/20 transition-all group relative overflow-hidden">
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />
    
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-serif text-white">{title}</h3>
    </div>
    <p className="text-slate-400 text-base leading-relaxed font-light">
      {description}
    </p>
  </div>
);

export default AboutPage;