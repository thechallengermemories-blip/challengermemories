// app/api/crew/[slug]/route.ts
//
// GET /api/crew/[slug] — returns one crew member's full record
// (including rawBiography and media) for the biography page.

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { CrewMember } from "@/lib/models/CrewMember";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const member = await CrewMember.findOne({ slug }).lean();

    if (!member) {
      return NextResponse.json({ error: "Crew member not found" }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (err) {
    console.error("GET /api/crew/[slug] failed:", err);
    return NextResponse.json(
      { error: "Failed to load crew member" },
      { status: 500 }
    );
  }
}