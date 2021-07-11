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
      prospect: id,
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

  async findEvaluationProspectByUserController(event: IEvent) {
    const { id } = event.pathParameters;
    const { principalId: user } = event.requestContext.authorizer;
    try {
      const prospectService = new ProspectService(prospectModel);
      const prospectResult = await prospectService.findById(id);

      if (!prospectResult) return MessageUtil.error(404, "Prospect not found");

      const evaluations = await this.findEvaluationByProspectAndUser({ prospect: id, user });
      return MessageUtil.success(evaluations || {});
    } catch (error) {
      return MessageUtil.error(500, error);
    }
  }

  async findEvaluationsProspectController(event: IEvent) {
    const { id } = event.pathParameters;
    try {
      const prospectService = new ProspectService(prospectModel);
      const prospectResult = await prospectService.findById(id);

      if (!prospectResult) return MessageUtil.error(404, "Prospect not found");

      const evaluations = await this.findEvaluationProspect(id);
      return MessageUtil.success(evaluations);
    } catch (err) {
      return MessageUtil.error(500, err);
    }
  }

  async removeEvaluationProspect(event: IEvent) {
    const { id } = event.pathParameters;
    const { principalId: user } = event.requestContext.authorizer;

    try {
      const prospectService = new ProspectService(prospectModel);
      const prospectResult = await prospectService.findById(id);

      if (!prospectResult) return MessageUtil.error(404, "Prospect not found");

      await this.removeEvaluation(id, user);
      return MessageUtil.successNoContent();
    } catch (err) {
      return MessageUtil.error(400, err);
    }
  }

  async patchUpdateEvaluation(event: IEvent){
    const { id } = event.pathParameters;
    const { principalId: user } = event.requestContext.authorizer;
    const userEvaluation = JSON.parse(event.body);
    try {
      if (userEvaluation.overall){
        throw 'Overall must be calculated';   
      }

      const prospectService = new ProspectService(prospectModel);
      const [prospectResult, evaluationUser] = await Promise.all([
          prospectService.findById(id),
          this.findEvaluationByProspectAndUser({prospect: id, user})
        ]);

      if (!prospectResult) return MessageUtil.error(404, "Prospect not found");
      if (!evaluationUser) return MessageUtil.error(404, "User doesnt have an evaluation for this prospect");

      const evaluation = createEvaluation(prospectResult.position, {
        ...evaluationUser.evaluation,
        ...userEvaluation
      }); 
      
      await this.patchUpdate(id, user, evaluation);
      return MessageUtil.success(evaluation);
    } catch (err) {
      return MessageUtil.error(400, err);
    }
  }
}
