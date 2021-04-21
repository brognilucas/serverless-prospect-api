import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { ProspectStats } from "app/model/dto/ProspectsStatsDTO";
import { ProspectStatsService } from "../service/prospectStats";
import { ProspectService } from "../service/prospect";
import { prospect as prospectModel } from "../model";
import { v4 as uuid } from "uuid";

export class ProspectStatsController extends ProspectStatsService {
  constructor(prospectStats: Model<any>) {
    super(prospectStats);
  }

  async create(event: any) {
    try {
      const prospectStats: ProspectStats = {
        prospect: event.pathParameters.id,
        ...JSON.parse(event.body)
      };

      Object.assign(prospectStats, {id: uuid() })

      if (!prospectStats.year){
        throw 'Year is required'
      }

      if (!prospectStats.type || !['defensive', 'passing', 'rushing', 'receiving'].includes(prospectStats.type)){
        throw 'Invalid type'; 
      }

      const service = new ProspectService(prospectModel);
      const prospect = await service.findById(prospectStats.prospect); 
      if (!prospect) throw 'Prospect not Found';

      const prevStats = await this.findStats(prospectStats.prospect, prospectStats.year, prospectStats.type);

      if (prevStats){
        throw `Prospect already has stats for ${prospectStats.year}`
      }
      
      if (!prospectStats.stats || !prospectStats.stats) throw 'Missing stats';

      const isOffensive = [ 'passing', 'rushing', 'receiving'].includes(prospectStats.type)

      const defensiveRequiredFields = ['tackles', 'interceptions', 'sacks', 'forcedFumbles']; 
      const offensiveRequiredFields = ['yards', 'average', 'longest' , 'touchdowns'];
      const isMissingOffensiveStats = offensiveRequiredFields.filter((key) => ![null, undefined].includes(prospectStats.stats[key])).length !== offensiveRequiredFields.length;
      const isMissingDefensiveStats = defensiveRequiredFields.filter((key) => ![null, undefined].includes(prospectStats.stats[key])).length !== defensiveRequiredFields.length;
      
      if (
        isOffensive && 
        isMissingOffensiveStats
      ) {
        throw 'Offensive stats must have yards, average, longest and touchdowns'
      }

      if (!isOffensive && isMissingDefensiveStats){
        throw 'Defensive stats must have tackles, interceptions, sacks and fumbles'
      }

      const response = await this.setStats(prospectStats);

      return MessageUtil.success(response);
    } catch (err) {
      return MessageUtil.error(err.code || 400, err.message || err);
    }
  }

}
