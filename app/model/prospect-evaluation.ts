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

prospectEvaluationSchema.index({ username: 1 });
prospectEvaluationSchema.index({ email: 1 });
prospectEvaluationSchema.index({ email: 1, username: 1 });

export const prospectEvaluationModel =
  mongoose.models.prospectEvaluation ||
  mongoose.model<ProspectEvaluationDocument>(
    "prospectEvaluation",
    prospectEvaluationSchema,
    process.env.PROSPECT_EVALUATION_DB || "prospectEvaluation"
  );
