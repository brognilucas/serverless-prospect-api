import mongoose from "mongoose";
import { ProspectsEvaluation } from "./dto/ProspectsEvaluation";

export type ProspectEvaluationDocument = mongoose.Document &
  ProspectsEvaluation;

const prospectEvaluationSchema = new mongoose.Schema({
  user: { type: ProspectsEvaluation.prototype.user },
  evaluation: { type: ProspectsEvaluation.prototype.evaluation },
  propsect: { type: ProspectsEvaluation.prototype.propsect },
  createdAt: { type: Date, default: Date.now },
});

prospectEvaluationSchema.index({ username: 1 });
prospectEvaluationSchema.index({ email: 1 });
prospectEvaluationSchema.index({ email: 1, username: 1 });

export const userModel =
  mongoose.models.users ||
  mongoose.model<ProspectEvaluationDocument>(
    "prospectEvaluation",
    prospectEvaluationSchema,
    process.env.PROSPECT_EVALUATION_DB || "prospectEvaluation"
  );
