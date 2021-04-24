import { ProspectStatsDocument } from "../model";
import { ProspectStats, StatType } from "../model/dto/ProspectsStatsDTO";
import { Model } from "mongoose";

export class ProspectStatsService {
  private prospectsStats: Model<ProspectStatsDocument>;
  constructor(prospectsStats: Model<ProspectStatsDocument>) {
    this.prospectsStats = prospectsStats;
  }

  protected async setStats(body: ProspectStats): Promise<ProspectStats> {
    return this.prospectsStats.create(body);
  }

  protected async findStats(prospectId: string, year: number, type: StatType): Promise<ProspectStats> {
    return this.prospectsStats.findOne({ prospect: prospectId, year, type }).lean()
  }

  protected async findStatsByProspect(prospectId: string): Promise<ProspectStats> {
    return this.prospectsStats.find({ prospect: prospectId }, { _id: 0, __v: 0 }).lean();
  }

}
