import { NextRequest, NextResponse } from "next/server";

const OLA_MAPS_URL = process.env.NEXT_PUBLIC_OLA_MAPS_URL || "https://api.olamaps.io";
const OLA_API_KEY = process.env.NEXT_PUBLIC_OLA_API_KEY!;

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input");

  if (!input || input.trim().length < 2) {
    return NextResponse.json({ predictions: [] });
  }

  try {
    const url = `${OLA_MAPS_URL}/places/v1/autocomplete?input=${encodeURIComponent(
      input
    )}&api_key=${OLA_API_KEY}`;

    const res = await fetch(url, {
      headers: { "X-Request-Id": crypto.randomUUID() },
      // autocomplete results change quickly, never cache
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ predictions: [], error: "Lookup failed" }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json({ predictions: data.predictions ?? [] });
  } catch (err) {
    console.error("Ola autocomplete error:", err);
    return NextResponse.json({ predictions: [], error: "Lookup failed" }, { status: 200 });
  }
}