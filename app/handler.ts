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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sentry = require("@sentry/serverless");

Sentry.AWSLambda.init({
  dsn: "https://c3f377dbd6274752bea1a043d58f1681@o919686.ingest.sentry.io/5864034",
  tracesSampleRate: 1.0,
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

export const create: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.create(event));

export const update: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.update(event));

export const find: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.find(event));

export const findOne: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.findOne(event));

export const deleteOne: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.deleteOne(event));

export const enable: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.enableProspect(event));

export const disable: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.disableProspect(event));

export const createStats: Handler =Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectStats.create(event));

export const findStatsByProspect: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectStats.findByProspect(event));

export const updateStats: Handler = Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectStats.update(event));

export const compareProspectsByStats: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectStats.findRelatedProspects(event));

export const createProspectCombineInfo: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectCombineController.createController(event));

export const findCombineDataByProspect: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectCombineController.listCombineDataByProspect(event));

export const findCombineData: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectCombineController.listCombineData(event));

export const updateCombineData: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectCombineController.updateController(event));

export const deleteCombineData: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => prospectCombineController.deleteController(event));

export const evaluateProspect: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => evaluationController.createController(event));

export const findUserProspectEvaluations: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => evaluationController.findEvaluationProspectByUserController(event));

export const updateProspectEvaluation: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => evaluationController.patchUpdateEvaluation(event));

export const findProspectEvaluations: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => evaluationController.findEvaluationsProspectController(event));

export const removeProspectEvaluation: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => evaluationController.removeEvaluationProspect(event));

export const createUser: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => userController.createController(event));

export const login: Handler = Sentry.AWSLambda.wrapHandler(async  (event: IEvent) => userController.loginController(event));

export const authorizerFunc: Handler = Sentry.AWSLambda.wrapHandler(async  (event: {
  authorizationToken: string;
  requestContext;
}) => Authorization.validateToken(event));

export const makeAdm: Handler = Sentry.AWSLambda.wrapHandler(async (event) =>
  userController.makeAdministrator(event));
