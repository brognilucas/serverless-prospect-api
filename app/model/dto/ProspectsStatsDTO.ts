import { ProspectDTO } from "./ProspectDTO";
import { DefensiveStatsDTO } from "./DefensiveStatsDTO";
import { PassingStats, ReceivingStats, RushingStats } from "./OffensiveStatsDTO";


export enum StatType {
  'rushing' = 'rushing', 
  'passing' = 'passing', 
  'receiving' = 'receiving', 
  'defensive' = 'defensive'
}


export class ProspectStats {
  prospect: ProspectDTO['id'];
  year: number;
  type: StatType;
  stats: PassingStats | ReceivingStats | RushingStats | DefensiveStatsDTO;
}