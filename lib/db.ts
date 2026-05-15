import dns from "dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  if (process.env.NODE_ENV === "development") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }

  console.log("DB URI:", process.env.MONGODB_URI);
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
};

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  title: { type: String, required: true },
  narrative: { type: String, required: true },
  mission: { type: String, enum: ["challenger", "columbia"], required: true },
  imageUrl: { type: String },
  category: { 
    type: String, 
    enum: ["public", "heritage"],
    default: "public" 
  },
  relation: { 
    type: String, 
    enum: ["immediate-family", "friend", "colleague", "public-observer"],
    default: "public-observer"
  },
  isVerified: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "published", "archived"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now },
});

export const Story = mongoose.models.Story || mongoose.model("Story", storySchema);