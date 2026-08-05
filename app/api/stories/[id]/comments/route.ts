import { NextResponse } from "next/server";
import { connectDB, Story } from "@/lib/db"; // Ensure the path to your db file is correct

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, email, text } = body;

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: "Name and comment text are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            name: name.trim(),
            email: email?.trim() || "",
            text: text.trim(),
            status: "pending", // Always pending until admin approves
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!updatedStory) {
      return NextResponse.json(
        { error: "Story not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comment added for admin review." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}