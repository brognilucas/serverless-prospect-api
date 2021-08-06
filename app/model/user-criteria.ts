import mongoose from "mongoose";
import { Criteria } from "./dto/CriteriaDTO";

export type UserCriteriaDocument = mongoose.Document & Criteria

const userCriteria = new mongoose.Schema({
  _id: String,
  type: String,
  criteria: [{
    label: String,
    percentage: Number
  }],
  position: String,
});

userCriteria.index({ _id: 1, position: 1 }, { unique: true })

export const userCriteriaModel =
  mongoose.models.userCriteria ||
  mongoose.model<UserCriteriaDocument>(
    "userCriteria",
    userCriteria,
    process.env.USER_CRITERIA || 'userCriteria'
  );
