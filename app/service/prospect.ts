import { Model } from "mongoose";
import { ProspectDTO } from "../model/dto/ProspectDTO";

export class ProspectService {
  private prospects: Model<any>;
  constructor(prospects: Model<any>) {
    this.prospects = prospects;
  }

  public async createProspect(body: ProspectDTO): Promise<ProspectDTO> {
    return this.prospects.create(body);
  }

  public updateById(id: string, data: object): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: data }, { new: true }).exec();
  }

  public findProspects(): Promise<ProspectDTO[]> {
    return this.prospects.find({}).exec();
  }

  public findById(id: string): Promise<ProspectDTO> {
    return this.prospects.findOne({ id }).exec();
  }

  public deleteById(id: string): Promise<any> {
    return this.prospects.deleteOne({ id }).exec()
  }

  public disable(id): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: false } }).exec();
  }

  public enable(id): Promise<ProspectDTO> {
    return this.prospects.findOneAndUpdate({ id }, { $set: { active: true } }).exec();

  }

}
