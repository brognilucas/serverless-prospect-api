import { ProspectStatsDocument } from "../model";
import { ProspectStats, ComparisonStats, StatType, Stats } from "../model/dto/ProspectsStatsDTO";
import { Model, Mongoose } from "mongoose";
import { DefensiveStatsDTO } from "app/model/dto/DefensiveStatsDTO";
import { ProspectDTO } from "app/model/dto/ProspectDTO";

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



  groupStatsByProspectAndAccumulateIt(prospectStats: ProspectStats[]): Array<unknown> {
    const statsMap = {}

    prospectStats.map(({ prospect, stats }) => {
      const previousStats = statsMap[prospect] || []
      Object.assign(statsMap, {
        [prospect]: [...previousStats, stats]
      })
    })

    return Object.keys(statsMap).map((key) => {
      return {
        prospect: key,
        stats: this.accumulateStats(statsMap[key]),
        years: statsMap[key].length
      }
    })

  }

  findDefensiveRelateds(player: DefensiveStatsDTO, defensivePlayers: ProspectStats[]): unknown[] {
    const margin = 0.25;

    return defensivePlayers.filter((p) => p.prospect !== 'randomstring').filter((defensivePlayer) => {
      const statsDefensivePlayer = defensivePlayer.stats;


      const relatedFields = Object.keys(player).map((field) => {
        const marginUP = player[field] > 0 ? player[field] + player[field] * margin : 1;
        const marginDown = player[field] > 0 ? player[field] - player[field] * margin : 0;

        return (statsDefensivePlayer[field] >= marginDown && statsDefensivePlayer[field] <= marginUP) ?
          field : false
      }).filter((relatedField) => relatedField);

      return (relatedFields.length / Object.keys(player).length) > 0.70;
    })

  }

  findRelateds(player: unknown, comparisons: unknown[], type: string): unknown[] {
    if (type === 'defensive') {
      return this.findDefensiveRelateds(player as DefensiveStatsDTO, comparisons as ProspectStats[])
    }

    return []
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
