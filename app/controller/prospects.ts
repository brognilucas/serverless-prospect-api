/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { ProspectService } from "../service/prospect";
import { ProspectDTO } from "../model/dto/ProspectDTO";
import { v4 as uuid } from "uuid";
import { Position } from "../model/dto/PositionsEnum";
import { IEvent } from "app/model/dto/IEvent";
import { ProspectDocument } from "app/model";

export class ProspectController extends ProspectService {
  constructor(prospects: Model<ProspectDocument>) {
    super(prospects);
  }

  async create(event: IEvent) {
    try {
      const prospect: ProspectDTO = JSON.parse(event.body);

      if (!prospect.name || !prospect.college) {
        return MessageUtil.error(400, "Must have a name and a college.");
      }

      prospect.id = uuid();

      if (!Position[prospect.position]) {
        return MessageUtil.error(400, "Invalid position.");
      }

      const result = await this.createProspect(prospect);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async update(event: IEvent) {
    const { id } = event.pathParameters;
    const body: ProspectDTO = JSON.parse(event.body);

    try {
      const result = await this.updateById(id, body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async find() {
    try {
      const result = await this.findProspects();

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

  async findOne(event: IEvent) {
    const { id } = event.pathParameters;

    try {
      const result = await this.findById(id);

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

  async deleteOne(event: IEvent) {
    const { id } = event.pathParameters;

    try {
      const result = await this.deleteById(id);

      if (!result || !result.deletedCount) {
        return MessageUtil.error(404, "Prospect not found!");
      }

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

  async disableProspect(event) {
    const { id } = event.pathParameters;
    try {
      const result = await this.disable(id);

      if (!result) {
        return MessageUtil.error(404, "Prospect not found!");
      }

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }


  async enableProspect(event) {
    const { id } = event.pathParameters;
    try {
      const result = await this.enable(id);

      if (!result) {
        return MessageUtil.error(404, "Prospect not found!");
      }

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }
}
