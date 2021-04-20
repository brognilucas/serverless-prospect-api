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

import { prospect, prospectStats as prospectStatsModel } from "./model";
import { ProspectController } from "./controller/prospects";
import { ProspectStatsController } from './controller/ProspectStats'

const prospectController = new ProspectController(prospect);
const prospectStats = new ProspectStatsController(prospectStatsModel);

export const create: Handler = (event: any) => prospectController.create(event);

export const update: Handler = (event: any) => prospectController.update(event);

export const find: Handler = () => prospectController.find();

export const findOne: Handler = (event: any) => prospectController.findOne(event); 

export const deleteOne: Handler = (event: any) => prospectController.deleteOne(event);

export const enable: Handler = (event: any) => prospectController.enableProspect(event);

export const disable: Handler = (event: any) => prospectController.disableProspect(event);

export const createStats: Handler = (event: any) => prospectStats.create(event)


