import { Handler } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
import middy from 'middy'
import { cors } from 'middy/middlewares'

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
  userCriteriaModel
} from "./model";
import { ProspectController } from "./controller/prospects";
import { ProspectStatsController } from "./controller/ProspectStats";
import { ProspectCombineController } from "./controller/ProspectCombine";
import { IEvent } from "./model/dto/IEvent";
import { UserController } from "./controller/User";
import { Authorization } from "./service/Authorization";
import { ProspectEvaluationController } from "./controller/ProspectEvaluation";
import { UserCriteriaController } from './controller/Criteria';

const prospectController = new ProspectController(prospect);
const prospectStats = new ProspectStatsController(prospectStatsModel);
const prospectCombineController = new ProspectCombineController(
  prospectCombine
);
const userController = new UserController(userModel);
const evaluationController = new ProspectEvaluationController(
  prospectEvaluationModel
);

const userCriteria = new UserCriteriaController(userCriteriaModel);

export const create: Handler = middy(middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.create(event))).use(cors())).use(cors());

export const update: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.update(event))).use(cors());

export const find: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.find(event))).use(cors());

export const findOne: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.findOne(event))).use(cors());

export const deleteOne: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.deleteOne(event))).use(cors());

export const enable: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.enableProspect(event))).use(cors());

export const disable: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectController.disableProspect(event))).use(cors());

export const createStats: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectStats.create(event))).use(cors());

export const findStatsByProspect: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectStats.findByProspect(event))).use(cors());

export const updateStats: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectStats.update(event))).use(cors());

export const compareProspectsByStats: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectStats.findRelatedProspects(event))).use(cors());

export const createProspectCombineInfo: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectCombineController.createController(event))).use(cors());

export const findCombineDataByProspect: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectCombineController.listCombineDataByProspect(event))).use(cors());

export const findCombineData: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectCombineController.listCombineData(event))).use(cors());

export const updateCombineData: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectCombineController.updateController(event))).use(cors());

export const deleteCombineData: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => prospectCombineController.deleteController(event))).use(cors());

export const evaluateProspect: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => evaluationController.createController(event))).use(cors());

export const findUserProspectEvaluations: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => evaluationController.findEvaluationProspectByUserController(event))).use(cors());

export const updateProspectEvaluation: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => evaluationController.patchUpdateEvaluation(event))).use(cors());

export const findProspectEvaluations: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => evaluationController.findEvaluationsProspectController(event))).use(cors());

export const removeProspectEvaluation: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => evaluationController.removeEvaluationProspect(event))).use(cors());

export const createUser: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => userController.createController(event))).use(cors());

export const createCriteria: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => userCriteria.create(event))).use(cors());

export const login: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: IEvent) => userController.loginController(event))).use(cors());

export const authorizerFunc: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event: {
  authorizationToken: string;
  requestContext;
}) => Authorization.validateToken(event))).use(cors());

export const makeAdm: Handler = middy(Sentry.AWSLambda.wrapHandler(async (event) =>
  userController.makeAdministrator(event))).use(cors());
