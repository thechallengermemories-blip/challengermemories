import { NextResponse } from "next/server";
import { connectDB, Story } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Select all fields including comments and convert to plain JS object using .lean()
    const story = await Story.findById(id)
      .select(
        "name email title narrative mission category relation imageUrl media comments status createdAt"
      )
      .lean();

    if (!story) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    // Filter comments so only "approved" comments are sent in the response
    const approvedComments = (story.comments || []).filter(
      (comment: any) => comment.status === "approved"
    );

    const storyData = {
      ...story,
      comments: approvedComments,
    };

    // Related: same mission + category, exclude self, published only
    let related = await Story.find({
      mission: story.mission,
      category: story.category,
      _id: { $ne: story._id },
      status: "published",
    })
      .select("name title mission category imageUrl media createdAt")
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // Fallback: any other published story if nothing matches
    if (related.length === 0) {
      related = await Story.find({
        _id: { $ne: story._id },
        status: "published",
      })
        .select("name title mission category imageUrl media createdAt")
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
    }

    return NextResponse.json({
      success: true,
      data: storyData,
      related,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}