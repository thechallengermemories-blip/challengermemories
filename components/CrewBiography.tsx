"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ImageIcon, ArrowLeft, ArrowRight, FileText, Loader2 } from "lucide-react";
import { parseBiography, type MediaItem } from "@/lib/crew-data";

function getYouTubeEmbed(url: string) {
  const watch = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
}

// Shape returned by the API — matches the Mongo schema (crewId instead of id).
interface ApiCrewMember {
  slug: string;
  name: string;
  fullTitle: string;
  role: string;
  crewId: string;
  seat: string;
  img: string;
  shortBio: string;
  rawBiography: string;
  media: MediaItem[];
}

interface CrewListItem {
  slug: string;
  name: string;
  seat: string;
}

export function CrewBiography({ slug }: { slug: string }) {
  const [member, setMember] = useState<ApiCrewMember | null>(null);
  const [crewList, setCrewList] = useState<CrewListItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "not-found" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const [memberRes, listRes] = await Promise.all([
          fetch(`/api/crew/${slug}`),
          fetch(`/api/crew`),
        ]);

        if (memberRes.status === 404) {
          if (!cancelled) setStatus("not-found");
          return;
        }
        if (!memberRes.ok || !listRes.ok) throw new Error("Request failed");

        const { member } = await memberRes.json();
        const { crew } = await listRes.json();

        if (!cancelled) {
          setMember(member);
          setCrewList(crew);
          setStatus("ready");
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center pt-20">
        <Loader2 className="animate-spin text-sky-400" size={24} />
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="min-h-screen w-full bg-[#020617] text-white flex flex-col items-center justify-center gap-4 pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
          Crew member not found
        </p>
        <Link href="/" className="text-sky-400 font-mono text-xs uppercase tracking-widest">
          ← Back to Crew Archive
        </Link>
      </div>
    );
  }

  if (status === "error" || !member) {
    return (
      <div className="min-h-screen w-full bg-[#020617] text-white flex flex-col items-center justify-center gap-4 pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
          Something went wrong loading this page
        </p>
        <Link href="/" className="text-sky-400 font-mono text-xs uppercase tracking-widest">
          ← Back to Crew Archive
        </Link>
      </div>
    );
  }

  const sections = parseBiography(member.rawBiography);
  const images = member.media.filter((m) => m.type === "image");
  const videos = member.media.filter((m) => m.type === "video");

  const idx = crewList.findIndex((c) => c.slug === member.slug);
  const prev = crewList.length ? crewList[(idx - 1 + crewList.length) % crewList.length] : null;
  const next = crewList.length ? crewList[(idx + 1) % crewList.length] : null;

  return (
    <article className="relative min-h-screen w-full bg-[#020617] text-white overflow-hidden">
      {/* ambient glow, matches hero atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* top nav */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pt-28 sm:pt-32 lg:pt-36 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={12} />
          Crew Archive
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          STS-51-L · {member.crewId} · Seat {member.seat}
        </span>
      </div>

      {/* header */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pt-10 pb-12 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-8 items-end">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
          <Image
            src={member.img}
            alt={member.name}
            fill
            sizes="220px"
            priority
            className="object-cover"
            style={{ opacity: 0.92, filter: "grayscale(8%)" }}
          />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-sky-400/80 mb-3">
            {member.role}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-3 select-text">
            {member.name}
          </h1>
          <p className="font-mono text-[11px] tracking-widest text-slate-400 uppercase mb-4">
            {member.fullTitle}
          </p>
          <p className="text-slate-300 font-light leading-relaxed max-w-xl select-text">
            {member.shortBio}
          </p>
        </div>
      </header>

      <div className="h-px w-full max-w-5xl mx-auto bg-white/10" />

      {/* biography sections */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-12">
        {sections.length > 0 ? (
          <div className="grid gap-4">
            {sections.map((s) => (
              <div
                key={s.heading}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={12} className="text-sky-400/70" />
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">
                    {s.heading}
                  </h2>
                </div>
                <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base whitespace-pre-line select-text">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Full biography coming soon
            </p>
          </div>
        )}
      </section>

      {/* media gallery */}
      {(images.length > 0 || videos.length > 0) && (
        <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Archive Media
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {images.map((img, i) => (
                <figure
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-slate-900"
                >
                  <Image src={img.url} alt={img.caption ?? member.name} fill className="object-cover" />
                  {img.caption && (
                    <figcaption className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1 font-mono text-[9px] text-slate-300">
                      {img.caption}
                    </figcaption>
                  )}
                  <span className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                    <ImageIcon size={10} className="text-sky-400" />
                  </span>
                </figure>
              ))}
            </div>
          )}

          {videos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((v, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                  <div className="relative aspect-video">
                    <iframe
                      src={getYouTubeEmbed(v.url)}
                      title={v.caption ?? `${member.name} video ${i + 1}`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  {v.caption && (
                    <div className="px-3 py-2 flex items-center gap-2 font-mono text-[9px] text-slate-400">
                      <Play size={10} className="text-sky-400" />
                      {v.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* prev / next crew navigation */}
      {prev && next && (
        <nav className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pb-20 grid grid-cols-2 gap-4">
          <Link
            href={`/crew/${prev.slug}`}
            className="group rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors"
          >
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 group-hover:text-sky-400 mb-1">
              <ArrowLeft size={10} /> Previous
            </span>
            <span className="font-serif text-sm text-white">{prev.name}</span>
          </Link>
          <Link
            href={`/crew/${next.slug}`}
            className="group rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-right hover:border-sky-500/30 hover:bg-white/[0.05] transition-colors"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 group-hover:text-sky-400 mb-1">
              Next <ArrowRight size={10} />
            </span>
            <span className="font-serif text-sm text-white">{next.name}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}