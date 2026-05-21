"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CREW = [
  {
    name: "Francis R. Scobee",
    role: "Commander",
    id: "CDR",
    seat: "01",
    bio: "Test pilot. Vietnam veteran. Led STS-51-L with quiet courage.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Scobee-fr.jpg",
  },
  {
    name: "Michael J. Smith",
    role: "Pilot",
    id: "PLT",
    seat: "02",
    bio: "Navy test pilot. Father of three. His first spaceflight.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Michael_Smith_%28NASA%29.jpg",
  },
  {
    name: "Ronald E. McNair",
    role: "Mission Specialist",
    id: "MS1",
    seat: "03",
    bio: "Physicist. Saxophonist. Second African American in space.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Ronald_Erwin_McNair.jpg",
  },
  {
    name: "Ellison S. Onizuka",
    role: "Mission Specialist",
    id: "MS2",
    seat: "04",
    bio: "Air Force colonel. First Asian American in space.",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Ellison_Shoji_Onizuka_%28NASA%29.jpg",
  },
  {
    name: "Judith A. Resnik",
    role: "Mission Specialist",
    id: "MS3",
    seat: "05",
    bio: "Electrical engineer. Second American woman in space.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Judith_A._Resnik%2C_official_portrait_%28cropped%29.jpg",
  },
  {
    name: "Gregory B. Jarvis",
    role: "Payload Specialist",
    id: "PS1",
    seat: "06",
    bio: "Satellite engineer for Hughes Aircraft. Dreamed of the cosmos.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/13/Gregory_Jarvis_%28NASA%29_cropped.jpg",
  },
  {
    name: "Christa McAuliffe",
    role: "Teacher in Space",
    id: "PS2",
    seat: "07",
    bio: "New Hampshire schoolteacher. Chosen from 11,000 to teach from orbit.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/ChristaMcAuliffe_%28cropped%29.jpg",
  },
];

const N = CREW.length;

// Stars generated once
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  top: `${(i * 17.3) % 100}%`,
  left: `${(i * 31.7) % 100}%`,
  size: i % 7 === 0 ? 2 : 1,
  opacity: 0.06 + (i % 5) * 0.04,
}));

interface CrewCardProps {
  member: typeof CREW[0];
  i: number;
  cardW: number;
  cardGap: number;
  isMobile: boolean;
}

const CrewCard = ({ member, i, cardW, cardGap, isMobile }: CrewCardProps) => {
  return (
    <div
      className={`shrink-0 relative rounded-lg overflow-hidden group cursor-default
        ${i % 2 === 0 ? "translate-y-3" : "-translate-y-3"}`}
      style={{
        width: `${cardW}px`,
        height: isMobile ? "410px" : "470px",
        background: "rgba(10,10,15,0.7)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.5s ease, transform 0.5s ease",
        marginLeft: i === 0 ? `calc(50vw - ${cardW / 2}px)` : undefined,
        marginRight: i === N - 1 ? `calc(50vw - ${cardW / 2}px)` : undefined,
      }}
    >
      <style>{`
        .crew-card-${i}:hover {
          border-color: rgba(255, 210, 120, 0.22) !important;
        }
        .crew-card-${i}:hover .card-bio-${i} {
          max-height: 64px;
          opacity: 1;
        }
        .crew-card-${i}:hover .card-divider-${i} {
          opacity: 1;
        }
        .crew-card-${i}:hover .card-img-${i} {
          transform: scale(1.03) !important;
          opacity: 1 !important;
          filter: grayscale(0%) contrast(1.05) brightness(1.1) !important;
        }
        .crew-card-${i}:hover .card-warm-${i} {
          opacity: 1;
        }
        .crew-card-${i}:hover .card-top-meta-${i} {
          opacity: 0.9;
        }
      `}</style>

      <div className={`crew-card-${i} absolute inset-0`}>
        {/* Photo */}
        <div className="absolute inset-0 overflow-hidden bg-[#08080c]">
          <img
            src={member.img}
            alt={member.name}
            className={`card-img-${i} w-full h-full object-cover will-change-transform`}
            style={{
              transition: "transform 0.8s ease, filter 0.5s ease, opacity 0.5s ease",
              filter: "grayscale(5%) contrast(1.02) brightness(1.02)",
              opacity: 0.88,
            }}
          />
          {/* Subtle gradient overlay to keep text legible while showing the image clearly */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.4) 35%, rgba(8,8,12,0.0) 75%)",
            }}
          />
          <div
            className={`card-warm-${i} absolute inset-0 opacity-0`}
            style={{
              transition: "opacity 0.6s ease",
              background:
                "linear-gradient(160deg, rgba(255,180,60,0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Top badge */}
        <div
          className={`card-top-meta-${i} absolute top-4 left-4 right-4 flex justify-between items-start z-10`}
          style={{ opacity: 0.3, transition: "opacity 0.4s ease" }}
        >
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
              color: "rgba(255,210,120,0.85)",
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "3px 8px",
              borderRadius: "3px",
            }}
          >
            {member.id}
          </span>
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {member.seat} / 07
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <p
            style={{
              fontSize: isMobile ? "8px" : "9px",
              fontFamily: "monospace",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,210,120,0.65)",
              marginBottom: "4px",
            }}
          >
            {member.role}
          </p>
          <h4
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {member.name}
          </h4>

          <div
            className={`card-bio-${i}`}
            style={{
              maxHeight: 0,
              opacity: 0,
              overflow: "hidden",
              transition: "max-height 0.5s ease, opacity 0.5s ease",
            }}
          >
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                fontSize: isMobile ? "11px" : "12px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.38)",
                marginTop: "10px",
              }}
            >
              {member.bio}
            </p>
          </div>

          <div
            className={`card-divider-${i}`}
            style={{
              marginTop: "14px",
              height: "1px",
              background: "linear-gradient(to right, rgba(255,210,120,0.35), transparent)",
              opacity: 0,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const ChallengerMission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardW = isMobile ? 260 : 300;
  const cardGap = isMobile ? 18 : 28;
  const cardStride = cardW + cardGap;
  const totalShift = (N - 1) * cardStride;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 20,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.93]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  const galleryOpacity = useTransform(scrollYProgress, [0.08, 0.17], [0, 1]);
  const galleryX = useTransform(smooth, [0.12, 0.92], [0, -totalShift]);

  const trackWidth = useTransform(smooth, [0.12, 0.92], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? "750vh" : "500vh",
        background: "#020617",
        color: "white",
        position: "relative",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        userSelect: "none",
        overflow: "clip",
      }}
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.size,
              height: s.size,
              top: s.top,
              left: s.left,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, transparent 30%, rgba(2,6,23,0.75) 100%)",
        }}
      />

      {/* Sticky scene */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Corner reticles */}
        <div
          className="absolute pointer-events-none z-20"
          style={{ inset: isMobile ? "1.5rem" : "2.5rem" }}
        >
          {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 ${cls}`}
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            />
          ))}
          <div
            className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 text-[8px] font-mono tracking-widest [writing-mode:vertical-lr]"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            <span>KSC · LC-39B · 28.572°N 80.648°W</span>
            <span>T+00:00:00 · 28 JANUARY 1986</span>
          </div>
          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 text-[8px] font-mono tracking-widest [writing-mode:vertical-lr]"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            <span>MISSION STS-51-L</span>
            <span>VEHICLE OV-099</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            zIndex: 10,
            position: "absolute",
            top: isMobile ? "64px" : "80px",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}
          >
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to right, transparent, rgba(255,210,120,0.35))" }} />
            <span style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(255,210,120,0.5)" }}>
              In Memoriam · STS-51-L
            </span>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to left, transparent, rgba(255,210,120,0.35))" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
            animate={{ opacity: 0.95, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              color: "rgba(255,255,255,0.95)",
              margin: 0,
            }}
          >
            CHALLENGER
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}
          >
            <span style={{ height: "1px", width: "28px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.4em", color: "rgba(255,255,255,0.18)" }}>
              SEVEN WHO DARED
            </span>
            <span style={{ height: "1px", width: "28px", background: "rgba(255,255,255,0.08)" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.35, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            style={{
              marginTop: "32px",
              maxWidth: "440px",
              fontSize: "14px",
              lineHeight: 1.85,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.95)",
              fontFamily: "'Georgia', serif",
            }}
          >
            "They had a hunger to explore the universe and discover its truths.
            They wished, as we all do, to be part of something larger than themselves."
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.95)", marginTop: "8px" }}
          >
            — PRESIDENT REAGAN · JANUARY 28, 1986
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            style={{ marginTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
              Scroll to remember the crew
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }}
            />
          </motion.div>
        </motion.div>

        {/* ── GALLERY ── */}
        <motion.div
          style={{
            opacity: galleryOpacity,
            zIndex: 5,
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              x: galleryX,
              display: "flex",
              gap: `${cardGap}px`,
              willChange: "transform",
              pointerEvents: "auto",
            }}
          >
            {CREW.map((member, i) => (
              <CrewCard 
                key={i} 
                member={member} 
                i={i} 
                cardW={cardW} 
                cardGap={cardGap} 
                isMobile={isMobile} 
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "1.5rem" : "2rem",
            left: isMobile ? "1.5rem" : "2.5rem",
            right: isMobile ? "1.5rem" : "2.5rem",
            zIndex: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            pointerEvents: "none",
          }}
        >
          <div>
            <div style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)", marginBottom: "4px" }}>
              CREW MEMORIAL · STS-51-L
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,210,120,0.5)" }} />
              {isMobile ? "SEVEN SOULS" : "SEVEN SOULS · FOREVER IN OUR HEARTS"}
            </div>
          </div>

          <div style={{ width: "200px", display: "none" }} className="md:block" id="progress-container">
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.15)", marginBottom: "6px" }}>
              <span>SCOBEE</span>
              <span>McAULIFFE</span>
            </div>
            <div style={{ height: "1px", width: "200px", background: "rgba(255,255,255,0.06)", position: "relative" }}>
              <motion.div
                style={{
                  width: trackWidth,
                  height: "100%",
                  background: "rgba(255,210,120,0.45)",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  willChange: "width",
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};