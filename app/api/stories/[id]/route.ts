import { NextResponse } from "next/server";
import { connectDB, Story } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const story = await Story.findById(id);
    if (!story) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    // Smart "Related Stories" logic:
    // 1. Same mission
    // 2. Same category (if heritage, show heritage)
    // 3. Exclude current story
    const related = await Story.find({
      mission: story.mission,
      category: story.category,
      _id: { $ne: story._id },
      status: 'published'
    })
    .sort({ createdAt: -1 })
    .limit(3);

    return NextResponse.json({ 
      success: true, 
      data: story, 
      related: related.length > 0 ? related : await Story.find({ _id: { $ne: story._id } }).limit(3) 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}