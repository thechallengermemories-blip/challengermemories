"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Rocket, Clock, ShieldAlert, Heart, Star, Microscope } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MissionTimelineProps {
  mission: 'challenger' | 'columbia';
}

const TIMELINE_DATA = {
  challenger: [
    {
      time: "Jan 28, 11:38 AM",
      title: "Liftoff",
      description: "After several delays, Challenger lifts off from Kennedy Space Center Launch Complex 39B.",
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      time: "T+ 73 Seconds",
      title: "Breakup",
      description: "The vehicle suffered a structural failure originating from the right Solid Rocket Booster O-ring seal.",
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      time: "The Afternoon",
      title: "National Mourning",
      description: "President Ronald Reagan delivers a televised address, quoting the poem 'High Flight': 'Slipped the surly bonds of Earth to touch the face of God.'",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      time: "Post-1986",
      title: "The Legacy",
      description: "The Challenger Center for Space Science Education was formed by the families to continue the crew's mission of education.",
      icon: <Star className="w-5 h-5" />,
    }
  ],
  columbia: [
    {
      time: "Jan 16, 2003",
      title: "Launch",
      description: "STS-107 launches for a 16-day dedicated science mission. During ascent, a piece of foam strikes the left wing.",
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      time: "Days 1—16",
      title: "Science in Orbit",
      description: "The crew successfully conducts over 80 experiments in life sciences, material sciences, and fluid physics.",
      icon: <Microscope className="w-5 h-5" />,
    },
    {
      time: "Feb 1, 2003",
      title: "Re-entry",
      description: "During descent, superheated gasses entered the damaged wing, leading to the loss of the orbiter over Texas.",
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      time: "Legacy",
      title: "Safety Evolution",
      description: "The tragedy led to fundamental changes in NASA's safety culture and the development of orbital inspection techniques.",
      icon: <Star className="w-5 h-5" />,
    }
  ]
};

const MissionTimeline = ({ mission }: MissionTimelineProps) => {
  const events = TIMELINE_DATA[mission];
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-linked line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-32 bg-[#020617] overflow-hidden">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Mission Timeline</h2>
        <p className="text-slate-400 text-sm tracking-[0.2em] uppercase">The path of the journey</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        {/* The Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />
        
        {/* The Animated "Glow" Line */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500 via-purple-500 to-sky-500 -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
        />

        {/* Timeline Events */}
        <div className="space-y-24">
          {events.map((event, index) => (
            <TimelineItem 
              key={index} 
              event={event} 
              index={index} 
              isLast={index === events.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ event, index, isLast }: { event: TimelineEvent, index: number, isLast: boolean }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`relative flex items-center justify-between w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* 1. Content Card */}
      <div className="w-[42%] md:w-[45%]">
        <div className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-colors">
          <span className="text-sky-400 font-mono text-xs mb-2 block tracking-tighter">
            {event.time}
          </span>
          <h3 className="text-xl font-serif text-white mb-3 group-hover:text-sky-300 transition-colors">
            {event.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            {event.description}
          </p>
        </div>
      </div>

      {/* 2. Central Icon/Node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20">
        <div className="relative">
          {/* Outer Ring */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-10 h-10 rounded-full bg-[#020617] border border-slate-700 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <div className="text-slate-400 group-hover:text-sky-400 transition-colors">
                {event.icon}
            </div>
          </motion.div>
          
          {/* Animated Glow Dot */}
          <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-md animate-pulse" />
        </div>
      </div>

      {/* 3. Empty Space for layout balancing */}
      <div className="w-[42%] md:w-[45%]" />
    </motion.div>
  );
};

export default MissionTimeline;