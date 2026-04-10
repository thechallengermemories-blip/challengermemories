import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  console.log("DB URI:", process.env.MONGODB_URI);
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
};

// Story Schema
const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  title: { type: String, required: true },
  narrative: { type: String, required: true },
  mission: { type: String, enum: ["challenger", "columbia"], required: true },
  imageUrl: { type: String },
  
  // --- NEW FIELDS START HERE ---
  
  // 1. High-level categorization
  category: { 
    type: String, 
    enum: ["public", "heritage"], // heritage = family/friends
    default: "public" 
  },

  // 2. Specific sub-types (The "3 types" logic)
  relation: { 
    type: String, 
    enum: [
      "immediate-family", 
      "friend", 
      "colleague", 
      "public-observer"
    ],
    default: "public-observer"
  },

  // 3. Verification (For that "Verified Relation" badge in the UI)
  isVerified: { 
    type: Boolean, 
    default: false 
  },

  // 4. Featured Status (To pin specific stories to the top "Heritage Gallery")
  isFeatured: { 
    type: Boolean, 
    default: false 
  },

  // 5. Moderation (Essential for public-facing archives)
  status: {
    type: String,
    enum: ["pending", "published", "archived"],
    default: "pending"
  },

  // --- NEW FIELDS END HERE ---

  createdAt: { type: Date, default: Date.now },
});

export const Story = mongoose.models.Story || mongoose.model("Story", storySchema);