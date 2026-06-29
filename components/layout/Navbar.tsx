"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Share2, Compass, Award, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Explore Memories', href: '/stories', icon: Compass },
  { name: 'Challenger Crew', href: '/challenger', icon: Award },
  { name: 'About', href: '/about', icon: HelpCircle },
  { name: 'Contact', href: '/contact', icon: BookOpen },
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
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-12",
          scrolled || isOpen
            ? "py-4 bg-[#020617]/95 backdrop-blur-xl border-b border-white/5"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO / BRANDING */}
          <Link href="/" className="group flex items-center gap-3 z-[110]">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-400 group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute inset-0 w-6 h-6 bg-sky-400/20 blur-md rounded-full -translate-x-1/4 -translate-y-1/4"
              />
            </div>
            <span className="font-serif text-lg tracking-wider text-white/90 uppercase font-light">
              Challenger <span className="text-sky-400">Memories</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[10px] uppercase tracking-[0.25em] font-mono transition-all duration-300 hover:text-sky-400",
                  pathname === link.href ? "text-sky-400" : "text-zinc-400"
                )}
              >
                <span className="relative pb-1">
                  {link.name}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-sky-400/60"
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/share-story">
              <button className="group flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 rounded-full text-white transition-all duration-300 font-mono text-[10px] uppercase tracking-widest font-semibold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                <Share2 size={12} className="text-white" />
                <span>Share Your Memories</span>
              </button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-zinc-400 hover:text-white z-[110] p-2 hover:bg-white/5 rounded transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY — outside <nav> so fixed inset-0 covers full screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 bg-[#020617] flex flex-col p-8 z-[99] lg:hidden"
          >
            <div className="mt-24 flex flex-col gap-8 h-full">
              <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-2 border-b border-white/5 pb-2">
                Archive Navigation
              </p>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-3xl font-serif italic hover:text-sky-400 transition-colors inline-block",
                        pathname === link.href ? "text-sky-400" : "text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Action Link */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pb-8"
              >
                <Link href="/share-story" className="flex items-center justify-between group p-4 rounded bg-white/[0.03] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-white font-serif text-sm">Contribute to the Archive</span>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mt-1">Preserve Your Perspective</span>
                  </div>
                  <div className="p-3 rounded-full bg-sky-500 group-hover:scale-105 transition-transform">
                    <Share2 size={16} className="text-white" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};