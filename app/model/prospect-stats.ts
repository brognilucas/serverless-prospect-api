import mongoose from "mongoose";
import { ProspectStats } from "./dto/ProspectsStatsDTO";

export type ProspectStatsDocument = mongoose.Document & ProspectStats

const prospectStatsSchema = new mongoose.Schema({
    id: { type: String, index: true, unique: true },
    year: {type: Number, required: true },
    type: {type: String },
    prospect: { type: String , ref: 'Prospect' },
    stats: { type: Object },
    createdAt: { type: Date, default: Date.now },
});

export const prospectStats =
    mongoose.models.prospectsStats ||
    mongoose.model<ProspectStatsDocument>(
        "prospectsStats",
        prospectStatsSchema,
        process.env.PROSPECT_STATS
    );
