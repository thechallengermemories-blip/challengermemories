"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  Info,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type MediaItem = { url: string; type: "image" | "video" };

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Normalise whatever the DB returns into a MediaItem[]. */
function resolveMedia(story: any): MediaItem[] {
  // New schema: story.media = [{ url, type }]
  if (Array.isArray(story.media) && story.media.length > 0) return story.media;
  // Legacy: single imageUrl string
  if (story.imageUrl) return [{ url: story.imageUrl, type: "image" }];
  return [];
}

// ─────────────────────────────────────────────
// Single media tile — image or video thumbnail
// ─────────────────────────────────────────────
function MediaTile({
  item,
  onClick,
  priority = false,
  className,
}: {
  item: MediaItem;
  onClick: () => void;
  priority?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f1d]",
        "cursor-zoom-in group",
        className,
      )}
    >
      {item.type === "video" ? (
        <>
          <video
            src={item.url}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          {/* Play badge */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={20} className="text-white ml-1" fill="white" />
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            src={item.url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            priority={priority}
          />
          {/* Zoom hint */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
              <ZoomIn size={12} className="text-white/70" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Adaptive gallery: 1 / 2 / 3 items
// ─────────────────────────────────────────────
function MediaGallery({
  items,
  onOpen,
}: {
  items: MediaItem[];
  onOpen: (i: number) => void;
}) {
  if (items.length === 0) return null;

  // ── 1 item: full-width cinematic ─────────────────────────────────────────
 if (items.length === 1) {
  return (
    <section className="relative mb-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => onOpen(0)}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/5 cursor-zoom-in group"
      >
        {items[0].type === 'video' ? (
          <>
            <video
              src={items[0].url}
              className="w-full h-auto"
              muted playsInline preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={20} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={items[0].url}
              alt=""
              className="w-full h-auto block"  // natural aspect ratio, no black bars
            />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                <ZoomIn size={12} className="text-white/70" />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}

  // ── 2 items: side-by-side equal columns ──────────────────────────────────
  if (items.length === 2) {
    return (
      <section className="relative mb-24 grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <MediaTile
            key={i}
            item={item}
            onClick={() => onOpen(i)}
            priority={i === 0}
            className="h-[45vh] md:h-[62vh]"
          />
        ))}
      </section>
    );
  }

  // ── 3 items: large hero left + two stacked right ─────────────────────────
  return (
    <section
      className="relative mb-24 grid grid-cols-2 gap-3"
      style={{ gridTemplateRows: "auto" }}
    >
      {/* Hero — spans both rows on the left */}
      <MediaTile
        item={items[0]}
        onClick={() => onOpen(0)}
        priority
        className="row-span-2 h-[62vh]"
      />
      {/* Two stacked on the right */}
      <MediaTile
        item={items[1]}
        onClick={() => onOpen(1)}
        className="h-[30vh]"
      />
      <MediaTile
        item={items[2]}
        onClick={() => onOpen(2)}
        className="h-[30vh]"
      />
    </section>
  );
}

// ─────────────────────────────────────────────
// Lightbox / video modal
// ─────────────────────────────────────────────
function MediaModal({
  items,
  initialIndex,
  onClose,
}: {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const current = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(items.length - 1, i + 1)),
    [items.length],
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      {items.length > 1 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
          {index + 1} / {items.length}
        </div>
      )}

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96, x: -20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full h-full max-w-6xl max-h-[88vh] mx-16 md:mx-24"
          onClick={(e) => e.stopPropagation()}
        >
          {current.type === "video" ? (
            <video
              src={current.url}
              className="w-full h-full object-contain rounded-xl"
              controls
              autoPlay
            />
          ) : (
            <Image
              src={current.url}
              alt=""
              fill
              className="object-contain"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={cn(
                "rounded-full transition-all duration-300",
                i === index
                  ? "w-6 h-1.5 bg-sky-400"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function StoryDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/stories/${id}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="animate-spin text-sky-500" />
      </div>
    );
  if (error || !data)
    return (
      <div className="h-screen flex items-center justify-center text-slate-300 bg-[#020617]">
        Entry not found.
      </div>
    );

  const { data: story, related } = data;
  const mediaItems = resolveMedia(story);
  const isChallenger = story.mission === "challenger";
  const accentColor = isChallenger ? "text-sky-400" : "text-purple-400";
  const bgAccent = isChallenger ? "bg-sky-500" : "bg-purple-500";
  const ringColor = isChallenger ? "border-sky-500/20" : "border-purple-500/20";

  return (
    <main className="bg-[#020617] min-h-screen text-slate-100 selection:bg-white/10">
      {/* Scroll progress bar */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left",
          bgAccent,
        )}
        style={{ scaleX }}
      />

      <article className="max-w-7xl mx-auto px-6 pt-40 pb-32">
  <Link
    href="/stories"
    className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all mb-20 group font-mono text-xs uppercase tracking-widest"
  >
    <ArrowLeft
      size={14}
      className="group-hover:-translate-x-1 transition-transform duration-200"
    />
    <div className="w-8 h-[1px] bg-slate-700 group-hover:w-12 transition-all duration-300" />
    Back to Archives
  </Link>

        {/* Header */}
        <header className="mb-16">
          <div
            className={cn(
              "inline-flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-[0.3em]",
              accentColor,
            )}
          >
            <Sparkles size={12} /> {story.mission} Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tighter mb-10 max-w-4xl text-white">
            {story.title}
          </h1>
        </header>

        {/* ── Adaptive Media Gallery ── */}
        <MediaGallery items={mediaItems} onOpen={(i) => setModalIndex(i)} />

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {modalIndex !== null && (
            <MediaModal
              items={mediaItems}
              initialIndex={modalIndex}
              onClose={() => setModalIndex(null)}
            />
          )}
        </AnimatePresence>

        {/* Body */}
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-8 text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-12">
              <span>Observer: {story.name}</span>
              <span>
                Date: {new Date(story.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
              {story.narrative}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div
              className={cn(
                "sticky top-20 p-8 rounded-3xl border bg-slate-900/30 backdrop-blur-sm",
                ringColor,
              )}
            >
              <div className="flex items-center gap-2 mb-6">
                <Info size={16} className={accentColor} />
                <h3 className="text-white font-serif text-xl">Entry Details</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                This record belongs to the {story.mission} archives. Visual data
                has been preserved in its original aspect ratio.
              </p>
              {/* Media count badge */}
              {mediaItems.length > 0 && (
                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600">
                    Attachments
                  </span>
                  <span
                    className={cn(
                      "text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border",
                      accentColor,
                      ringColor,
                    )}
                  >
                    {mediaItems.length}
                  </span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
