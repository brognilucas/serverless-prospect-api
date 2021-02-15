import { Model } from "mongoose";
import { CreateProspectDTO } from "../model/dto/createProspectDTO";

export class ProspectService {
  private prospects: Model<any>;
  constructor(prospects: Model<any>) {
    this.prospects = prospects;
  }

  protected async createProspect(body: CreateProspectDTO): Promise<object> {
    try {
      const result = await this.prospects.create(body);

      return result;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  protected updateById(id: string, data: object) {
    return this.prospects.findOneAndUpdate({ id }, { $set: data }, { new: true });
  }

  protected findProspects() {
    return this.prospects.find();
  }

  protected findById(id: string) {
    return this.prospects.findOne({ id });
  }

  protected deleteById(id: string) {
    return this.prospects.deleteOne({ id });
  }
}
