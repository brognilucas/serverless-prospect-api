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
import { IEvent } from "./model/dto/IEvent";

const prospectController = new ProspectController(prospect);
const prospectStats = new ProspectStatsController(prospectStatsModel);

export const create: Handler = (event: IEvent) => prospectController.create(event);

export const update: Handler = (event: IEvent) => prospectController.update(event);

export const find: Handler = () => prospectController.find();

export const findOne: Handler = (event: IEvent) => prospectController.findOne(event); 

export const deleteOne: Handler = (event: IEvent) => prospectController.deleteOne(event);

export const enable: Handler = (event: IEvent) => prospectController.enableProspect(event);

export const disable: Handler = (event: IEvent) => prospectController.disableProspect(event);

export const createStats: Handler = (event: IEvent) => prospectStats.create(event)


