import { ProspectDTO } from "./ProspectDTO";
import { DefensiveStatsDTO } from "./DefensiveStatsDTO";
import { PassingStats, ReceivingStats, RushingStats } from "./OffensiveStatsDTO";


export enum StatType {
  'rushing' = 'rushing', 
  'passing' = 'passing', 
  'receiving' = 'receiving', 
  'defensive' = 'defensive'
}


export class ComparisonStats {
  stats: PassingStats[] | ReceivingStats[] | RushingStats[] | DefensiveStatsDTO[]
}

export class Stats {
  stats: PassingStats | ReceivingStats | RushingStats | DefensiveStatsDTO
}

export class ProspectStats extends Stats {
  prospect: ProspectDTO['id'];
  year?: number;
  type?: StatType;
  years?: number;
}