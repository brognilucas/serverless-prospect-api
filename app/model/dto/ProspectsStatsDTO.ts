import { ProspectDTO } from "./ProspectDTO";
import { DefensiveStatsDTO } from "./DefensiveStatsDTO";
import { PassingStats, ReceivingStats, RushingStats } from "./OffensiveStatsDTO";

export class ProspectStats {
  prospect: ProspectDTO['id'];
  year: number;
  type: 'rushing' | 'passing' | 'receiving' | 'defensive';
  stats: PassingStats | ReceivingStats | RushingStats | DefensiveStatsDTO;
}