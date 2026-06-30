import { NextRequest, NextResponse } from "next/server";

const OLA_MAPS_URL = process.env.NEXT_PUBLIC_OLA_MAPS_URL || "https://api.olamaps.io";
const OLA_API_KEY = process.env.NEXT_PUBLIC_OLA_API_KEY!;

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

function extractCountryState(components: AddressComponent[] = []) {
  const country = components.find((c) => c.types?.includes("country"))?.long_name ?? "";
  const state =
    components.find((c) => c.types?.includes("administrative_area_level_1"))?.long_name ?? "";
  return { country, state };
}

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get("place_id");

  if (!placeId) {
    return NextResponse.json({ error: "place_id is required" }, { status: 400 });
  }

  try {
    const url = `${OLA_MAPS_URL}/places/v1/details?place_id=${encodeURIComponent(
      placeId
    )}&api_key=${OLA_API_KEY}`;

    const res = await fetch(url, {
      headers: { "X-Request-Id": crypto.randomUUID() },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ country: "", state: "" }, { status: 200 });
    }

    const data = await res.json();
    const components: AddressComponent[] = data.result?.address_components ?? [];
    const { country, state } = extractCountryState(components);

    // Fallback: if Ola doesn't return structured components for this place,
    // try to infer from the formatted address (last two comma-separated segments).
    if (!country && data.result?.formatted_address) {
      const parts = String(data.result.formatted_address)
        .split(",")
        .map((p: string) => p.trim())
        .filter(Boolean);
      return NextResponse.json({
        country: parts[parts.length - 1] ?? "",
        state: parts[parts.length - 2] ?? "",
      });
    }

    return NextResponse.json({ country, state });
  } catch (err) {
    console.error("Ola place details error:", err);
    return NextResponse.json({ country: "", state: "" }, { status: 200 });
  }
}