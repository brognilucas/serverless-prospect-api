import { ProspectDocument } from "app/model";
import { Model } from "mongoose";
import { ProspectDTO } from "../model/dto/ProspectDTO";

export class ProspectService {
  private prospects: Model<ProspectDocument>;
  constructor(prospects: Model<ProspectDocument>) {
    this.prospects = prospects;
  }

  public async createProspect(body: ProspectDTO): Promise<ProspectDocument> {
    return this.prospects.create(body);
  }

  public updateById(id: string, data: ProspectDTO): Promise<ProspectDocument> {
    return this.prospects.findOneAndUpdate({ id }, { $set: data }, { new: true }).exec();
  }

  public findProspects(filter = {}): Promise<ProspectDocument[]> {
    return this.prospects.find(filter, { _id: 0 ,  __v: 0}).exec();
  }

  public findById(id: string): Promise<ProspectDocument> {
    return this.prospects.findOne({ id }, { _id: 0 , __v: 0 }).exec();
  }

  public deleteById(id: string): Promise<{ deletedCount?: number }> {
    return this.prospects.deleteOne({ id }).exec()
  }

  public disable(id: string): Promise<ProspectDocument> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: false } }).exec();
  }

  public enable(id: string): Promise<ProspectDocument> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: true } }).exec();

  }

}
