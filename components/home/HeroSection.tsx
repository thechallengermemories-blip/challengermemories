"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation"; // Import the router

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize router

  // Scroll function: Moves the view down by one viewport height (100vh)
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // 1. Smooth Mouse Follow (Parallax)
  const mouseX = useSpring(0, { stiffness: 40, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 50);
    mouseY.set((clientY / innerHeight - 0.5) * 50);
  };

  // 2. Scroll-Based Zoom & Fade
  const { scrollY } = useScroll();
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.3]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -100]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* LAYER 1: THE CINEMATIC BACKGROUND IMAGE */}
      <motion.div 
        style={{ scale: backgroundScale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#020617] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
        <img
          src="/herobanner.webp"
          alt="Earth from Space"
          className="w-full h-full object-cover opacity-80"
        />
      </motion.div>

      {/* LAYER 2: INTERACTIVE STARDUST */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute inset-0 z-[5] pointer-events-none"
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40 blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          />
        ))}
      </motion.div>

      {/* LAYER 3: NASA-STYLE HUD */}
      <div className="absolute inset-0 z-[11] pointer-events-none border-[1px] border-white/5 m-4 md:m-8 rounded-2xl overflow-hidden">
        <div className="absolute top-6 left-6 text-[10px] font-mono text-sky-400/50 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span>SYSTEM: NOMINAL</span>
          </div>
          <span>ALT: 408 KM</span>
          <span>VEL: 7.66 KM/S</span>
        </div>
        
        <div className="absolute bottom-6 right-6 text-[10px] font-mono text-white/30 text-right">
          <span>01.28.1986 // 02.01.2003</span>
          <br />
          <span>LEGACY_PROTOCOL_ACTIVE</span>
        </div>

        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        />
      </div>

      {/* LAYER 4: MAIN CONTENT */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-sky-400 text-xs md:text-sm font-medium uppercase mb-6"
        >
          A Tribute to the Pioneers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none tracking-tighter mb-8"
        >
          Eternal <br /> 
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Journey.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Their footsteps remain in the stars. Join us in honoring the crews of 
          <span className="text-white font-normal"> Challenger</span> and 
          <span className="text-white font-normal"> Columbia</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* ACTION: Scroll little bit below */}
          <button 
            onClick={scrollToNextSection}
            className="group relative px-10 py-4 bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 text-black font-bold uppercase tracking-widest text-xs">
              Begin Exploration
            </span>
            <div className="absolute inset-0 bg-sky-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </button>

          {/* ACTION: Navigate to /stories */}
          <button 
            onClick={() => router.push("/stories")}
            className="px-10 py-4 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white/10 transition-all uppercase tracking-widest text-xs font-medium"
          >
            Read Stories
          </button>
        </motion.div>
      </motion.div>

      {/* LAYER 5: BOTTOM TRANSITION GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-[25]" />

      {/* LAYER 6: SCROLL CALL-TO-ACTION */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-sky-500 to-transparent" />
        <ChevronDown className="text-sky-500 w-5 h-5" />
      </motion.div>
    </section>
  );
};