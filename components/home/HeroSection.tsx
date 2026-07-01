import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { Crosshair, Globe, Database } from "lucide-react";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${(i * 17.3) % 100}%`,
  left: `${(i * 27.1) % 100}%`,
  size: i % 7 === 0 ? 2 : 1,
  opacity: 0.05 + (i % 5) * 0.03,
}));

interface CrewCardData {
  slug: string;
  name: string;
  role: string;
  crewId: string;
  seat: string;
  img: string;
  shortBio: string;
}

async function getCrew(): Promise<CrewCardData[]> {
  try {
    // Build an absolute URL for the internal API call — server components
    // can't fetch relative paths.
    const h = await headers();
    const host = h.get("host");
    const protocol = host?.startsWith("localhost") ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/crew`, {
      next: { revalidate: 60 }, // re-fetch at most once a minute
    });

    if (!res.ok) return [];
    const { crew } = await res.json();
    return crew ?? [];
  } catch (err) {
    console.error("Failed to load crew for hero section:", err);
    return [];
  }
}

export async function HeroSection() {
  const crew = await getCrew();

  return (
    <section className="relative min-h-screen w-full bg-[#020617] text-white flex flex-col justify-between overflow-hidden px-6 py-12 md:px-12 lg:px-16 select-none">
      
      {/* 1. Scoped CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lens-focus {
          0% {
            opacity: 0;
            filter: blur(12px);
            letter-spacing: 0.2em;
            transform: scale(0.97);
          }
          100% {
            opacity: 0.95;
            filter: blur(0px);
            letter-spacing: -0.015em;
            transform: scale(1);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float-telemetry {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(6px, -12px) rotate(0.5deg); }
          50% { transform: translate(-10px, 6px) rotate(-0.5deg); }
          75% { transform: translate(8px, 10px) rotate(0.2deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.75; }
        }
        .animate-lens-focus {
          animation: lens-focus 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float-telemetry {
          animation: float-telemetry 24s ease-in-out infinite;
        }

        /* Crew card — only GPU-composited properties */
        .crew-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }
        .crew-card:hover {
          transform: translateY(-6px);
          border-color: rgba(56,189,248,0.4);
          box-shadow: 0 0 28px rgba(56,189,248,0.15);
        }

        /* Beautiful, clear portrait opacity & warm grayscale mix */
        .crew-img {
          opacity: 0.82;
          filter: grayscale(20%);
          transition: transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease;
        }
        .crew-card:hover .crew-img {
          transform: scale(1.04);
          opacity: 1;
          filter: grayscale(0%);
        }

        /* Smooth CSS Grid auto-height container for the bio */
        .crew-bio-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .crew-card:hover .crew-bio-wrapper {
          grid-template-rows: 1fr;
        }

        /* Bio reveal: opacity + translate slide-up */
        .crew-bio {
          min-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .crew-card:hover .crew-bio {
          opacity: 1;
          transform: translateY(0);
        }

        /* Clean name expansion */
        .crew-firstname {
          display: inline-block;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: bottom;
          transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
        }
        .crew-card:hover .crew-firstname {
          max-width: 120px;
          opacity: 0.9;
        }

        /* Badge opacity */
        .crew-badges {
          opacity: 0.5;
          transition: opacity 0.2s ease;
        }
        .crew-card:hover .crew-badges {
          opacity: 1;
        }
      `}} />

      {/* 2. Deep Space Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-500/5 blur-[120px] rounded-full" />
        
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
              animation: `twinkle ${4 + (star.id % 4)}s ease-in-out infinite`,
              animationDelay: `${(star.id % 5) * 0.5}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/90" />
      </div>

      {/* 3. Celestial Telemetry Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] text-sky-500/5 animate-float-telemetry">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 3" />
            <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" />
            <g className="text-sky-400">
              <circle cx="340" cy="200" r="2.5" fill="currentColor" className="animate-ping [animation-duration:3s]" />
              <circle cx="340" cy="200" r="1.5" fill="currentColor" />
              <circle cx="98" cy="110" r="2.5" fill="currentColor" className="animate-ping [animation-duration:4s]" />
              <circle cx="98" cy="110" r="1.5" fill="currentColor" />
              <circle cx="260" cy="320" r="2" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>

      {/* 4. Archival Layout Frame */}
      <div className="absolute inset-6 md:inset-8 pointer-events-none z-10 border border-white/[0.02]">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10" />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-[8px] font-mono tracking-[0.3em] uppercase text-slate-500/60 [writing-mode:vertical-lr]">
          <div className="flex items-center gap-2">
            <Crosshair size={8} className="text-sky-400/50" />
            <span>KSC · LC-39B · 28.572° N 80.648° W</span>
          </div>
          <span>LAUNCH SYSTEM: OV-099</span>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-[8px] font-mono tracking-[0.3em] uppercase text-slate-500/60 [writing-mode:vertical-lr]">
          <div className="flex items-center gap-2">
            <Globe size={8} className="text-sky-400/50" />
            <span>PUBLIC ARCHIVE SYSTEM</span>
          </div>
          <span>RECORDING TIMELINE: 1986 — 2026</span>
        </div>
      </div>

      {/* 5. Upper Core Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-28 sm:pt-32 lg:pt-36 text-center flex flex-col items-center">
        
        <div className="animate-fade-in-up flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-sky-500/25" />
          <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.4em] text-sky-400/80 font-semibold flex items-center gap-2">
            <Database size={10} className="text-sky-400/60" />
            Preserving Shared Human Memory
          </span>
          <div className="h-[1px] w-12 bg-sky-500/25" />
        </div>

        <h1
          className="animate-lens-focus font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-6 select-text"
          style={{ willChange: "filter, letter-spacing, transform, opacity" }}
        >
          Challenger Memories
        </h1>

        <p
          className="animate-fade-in-up max-w-3xl text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-8 select-text"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          The Challenger mission became part of millions of lives — in classrooms, homes, workplaces, and conversations across generations. Some remember watching it live. Others grew up hearing the stories afterward. This project exists to preserve those human experiences and explore how history continues to shape people long after a moment has passed.
        </p>

        <div
          className="animate-fade-in-up mt-4 flex flex-wrap justify-center gap-4 w-full"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <a
            href="/share-story"
            className="px-7 py-3 rounded-full bg-sky-500 text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.25)] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]"
          >
            Share Your Memory
          </a>
          <a
            href="/stories"
            className="px-7 py-3 rounded-full border border-white/10 bg-white/[0.02] text-slate-300 font-mono text-xs uppercase tracking-widest hover:bg-white/[0.07] hover:border-sky-500/30 hover:text-sky-400 transition-all duration-300"
          >
            Explore Memories
          </a>
        </div>
      </div>

      {/* 6. Crew Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-16 lg:mt-24 mb-4">
        
        <div className="flex flex-col items-center mb-8">
          <p className="font-mono text-[9px] tracking-[0.3em] text-slate-500 uppercase">
            In Remembrance of the STS-51-L Crew
          </p>
          <div className="w-12 h-[1px] bg-sky-500/30 mt-2" />
        </div>

        {crew.length === 0 ? (
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Crew archive unavailable
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
            {crew.map((member) => (
              <Link
                key={member.slug}
                href={`/crew/${member.slug}`}
                className="crew-card relative aspect-[3/4] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden block"
              >
                {/* Image Container with precise single gradient overlay */}
                <div className="absolute inset-0 bg-slate-950">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                    priority={true}
                    className="crew-img object-cover"
                  />
                  {/* Subtle dark bottom gradient to keep names perfectly readable without masking the uniforms */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/25 to-transparent z-10" />
                </div>

                {/* Badges */}
                <div className="crew-badges absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                  <span className="font-mono text-[8px] bg-black/40 px-2 py-0.5 rounded border border-white/10 text-sky-400 font-medium tracking-wider">
                    {member.crewId}
                  </span>
                  <span className="font-mono text-[8px] text-slate-400">
                    {member.seat}
                  </span>
                </div>

                {/* Info Container — sits tightly at the bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end z-20">
                  <p className="font-mono text-[8px] tracking-widest text-sky-400 uppercase mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-light text-white leading-tight mb-1">
                    {member.name.split(" ").slice(-1)[0]}
                    <span className="crew-firstname text-white/90">
                      , {member.name.split(" ").slice(0, -1).join(" ")}
                    </span>
                  </h3>

                  {/* Grid-based dynamic reveal — expands from 0px to auto-height on hover */}
                  <div className="crew-bio-wrapper">
                    <div className="crew-bio">
                      <p className="font-serif text-[10px] text-slate-300 italic leading-snug mt-2 mb-2">
                        {member.shortBio}
                      </p>
                      <span className="font-mono text-[8px] text-sky-400 uppercase tracking-widest border-b border-sky-400/30 pb-0.5 inline-block">
                        View Biography →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}