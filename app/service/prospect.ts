import { ProspectDocument } from "app/model";
import { Model } from "mongoose";
import { ProspectDTO } from "../model/dto/ProspectDTO";

export class ProspectService {
  private prospects: Model<ProspectDocument>;
  constructor(prospects: Model<ProspectDocument>) {
    this.prospects = prospects;
  }

  public async createProspect(body: ProspectDTO): Promise<ProspectDTO> {
    return this.prospects.create(body);
  }

  public updateById(id: string, data: ProspectDTO): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: data }, { new: true }).exec();
  }

  public findProspects(): Promise<ProspectDTO[]> {
    return this.prospects.find({}).exec();
  }

  public findById(id: string): Promise<ProspectDTO> {
    return this.prospects.findOne({ id }).exec();
  }

  public deleteById(id: string): Promise<{ deletedCount: number }> {
    return this.prospects.deleteOne({ id }).exec()
  }

  public disable(id: string): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: false } }).exec();
  }

  public enable(id: string): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: true } }).exec();

  }

}
