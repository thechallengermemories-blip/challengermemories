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
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type MediaItem = { url: string; type: "image" | "video" };

type CommentItem = {
  _id: string;
  name: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function resolveMedia(story: any): MediaItem[] {
  if (Array.isArray(story.media) && story.media.length > 0) return story.media;
  if (story.imageUrl) return [{ url: story.imageUrl, type: "image" }];
  return [];
}

// ─────────────────────────────────────────────
// Single media tile
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
// Adaptive gallery
// ─────────────────────────────────────────────
function MediaGallery({
  items,
  onOpen,
}: {
  items: MediaItem[];
  onOpen: (i: number) => void;
}) {
  if (items.length === 0) return null;

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
          {items[0].type === "video" ? (
            <>
              <video
                src={items[0].url}
                className="w-full h-auto"
                muted
                playsInline
                preload="metadata"
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
                className="w-full h-auto block"
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

  return (
    <section
      className="relative mb-24 grid grid-cols-2 gap-3"
      style={{ gridTemplateRows: "auto" }}
    >
      <MediaTile
        item={items[0]}
        onClick={() => onOpen(0)}
        priority
        className="row-span-2 h-[62vh]"
      />
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
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
      >
        <X size={20} />
      </button>

      {items.length > 1 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
          {index + 1} / {items.length}
        </div>
      )}

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
// Comments Component
// ─────────────────────────────────────────────
function CommentSection({
  storyId,
  comments = [],
  accentColor,
  bgAccent,
}: {
  storyId: string;
  comments: CommentItem[];
  accentColor: string;
  bgAccent: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Only show approved comments publicly
  const approvedComments = comments.filter((c) => c.status === "approved");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setErrorMsg("Please fill out your name and comment.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg("");
      const res = await fetch(`/api/stories/${storyId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit comment.");
      }

      setSubmittedSuccess(true);
      setName("");
      setEmail("");
      setText("");
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-20 pt-16 border-t border-white/10">
      <div className="flex items-center gap-3 mb-10">
        <MessageSquare size={20} className={accentColor} />
        <h2 className="text-2xl font-serif text-white">
          Comments ({approvedComments.length})
        </h2>
      </div>

      {/* ── Approved Comments List ── */}
      <div className="space-y-6 mb-16">
        {approvedComments.length === 0 ? (
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
            No comments yet. Be the first to share a reflection.
          </p>
        ) : (
          approvedComments.map((comment) => (
            <div
              key={comment._id}
              className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 text-slate-300"
            >
              <div className="flex items-center justify-between mb-3 font-mono text-[11px] uppercase text-slate-500">
                <span className="text-white font-semibold">{comment.name}</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ── Comment Form ── */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/20 p-8 backdrop-blur-sm">
        <h3 className="text-lg font-serif text-white mb-2">Leave a Comment</h3>
        <p className="text-slate-400 text-xs mb-8">
          Your comment will be posted after admin approval.
        </p>

        {submittedSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
          >
            <Clock size={24} className="shrink-0 text-emerald-400" />
            <div>
              <h4 className="font-semibold text-sm">Comment Submitted</h4>
              <p className="text-xs text-emerald-400/80 mt-0.5">
                Comment added for admin review. It will appear on this page once approved.
              </p>
            </div>
            <button
              onClick={() => setSubmittedSuccess(false)}
              className="ml-auto text-xs font-mono uppercase underline text-emerald-400 hover:text-white"
            >
              Add another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Email <span className="text-slate-600">(Optional / Private)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                Comment <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-slate-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50",
                bgAccent
              )}
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={14} /> Submit Comment
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
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

  const { data: story } = data;
  const mediaItems = resolveMedia(story);
  const isChallenger = story.mission === "challenger";
  const accentColor = isChallenger ? "text-sky-400" : "text-purple-400";
  const bgAccent = isChallenger ? "bg-sky-500" : "bg-purple-500";
  const ringColor = isChallenger ? "border-sky-500/20" : "border-purple-500/20";

  return (
    <main className="bg-[#020617] min-h-screen text-slate-100 selection:bg-white/10">
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

        {/* Media Gallery */}
        <MediaGallery items={mediaItems} onOpen={(i) => setModalIndex(i)} />

        {/* Lightbox */}
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

            {/* ── Comment Section ── */}
            <CommentSection
              storyId={id as string}
              comments={story.comments || []}
              accentColor={accentColor}
              bgAccent={bgAccent}
            />
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