"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ImageIcon } from "lucide-react";
import { ARCHIVE_IMAGES } from "./archiveImages";

interface Props {
  open: boolean;
  onClose: () => void;
  remainingSlots: number;
  onConfirm: (paths: string[]) => void;
}

export const ArchiveGalleryPicker: React.FC<Props> = ({ open, onClose, remainingSlots, onConfirm }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (path: string) => {
    setSelected((prev) => {
      if (prev.includes(path)) return prev.filter((p) => p !== path);
      if (prev.length >= remainingSlots) return prev;
      return [...prev, path];
    });
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#020617] border border-white/10 rounded-[2rem] max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h3 className="font-serif text-xl text-white">Choose From Our Archive</h3>
                <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-widest">
                  Select up to {remainingSlots} image{remainingSlots !== 1 ? "s" : ""}
                </p>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-sky-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable gallery */}
            <div className="overflow-y-auto p-6 space-y-8">
              {ARCHIVE_IMAGES.map((group) => (
                <div key={group.category}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-400/70 mb-3">
                    {group.category}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {group.items.map((img) => {
                      const isSelected = selected.includes(img.path);
                      return (
                        <button
                          type="button"
                          key={img.path}
                          onClick={() => toggle(img.path)}
                          className={`relative rounded-xl overflow-hidden aspect-video border transition-all group ${
                            isSelected ? "border-sky-500 ring-2 ring-sky-500/40" : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          <img src={img.path} alt={img.caption} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 flex items-end p-2">
                            <p className="text-[10px] text-slate-200 leading-tight text-left">{img.caption}</p>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                              <Check size={12} className="text-slate-950" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-slate-500 text-xs flex items-center gap-2">
                <ImageIcon size={12} /> {selected.length} selected
              </p>
              <button
                type="button"
                disabled={selected.length === 0}
                onClick={() => {
                  onConfirm(selected);
                  setSelected([]);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Attach Selected
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};