/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from "mongoose";
import { ProspectCombineService } from "../service/prospectCombine";
import { prospect as prospectModel, ProspectCombineDocument } from "../model";
import { IEvent } from "../model/dto/IEvent";
import { MessageUtil } from "../utils/message";
import { ProspectService } from "../service/prospect";
import { Combine } from "../model/dto/CombineDTO";

export class ProspectCombineController extends ProspectCombineService {
  constructor(prospectCombine: Model<ProspectCombineDocument>) {
    super(prospectCombine);
  }

  async createController(event: IEvent) {
    const { id } = event.pathParameters;
    const combineData: Combine = JSON.parse(event.body);
    if (!combineData) return MessageUtil.error(400, 'Missing required fields');

    const prospectService = new ProspectService(prospectModel);
    const prospect = await prospectService.findById(id);

    if (!prospect) return MessageUtil.error(404, 'Prospect not found');

    Object.assign(combineData, { prospect: id });

    try {
      const result = await this.create(combineData);

      return MessageUtil.success(result)
    } catch (err) {
      return MessageUtil.error(500, err);

    }
  }

  async updateController(event: IEvent) {
    const { id } = event.pathParameters;
    const combineData: Combine = JSON.parse(event.body);
    try {
      if (!id) {
        throw 'Must inform the prospect';
      }
      const prospectService = new ProspectService(prospectModel);
      if (!combineData) return MessageUtil.error(400, 'Missing required fields');

      const [prospectData, prospect] = await Promise.all([
        this.findByProspect(id),
        prospectService.findById(id)
      ]);

      if (!prospect) return MessageUtil.error(404, `Prospect doesn't exists`);
      if (!prospectData) return MessageUtil.error(404, `Prospect doesn't have combine data`);

      Object.assign(combineData, { prospect: id });
      await this.update(id, combineData);
      return MessageUtil.successNoContent();
    } catch (err) {
      return MessageUtil.error(500, err);
    }
  }

  async deleteController(event: IEvent) {
    const { id } = event.pathParameters;
    try {
      if (!id) {
        throw 'Must inform the prospect'; 
      }

      await this.delete(id);

      return MessageUtil.successNoContent()
    } catch (err) {
      return MessageUtil.error(500, err);
    }
  }

  async listCombineDataByProspect(event: IEvent) {
    const { id } = event.pathParameters;

    const prospectService = new ProspectService(prospectModel);
    const prospect = await prospectService.findById(id);

    if (!prospect) return MessageUtil.error(404, 'Prospect not found');

    const combineData = await this.findByProspect(id);

    if (!combineData) return MessageUtil.error(404, `Combine data not found to ${prospect.name}`);

    return MessageUtil.success(combineData)
  }

  async listCombineData(event: IEvent) {
    const query = event.queryStringParameters || {};
    const combineData = await this.find(query)

    return MessageUtil.success(combineData);
  }

}
