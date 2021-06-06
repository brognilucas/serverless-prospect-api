import mongoose from "mongoose";
import { ProspectsEvaluation } from "./dto/ProspectsEvaluation";

export type ProspectEvaluationDocument = mongoose.Document &
  ProspectsEvaluation;

const prospectEvaluationSchema = new mongoose.Schema({
  user: { type: String },
  evaluation: { type: Object },
  propsect: { type: String },
  createdAt: { type: Date, default: Date.now },
});

prospectEvaluationSchema.index({ user: 1 });
prospectEvaluationSchema.index({ prospect: 1 });
prospectEvaluationSchema.index({ user: 1, prospect: 1 });

export const prospectEvaluationModel =
  mongoose.models.prospectEvaluation ||
  mongoose.model<ProspectEvaluationDocument>(
    "prospectEvaluation",
    prospectEvaluationSchema,
    process.env.PROSPECT_EVALUATION_DB || "prospectEvaluation"
  );
