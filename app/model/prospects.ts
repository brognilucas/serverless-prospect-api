import mongoose from "mongoose";
import { Position } from "./dto/PositionsEnum";

export type ProspectDocument = mongoose.Document & {
  name: string;
  id: String;
  description?: string;
  jerseyNumber?: number;
  position: Position;
  college: string;
  size: string;
  weight: string;
  createdAt: Date;
};

const prospectSchema = new mongoose.Schema({
  name: String,
  id: { type: String, index: true, unique: true },
  description: String,
  jerseyNumber: String,
  position: String,
  college: String,
  size: String,
  weight: String,
  active: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export const prospect =
  mongoose.models.prospects ||
  mongoose.model<ProspectDocument>(
    "prospects",
    prospectSchema,
    process.env.PROSPECT_COLLECTION
  );
