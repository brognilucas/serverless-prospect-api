/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { ProspectService } from "../service/prospect";
import { ProspectDTO } from "../model/dto/ProspectDTO";
import { v4 as uuid } from "uuid";
import { Position } from "../utils/enums/PositionsEnum";
import { IEvent } from "app/model/dto/IEvent";
import { ProspectDocument } from "app/model";

export class ProspectController extends ProspectService {
  constructor(prospects: Model<ProspectDocument>) {
    super(prospects);
  }

  async create(event: IEvent) {
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
  }

  async update(event: IEvent) {
    const { id } = event.pathParameters;
    const body: ProspectDTO = JSON.parse(event.body);

    const result = await this.updateById(id, body);
    return MessageUtil.success(result);

  }

  createFilter(filters) {
    const mongoFilters = {};

    Object.entries(filters).forEach((item) => {
      const filterKey: string = item[0];
      const filterValue: string = item[1] as string || '';

      mongoFilters[filterKey] = new RegExp(filterValue, 'i');
    })

    return mongoFilters
  }

  async find(event: IEvent) {
    const filter = this.createFilter(event.queryStringParameters || {});

    const result = await this.findProspects(filter);
    return MessageUtil.success(result);
  }

  async findOne(event: IEvent) {
    const { id } = event.pathParameters;

    const result = await this.findById(id);

    return MessageUtil.success(result);
  }

  async deleteOne(event: IEvent) {
    const { id } = event.pathParameters;
    const result = await this.deleteById(id);

    if (!result || !result.deletedCount) {
      return MessageUtil.error(404, "Prospect not found!");
    }

    return MessageUtil.success(result);

  }

  async disableProspect(event) {
    const { id } = event.pathParameters;
    const result = await this.disable(id);

    if (!result) {
      return MessageUtil.error(404, "Prospect not found!");
    }

    return MessageUtil.success(result);

  }


  async enableProspect(event) {
    const { id } = event.pathParameters;
    const result = await this.enable(id);

    if (!result) {
      return MessageUtil.error(404, "Prospect not found!");
    }

    return MessageUtil.success(result);
  }
}
