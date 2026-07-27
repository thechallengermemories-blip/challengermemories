"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Info, Mail, ExternalLink, Globe, ShieldCheck } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] pt-20 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── PRESERVATION STATEMENT BANNER ────────────────────── */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-4xl text-left">
              <div className="inline-flex items-center gap-2 text-sky-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">
                <ShieldCheck size={14} className="text-sky-400 shrink-0" />
                <span>Preservation Statement</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Challenger Memories is committed to preserving these personal recollections with care and respect so they remain accessible for future generations of students, educators, researchers, and anyone seeking to understand Challenger through the voices of those whose lives it touched.
              </p>
            </div>

            <div className="shrink-0 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-[10px] uppercase tracking-widest font-semibold">
              Public Archival Trust
            </div>
          </div>
        </div>

        {/* ── MAIN FOOTER NAVIGATION GRID ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6 text-left">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="text-sky-400 w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-serif text-xl tracking-tighter text-white uppercase italic">
                Challenger Memories
              </span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs font-light">
              A digital sanctuary dedicated to the brave crew of STS-51-L. Their legacy continues to inspire curiosity, learning, and exploration across generations.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-left">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Challenger Mission", href: "/challenger" },
                { label: "Memory Archive", href: "/stories" },
                { label: "About Project", href: "/about" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-500 hover:text-sky-400 text-xs transition-colors uppercase tracking-widest"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-left">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-6">
              Archive
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/share-story"
                  className="text-slate-500 hover:text-sky-400 text-xs transition-colors uppercase tracking-widest"
                >
                  Submit Memory
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-500 hover:text-sky-400 text-xs transition-colors uppercase tracking-widest"
                >
                  Contact Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-sky-400 text-xs transition-colors uppercase tracking-widest"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission Status / Location */}
          <div className="text-left">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold mb-6">
              Mission Status
            </h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LEGACY ARCHIVE ONLINE</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                <Globe size={12} className="text-sky-400" />
                <span>COORDINATES: LEO ORBIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-mono">
            © {currentYear} Eternal Mission Tribute · Preserving Human Memory.
          </div>

          {/* DEVELOPER CREDIT */}
          <div className="flex items-center gap-6">
            <Link
              href="https://techhportfolio.netlify.app/"
              target="_blank"
              className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all duration-300"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
                Crafted by
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-sky-400 transition-colors font-mono">
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
              <Link href="/about" className="hover:text-white transition-colors" title="About">
                <Info size={16} />
              </Link>

              <Link href="mailto:vjoshii822@gmail.com" className="hover:text-white transition-colors" title="Contact">
                <Mail size={16} />
              </Link>

              <Link href="https://techhportfolio.netlify.app/" className="hover:text-white transition-colors" title="Portfolio">
                <Globe size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};