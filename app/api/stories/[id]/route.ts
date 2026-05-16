import { NextResponse } from "next/server";
import { connectDB, Story } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Explicitly select media + imageUrl so the field is never stripped,
    // even if the Mongoose schema definition lags behind the new shape.
    const story = await Story.findById(id).select(
      "name email title narrative mission category relation imageUrl media status createdAt"
    );

    if (!story) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    // Related: same mission + category, exclude self, published only
    let related = await Story.find({
      mission: story.mission,
      category: story.category,
      _id: { $ne: story._id },
      status: "published",
    })
      .select("name title mission category imageUrl media createdAt")
      .sort({ createdAt: -1 })
      .limit(3);

    // Fallback: any other published story if nothing matches
    if (related.length === 0) {
      related = await Story.find({
        _id: { $ne: story._id },
        status: "published",
      })
        .select("name title mission category imageUrl media createdAt")
        .sort({ createdAt: -1 })
        .limit(3);
    }

    return NextResponse.json({
      success: true,
      data: story,
      related,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}