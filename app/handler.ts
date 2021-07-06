import { Handler } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";

const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

import {
  prospect,
  prospectStats as prospectStatsModel,
  prospectCombine,
  userModel,
  prospectEvaluationModel,
} from "./model";
import { ProspectController } from "./controller/prospects";
import { ProspectStatsController } from "./controller/ProspectStats";
import { ProspectCombineController } from "./controller/ProspectCombine";
import { IEvent } from "./model/dto/IEvent";
import { UserController } from "./controller/User";
import { Authorization } from "./service/Authorization";
import { ProspectEvaluationController } from "./controller/ProspectEvaluation";

const prospectController = new ProspectController(prospect);
const prospectStats = new ProspectStatsController(prospectStatsModel);
const prospectCombineController = new ProspectCombineController(
  prospectCombine
);
const userController = new UserController(userModel);
const evaluationController = new ProspectEvaluationController(
  prospectEvaluationModel
);

export const create: Handler = (event: IEvent) => prospectController.create(event);

export const update: Handler = (event: IEvent) => prospectController.update(event);

export const find: Handler = () => prospectController.find();

export const findOne: Handler = (event: IEvent) => prospectController.findOne(event);

export const deleteOne: Handler = (event: IEvent) => prospectController.deleteOne(event);

export const enable: Handler = (event: IEvent) => prospectController.enableProspect(event);

export const disable: Handler = (event: IEvent) => prospectController.disableProspect(event);

export const createStats: Handler = (event: IEvent) => prospectStats.create(event);

export const findStatsByProspect: Handler = (event: IEvent) => prospectStats.findByProspect(event);

export const updateStats: Handler = (event: IEvent) => prospectStats.update(event);

export const compareProspectsByStats: Handler = (event: IEvent) => prospectStats.findRelatedProspects(event);

export const createProspectCombineInfo: Handler = (event: IEvent) => prospectCombineController.createController(event);

export const findCombineDataByProspect: Handler = (event: IEvent) => prospectCombineController.listCombineDataByProspect(event);

export const findCombineData: Handler = (event: IEvent) => prospectCombineController.listCombineData(event);

export const updateCombineData: Handler = (event: IEvent) => prospectCombineController.updateController(event);

export const deleteCombineData: Handler = (event: IEvent) => prospectCombineController.deleteController(event);

export const evaluateProspect: Handler = (event: IEvent) => evaluationController.createController(event);

export const findUserProspectEvaluations: Handler = (event: IEvent) => evaluationController.findEvaluationProspectByUserController(event);

export const findProspectEvaluations: Handler = (event: IEvent) => evaluationController.findEvaluationsProspectController(event);

export const removeProspectEvaluation: Handler = (event: IEvent) => evaluationController.removeEvaluationProspect(event);

export const createUser: Handler = (event: IEvent) => userController.createController(event);

export const login: Handler = (event: IEvent) => userController.loginController(event);

export const authorizerFunc: Handler = (event: {
  authorizationToken: string;
  requestContext;
}) => Authorization.validateToken(event);

export const makeAdm: Handler = (event) =>
  userController.makeAdministrator(event);
