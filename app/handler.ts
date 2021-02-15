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

import { prospect } from "./model";
import { ProspectController } from "./controller/prospects";
const prospectController = new ProspectController(prospect);

export const create: Handler = (event: any) => {
  return prospectController.create(event);
};

export const update: Handler = (event: any) => prospectController.update(event);

export const find: Handler = () => prospectController.find();

export const findOne: Handler = (event: any) => {
  return prospectController.findOne(event);
};

export const deleteOne: Handler = (event: any) =>
  prospectController.deleteOne(event);
