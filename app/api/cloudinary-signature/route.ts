// Place at: app/api/stories/route.ts
import { NextResponse } from "next/server";
import { connectDB, Story } from "../../../lib/db";
import { sendStoryAlert } from "@/lib/sendStoryAlert";

const MAX_FILES = 3;

type MediaItem = { url: string; type: "image" | "video" };

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      email,
      title,
      narrative,
      mission,
      category,
      relation,
      country,
      state,
      media,
    } = body as {
      name?: string;
      email?: string;
      title?: string;
      narrative?: string;
      mission?: string;
      category?: string;
      relation?: string;
      country?: string;
      state?: string;
      media?: MediaItem[];
    };

    if (!name || !title || !narrative) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const mediaUrls: MediaItem[] = Array.isArray(media) ? media : [];

    if (mediaUrls.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, error: `Maximum ${MAX_FILES} files allowed.` },
        { status: 400 }
      );
    }

    // Sanity check: since files are now uploaded directly to Cloudinary
    // from the browser before this route is ever called, verify every
    // URL actually points at OUR Cloudinary account before trusting it —
    // otherwise this endpoint could be used to store arbitrary URLs.
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const expectedPrefix = `https://res.cloudinary.com/${cloudName}/`;
    const invalidMedia = mediaUrls.find(
      (m) => !m?.url || !m?.type || !m.url.startsWith(expectedPrefix)
    );
    if (invalidMedia) {
      return NextResponse.json(
        { success: false, error: "Invalid media URL." },
        { status: 400 }
      );
    }

    // Backwards-compatible: keep imageUrl pointing to the first image
    const imageUrl = mediaUrls.find((m) => m.type === "image")?.url ?? "";

    const newStory = await Story.create({
      name,
      email,
      title,
      narrative,
      mission,
      category: category || "public",
      relation: relation || "public-observer",
      country: country || "",
      state: state || "",
      imageUrl,
      media: mediaUrls,
      status: "pending",
    });

    try {
      await sendStoryAlert({
        name: String(name),
        email: String(email || ""),
        title: String(title),
        mission: String(mission),
        narrative: String(narrative),
        media: mediaUrls,
      });
    } catch (emailErr) {
      console.error("[Email alert failed]", emailErr);
    }

    return NextResponse.json({ success: true, data: newStory }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/stories]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─────────────────────────────────────────────
// GET — unchanged
// ─────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const mission = searchParams.get("mission");
    const search  = searchParams.get("search");
    const page    = parseInt(searchParams.get("page") || "1");
    const limit   = 12;
    const skip    = (page - 1) * limit;

    const query: any = { status: "published" };

    if (mission && mission !== "all") {
      query.mission = mission;
    }

    if (search) {
      query.$or = [
        { title:     { $regex: search, $options: "i" } },
        { name:      { $regex: search, $options: "i" } },
        { narrative: { $regex: search, $options: "i" } },
      ];
    }

    const totalStories = await Story.countDocuments(query);
    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: stories,
      totalPages: Math.ceil(totalStories / limit),
      currentPage: page,
    });
  } catch (error: any) {
    console.error("Full error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}