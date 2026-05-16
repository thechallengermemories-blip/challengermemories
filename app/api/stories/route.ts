import { NextResponse } from "next/server";
import { connectDB, Story } from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import { sendStoryAlert } from "@/lib/sendStoryAlert";


// ─────────────────────────────────────────────
// CONFIG — keep in sync with StoryForm.tsx
// ─────────────────────────────────────────────
const UPLOAD_CONFIG = {
  maxFiles: 3,
  maxImageSizeMB: 10,
  maxVideoSizeMB: 10,
  cloudinaryFolder: "tribute_stories",
};

// ─────────────────────────────────────────────
// Helper: upload a single buffer to Cloudinary
// ─────────────────────────────────────────────
async function uploadToCloudinary(
  buffer: Buffer,
  mediaType: "image" | "video"
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: UPLOAD_CONFIG.cloudinaryFolder,
          resource_type: mediaType,
          ...(mediaType === "video" && {
            eager: [{ format: "mp4", quality: "auto" }],
            eager_async: true,
          }),
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed"));
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}

// ─────────────────────────────────────────────
// Server-side size validation
// ─────────────────────────────────────────────
function validateFileSize(file: File, type: "image" | "video"): string | null {
  const limitMB = type === "video" ? UPLOAD_CONFIG.maxVideoSizeMB : UPLOAD_CONFIG.maxImageSizeMB;
  if (file.size > limitMB * 1024 * 1024) {
    return `${type === "video" ? "Video" : "Image"} "${file.name}" exceeds the ${limitMB} MB limit.`;
  }
  return null;
}

// ─────────────────────────────────────────────
// POST
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const name      = formData.get("name");
    const email     = formData.get("email");
    const title     = formData.get("title");
    const narrative = formData.get("narrative");
    const mission   = formData.get("mission");
    const category  = (formData.get("category") as string) || "public";
    const relation  = (formData.get("relation") as string) || "public-observer";

    // ── Multi-file media upload ──
    const mediaCount = parseInt((formData.get("media_count") as string) || "0", 10);

    if (mediaCount > UPLOAD_CONFIG.maxFiles) {
      return NextResponse.json(
        { success: false, error: `Maximum ${UPLOAD_CONFIG.maxFiles} files allowed.` },
        { status: 400 }
      );
    }

    const mediaUrls: { url: string; type: "image" | "video" }[] = [];

    for (let i = 0; i < mediaCount; i++) {
      const file = formData.get(`media_${i}`) as File | null;
      const type = (formData.get(`media_${i}_type`) as "image" | "video") || "image";

      if (!file || file.size === 0) continue;

      const sizeError = validateFileSize(file, type);
      if (sizeError) {
        return NextResponse.json({ success: false, error: sizeError }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToCloudinary(buffer, type);
      mediaUrls.push({ url, type });
    }

    // Backwards-compatible: keep imageUrl pointing to the first image
    const imageUrl = mediaUrls.find((m) => m.type === "image")?.url ?? "";

    const newStory = await Story.create({
      name,
      email,
      title,
      narrative,
      mission,
      category,
      relation,
      imageUrl,
      media: mediaUrls,
      status: "pending", // ← always pending, admin must approve
    });
     // Pass mediaUrls directly — already built earlier in the route
    sendStoryAlert({
      name:      String(name),
      email:     String(email || ""),
      title:     String(title),
      mission:   String(mission),
      narrative: String(narrative),
      media:     mediaUrls,          // ← { url, type }[] from Cloudinary
    }).catch((err) => console.error("[Email alert failed]", err));

    return NextResponse.json({ success: true, data: newStory }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/stories]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─────────────────────────────────────────────
// GET
// ─────────────────────────────────────────────
export async function GET(req: Request) {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
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
      .sort({ category: 1, createdAt: -1 }) // 'heritage' (H) before 'public' (P)
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