"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

interface StoryPreview {
  title: string;
  name: string;
  mission: string;
  narrative: string;
  createdAt: string;
}

interface LocationPin {
  country: string;
  state: string;
  coords: [number, number];
  count: number;
  stories: StoryPreview[];
}

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const InteractiveMemoryMap = () => {
  const [pins, setPins] = useState<LocationPin[]>([]);
  const [selectedPin, setSelectedPin] = useState<LocationPin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storyIndex, setStoryIndex] = useState(0);

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/stories/locations");
      const json = await res.json();
      if (json.success) {
        setPins(json.data);
        setSelectedPin((prev) => prev ?? json.data[0] ?? null);
      }
    } catch (err) {
      console.error("Failed to fetch story locations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const totalStories = selectedPin?.stories.length ?? 0;
  const selectedStory = selectedPin?.stories[storyIndex];
  const selectedIsChallenger = selectedStory?.mission?.toLowerCase().includes("challenger");
  const selectedLocationLabel = selectedPin
    ? [selectedPin.state, selectedPin.country].filter(Boolean).join(", ")
    : "";

  const goPrevStory = () => {
    if (totalStories < 2) return;
    setStoryIndex((i) => (i - 1 + totalStories) % totalStories);
  };

  const goNextStory = () => {
    if (totalStories < 2) return;
    setStoryIndex((i) => (i + 1) % totalStories);
  };

  return (
    <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Starry Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-sky-400 mb-4">
            <Sparkles size={16} />
            <span className="uppercase tracking-[0.3em] text-xs font-bold">Global Constellation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Interactive <span className="italic font-light text-slate-400">Memory Map</span>
          </h2>
          <p className="text-sm text-slate-400 mt-3 font-light leading-relaxed">
            Every memory is a star in the sky — a living historical record of remembrance.
          </p>
        </div>

        {/* Interactive Layout Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Real World Map (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-[2.5rem] bg-slate-950/40 border border-slate-800/60 backdrop-blur-md overflow-hidden">
              <ComposableMap
                projectionConfig={{ scale: 140 }}
                className="w-full h-full"
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#0f172a"
                        stroke="#1e293b"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#1e293b" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {pins.map((pin) => {
                  const isSelected =
                    selectedPin?.country === pin.country && selectedPin?.state === pin.state;
                  const isChallenger = pin.stories[0]?.mission?.toLowerCase().includes("challenger");
                  return (
                    <Marker
                      key={`${pin.country}-${pin.state}`}
                      coordinates={pin.coords}
                      onClick={() => {
                        setSelectedPin(pin);
                        setStoryIndex(0);
                      }}
                    >
                      <g className="cursor-pointer">
                        {isSelected && (
                          <circle r={10} className={isChallenger ? "fill-sky-400/40" : "fill-purple-400/40"}>
                            <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <circle
                          r={isSelected ? 6 : 4}
                          className={isChallenger ? "fill-sky-400" : "fill-purple-400"}
                          stroke="#020617"
                          strokeWidth={2}
                        />
                      </g>
                    </Marker>
                  );
                })}
              </ComposableMap>

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
                  <span className="text-xs text-slate-400">Loading memory map…</span>
                </div>
              )}

              {!isLoading && pins.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 pointer-events-none">
                  <span className="text-xs text-slate-400">No published memories yet.</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono px-4">
              <span>Live Story Locations</span>
              <span>Active Pins: {pins.length}</span>
            </div>
          </div>

          {/* RIGHT: Memory Inspector Carousel (5 Columns) */}
          <div className="lg:col-span-5 h-full">
            <div className="rounded-[2.5rem] bg-[#121110]/20 border border-stone-800/40 p-8 flex flex-col justify-between h-full min-h-[380px] backdrop-blur-md">
              {selectedPin && selectedStory ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedPin.country}-${selectedPin.state}-${storyIndex}`}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${
                          selectedIsChallenger
                            ? 'text-sky-400 border-sky-400/20 bg-sky-400/5'
                            : 'text-purple-400 border-purple-400/20 bg-purple-400/5'
                        }`}>
                          {selectedStory.mission} Connection
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(selectedStory.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-serif text-white tracking-tight leading-snug">
                          "{selectedStory.title}"
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-6">
                          {selectedStory.narrative}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-900 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1c1a18] border border-stone-800 flex items-center justify-center text-slate-400">
                            <User size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-white font-medium">{selectedStory.name}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                              <MapPin size={8} /> {selectedLocationLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  {totalStories > 1 && (
                    <div className="pt-6 mt-2 flex items-center justify-between">
                      <button
                        onClick={goPrevStory}
                        aria-label="Previous story"
                        className="w-9 h-9 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-sky-400/40 hover:bg-sky-400/5 transition-colors flex items-center justify-center"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {selectedPin.stories.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setStoryIndex(i)}
                            aria-label={`Go to story ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                              i === storyIndex
                                ? (selectedIsChallenger ? "w-6 bg-sky-400" : "w-6 bg-purple-400")
                                : "w-1.5 bg-slate-700 hover:bg-slate-600"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={goNextStory}
                        aria-label="Next story"
                        className="w-9 h-9 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-sky-400/40 hover:bg-sky-400/5 transition-colors flex items-center justify-center"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <MapPin className="text-slate-600" size={24} />
                  <p className="text-sm text-slate-400">Select a pin on the map to view pinned narratives.</p>
                </div>
              )}
            </div>
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