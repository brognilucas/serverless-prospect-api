/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from "mongoose";
import { ProspectEvaluationService } from "../service/ProspectEvaluation";
import { prospect as prospectModel } from "../model";
import { IEvent } from "../model/dto/IEvent";
import { MessageUtil } from "../utils/message";

import { ProspectEvaluationDocument } from "../model/prospect-evaluation";
import { ProspectsEvaluation } from "../model/dto/ProspectsEvaluation";
import { createEvaluation } from "../model/evaluations";
import { ProspectService } from "../service/prospect";

export class ProspectEvaluationController extends ProspectEvaluationService {
  constructor(prospectEvaluation: Model<ProspectEvaluationDocument>) {
    super(prospectEvaluation);
  }

  async createController(event: IEvent) {
    const { id } = event.pathParameters;
    const { principalId } = event.requestContext.authorizer;
    const evaluation = JSON.parse(event.body);
    const prospectService = new ProspectService(prospectModel);
    const prospectResult = await prospectService.findById(id);

    if (!prospectResult) return MessageUtil.error(404, "Prospect not found");

    const prospectEvaluation: ProspectsEvaluation = {
      propsect: id,
      evaluation: createEvaluation(prospectResult.position, evaluation),
      user: principalId,
    };

    try {
      const prospectUserEvaluation = await this.findEvaluationByProspectAndUser(
        prospectEvaluation
      );

      if (prospectUserEvaluation) {
        throw "User already created an evaluation to this prospect";
      }

      const result = await this.createEvaluation(prospectEvaluation);

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(500, err);
    }
  }
}
