"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Info, Mail, ExternalLink, Globe } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="text-sky-400 w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-serif text-xl tracking-tighter text-white uppercase italic">
                Eternal Mission
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              A digital sanctuary dedicated to the brave crews of Challenger. Their legacy continues to inspire the stars in all of
              us.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {["Challenger", "Stories", "About"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-slate-500 hover:text-sky-400 text-sm transition-colors uppercase tracking-widest"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-6">
              Archive
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/share-story"
                  className="text-slate-500 hover:text-sky-400 text-sm transition-colors uppercase tracking-widest"
                >
                  Submit Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-500 hover:text-sky-400 text-sm transition-colors uppercase tracking-widest"
                >
                  Contact Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-sky-400 text-sm transition-colors uppercase tracking-widest"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission Status / Location */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-6">
              Mission Status
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>LEGACY ARCHIVE ONLINE</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <Globe size={12} className="text-sky-400" />
                <span>COORDINATES: LEO ORBIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">
            © {currentYear} Eternal Mission Tribute. Non-Profit Educational
            Project.
          </div>

          {/* DEVELOPER CREDIT: DISCREET & PREMIUM */}
          <div className="flex items-center gap-6">
            <Link
              href="https://techhportfolio.netlify.app/"
              target="_blank"
              className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all duration-300"
            >
              <span className="text-[10px] uppercase tracking-[0.2em]">
                Crafted by
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-sky-400 transition-colors">
                Techh
              </span>
              <ExternalLink
                size={10}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <div className="h-4 w-px bg-slate-800" />

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-600">
  <Link href="/about" className="hover:text-white transition-colors">
    <Info size={16} />
  </Link>

  <Link href="mailto:vjoshii822@gmail.com" className="hover:text-white transition-colors">
    <Mail size={16} />
  </Link>

  <Link href="https://techhportfolio.netlify.app/" className="hover:text-white transition-colors">
    <Globe size={16} />
  </Link>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
