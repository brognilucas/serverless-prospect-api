import { ProspectEvaluationDocument } from "app/model";
import { ProspectsEvaluation } from "app/model/dto/ProspectsEvaluation";
import { Model } from "mongoose";

export class ProspectEvaluationService {
  private prospectEvaluation: Model<ProspectEvaluationDocument>;

  constructor(model: Model<ProspectEvaluationDocument>) {
    this.prospectEvaluation = model;
  }

  async createEvaluation(
    evaluation: ProspectsEvaluation
  ): Promise<ProspectEvaluationDocument> {
    return this.prospectEvaluation.create(evaluation);
  }

  async findEvaluationByProspectAndUser(
    evaluation: ProspectsEvaluation
  ): Promise<ProspectEvaluationDocument> {
    return this.prospectEvaluation
      .findOne({ prospect: evaluation.prospect, user: evaluation.user })
      .lean();
  }

  async removeEvaluation(prospect: string, user: string): Promise<unknown> {
    return this.prospectEvaluation
      .deleteOne({ prospect, user })
      .lean();
  }

  async patchUpdate(prospect: string, user: string, evaluation: ProspectEvaluationDocument['evaluation']): Promise<ProspectEvaluationDocument>{
    return this.prospectEvaluation
    .findOneAndUpdate(
      { prospect, user }, 
      {$set: {
        evaluation
      }}
      )
    .lean();
  }

  async findEvaluationProspect(prospect: string): Promise<ProspectEvaluationDocument[]> {
    return this.prospectEvaluation
      .find({ prospect })
      .lean();
  }
}
