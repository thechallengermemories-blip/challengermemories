"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const CHALLENGER_CREW =

[
    {
      name: "Francis R. Scobee",
      role: "Commander",
      image: "https://imgs.search.brave.com/RfOTrlOq28gVswBDrdbeZGv-by6jvTvE63YwTXvbUEc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQyL1Nj/b2JlZS1mci5qcGcv/NTEycHgtU2NvYmVl/LWZyLmpwZw",
      bio: "Air Force pilot and veteran of STS-41-C.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/scobee_francis.pdf"
    },
    {
      name: "Michael J. Smith",
      role: "Pilot",
      image: "https://imgs.search.brave.com/pRRopRtuY22Anb1JOCv5Rl0wtZjz-qhPx0cvcolFXFw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E4L01p/Y2hhZWxfU21pdGhf/JTI4TkFTQSUyOS5q/cGcvNTEycHgtTWlj/aGFlbF9TbWl0aF8l/MjhOQVNBJTI5Lmpw/Zw",
      bio: "Navy captain and experienced test pilot.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/smith_michael.pdf"
    },
    {
      name: "Ronald McNair",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/Uu1LsOYoa46dkfWKACPTJZqHHmkQ6fMmDNoniCQ5syw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8wLzA4L1Jv/bmFsZF9Fcndpbl9N/Y05haXIuanBnLzUx/MnB4LVJvbmFsZF9F/cndpbl9NY05haXIu/anBn",
      bio: "Physicist and accomplished saxophonist.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/mcnair_ronald.pdf"
    },
    {
      name: "Ellison Onizuka",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/xH0DjyD7vmoiZDyWJBJRw5Zy_Ra_FgpH7CfirUnAaO4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NlL0Vs/bGlzb25fU2hvamlf/T25penVrYV8lMjhO/QVNBJTI5LmpwZy81/MTJweC1FbGxpc29u/X1Nob2ppX09uaXp1/a2FfJTI4TkFTQSUy/OS5qcGc",
      bio: "The first Asian American in space.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/onizuka_ellison.pdf"
    },
    {
      name: "Judith Resnik",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/mj5OB9O8K7DQzk7V9C8_2epklc9mAktlXUAaosUXoxw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzFmL0p1/ZGl0aF9BLl9SZXNu/aWslMkNfb2ZmaWNp/YWxfcG9ydHJhaXRf/JTI4Y3JvcHBlZCUy/OS5qcGcvNTEycHgt/SnVkaXRoX0EuX1Jl/c25payUyQ19vZmZp/Y2lhbF9wb3J0cmFp/dF8lMjhjcm9wcGVk/JTI5LmpwZw",
      bio: "Electrical engineer and second American woman in space.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/resnik_judith_with_photo_0.pdf"
    },
    {
      name: "Gregory Jarvis",
      role: "Payload Specialist",
      image: "https://imgs.search.brave.com/9BQgyxhX26_SO6u3408lkfwIHeL92g7RtdtXCA-qSuE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzEzL0dy/ZWdvcnlfSmFydmlz/XyUyOE5BU0ElMjlf/Y3JvcHBlZC5qcGcv/NTEycHgtR3JlZ29y/eV9KYXJ2aXNfJTI4/TkFTQSUyOV9jcm9w/cGVkLmpwZw",
      bio: "Engineer specialized in satellite design.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/jarvis.pdf"
    },
    {
      name: "Christa McAuliffe",
      role: "Teacher in Space",
      image: "https://imgs.search.brave.com/_kRTkHEDsi8-ds3nGq5v4fME5bVlniMeaWeW_GssGL4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9lL2UxL0No/cmlzdGFNY0F1bGlm/ZmVfJTI4Y3JvcHBl/ZCUyOS5qcGcvNTEy/cHgtQ2hyaXN0YU1j/QXVsaWZmZV8lMjhj/cm9wcGVkJTI5Lmpw/Zw",
      bio: "Chosen from 11,000 to be the first teacher in space.",
      bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/mcauliffe.pdf"
    }
  ]

const CrewGrid = () => {
  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">The Crew</h2>
          <div className="w-20 h-1 bg-sky-500/50 mx-auto rounded-full" />
        </div>

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
          {CHALLENGER_CREW.map((member) => (
            <motion.div 
              key={member.name} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group relative"
            >
              <a 
                href={member.bioUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Top Right External Link Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-sky-500 p-2 rounded-full shadow-lg">
                    <ExternalLink size={14} className="text-white" />
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
                      {member.bio}
                    </p>
                    <span className="text-sky-400 text-[9px] font-bold uppercase tracking-widest border-b border-sky-400/30 pb-1">
                        View Biography
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CrewGrid;