import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req: Request) {
  try {
    // Automatically retrieves credentials parsed from CLOUDINARY_URL
    const config = cloudinary.config();
    const { cloud_name, api_key, api_secret } = config;

    if (!cloud_name || !api_key || !api_secret) {
      return NextResponse.json(
        { error: "Cloudinary configuration is missing or invalid in environment." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { type } = body as { type?: "image" | "video" };

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "tribute_stories";

    const paramsToSign: Record<string, string | number | boolean> = {
      timestamp,
      folder,
    };

    if (type === "video") {
      paramsToSign.eager = "f_mp4,q_auto";
      paramsToSign.eager_async = true;
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      api_secret
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      apiKey: api_key,
      cloudName: cloud_name,
      eager: paramsToSign.eager ?? null,
    });
  } catch (error: any) {
    console.error("[POST /api/cloudinary-signature]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}