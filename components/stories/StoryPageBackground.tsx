"use client";
import React from 'react';

interface StoryPageBackgroundProps {
  activeMission: 'challenger' | 'columbia';
}

export const StoryPageBackground = ({ activeMission }: StoryPageBackgroundProps) => {
  return (
    <div className="fixed inset-0 bg-[#020617] -z-10 overflow-hidden">
      {/* Primary Glow */}
      <div 
        className={`absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000 opacity-20 ${
          activeMission === 'challenger' ? 'bg-sky-500' : 'bg-purple-600'
        }`} 
      />
      
      {/* Secondary Accent Glow */}
      <div 
        className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] transition-colors duration-1000 opacity-10 ${
          activeMission === 'challenger' ? 'bg-blue-400' : 'bg-fuchsia-600'
        }`} 
      />

      {/* Subtle Star Pattern Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
};