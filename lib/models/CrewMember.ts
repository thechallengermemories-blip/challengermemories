// lib/models/CrewMember.ts
//
// Mongoose schema/model matching the CrewMember shape in lib/crew-data.ts.
// Import { CrewMember } from "@/lib/models/CrewMember" wherever you need
// to read/write crew documents once they're in MongoDB.

import mongoose, { Schema, model, models, Document } from "mongoose";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
  embed?: boolean;
}

export interface ICrewMember extends Document {
  slug: string;
  name: string;
  fullTitle: string;
  role: string;
  crewId: string; // "id" is reserved by Mongoose/Mongo, stored as crewId
  seat: string;
  img: string;
  shortBio: string;
  rawBiography: string;
  media: MediaItem[];
}

const MediaItemSchema = new Schema<MediaItem>(
  {
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    caption: { type: String },
    embed: { type: Boolean },
  },
  { _id: false }
);

const CrewMemberSchema = new Schema<ICrewMember>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    fullTitle: { type: String, required: true },
    role: { type: String, required: true },
    crewId: { type: String, required: true },
    seat: { type: String, required: true },
    img: { type: String, required: true },
    shortBio: { type: String, required: true },
    rawBiography: { type: String, default: "" },
    media: { type: [MediaItemSchema], default: [] },
  },
  { timestamps: true }
);

// Prevents "OverwriteModelError" during Next.js hot-reload.
export const CrewMember =
  (models.CrewMember as mongoose.Model<ICrewMember>) ||
  model<ICrewMember>("CrewMember", CrewMemberSchema);