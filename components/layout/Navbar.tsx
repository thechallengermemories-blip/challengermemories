"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Send, Library, PlusCircle, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// Added "Contact" to the navigation array
const navLinks = [
  { name: 'Challenger', href: '/challenger' },
  // { name: 'Columbia', href: '/columbia' },
  { name: 'Archives', href: '/stories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-12",
        scrolled 
          ? "py-4 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5" 
          : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2 z-[110]">
          <div className="relative">
            <Sparkles className="text-sky-400 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full"
            />
          </div>
          <span className="font-serif text-xl tracking-tighter text-white uppercase italic">
            Eternal Mission
          </span>
        </Link>

        {/* DESKTOP NAV - Adjusted gap for extra link */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:text-sky-400",
                pathname === link.href ? "text-sky-400" : "text-slate-400"
              )}
            >
              <span className="relative pb-1">
                {link.name}
                {pathname === link.href && (
                  <motion.span 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-sky-400"
                  />
                )}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/share-story">
            <button className="group flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
              <PlusCircle size={14} className="text-white" />
              <span className="text-[10px] uppercase tracking-widest text-white font-bold">Write Entry</span>
            </button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="lg:hidden text-white z-[110] p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#020617] flex flex-col p-12 z-[100] lg:hidden"
          >
            <div className="mt-20 flex flex-col gap-8 h-full">
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] mb-2">Navigation Index</p>
              
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-4xl font-serif italic hover:text-sky-400 transition-colors inline-block",
                        pathname === link.href ? "text-sky-400" : "text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="h-px w-full bg-white/5 my-4" />

              {/* Mobile Action Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-6 mt-auto pb-12"
              >
                <Link href="/share-story" className="flex items-center justify-between group p-4 rounded-2xl bg-white/5">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">Submit a Story</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Contribute to the Archive</span>
                  </div>
                  <div className="p-3 rounded-full bg-sky-500 group-hover:scale-110 transition-transform shadow-lg shadow-sky-500/20">
                    <Send size={18} className="text-white" />
                  </div>
                </Link>

                <div className="flex gap-4">
                    <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
                        <Mail size={16} />
                        <span className="text-xs uppercase tracking-widest">Get in Touch</span>
                    </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};