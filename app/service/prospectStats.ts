import { ProspectStats } from "app/model/dto/ProspectsStatsDTO";
import { Model } from "mongoose";

export class  ProspectStatsService {
  private prospectsStats: Model<any>;
  constructor(prospectsStats: Model<any>) {
    this.prospectsStats = prospectsStats;
  }

  protected async setStats(body: ProspectStats): Promise<ProspectStats> {
    return this.prospectsStats.create(body);
  }

  protected async findStats(prospectId: string, year: number, type: string):  Promise<ProspectStats> {
    return this.prospectsStats.findOne({prospect: prospectId, year, type }).lean()
  }

}
