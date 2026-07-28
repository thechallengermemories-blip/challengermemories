'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock, MapPin, Film, Play, BookOpen } from 'lucide-react';

export const StoryCard = ({ story }: { story: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use story.id or story._id depending on your database schema
  const storyId = story.id || story._id;

  // Build a clean location string
  const location = [story.State || story.state, story.country].filter(Boolean).join(", ");

  // Resolve media item
  const firstMedia = Array.isArray(story.media) ? story.media[0] : undefined;
  const isVideo = firstMedia?.type === 'video' || story.mediaType === 'video';

  const displayMedia = firstMedia?.url
    ? { 
        url: firstMedia.url, 
        type: isVideo ? 'video' : 'image',
        poster: firstMedia.poster || firstMedia.thumbnail || story.poster || story.thumbnailUrl
      }
    : story.imageUrl
    ? { url: story.imageUrl, type: 'image' as const, poster: undefined }
    : null;

  // Append #t=0.1 to video URL to force mobile browsers to render the initial frame
  const videoSrc = displayMedia?.type === 'video'
    ? (displayMedia.url.includes('#t=') ? displayMedia.url : `${displayMedia.url}#t=0.1`)
    : '';

  const isVideoStory = displayMedia?.type === 'video';

  // Handle Play Button click without triggering <Link> navigation
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = false; // Unmute when user explicitly taps play
          videoRef.current.play().catch((err) => console.log('Playback error:', err));
        }
      }, 50);
    }
  };

  // Prevent navigation when interacting with video controls while playing
  const handleVideoContainerClick = (e: React.MouseEvent) => {
    if (isPlaying) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link href={`/stories/${storyId}`} className="group block h-full">
      <div className="relative flex flex-col justify-between h-full bg-[#0f172a]/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:border-sky-500/40 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.15)] hover:-translate-y-1 overflow-hidden">
        
        {/* TOP BLOCK: Metadata, Title & Author */}
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-2.5 py-0.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-mono text-sky-400 uppercase tracking-wider font-medium">
              {story.category || 'Archive'}
            </span>

            <div className="flex items-center gap-2">
              {isVideoStory && (
                <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                  <Film size={10} className="text-indigo-400" /> Video
                </span>
              )}
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-full border border-slate-800">
                <Clock size={10} className="text-sky-400" />
                <span>{story.createdAt ? new Date(story.createdAt).getFullYear() : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-sky-400 transition-colors duration-300 leading-snug line-clamp-2 min-h-[2.8rem] sm:min-h-[3.25rem] mb-3">
            {story.title}
          </h3>

          {/* Author Name & Location */}
          <div className="flex items-center gap-2.5 mb-4 pt-2 border-t border-slate-800/60">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase ring-1 ring-white/10 shrink-0">
              {story.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-300 min-w-0">
              <span className="font-medium text-slate-200 truncate max-w-[140px]">
                {story.name || 'Anonymous Witness'}
              </span>
              {location && (
                <>
                  <span className="text-slate-600 text-[10px]">•</span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 truncate max-w-[150px]">
                    <MapPin size={10} className="text-sky-400 shrink-0" />
                    <span className="truncate">{location}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE BLOCK: Media Preview / Video Player (Aspect 16:9) */}
        <div 
          className="relative aspect-[16/9] w-full my-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 group-hover:border-slate-700 transition-colors"
          onClick={handleVideoContainerClick}
        >
          {displayMedia ? (
            <>
              {displayMedia.type === 'video' ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={displayMedia.poster}
                    className="w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    controls={isPlaying}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Play Button Overlay (Visible when video is NOT playing) */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center pointer-events-none">
                      <button
                        type="button"
                        onClick={handlePlayClick}
                        className="pointer-events-auto px-4 py-2 rounded-full bg-sky-500/90 hover:bg-sky-400 backdrop-blur-md border border-sky-300/30 flex items-center gap-2 text-white transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95"
                        title="Play Video Inline"
                      >
                        <Play size={14} className="fill-current text-white translate-x-0.5" />
                        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                          Play Video
                        </span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Image
                    src={displayMedia.url}
                    alt={story.title || 'Story preview image'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent pointer-events-none" />
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center relative bg-slate-900/50">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent" />
              <Film className="text-white/10 w-10 h-10" />
            </div>
          )}
        </div>

        {/* BOTTOM BLOCK: Narrative & Action Link */}
        <div className="mt-3 flex flex-col flex-grow justify-between">
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 font-light mb-4 group-hover:text-slate-300 transition-colors">
            {story.narrative}
          </p>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
              {isVideoStory ? (
                <>
                  <Film size={12} className="text-sky-400" />
                  <span>Watch Video Details</span>
                </>
              ) : (
                <>
                  <BookOpen size={12} className="text-sky-400" />
                  <span>Read Full Story</span>
                </>
              )}
            </span>

            <div className="p-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};