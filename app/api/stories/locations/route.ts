// app/api/stories/locations/route.ts
import { NextResponse } from "next/server";
import { connectDB, Story } from "../../../../lib/db";
import { resolveCoords } from "../../../../lib/geoCoordinates";

export async function GET() {
  try {
    await connectDB();

    const stories = await Story.find(
      { status: "published" },
      { title: 1, name: 1, country: 1, state: 1, mission: 1, narrative: 1, createdAt: 1 }
    ).lean();

    // Group stories by country+state so the map shows one pin per location
    const grouped = new Map<string, {
      country: string;
      state: string;
      coords: [number, number];
      count: number;
      stories: { title: string; name: string; mission: string; narrative: string; createdAt: string }[];
    }>();

    for (const story of stories) {
      const coords = resolveCoords(story.country, story.state);
      if (!coords) continue; // skip stories we can't place yet

      const key = `${story.country}-${story.state || ""}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          country: story.country,
          state: story.state || "",
          coords,
          count: 0,
          stories: [],
        });
      }

      const entry = grouped.get(key)!;
      entry.count += 1;
      // Cap preview stories per pin so the payload stays small
      if (entry.stories.length < 5) {
        entry.stories.push({
          title: story.title,
          name: story.name,
          mission: story.mission,
          narrative: story.narrative,
          createdAt: story.createdAt,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: Array.from(grouped.values()),
    });
  } catch (error: any) {
    console.error("[GET /api/stories/locations]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}