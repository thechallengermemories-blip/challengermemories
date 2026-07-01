// lib/get-crew.ts
//
// Server-only helpers for reading crew data straight from MongoDB.
// Use these inside Server Components / route handlers instead of having
// a component fetch its own /api/crew endpoint over HTTP — same data,
// no next/headers dependency, no extra network hop.

import "server-only";
import { connectDB } from "@/lib/mongodb";
import { CrewMember } from "@/lib/models/CrewMember";

export interface CrewCardData {
  slug: string;
  name: string;
  role: string;
  crewId: string;
  seat: string;
  img: string;
  shortBio: string;
}

export async function getCrewList(): Promise<CrewCardData[]> {
  try {
    await connectDB();
    const crew = await CrewMember.find({})
      .select("slug name role crewId seat img shortBio")
      .sort({ seat: 1 })
      .lean();

    return crew.map((c: any) => ({
      slug: c.slug,
      name: c.name,
      role: c.role,
      crewId: c.crewId,
      seat: c.seat,
      img: c.img,
      shortBio: c.shortBio,
    }));
  } catch (err) {
    console.error("getCrewList failed:", err);
    return [];
  }
}