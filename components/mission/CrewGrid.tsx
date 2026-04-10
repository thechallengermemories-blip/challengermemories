"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CrewGridProps {
  mission: 'challenger' | 'columbia';
}

const CREW_DATA = {
  challenger: [
    {
      name: "Francis R. Scobee",
      role: "Commander",
      image: "https://imgs.search.brave.com/RfOTrlOq28gVswBDrdbeZGv-by6jvTvE63YwTXvbUEc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQyL1Nj/b2JlZS1mci5qcGcv/NTEycHgtU2NvYmVl/LWZyLmpwZw",
      bio: "Air Force pilot and veteran of STS-41-C."
    },
    {
      name: "Michael J. Smith",
      role: "Pilot",
      image: "https://imgs.search.brave.com/pRRopRtuY22Anb1JOCv5Rl0wtZjz-qhPx0cvcolFXFw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E4L01p/Y2hhZWxfU21pdGhf/JTI4TkFTQSUyOS5q/cGcvNTEycHgtTWlj/aGFlbF9TbWl0aF8l/MjhOQVNBJTI5Lmpw/Zw",
      bio: "Navy captain and experienced test pilot."
    },
    {
      name: "Ronald McNair",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/Uu1LsOYoa46dkfWKACPTJZqHHmkQ6fMmDNoniCQ5syw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8wLzA4L1Jv/bmFsZF9Fcndpbl9N/Y05haXIuanBnLzUx/MnB4LVJvbmFsZF9F/cndpbl9NY05haXIu/anBn",
      bio: "Physicist and accomplished saxophonist."
    },
    {
      name: "Ellison Onizuka",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/xH0DjyD7vmoiZDyWJBJRw5Zy_Ra_FgpH7CfirUnAaO4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NlL0Vs/bGlzb25fU2hvamlf/T25penVrYV8lMjhO/QVNBJTI5LmpwZy81/MTJweC1FbGxpc29u/X1Nob2ppX09uaXp1/a2FfJTI4TkFTQSUy/OS5qcGc",
      bio: "The first Asian American in space."
    },
    {
      name: "Judith Resnik",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/mj5OB9O8K7DQzk7V9C8_2epklc9mAktlXUAaosUXoxw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzFmL0p1/ZGl0aF9BLl9SZXNu/aWslMkNfb2ZmaWNp/YWxfcG9ydHJhaXRf/JTI4Y3JvcHBlZCUy/OS5qcGcvNTEycHgt/SnVkaXRoX0EuX1Jl/c25payUyQ19vZmZp/Y2lhbF9wb3J0cmFp/dF8lMjhjcm9wcGVk/JTI5LmpwZw",
      bio: "Electrical engineer and second American woman in space."
    },
    {
      name: "Gregory Jarvis",
      role: "Payload Specialist",
      image: "https://imgs.search.brave.com/9BQgyxhX26_SO6u3408lkfwIHeL92g7RtdtXCA-qSuE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzEzL0dy/ZWdvcnlfSmFydmlz/XyUyOE5BU0ElMjlf/Y3JvcHBlZC5qcGcv/NTEycHgtR3JlZ29y/eV9KYXJ2aXNfJTI4/TkFTQSUyOV9jcm9w/cGVkLmpwZw",
      bio: "Engineer specialized in satellite design."
    },
    {
      name: "Christa McAuliffe",
      role: "Teacher in Space",
      image: "https://imgs.search.brave.com/_kRTkHEDsi8-ds3nGq5v4fME5bVlniMeaWeW_GssGL4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9lL2UxL0No/cmlzdGFNY0F1bGlm/ZmVfJTI4Y3JvcHBl/ZCUyOS5qcGcvNTEy/cHgtQ2hyaXN0YU1j/QXVsaWZmZV8lMjhj/cm9wcGVkJTI5Lmpw/Zw",
      bio: "Chosen from 11,000 to be the first teacher in space."
    }
  ],

  columbia: [
    {
      name: "Rick Husband",
      role: "Commander",
      image: "https://imgs.search.brave.com/T0q3EqkiZEpcQaqK64A87KJyeuo28Emcu8VVE5W0jEs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzIwL1Jp/Y2hhcmRfSHVzYmFu/ZCUyQ19OQVNBX3Bo/b3RvX3BvcnRyYWl0/X2luX29yYW5nZV9z/dWl0LmpwZy81MTJw/eC1SaWNoYXJkX0h1/c2JhbmQlMkNfTkFT/QV9waG90b19wb3J0/cmFpdF9pbl9vcmFu/Z2Vfc3VpdC5qcGc",
      bio: "Air Force colonel and mechanical engineer."
    },
    {
      name: "William C. McCool",
      role: "Pilot",
      image: "https://imgs.search.brave.com/cpE6oLYLpRHqvKFuu7mNV1sCS4W6kjZFRYc5pc6FRvs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2M1L1dp/bGxpYW1fQ2FtZXJv/bl9NY0Nvb2wuanBn/LzUxMnB4LVdpbGxp/YW1fQ2FtZXJvbl9N/Y0Nvb2wuanBn",
      bio: "Navy commander and test pilot."
    },
    {
      name: "Michael P. Anderson",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/pyhBMexn7iIi_8iH_CFgqQABudQ0cQY9bRRpZMH2AjQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi81LzU5L01p/Y2hhZWxfUC5fQW5k/ZXJzb24lMkNfb2Zm/aWNpYWxfcG9ydHJh/aXQuanBnLzUxMnB4/LU1pY2hhZWxfUC5f/QW5kZXJzb24lMkNf/b2ZmaWNpYWxfcG9y/dHJhaXQuanBn",
      bio: "Payload commander in charge of science experiments."
    },
    {
      name: "David M. Brown",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/lkGjkElx0LxDA2_d7FUfpKdsRGey2vA84OxYjyhkpYI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zcGVj/aWFsdHlwaHlzaWNp/YW5hc3NvY2lhdGVz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wMy9EYXZp/ZC1NLi1Ccm93bi1N/RC0xLnBuZw",
      bio: "Captain, flight surgeon, and circus performer."
    },
    {
      name: "Kalpana Chawla",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/vHgEsCsErp7CuafRIfiSnYa22D3YakwJzQw7aswew6U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85LzljL0th/bHBhbmFfQ2hhd2xh/JTJDX05BU0FfcGhv/dG9fcG9ydHJhaXRf/aW5fb3JhbmdlX3N1/aXQuanBnLzUxMnB4/LUthbHBhbmFfQ2hh/d2xhJTJDX05BU0Ff/cGhvdG9fcG9ydHJh/aXRfaW5fb3Jhbmdl/X3N1aXQuanBn",
      bio: "The first woman of Indian origin to go to space."
    },
    {
      name: "Laurel Clark",
      role: "Mission Specialist",
      image: "https://imgs.search.brave.com/NTY5kvO7R23fjIvCv8wnb1HB4FLq_LeHQvtDQSOxGvQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzI0L0xh/dXJlbF9DbGFyayUy/Q19OQVNBX3Bob3Rv/X3BvcnRyYWl0X2lu/X2JsdWVfc3VpdC5q/cGcvNTEycHgtTGF1/cmVsX0NsYXJrJTJD/X05BU0FfcGhvdG9f/cG9ydHJhaXRfaW5f/Ymx1ZV9zdWl0Lmpw/Zw",
      bio: "Medical doctor and flight surgeon."
    },
    {
      name: "Ilan Ramon",
      role: "Payload Specialist",
      image: "https://imgs.search.brave.com/jTAE-fgWbV3AQ1j8yKsxnIZ51eSVyIp8_cmHa1eHB5E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQ4L0ls/YW5fUmFtb24lMkNf/TkFTQV9waG90b19w/b3J0cmFpdF9pbl9v/cmFuZ2Vfc3VpdC5q/cGcvNTEycHgtSWxh/bl9SYW1vbiUyQ19O/QVNBX3Bob3RvX3Bv/cnRyYWl0X2luX29y/YW5nZV9zdWl0Lmpw/Zw",
      bio: "The first Israeli astronaut."
    }
  ]
};

const CrewGrid = ({ mission }: CrewGridProps) => {
  const crew = CREW_DATA[mission];

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
          {crew.map((member) => (
            <motion.div 
              key={member.name} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-500 group-hover:border-sky-500/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                    {member.role}
                  </p>
                  <h3 className="text-xl font-serif text-white mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CrewGrid;