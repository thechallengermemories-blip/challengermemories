"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, ShieldCheck, X, Camera, CheckCircle2,
  Loader2, Sparkles, Film, AlertCircle, Bookmark, BookmarkX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { compressMedia } from "@/lib/compressMedia"; // Ensure path is configured
import { LocationField } from "@/components/location/LocationField";
import { ArchiveGalleryPicker } from "./ArchiveGalleryPicker";

const UPLOAD_CONFIG = {
  maxFiles: 3,
  maxImageSizeMB: 20,
  maxVideoSizeMB: 60,
  acceptedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  acceptedVideoTypes: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
};

type MediaFile = {
  id: string;
  preview: string;
  type: "image" | "video";
  error?: string;
  source: "upload" | "archive";
  file?: File;          // only present for uploads
  archivePath?: string; // only present for archive picks, e.g. "/archive-images/launch-01.jpg"
};

type Phase = "idle" | "compressing" | "uploading";

interface StoryFormProps {
  selectedPrompt: string | null;
  onClearPrompt: () => void;
}

export const StoryForm: React.FC<StoryFormProps> = ({ selectedPrompt, onClearPrompt }) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isSuccess, setIsSuccess] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [compressionProgress, setCompressionProgress] = useState<{ index: number; pct: number } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isSubmitting = phase !== "idle";

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

  const handleArchiveSelect = (paths: string[]) => {
    const newMedia: MediaFile[] = paths.map((path) => ({
      id: `${path}-${Date.now()}`,
      preview: path,
      type: "image",
      source: "archive",
      archivePath: path,
    }));
    setMediaFiles((prev) => [...prev, ...newMedia]);
  };

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
        const isImage = UPLOAD_CONFIG.acceptedImageTypes.includes(file.type);
        let errorMsg: string | undefined;

        if (!isImage && !isVideo) {
          errorMsg = "Unsupported file type.";
        } else if (isImage && file.size > UPLOAD_CONFIG.maxImageSizeMB * 1024 * 1024) {
          errorMsg = `Image exceeds ${UPLOAD_CONFIG.maxImageSizeMB}MB.`;
        } else if (isVideo && file.size > UPLOAD_CONFIG.maxVideoSizeMB * 1024 * 1024) {
          errorMsg = `Video exceeds ${UPLOAD_CONFIG.maxVideoSizeMB}MB.`;
        }

        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          type: isVideo ? "video" : "image",
          source: "upload",
          error: errorMsg,
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
      if (removed?.source === "upload") URL.revokeObjectURL(removed.preview);
      return prev.filter((m) => m.id !== id);
    });
    setGlobalError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError(null);

    if (mediaFiles.some((m) => m.error)) {
      setGlobalError("Please remove files with errors before submitting.");
      return;
    }

    const formEl = e.currentTarget;

    // Separate uploads (need compression) from archive picks (just static paths)
    const uploads = mediaFiles.filter((m) => m.source === "upload");
    const archivePicks = mediaFiles.filter((m) => m.source === "archive");

    try {
      setPhase("compressing");
      setCompressionProgress(null);

      const compressedFiles = await Promise.all(
        uploads.map(async (m, i) => {
          const onProgress = m.type === "video"
            ? (pct: number) => setCompressionProgress({ index: i + 1, pct })
            : undefined;

          setCompressionProgress({ index: i + 1, pct: 0 });
          const compressed = await compressMedia(m.file as File, m.type, onProgress);
          setCompressionProgress({ index: i + 1, pct: 100 });
          return compressed;
        })
      );

      setPhase("uploading");
      setCompressionProgress(null);

      const formData = new FormData(formEl);
      formData.append("mission", "challenger");
      if (selectedPrompt) {
        formData.append("selected_prompt", selectedPrompt);
      }

      compressedFiles.forEach((file, i) => {
        formData.append(`media_${i}`, file);
        formData.append(`media_${i}_type`, uploads[i].type);
      });
      formData.append("media_count", String(compressedFiles.length));

      archivePicks.forEach((m, i) => {
        formData.append(`archive_media_${i}`, m.archivePath as string);
      });
      formData.append("archive_media_count", String(archivePicks.length));

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        formRef.current?.reset();
        onClearPrompt();
        mediaFiles.forEach((m) => {
          if (m.source === "upload") URL.revokeObjectURL(m.preview);
        });
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

  const buttonLabel = {
    idle: (
      <>
        <Sparkles size={14} /> Commit to Archive{" "}
        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </>
    ),
    compressing: (
      <>
        <Loader2 size={16} className="animate-spin" /> Compressing…
      </>
    ),
    uploading: (
      <>
        <Loader2 size={16} className="animate-spin" /> Uploading…
      </>
    ),
  }[phase];

  if (isSuccess) {
    return (
      <section ref={sectionRef} className="pb-32 px-6 bg-[#020617] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto py-24 px-6 text-center bg-slate-900/20 border border-white/5 rounded-[2.5rem] backdrop-blur-md"
        >
          <div className="inline-flex p-5 rounded-full mb-8 bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-serif text-white mb-6">Transmission Logged</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md mx-auto font-light">
            Your memory is safely stored. It will remain a permanent part of the digital archive, preserving the human legacy of Challenger.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-8 decoration-sky-400/20 hover:decoration-sky-400 transition-all text-xs uppercase tracking-widest font-mono font-bold"
          >
            Submit Another Entry
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="story-form-section" className="pb-32 px-6 bg-[#020617] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Main Form Entry */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-slate-900/30 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">

              {/* Active Writing Prompt Indicator */}
              <AnimatePresence mode="popLayout">
                {selectedPrompt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 rounded-2xl bg-sky-500/[0.04] border border-sky-500/20 flex gap-4 items-start relative overflow-hidden"
                  >
                    <Bookmark size={16} className="text-sky-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 pr-6">
                      <p className="text-[9px] font-mono tracking-wider text-sky-400 uppercase font-semibold">
                        Active Writing Guide
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                        {selectedPrompt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClearPrompt}
                      title="Remove prompt guide"
                      className="absolute top-4 right-4 p-1 text-slate-500 hover:text-sky-400 transition-colors rounded"
                    >
                      <BookmarkX size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className={labelStyles}>Observer Name</label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="E.g., Jane D. or Anonymous"
                    className={inputBaseStyles}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyles}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="For private verification only"
                    className={inputBaseStyles}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Reflection Title</label>
                <input
                  name="title"
                  required
                  type="text"
                  placeholder="E.g., The Classroom Television / Looking Up at the Sky"
                  className={cn(inputBaseStyles, "font-serif text-lg md:text-xl placeholder:font-sans")}
                />
              </div>

              <LocationField inputBaseStyles={inputBaseStyles} labelStyles={labelStyles} />

              <div className="space-y-1">
                <label className={labelStyles}>Your Memory</label>
                <textarea
                  name="narrative"
                  required
                  rows={8}
                  placeholder="Type your memory here. Remember, honest details and small perspectives are the heart of this archive..."
                  className={cn(inputBaseStyles, "leading-relaxed resize-none font-sans text-sm sm:text-base")}
                />
              </div>

              {/* Media Upload Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                  <label className={cn(labelStyles, "mb-0")}>Optional Attachments</label>
                  <span className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 text-slate-500 bg-white/[0.01]">
                    {mediaFiles.length} / {UPLOAD_CONFIG.maxFiles} files
                  </span>
                </div>

                {/* Thumbnails */}
                {mediaFiles.length > 0 && (
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                    {mediaFiles.map((m) => (
                      <div
                        key={m.id}
                        className="relative rounded-xl overflow-hidden bg-slate-900/60 border border-white/10 aspect-video flex items-center justify-center group/thumb"
                      >
                        {m.type === "image" ? (
                          <img src={m.preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <video src={m.preview} className="w-full h-full object-cover" muted playsInline />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Film size={24} className="text-white/70" />
                            </div>
                          </>
                        )}

                        {m.source === "archive" && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[8px] font-mono uppercase tracking-widest z-20">
                            Archive
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeMedia(m.id)}
                          className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover/thumb:opacity-100 hover:bg-red-500/80 transition-all z-30"
                        >
                          <X size={12} />
                        </button>
                        {m.error && (
                          <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-2 text-center">
                            <AlertCircle size={16} className="text-red-400 mb-1" />
                            <p className="text-red-300 text-[9px] leading-tight">{m.error}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Compression Progress Bar */}
                {phase === "compressing" && compressionProgress && (
                  <div className="space-y-1.5 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-sky-400 uppercase tracking-widest">
                        Compressing file {compressionProgress.index} of {mediaFiles.filter((m) => m.source === "upload").length}…
                      </span>
                      <span className="text-slate-500">{Math.round(compressionProgress.pct)}%</span>
                    </div>
                    <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500/60 transition-all duration-150 ease-out"
                        style={{ width: `${compressionProgress.pct}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Dropzone trigger */}
                {mediaFiles.length < UPLOAD_CONFIG.maxFiles && (
                  <div className="relative group">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={[...UPLOAD_CONFIG.acceptedImageTypes, ...UPLOAD_CONFIG.acceptedVideoTypes].join(",")}
                      multiple
                      disabled={isSubmitting}
                      onChange={(e) => handleFiles(e.target.files)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full disabled:cursor-not-allowed"
                    />
                    <div className="border border-dashed border-white/10 group-hover:border-sky-500/20 rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-2 bg-white/[0.01] group-hover:bg-sky-500/[0.01]">
                      <div className="flex items-center gap-3 text-sky-500/30 group-hover:text-sky-500/50 transition-colors">
                        <Camera size={20} />
                        <span className="text-slate-600 font-light">+</span>
                        <Film size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-400 text-xs font-light">
                          Add a photograph, drawing, or audio/video clip
                        </p>
                        <p className="text-slate-600 text-[9px] mt-1 font-mono tracking-wider">
                          Images up to 20MB · Videos up to 60MB · JPG, PNG, WEBP, GIF, MP4, MOV
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Archive picker trigger */}
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  disabled={isSubmitting || mediaFiles.length >= UPLOAD_CONFIG.maxFiles}
                  className="mt-3 w-full text-center text-[10px] font-mono uppercase tracking-widest text-sky-400/70 hover:text-sky-400 border border-sky-500/15 hover:border-sky-500/30 rounded-xl py-3 transition-colors disabled:opacity-30"
                >
                  Don&apos;t have a photo? Choose from our archive
                </button>

                <ArchiveGalleryPicker
                  open={galleryOpen}
                  onClose={() => setGalleryOpen(false)}
                  remainingSlots={UPLOAD_CONFIG.maxFiles - mediaFiles.length}
                  onConfirm={handleArchiveSelect}
                />

                {/* Global Submission Errors */}
                <AnimatePresence>
                  {globalError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/20"
                    >
                      <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <p className="text-red-300 text-xs leading-relaxed">{globalError}</p>
                      <button
                        type="button"
                        onClick={() => setGlobalError(null)}
                        className="ml-auto text-red-500 hover:text-red-300"
                      >
                        <X size={12} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || mediaFiles.some((m) => !!m.error)}
                className="w-full relative py-5 rounded-2xl bg-sky-500 text-slate-950 font-mono font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs transition-all overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {buttonLabel}
                </div>
                <div className="absolute inset-0 bg-white/10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </button>
            </form>
          </motion.div>

          {/* Sidebar / Archive Guidelines */}
          <aside className="lg:col-span-4 space-y-6">

            <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden">
              <h3 className="text-white font-serif text-2xl mb-6 leading-snug">
                Archive Protocol
              </h3>
              <ul className="space-y-6 text-left">
                {[
                  {
                    label: "Respect First",
                    text: "We avoid graphic references or catastrophe imagery. Focus on your emotions, learning, and connection."
                  },
                  {
                    label: "The Power of Small Details",
                    text: "You don't need a polished literary essay. Small, sensory descriptions capture historical atmospheres best."
                  },
                  {
                    label: "Preservation",
                    text: "Every submission is curated by hand. Real human stories protect the mission from fading into dry textbook records."
                  }
                ].map((item, i) => (
                  <li key={i} className="group/item">
                    <span className="text-[9px] font-mono font-bold block mb-1 text-sky-500 uppercase tracking-widest">
                      Guideline 0{i + 1} — {item.label}
                    </span>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-[1.5rem] border border-sky-500/10 bg-sky-500/5 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-sky-400" size={16} />
                <span className="text-white text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                  Privacy & Authenticity
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Contact information is never shared publicly or used for marketing. It is safely held in our database only if our historians need to verify authenticity or ask for permission to use your memory in educational exhibits.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};