"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, ShieldCheck, X, Camera, CheckCircle2,
  Loader2, Sparkles, Film, FileImage, Plus, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { compressMedia } from "@/lib/compressMedia"; // ← compression utility

// ─────────────────────────────────────────────
// CONFIGURATION — tweak these freely
// ─────────────────────────────────────────────
const UPLOAD_CONFIG = {
  maxFiles: 3,
  maxImageSizeMB: 10,
  maxVideoSizeMB: 10,
  acceptedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  acceptedVideoTypes: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
  cloudinaryFolder: "tribute_stories",
};

type MediaFile = {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  error?: string;
};

// Submission phases shown in the button / status bar
type Phase = "idle" | "compressing" | "uploading";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function validateFile(file: File): { ok: boolean; error?: string } {
  const isImage = UPLOAD_CONFIG.acceptedImageTypes.includes(file.type);
  const isVideo = UPLOAD_CONFIG.acceptedVideoTypes.includes(file.type);

  if (!isImage && !isVideo) return { ok: false, error: "Unsupported file type." };

  if (isImage && file.size > UPLOAD_CONFIG.maxImageSizeMB * 1024 * 1024)
    return { ok: false, error: `Images must be under ${UPLOAD_CONFIG.maxImageSizeMB} MB (yours: ${formatMB(file.size)}).` };

  if (isVideo && file.size > UPLOAD_CONFIG.maxVideoSizeMB * 1024 * 1024)
    return { ok: false, error: `Videos must be under ${UPLOAD_CONFIG.maxVideoSizeMB} MB (yours: ${formatMB(file.size)}).` };

  return { ok: true };
}

// ─────────────────────────────────────────────
// MediaThumbnail
// ─────────────────────────────────────────────
function MediaThumbnail({ media, onRemove }: { media: MediaFile; onRemove: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10 aspect-video flex items-center justify-center group/thumb"
    >
      {media.type === "image" ? (
        <img src={media.preview} alt="Preview" className="w-full h-full object-cover" />
      ) : (
        <>
          <video src={media.preview} className="w-full h-full object-cover" muted playsInline />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Film size={28} className="text-white/70" />
          </div>
        </>
      )}

      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
        {media.type === "video"
          ? <Film size={10} className="text-sky-400" />
          : <FileImage size={10} className="text-sky-400" />
        }
        <span className="text-[9px] font-mono text-sky-300 uppercase tracking-widest">
          {media.type}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onRemove(media.id)}
        className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover/thumb:opacity-100 hover:bg-red-500 transition-all z-30"
      >
        <X size={13} />
      </button>

      {media.error && (
        <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center p-3 text-center">
          <AlertCircle size={20} className="text-red-400 mb-1" />
          <p className="text-red-300 text-[10px] leading-tight">{media.error}</p>
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Compression progress bar
// ─────────────────────────────────────────────
function CompressionBar({ index, total, pct }: { index: number; total: number; pct: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-sky-400/70 uppercase tracking-widest">
          Compressing file {index} of {total}…
        </span>
        <span className="text-[9px] font-mono text-slate-500">{Math.round(pct)}%</span>
      </div>
      <div className="h-px bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-sky-500/60"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Form
// ─────────────────────────────────────────────
export const StoryForm = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isSuccess, setIsSuccess] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Compression progress: { fileIndex, pct }
  const [compressionProgress, setCompressionProgress] = useState<{ index: number; pct: number } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isSubmitting = phase !== "idle";

  // Scroll to top of section on success
  useEffect(() => {
    if (isSuccess && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isSuccess]);

  const inputBaseStyles = cn(
    "w-full bg-slate-950/40 border border-white/10 rounded-2xl px-6 py-5 text-slate-100",
    "placeholder:text-slate-500/60 outline-none transition-all duration-300",
    "focus:bg-slate-900/60 focus:ring-1 focus:border-sky-500/50 focus:ring-sky-500/20"
  );
  const labelStyles =
    "text-[10px] uppercase tracking-[0.4em] text-sky-400/70 ml-1 font-mono font-semibold block mb-3";

  const canAddMore = mediaFiles.length < UPLOAD_CONFIG.maxFiles;
  const acceptString = [
    ...UPLOAD_CONFIG.acceptedImageTypes,
    ...UPLOAD_CONFIG.acceptedVideoTypes,
  ].join(",");

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      setGlobalError(null);

      const incoming = Array.from(files);
      const slots = UPLOAD_CONFIG.maxFiles - mediaFiles.length;

      if (slots <= 0) {
        setGlobalError(`Maximum ${UPLOAD_CONFIG.maxFiles} files allowed.`);
        return;
      }

      const toAdd = incoming.slice(0, slots);
      if (incoming.length > slots) {
        setGlobalError(`Only ${slots} more file(s) can be added. Extra files were skipped.`);
      }

      const newMedia: MediaFile[] = toAdd.map((file) => {
        const isVideo = UPLOAD_CONFIG.acceptedVideoTypes.includes(file.type);
        const { ok, error } = validateFile(file);
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          type: isVideo ? "video" : "image",
          error: ok ? undefined : error,
        };
      });

      setMediaFiles((prev) => [...prev, ...newMedia]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [mediaFiles.length]
  );

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => {
      const removed = prev.find((m) => m.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((m) => m.id !== id);
    });
    setGlobalError(null);
  };

  // ── SUBMIT ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError(null);

    if (mediaFiles.some((m) => m.error)) {
      setGlobalError("Please remove files with errors before submitting.");
      return;
    }

    // Capture BEFORE any await — React nullifies e.currentTarget after the
    // first yield, so reading it after compression would throw.
    const formEl = e.currentTarget;

    try {
      // ── PHASE 1: Compress ──────────────────────────────────────────────────
      setPhase("compressing");
      setCompressionProgress(null);

      const compressedFiles = await Promise.all(
        mediaFiles.map(async (m, i) => {
          // For videos, stream per-file progress into the progress bar
          const onProgress = m.type === "video"
            ? (pct: number) => setCompressionProgress({ index: i + 1, pct })
            : undefined;

          setCompressionProgress({ index: i + 1, pct: 0 });
          const compressed = await compressMedia(m.file, m.type, onProgress);
          setCompressionProgress({ index: i + 1, pct: 100 });
          return compressed;
        })
      );

      // ── PHASE 2: Upload ────────────────────────────────────────────────────
      setPhase("uploading");
      setCompressionProgress(null);

      const formData = new FormData(formEl);
      formData.append("mission", "challenger");

      compressedFiles.forEach((file, i) => {
        formData.append(`media_${i}`, file);                   // compressed file
        formData.append(`media_${i}_type`, mediaFiles[i].type); // original type tag
      });
      formData.append("media_count", String(compressedFiles.length));

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        formRef.current?.reset();
        mediaFiles.forEach((m) => URL.revokeObjectURL(m.preview));
        setMediaFiles([]);
      } else {
        setGlobalError(result.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setGlobalError("Network error. Please try again.");
    } finally {
      setPhase("idle");
      setCompressionProgress(null);
    }
  };

  // ── Button label by phase ──────────────────────────────────────────────────
  const buttonLabel = {
    idle: <><Sparkles size={14} /> Commit to Archive <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>,
    compressing: <><Loader2 size={16} className="animate-spin" /> Compressing…</>,
    uploading:   <><Loader2 size={16} className="animate-spin" /> Uploading…</>,
  }[phase];

  // ── Success ────────────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <section ref={sectionRef} className="pb-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto py-24 px-6 text-center"
        >
          <div className="inline-flex p-5 rounded-full mb-8 bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-serif text-white mb-6">Transmission Logged</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            Your tribute has been safely archived. It will remain a permanent part of the Challenger legacy.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-8 decoration-sky-400/20 hover:decoration-sky-400 transition-all text-xs uppercase tracking-widest font-bold"
          >
            Submit Another Entry
          </button>
        </motion.div>
      </section>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} className="pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-slate-900/30 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className={labelStyles}>Observer Name</label>
                  <input name="name" required type="text" placeholder="Identity or Anonymous" className={inputBaseStyles} />
                </div>
                <div className="space-y-1">
                  <label className={labelStyles}>Email Address</label>
                  <input name="email" type="email" placeholder="Verification purposes only" className={inputBaseStyles} />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className={labelStyles}>Log Title</label>
                <input
                  name="title" required type="text"
                  placeholder="Title of your reflection..."
                  className={cn(inputBaseStyles, "font-serif text-xl placeholder:font-sans")}
                />
              </div>

              {/* Narrative */}
              <div className="space-y-1">
                <label className={labelStyles}>The Narrative</label>
                <textarea
                  name="narrative" required rows={8}
                  placeholder="Share your memory, feelings, or a message to the crew..."
                  className={cn(inputBaseStyles, "leading-relaxed resize-none font-sans")}
                />
              </div>

              {/* ── MEDIA UPLOAD ── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                  <label className={cn(labelStyles, "mb-0")}>Visual Evidence</label>
                  <span className={cn(
                    "text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border transition-colors",
                    mediaFiles.length >= UPLOAD_CONFIG.maxFiles
                      ? "border-amber-500/30 text-amber-400/70 bg-amber-500/5"
                      : "border-white/10 text-slate-500"
                  )}>
                    {mediaFiles.length} / {UPLOAD_CONFIG.maxFiles} files
                  </span>
                </div>

                {/* Thumbnails */}
                <AnimatePresence mode="popLayout">
                  {mediaFiles.length > 0 && (
                    <motion.div
                      layout
                      className={cn(
                        "grid gap-3",
                        mediaFiles.length === 1 ? "grid-cols-1" :
                        mediaFiles.length === 2 ? "grid-cols-2" :
                        "grid-cols-3"
                      )}
                    >
                      {mediaFiles.map((m) => (
                        <MediaThumbnail key={m.id} media={m} onRemove={removeMedia} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Compression progress bar (videos only, shown during submit) */}
                <AnimatePresence>
                  {phase === "compressing" && compressionProgress && (
                    <CompressionBar
                      index={compressionProgress.index}
                      total={mediaFiles.length}
                      pct={compressionProgress.pct}
                    />
                  )}
                </AnimatePresence>

                {/* Drop zone */}
                <AnimatePresence>
                  {canAddMore && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative group"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptString}
                        multiple
                        disabled={isSubmitting}
                        onChange={(e) => handleFiles(e.target.files)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full disabled:cursor-not-allowed"
                      />
                      <div className="border border-dashed border-white/10 group-hover:border-sky-500/30 rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 bg-white/[0.01] group-hover:bg-sky-500/[0.02]">
                        <div className="flex items-center gap-3 text-sky-500/40 group-hover:text-sky-500/60 transition-colors">
                          <Camera size={22} />
                          <span className="text-slate-400/50 text-lg font-light">+</span>
                          <Film size={22} />
                        </div>
                        <div className="text-center">
                          <p className="text-slate-400 text-sm font-light flex items-center gap-2">
                            <Plus size={13} className="text-sky-500/50" />
                            Add photo or video
                            {mediaFiles.length === 0 && (
                              <span className="text-slate-600 text-xs">— up to {UPLOAD_CONFIG.maxFiles} total</span>
                            )}
                          </p>
                          <p className="text-slate-600 text-[10px] mt-1.5 font-mono tracking-widest">
                            IMAGES ≤ {UPLOAD_CONFIG.maxImageSizeMB}MB &nbsp;·&nbsp; VIDEOS ≤ {UPLOAD_CONFIG.maxVideoSizeMB}MB
                          </p>
                          <p className="text-slate-700 text-[9px] mt-1 font-mono tracking-wider">
                            JPG · PNG · WEBP · GIF · MP4 · WEBM · MOV
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Global error */}
                <AnimatePresence>
                  {globalError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/20"
                    >
                      <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                      <p className="text-red-300 text-xs leading-relaxed">{globalError}</p>
                      <button
                        type="button"
                        onClick={() => setGlobalError(null)}
                        className="ml-auto text-red-500 hover:text-red-300 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || mediaFiles.some((m) => !!m.error)}
                className="w-full relative py-6 rounded-2xl bg-sky-500 text-slate-950 font-bold uppercase tracking-[0.5em] text-[11px] transition-all overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {buttonLabel}
                </div>
                <div className="absolute inset-0 bg-white/20 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </button>
            </form>
          </motion.div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden">
              <h3 className="text-white font-serif text-3xl mb-8 leading-tight">Archive <br />Protocol</h3>
              <ul className="space-y-8">
                {[
                  { label: "Respect", text: "Honoring the memory of the seven brave souls." },
                  { label: "Perspective", text: "How did this moment change your view of the stars?" },
                  { label: "Connection", text: "Shared human experience is the core of this archive." },
                ].map((tip, i) => (
                  <li key={i} className="group/item">
                    <span className="text-[9px] font-mono font-bold block mb-2 text-sky-500 uppercase tracking-widest">
                      Guideline 0{i + 1}
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors">
                      {tip.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] border border-sky-500/10 bg-sky-500/5 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Camera className="text-sky-500/50" size={16} />
                <span className="text-white text-[10px] font-mono uppercase tracking-[0.2em]">Media Limits</span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <FileImage size={12} />, label: "Images", detail: `JPG, PNG, WEBP, GIF · max ${UPLOAD_CONFIG.maxImageSizeMB} MB each` },
                  { icon: <Film size={12} />, label: "Videos", detail: `MP4, WEBM, MOV · max ${UPLOAD_CONFIG.maxVideoSizeMB} MB each` },
                  { icon: <Plus size={12} />, label: "Total files", detail: `Up to ${UPLOAD_CONFIG.maxFiles} attachments per submission` },
                ].map(({ icon, label, detail }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-sky-500/50 mt-0.5 shrink-0">{icon}</span>
                    <div>
                      <p className="text-slate-300 text-[10px] font-mono uppercase tracking-wider">{label}</p>
                      <p className="text-slate-500 text-[10px] leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] border border-sky-500/10 bg-sky-500/5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-sky-500/50" size={20} />
                <span className="text-white text-[10px] font-mono uppercase tracking-[0.2em]">Secure Transmission</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Your entry is handled with reverence. Contact info is only used to verify authentic eyewitness accounts if needed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};