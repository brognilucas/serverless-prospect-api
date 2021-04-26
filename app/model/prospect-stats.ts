import mongoose from "mongoose";
import { ProspectStats } from "./dto/ProspectsStatsDTO";

export type ProspectStatsDocument = mongoose.Document & ProspectStats

const prospectStatsSchema = new mongoose.Schema({
    id: { type: String, index: true, unique: true },
    year: { type: Number, required: true },
    type: { type: String },
    prospect: { type: String, ref: 'Prospect' },
    stats: { type: Object },
    createdAt: { type: Date, default: Date.now },
});

prospectStatsSchema.index({ type: 1, prospect: 1 });
prospectStatsSchema.index({ prospect: 1, year: 1 }, { unique: true });
prospectStatsSchema.index({ type: 1, prospect: 1, year: 1 }, { unique: true });

export const prospectStats =
    mongoose.models.prospectsStats ||
    mongoose.model<ProspectStatsDocument>(
        "prospectsStats",
        prospectStatsSchema,
        process.env.PROSPECT_STATS
    );
