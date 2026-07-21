// Place at: app/api/cloudinary-signature/route.ts
import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

// This endpoint's ONLY job is to hand the browser a short-lived,
// signed authorization to upload directly to Cloudinary.
// No file ever passes through this route or through Vercel's function body,
// so the 4.5MB FUNCTION_PAYLOAD_TOO_LARGE limit no longer applies to uploads.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type } = body as { type?: "image" | "video" };

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "tribute_stories";

    // Every param the browser will send (other than file/api_key/signature)
    // must be included here, or Cloudinary will reject the signature.
    const paramsToSign: Record<string, string | number | boolean> = {
      timestamp,
      folder,
    };

    // Keep the same "transcode videos to mp4" behavior the old server-side
    // upload had, via an eager transformation.
    if (type === "video") {
      paramsToSign.eager = "f_mp4,q_auto";
      paramsToSign.eager_async = true;
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      eager: paramsToSign.eager ?? null,
    });
  } catch (error: any) {
    console.error("[POST /api/cloudinary-signature]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}