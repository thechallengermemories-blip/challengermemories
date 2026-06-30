// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { connectDB, Story } from "../../../lib/db";

export async function GET() {
  try {
    await connectDB();

    const query = { status: "published" };

    const [memoriesCount, states, countries] = await Promise.all([
      Story.countDocuments(query),
      Story.distinct("state", { ...query, state: { $nin: [null, ""] } }),
      Story.distinct("country", { ...query, country: { $nin: [null, ""] } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        memoriesCount,
        statesCount: states.length,
        countriesCount: countries.length,
      },
    });
  } catch (error: any) {
    console.error("[GET /api/stats]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}