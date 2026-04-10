import { NextResponse } from "next/server";
import { connectDB, Story } from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    const name = formData.get("name");
    const email = formData.get("email");
    const title = formData.get("title");
    const narrative = formData.get("narrative");
    const mission = formData.get("mission");
    const category = formData.get("category") || "public"; // 'public' or 'heritage'
    const relation = formData.get("relation") || "public-observer"; 
    const file = formData.get("image") as File | null;

    let imageUrl = "";

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const uploadResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "tribute_stories" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newStory = await Story.create({
      name,
      email,
      title,
      narrative,
      mission,
      category,
      relation,
      imageUrl,
      status: category === 'heritage' ? 'pending' : 'published', // Review family stories first
    });

    return NextResponse.json({ success: true, data: newStory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    const mission = searchParams.get("mission");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const skip = (page - 1) * limit;

    let query: any = { status: 'published' }; // Only show approved stories

    if (mission && mission !== 'all') {
      query.mission = mission;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { narrative: { $regex: search, $options: "i" } }
      ];
    }

    // If no search is active, we can return the stories
    // The frontend will handle splitting them into Heritage vs Public
    const totalStories = await Story.countDocuments(query);
    const stories = await Story.find(query)
      .sort({ category: 1, createdAt: -1 }) // Puts 'heritage' (H) before 'public' (P)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ 
      success: true, 
      data: stories,
      totalPages: Math.ceil(totalStories / limit),
      currentPage: page
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}