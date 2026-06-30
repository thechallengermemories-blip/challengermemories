"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
  prefix?: string; // e.g. flag emoji
};

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  disabledPlaceholder?: string;
  inputBaseStyles: string;
  emptyMessage?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  disabledPlaceholder,
  inputBaseStyles,
  emptyMessage = "No matches found.",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [query, options]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Reset highlight when filtered list changes
  useEffect(() => {
    setHighlightIndex(0);
  }, [query, isOpen]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const el = listRef.current.children[highlightIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, isOpen]);

  const openDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlightIndex]) handleSelect(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={openDropdown}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className={cn(
          inputBaseStyles,
          "flex items-center justify-between gap-3 text-left",
          disabled && "opacity-40 cursor-not-allowed",
          !disabled && "cursor-pointer",
          isOpen && "ring-1 border-sky-500/50 ring-sky-500/20 bg-slate-900/60"
        )}
      >
        <span className={cn("truncate", !selected && "text-slate-500/60 font-light")}>
          {selected ? (
            <>
              {selected.prefix ? `${selected.prefix} ` : ""}
              {selected.label}
            </>
          ) : disabled ? (
            disabledPlaceholder ?? placeholder
          ) : (
            placeholder
          )}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {selected && !disabled && (
            <span
              role="button"
              onClick={handleClear}
              className="p-1 text-slate-500 hover:text-sky-400 transition-colors rounded"
            >
              <X size={13} />
            </span>
          )}
          <ChevronDown
            size={15}
            className={cn(
              "text-slate-500 transition-transform duration-200",
              isOpen && "rotate-180 text-sky-400"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-full bg-slate-950/95 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <Search size={14} className="text-sky-400/60 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type to search…"
              className="w-full bg-transparent outline-none text-sm text-slate-100 placeholder:text-slate-600 font-light"
            />
          </div>

          <div ref={listRef} className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-slate-500 text-xs font-light">{emptyMessage}</p>
            ) : (
              filtered.map((option, i) => (
                <button
                  key={option.value}
                  type="button"
                  onMouseEnter={() => setHighlightIndex(i)}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                    i === highlightIndex ? "bg-sky-500/10 text-sky-300" : "text-slate-300",
                    option.value === value && "text-sky-400 font-medium"
                  )}
                >
                  {option.prefix ? (
                    <span className="shrink-0">{option.prefix}</span>
                  ) : (
                    <MapPin size={12} className="text-slate-600 shrink-0" />
                  )}
                  <span className="truncate font-light">{option.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};