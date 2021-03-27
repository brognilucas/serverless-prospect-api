import { Model } from "mongoose";
import { ProspectDTO } from "../model/dto/ProspectDTO";

export class ProspectService {
  private prospects: Model<any>;
  constructor(prospects: Model<any>) {
    this.prospects = prospects;
  }

  protected async createProspect(body: ProspectDTO): Promise<ProspectDTO> {
    return this.prospects.create(body);
  }

  protected updateById(id: string, data: object): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: data }, { new: true }).exec();
  }

  protected findProspects(): Promise<ProspectDTO[]> {
    return this.prospects.find({}).exec();
  }

  protected findById(id: string): Promise<ProspectDTO> {
    return this.prospects.findOne({ id }).exec();
  }

  protected deleteById(id: string): Promise<any> {
    return this.prospects.deleteOne({ id }).exec();
  }

  protected disable(id): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: false } }).exec();
  }

  protected enable(id): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: true } }).exec();

  }

}
