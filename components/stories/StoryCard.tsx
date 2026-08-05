'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock, MapPin, Film, Play, BookOpen, MessageSquare } from 'lucide-react';

export const StoryCard = ({ story }: { story: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const videoSrc = displayMedia?.type === 'video'
    ? (displayMedia.url.includes('#t=') ? displayMedia.url : `${displayMedia.url}#t=0.1`)
    : '';

  const isVideoStory = displayMedia?.type === 'video';

  // Include available comments
  const commentsList = Array.isArray(story.comments) ? story.comments : [];
  const latestComment = commentsList[0];

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.play().catch((err) => console.log('Playback error:', err));
        }
      }, 50);
    }
  };

  const handleVideoContainerClick = (e: React.MouseEvent) => {
    if (isPlaying) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link href={`/stories/${storyId}`} className="group block h-full select-none">
      <div className="relative flex flex-col justify-between h-full bg-slate-900/40 backdrop-blur-md border border-slate-800/80 hover:border-sky-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(56,189,248,0.2)] hover:-translate-y-1.5 overflow-hidden">
        
        {/* Subtle Ambient Background Gradient Glows on Hover */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-700 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />

        {/* TOP SECTION: Category, Metadata Badges, Title & Author */}
        <div className="relative z-10">
          {/* Metadata Badges Row */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-mono text-sky-300 font-semibold uppercase tracking-wider">
              {story.category || 'Archive'}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Comment Badge */}
              {commentsList.length > 0 && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                  latestComment?.status === 'pending'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                }`}>
                  <MessageSquare size={10} className={latestComment?.status === 'pending' ? 'text-amber-400' : 'text-emerald-400'} />
                  <span>{commentsList.length}</span>
                </span>
              )}

              {/* Video Badge */}
              {isVideoStory && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-mono text-indigo-300 font-medium">
                  <Film size={10} className="text-indigo-400" />
                  <span>Video</span>
                </span>
              )}

              {/* Year Badge */}
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-800/80">
                <Clock size={10} className="text-sky-400 shrink-0" />
                <span>{story.createdAt ? new Date(story.createdAt).getFullYear() : 'N/A'}</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-serif text-slate-100 group-hover:text-sky-400 transition-colors duration-300 leading-snug line-clamp-2 mb-3 font-medium">
            {story.title}
          </h3>

          {/* Author Name & Location Row */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/60">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner shrink-0 ring-1 ring-white/20">
              {story.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col text-xs min-w-0">
              <span className="font-semibold text-slate-200 truncate">
                {story.name || 'Anonymous Witness'}
              </span>
              {location && (
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 truncate mt-0.5">
                  <MapPin size={10} className="text-sky-400 shrink-0" />
                  <span className="truncate">{location}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Media Preview / Player (16:9 Aspect) */}
        <div 
          className="relative z-10 aspect-[16/9] w-full my-1 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/90 group-hover:border-slate-700/80 transition-colors shadow-inner"
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

                  {!isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-center justify-center pointer-events-none">
                      <button
                        type="button"
                        onClick={handlePlayClick}
                        className="pointer-events-auto px-4 py-2 rounded-full bg-sky-500/90 hover:bg-sky-400 backdrop-blur-md border border-sky-300/30 flex items-center gap-2 text-white transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95"
                      >
                        <Play size={13} className="fill-current text-white translate-x-0.5" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center relative bg-slate-900/40">
              <Film className="text-slate-700 w-10 h-10" />
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: Narrative & Comment Snippet */}
        <div className="relative z-10 mt-3.5 flex flex-col flex-grow justify-between">
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 font-light mb-3">
            {story.narrative}
          </p>

          {/* Left-Accented Comment Snippet Box */}
          {latestComment && (
            <div className="mb-3.5 p-3 rounded-xl bg-slate-900/90 border-l-2 border-l-sky-400 border-y border-r border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col gap-1 shadow-sm">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-medium text-sky-400 truncate">
                  <MessageSquare size={12} className="shrink-0 text-sky-400" />
                  <span className="truncate font-semibold">{latestComment.name || 'Visitor'}</span>
                </div>

                {latestComment.status === 'pending' ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Pending
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">
                    {commentsList.length > 1 ? `+${commentsList.length - 1} more` : 'Latest comment'}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-[11.5px] italic line-clamp-2 leading-relaxed font-light">
                "{latestComment.text}"
              </p>
            </div>
          )}

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
              {isVideoStory ? (
                <>
                  <Film size={13} className="text-sky-400" />
                  <span>Watch Video Details</span>
                </>
              ) : (
                <>
                  <BookOpen size={13} className="text-sky-400" />
                  <span>Read Full Story</span>
                </>
              )}
            </span>

            <div className="p-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white transition-all duration-300 shadow-sm">
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};