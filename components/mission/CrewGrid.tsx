"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';

interface CrewCardData {
  slug: string;
  name: string;
  role: string;
  crewId: string;
  seat: string;
  img: string;
  shortBio: string;
}

const CrewGrid = () => {
  const [crew, setCrew] = useState<CrewCardData[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/crew");
        if (!res.ok) throw new Error("Request failed");
        const { crew } = await res.json();
        if (!cancelled) {
          setCrew(crew ?? []);
          setStatus("ready");
        }
      } catch (err) {
        console.error("Failed to load crew:", err);
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">The Crew</h2>
          <div className="w-20 h-1 bg-sky-500/50 mx-auto rounded-full" />
        </div>

        {status === "loading" && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-sky-400" size={24} />
          </div>
        )}

        {status === "error" && (
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Crew archive unavailable
          </p>
        )}

        {status === "ready" && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {crew.map((member) => (
              <motion.div 
                key={member.slug} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative"
              >
                <Link 
                  href={`/crew/${member.slug}`}
                  className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Top Right Arrow Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-sky-500 p-2 rounded-full shadow-lg">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      {member.role}
                    </p>
                    <h3 className="text-xl font-serif text-white mb-1 leading-tight">
                      {member.name}
                    </h3>
                    
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 ease-in-out">
                      <p className="text-slate-400 text-[11px] leading-relaxed italic mb-3">
                        {member.shortBio}
                      </p>
                      <span className="text-sky-400 text-[9px] font-bold uppercase tracking-widest border-b border-sky-400/30 pb-1">
                          View Biography
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CrewGrid;