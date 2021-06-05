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
      .find({ propsect: evaluation.propsect, user: evaluation.user })
      .lean();
  }
}
