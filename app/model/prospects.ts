import mongoose from "mongoose";
import { Position } from "../utils/enums/PositionsEnum";

export type ProspectDocument = mongoose.Document & {
  name: string;
  id: string;
  description?: string;
  jerseyNumber?: number;
  position: Position;
  college: string;
  size: string;
  weight: string;
  imageURL: string;
  draftYear: number;
  createdAt: Date;
};

const prospectSchema = new mongoose.Schema({
  name: String,
  id: { type: String, index: true, unique: true },
  description: String,
  jerseyNumber: String,
  position: String,
  college: String,
  draftYear: Number,
  size: String,
  weight: String,
  active: Boolean,
  imageURL: String,
  createdAt: { type: Date, default: Date.now },
});

prospectSchema.index({ id: 1 }, { unique: true });
prospectSchema.index({ name: 1, position: 1, college: 1, draftYear: 1 }, { unique: true });

export const prospect =
  mongoose.models.prospects ||
  mongoose.model<ProspectDocument>(
    "prospects",
    prospectSchema,
    process.env.PROSPECT_COLLECTION
  );
