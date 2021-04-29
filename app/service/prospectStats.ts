import { ProspectStatsDocument } from "../model";
import { ProspectStats, ComparisonStats, StatType, Stats } from "../model/dto/ProspectsStatsDTO";
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

  protected async find(query: unknown): Promise<ProspectStats[]> {
    return this.prospectsStats.find(query, { _id: 0, __v: 0 }).lean();
  }

  protected async findStatsByProspect(prospectId: string): Promise<ProspectStats> {
    return this.prospectsStats.find({ prospect: prospectId }, { _id: 0, __v: 0 }).lean();
  }

  groupStatsByProspectAndAccumulateIt(prospectStats: ProspectStats[]): ProspectStats[] {
    const statsMap = {}

    prospectStats.map(({ prospect, stats }) => {
      const previousStats = statsMap[prospect] || []
      Object.assign(statsMap, {
        [prospect]: [...previousStats, stats]
      })
    })

    return Object.keys(statsMap).map((key: string) => {
      return {
        prospect: key,
        stats: this.accumulateStats(statsMap[key]),
        years: statsMap[key].length
      }
    })
  }

  findRelateds(player: Stats['stats'], relatedPlayers: ProspectStats[]): unknown[] {
    const margin = 0.25;

    return relatedPlayers.filter((relatedPlayer) => {
      const statsRelatedPlayer = relatedPlayer.stats;

      const relatedFields = Object.keys(player).map((field) => {
        const marginUP = player[field] && player[field] > 0 ? player[field] + player[field] * margin : 1;
        const marginDown = player[field] && player[field] > 0 ? player[field] - player[field] * margin : 0;
        return (
          statsRelatedPlayer[field] >= marginDown
          && statsRelatedPlayer[field] <= marginUP
        ) ? field : false;


      }).filter((relatedField) => relatedField);

      return (relatedFields.length / Object.keys(player).length) > 0.70;
    })

  }

  public async findPossibleRelateds(id: string, statsType: string): Promise<ProspectStats[]> {
    return this.find({ prospect: { $ne: id }, type: statsType });
  }

  accumulateStats(stats: ComparisonStats['stats']): Stats['stats'] {
    const accumulatedStats = {};
    stats.forEach((stat) => {
      Object.keys(stat).map((key) => {
        const statNumber = !stat[key] ? 0 : stat[key];
        accumulatedStats[key] = (accumulatedStats[key] || 0) + statNumber;
      })
    })

    return accumulatedStats as Stats['stats'];
  }

}
