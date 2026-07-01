import Image from "next/image";
import Link from "next/link";

interface CrewCardData {
  slug: string;
  name: string;
  role: string;
  crewId: string;
  seat: string;
  img: string;
  shortBio: string;
}

async function fetchCrew(): Promise<CrewCardData[]> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/crew`, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const data: { crew: CrewCardData[] } = await res.json();
    return data.crew ?? [];
  } catch (err) {
    console.error("fetchCrew failed:", err);
    return [];
  }
}

export async function CrewFooter() {
  const crew = await fetchCrew();

  return (
    <section className="relative w-full bg-[#020617] text-white overflow-hidden">

      {/* ── Scoped styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Card lift */
        .cf-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }
        .cf-card:hover {
          transform: translateY(-6px);
          border-color: rgba(56,189,248,0.4);
          box-shadow: 0 0 28px rgba(56,189,248,0.15);
        }

        /* Portrait */
        .cf-img {
          opacity: 0.82;
          filter: grayscale(20%);
          transition: transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease;
        }
        .cf-card:hover .cf-img {
          transform: scale(1.04);
          opacity: 1;
          filter: grayscale(0%);
        }

        /* Bio reveal via CSS grid */
        .cf-bio-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cf-card:hover .cf-bio-wrapper {
          grid-template-rows: 1fr;
        }
        .cf-bio {
          min-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .cf-card:hover .cf-bio {
          opacity: 1;
          transform: translateY(0);
        }

        /* First-name reveal */
        .cf-firstname {
          display: inline-block;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: bottom;
          transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
        }
        .cf-card:hover .cf-firstname {
          max-width: 120px;
          opacity: 0.9;
        }

        /* Badge dimming */
        .cf-badges {
          opacity: 0.5;
          transition: opacity 0.2s ease;
        }
        .cf-card:hover .cf-badges {
          opacity: 1;
        }

        /* Divider rule */
        .cf-rule {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent);
        }
      `}} />

      {/* ── Top edge rule ── */}
      <div className="cf-rule w-full" />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pt-12 pb-14">

        {/* Eyebrow */}
        <div className="flex flex-col items-center mb-10">
          <p className="font-mono text-[9px] tracking-[0.35em] text-slate-500 uppercase">
            In Remembrance of the STS-51-L Crew
          </p>
          <div className="w-10 h-[1px] bg-sky-500/35 mt-3" />
        </div>

        {/* Grid */}
        {crew.length === 0 ? (
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Crew archive unavailable
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
            {crew.map((member) => {
              const lastName  = member.name.split(" ").slice(-1)[0];
              const firstName = member.name.split(" ").slice(0, -1).join(" ");

              return (
                <Link
                  key={member.slug}
                  href={`/crew/${member.slug}`}
                  aria-label={`Read ${member.name}'s biography`}
                  className="cf-card relative aspect-[3/4] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden block"
                >
                  {/* Portrait */}
                  <div className="absolute inset-0 bg-slate-950">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                      className="cf-img object-cover"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/25 to-transparent z-10" />
                  </div>

                  {/* Seat / Role badges */}
                  <div className="cf-badges absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                    <span className="font-mono text-[8px] bg-black/40 px-2 py-0.5 rounded border border-white/10 text-sky-400 font-medium tracking-wider">
                      {member.crewId}
                    </span>
                    <span className="font-mono text-[8px] text-slate-400">
                      {member.seat}
                    </span>
                  </div>

                  {/* Name + bio */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end z-20">
                    <p className="font-mono text-[8px] tracking-widest text-sky-400 uppercase mb-1">
                      {member.role}
                    </p>
                    <h3 className="font-serif text-sm sm:text-base font-light text-white leading-tight mb-1">
                      {lastName}
                      <span className="cf-firstname text-white/90">
                        , {firstName}
                      </span>
                    </h3>

                    <div className="cf-bio-wrapper">
                      <div className="cf-bio">
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
              );
            })}
          </div>
        )}
      </div>

      {/* ── Bottom edge rule ── */}
      <div className="cf-rule w-full" />

    </section>
  );
}