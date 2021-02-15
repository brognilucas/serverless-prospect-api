import { v4 as uuid } from "uuid";
import { Position } from "../app/model/dto/PositionsEnum";

export const findOne = {
  _id: "someId",
  name: "Lucas Brogni",
  college: "Some College",
  position: Position.WR,
  id: uuid(),
  createdAt: new Date(),
  __v: 0,
};

export const find = [findOne, findOne, findOne];

export const create = {
  ...findOne,
};

export const update = {
  ...findOne,
  description: "Description Test",
};

export const deleteOne = {
  deletedCount: 1,
};

export const deletedCount = {
  deletedCount: 0,
};
