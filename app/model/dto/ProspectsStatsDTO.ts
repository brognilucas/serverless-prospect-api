import { ProspectDTO } from "./ProspectDTO";
import { DefensiveStatsDTO } from "./DefensiveStatsDTO";
import { OffensiveStatsDTO } from "./OffensiveStatsDTO";

export class ProspectStats {
  prospect: ProspectDTO['id'];
  stats: OffensiveStatsDTO[] | DefensiveStatsDTO[];
}