import mongoose from "mongoose";
import { Combine } from "./dto/CombineDTO";

export type ProspectCombineDocument = mongoose.Document & Combine

const prospectCombineSchema = new mongoose.Schema({
    handSize: { type: String },
    verticalJump: { type: Number },
    benchReps: { type: Number },
    broadJump: { type: String },
    fortyYardsDash: { type: Number },
    threeConeDrill: { type: Number },
    twentyYardsShuttle: { type: Number },
    prospect: { type: String, ref: 'Prospect', required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

prospectCombineSchema.index({ prospect: 1 });

export const prospectCombine =
    mongoose.models.prospectsCombine ||
    mongoose.model<ProspectCombineDocument>(
        "prospectsCombine",
        prospectCombineSchema,
        process.env.PROSPECTS_COMBINE || 'prospectsCombine'
    );
