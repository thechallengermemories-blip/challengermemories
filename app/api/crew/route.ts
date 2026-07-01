// app/api/crew/route.ts
//
// GET /api/crew — returns all crew members, ordered by seat.
// Used for the prev/next navigation strip on the biography page.

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { CrewMember } from "@/lib/models/CrewMember";

export async function GET() {
  try {
    await connectDB();

    const crew = await CrewMember.find({})
      .select("slug name role crewId seat img shortBio")
      .sort({ seat: 1 })
      .lean();

    return NextResponse.json({ crew });
  } catch (err) {
    console.error("GET /api/crew failed:", err);
    return NextResponse.json(
      { error: "Failed to load crew list" },
      { status: 500 }
    );
  }
}