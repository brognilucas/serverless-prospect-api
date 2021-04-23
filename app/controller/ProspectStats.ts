/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { ProspectStats, StatType } from "../model/dto/ProspectsStatsDTO";
import { ProspectStatsService } from "../service/prospectStats";
import { ProspectService } from "../service/prospect";
import { prospect as prospectModel } from "../model";
import { v4 as uuid } from "uuid";
import { IEvent } from "../model/dto/IEvent";

export class ProspectStatsController extends ProspectStatsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(prospectStats: Model<any>) {
    super(prospectStats);
  }

  async create(event: IEvent) {
    try {
      const prospectStats: ProspectStats = {
        prospect: event.pathParameters.id,
        ...JSON.parse(event.body)
      };

      Object.assign(prospectStats, { id: uuid() })

      if (!prospectStats.year) {
        throw 'Year is required'
      }

      const defensiveTypes = [StatType.defensive]
      const offensivetypes = [StatType.passing, StatType.receiving, StatType.rushing];

      const types = [...defensiveTypes, ...offensivetypes];

      if (!prospectStats.type || (!types.includes(prospectStats.type))) {
        throw 'Invalid type';
      }

      const service = new ProspectService(prospectModel);
      const prospect = await service.findById(prospectStats.prospect);
      
      if (!prospect) {
        return MessageUtil.error(404, "Prospect not found");
      }

      const prevStats = await this.findStats(prospectStats.prospect, prospectStats.year, prospectStats.type);

      if (prevStats) {
        throw `Prospect already has ${prospectStats.type} stats for ${prospectStats.year}`
      }

      if (!prospectStats.stats || !prospectStats.stats) throw 'Missing stats';

      const isOffensive = offensivetypes.includes(prospectStats.type)

      const defensiveRequiredFields = ['tackles', 'interceptions', 'sacks', 'forcedFumbles'];
      const offensiveRequiredFields = ['yards', 'average', 'longest', 'touchdowns'];
      const isMissingOffensiveStats = offensiveRequiredFields.filter((key) => ![null, undefined].includes(prospectStats.stats[key])).length !== offensiveRequiredFields.length;
      const isMissingDefensiveStats = defensiveRequiredFields.filter((key) => ![null, undefined].includes(prospectStats.stats[key])).length !== defensiveRequiredFields.length;

      if (
        isOffensive &&
        isMissingOffensiveStats
      ) {
        throw 'Offensive stats must have yards, average, longest and touchdowns'
      }

      if (!isOffensive && isMissingDefensiveStats) {
        throw 'Defensive stats must have tackles, interceptions, sacks and fumbles'
      }

      const response = await this.setStats(prospectStats);

      return MessageUtil.success(response);
    } catch (err) {
      return MessageUtil.error(err.code || 400, err.message || err);
    }
  }
}
