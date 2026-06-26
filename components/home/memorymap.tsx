"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Send, Eye, PlusCircle, ArrowRight, User } from 'lucide-react';

interface MemoryPin {
  id: string;
  title: string;
  narrative: string;
  name: string;
  location: string;
  mission: string;
  x: number; // relative percentage width (0-100)
  y: number; // relative percentage height (0-100)
  createdAt: string;
}

const INITIAL_PINS: MemoryPin[] = [
  {
    id: "pin-1",
    title: "Watching from the Space Coast",
    narrative: "I was only a child standing on the beaches of Cape Canaveral. The roar of the engines filled my chest before the cold silence took over. We will never forget their courage.",
    name: "Arthur Pendelton",
    location: "Cape Canaveral, FL",
    mission: "Challenger",
    x: 32,
    y: 68,
    createdAt: "Jan 28, 1986"
  },
  {
    id: "pin-2",
    title: "Mission Control Dedication",
    narrative: "Working behind the consoles in Houston, we saw the sheer passion the Columbia crew had for scientific discovery. Their spirit lives on in every orbit we track.",
    name: "Elena Rostova",
    location: "Houston, TX",
    mission: "Columbia",
    x: 25,
    y: 72,
    createdAt: "Feb 1, 2003"
  },
  {
    id: "pin-3",
    title: "A Lesson in the Stars",
    narrative: "Christa McAuliffe inspired a generation of educators. I became a science teacher because of her. Every year, my students learn about her legacy.",
    name: "Marcus Vance",
    location: "Boston, MA",
    mission: "Challenger",
    x: 39,
    y: 38,
    createdAt: "Sep 15, 2012"
  },
  {
    id: "pin-4",
    title: "Global Echoes in London",
    narrative: "Even across the Atlantic, the news felt like a local tragedy. We stayed up all night watching the BBC broadcasts, mourning heroes who belonged to all of humanity.",
    name: "Clara Finch",
    location: "London, UK",
    mission: "Challenger",
    x: 52,
    y: 28,
    createdAt: "Jan 29, 1986"
  },
  {
    id: "pin-5",
    title: "Pacific Horizon Watch",
    narrative: "We watched the early morning sky from Seattle. It was crisp, cold, and quiet. Our hearts are forever connected to the crew of STS-107.",
    name: "David Chen",
    location: "Seattle, WA",
    mission: "Columbia",
    x: 12,
    y: 30,
    createdAt: "Feb 1, 2003"
  }
];

export const InteractiveMemoryMap = () => {
  const [pins, setPins] = useState<MemoryPin[]>(INITIAL_PINS);
  const [selectedPin, setSelectedPin] = useState<MemoryPin | null>(INITIAL_PINS[0]);
  const [isAddingMode, setIsAddingMode] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Form states for creating a new custom pin
  const [newTitle, setNewTitle] = useState("");
  const [newNarrative, setNewNarrative] = useState("");
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newMission, setNewMission] = useState("Challenger");
  const [tempCoords, setTempCoords] = useState<{ x: number; y: number } | null>(null);

  // Handle clicking the map to capture coordinates
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingMode || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempCoords({ x: Math.round(x), y: Math.round(y) });
  };

  // Submit the custom memory map pin
  const handleAddPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempCoords || !newTitle || !newNarrative || !newName || !newLocation) return;

    const newPin: MemoryPin = {
      id: `custom-pin-${Date.now()}`,
      title: newTitle,
      narrative: newNarrative,
      name: newName,
      location: newLocation,
      mission: newMission,
      x: tempCoords.x,
      y: tempCoords.y,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    setPins([...pins, newPin]);
    setSelectedPin(newPin);
    
    // Reset state & modes
    setIsAddingMode(false);
    setTempCoords(null);
    setNewTitle("");
    setNewNarrative("");
    setNewName("");
    setNewLocation("");
  };

  return (
    <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Starry Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sky-400 mb-4">
              <Sparkles size={16} />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Global Constellation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Interactive <span className="italic font-light text-slate-400">Memory Map</span>
            </h2>
            <p className="text-sm text-slate-400 mt-3 font-light leading-relaxed">
              Every memory is a star in the sky. Pin your location and contribute to our living historical record of remembrance.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsAddingMode(false);
                setTempCoords(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 border ${
                !isAddingMode 
                  ? "bg-sky-500/10 border-sky-400/30 text-sky-300" 
                  : "bg-transparent border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <Eye size={14} />
              Browse Map
            </button>
            <button
              onClick={() => setIsAddingMode(true)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isAddingMode 
                  ? "bg-sky-500/10 border-sky-400/30 text-sky-300" 
                  : "bg-transparent border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <PlusCircle size={14} />
              Place a Pin
            </button>
          </div>
        </div>

        {/* Interactive Layout Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: The Coordinate Grid Map Visualizer (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div 
              ref={mapRef}
              onClick={handleMapClick}
              className={`relative aspect-[16/10] w-full rounded-[2.5rem] bg-slate-950/40 border border-slate-800/60 backdrop-blur-md overflow-hidden transition-all ${
                isAddingMode ? "cursor-crosshair border-sky-500/40 shadow-[0_0_40px_rgba(56,189,248,0.05)]" : "cursor-default"
              }`}
            >
              {/* Celestial Coordinate Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-20 pointer-events-none">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className="border-t border-l border-sky-500/15" />
                ))}
              </div>

              {/* Minimalist World Continental Silhouettes (Vector Projection Grid) */}
              <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none text-white" fill="currentColor" viewBox="0 0 1000 600">
                {/* Abstract USA Shape */}
                <path d="M120,200 L420,200 L420,400 L120,400 Z" />
                {/* Abstract Europe Shape */}
                <path d="M480,120 L620,120 L620,300 L480,300 Z" />
                {/* Abstract Asia/Pacific Shape */}
                <path d="M650,150 L900,150 L900,450 L650,450 Z" />
              </svg>

              {/* Displaying Saved Pins on Map */}
              {pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                const isChallenger = pin.mission.toLowerCase().includes("challenger");
                return (
                  <button
                    key={pin.id}
                    onClick={() => {
                      if (!isAddingMode) setSelectedPin(pin);
                    }}
                    disabled={isAddingMode}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none z-20 group"
                  >
                    {/* Ring Pulse and Glow Pin */}
                    <span className="relative flex h-4 w-4">
                      {isSelected && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isChallenger ? 'bg-sky-400' : 'bg-purple-400'
                        }`} />
                      )}
                      <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-slate-950 shadow-md transition-transform ${
                        isSelected 
                          ? isChallenger ? 'bg-sky-400 scale-125' : 'bg-purple-400 scale-125'
                          : isChallenger ? 'bg-sky-500/60 group-hover:bg-sky-400' : 'bg-purple-500/60 group-hover:bg-purple-400'
                      }`} />
                    </span>
                    
                    {/* Tooltip on Hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                      <div className="bg-slate-950 text-white text-[10px] font-medium py-1 px-2.5 rounded-full border border-slate-800 whitespace-nowrap shadow-xl">
                        {pin.location}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Temp Custom Pin Marker placement indicator */}
              {isAddingMode && tempCoords && (
                <div 
                  style={{ left: `${tempCoords.x}%`, top: `${tempCoords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-85" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-500 border-2 border-slate-950 shadow-xl flex items-center justify-center">
                      <MapPin size={10} className="text-slate-950" />
                    </span>
                  </span>
                </div>
              )}

              {/* Empty State Banner overlay for Adding Mode */}
              {isAddingMode && !tempCoords && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs pointer-events-none">
                  <div className="p-6 text-center max-w-xs space-y-2">
                    <MapPin className="text-sky-400 mx-auto animate-bounce" size={24} />
                    <h4 className="text-white text-sm font-medium">Select Location</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Click anywhere directly on the map grid coordinate to position your tribute pin.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono px-4">
              <span>Coordinate Projection: LOR-86/03</span>
              <span>Active Pins: {pins.length}</span>
            </div>
          </div>

          {/* RIGHT: Memory Inspector & Contributor Portal (5 Columns) */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              
              {/* BROWSE MODE PANEL */}
              {!isAddingMode ? (
                <motion.div
                  key="inspect-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-[2.5rem] bg-[#121110]/20 border border-stone-800/40 p-8 flex flex-col justify-between h-full min-h-[380px] backdrop-blur-md"
                >
                  {selectedPin ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${
                          selectedPin.mission.toLowerCase().includes('challenger')
                            ? 'text-sky-400 border-sky-400/20 bg-sky-400/5'
                            : 'text-purple-400 border-purple-400/20 bg-purple-400/5'
                        }`}>
                          {selectedPin.mission} Connection
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{selectedPin.createdAt}</span>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-serif text-white tracking-tight leading-snug">
                          "{selectedPin.title}"
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                          {selectedPin.narrative}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-900 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1c1a18] border border-stone-800 flex items-center justify-center text-slate-400">
                            <User size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-white font-medium">{selectedPin.name}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                              <MapPin size={8} /> {selectedPin.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 space-y-3">
                      <MapPin className="text-slate-600" size={24} />
                      <p className="text-sm text-slate-400">Select a constellation point on the map to view pinned narratives.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                
                <motion.div
                  key="add-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-[2.5rem] bg-[#121110]/30 border border-sky-500/20 p-8 h-full backdrop-blur-md"
                >
                  <form onSubmit={handleAddPinSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-white">Place Your Tribute</h3>
                      <p className="text-xs text-slate-400">
                        Map coordinate: {tempCoords ? `X: ${tempCoords.x}%, Y: ${tempCoords.y}%` : "No point selected"}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Name Input */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full text-xs text-white bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-600"
                        />
                      </div>

                      {/* City/Location Input */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">City & Country / State</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Boston, MA"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          className="w-full text-xs text-white bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-600"
                        />
                      </div>

                      {/* Select Mission */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">Mission Focus</label>
                          <select
                            value={newMission}
                            onChange={(e) => setNewMission(e.target.value)}
                            className="w-full text-xs text-white bg-slate-950/60 border border-slate-800/80 rounded-xl px-3 py-3 focus:outline-none focus:border-sky-500 transition-colors"
                          >
                            <option value="Challenger">Challenger</option>
                            <option value="Columbia">Columbia</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">Map Coordinate</label>
                          <div className="w-full text-xs text-slate-400 bg-slate-950/30 border border-slate-900 rounded-xl px-3 py-3 flex items-center justify-center font-mono">
                            {tempCoords ? `${tempCoords.x} , ${tempCoords.y}` : "[Click Map]"}
                          </div>
                        </div>
                      </div>

                      {/* Title Input */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">Tribute Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. A Beacon of Classroom Hope"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full text-xs text-white bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-600"
                        />
                      </div>

                      {/* Narrative Textarea */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">Your Narrative / Memory</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Write down your thoughts, where you were, or how this legacy lives on with you..."
                          value={newNarrative}
                          onChange={(e) => setNewNarrative(e.target.value)}
                          className="w-full text-xs text-white bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-600 resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!tempCoords}
                      className="w-full py-3 rounded-xl bg-sky-500 text-slate-950 font-bold uppercase tracking-wider text-xs transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:bg-slate-800 disabled:text-slate-500 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      <Send size={12} />
                      Publish Pin to Map
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Elegant Cosmic Remembrance Divider */}
        <div className="mt-20 flex items-center justify-center gap-4 relative">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Sparkles size={12} className="text-sky-500/40" />
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent relative">
              <span className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </div>
            <Sparkles size={12} className="text-sky-500/40" />
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
        </div>

      </div>
    </section>
  );
};