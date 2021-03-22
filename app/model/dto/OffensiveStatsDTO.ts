interface GeneralOffensiveStats {
  yards: number;
  average: number;
  longest: number;
  touchdowns: number;
}

export interface OffensiveStatsDTO {
  year: number;
  passing?: PassingStats;
  rushing?: RushingStats;
  receiving?: ReceivingStats;
}


interface PassingStats extends GeneralOffensiveStats {
  attempts: number;
  completions: number;
  interceptions: number;
  rating: number;
}


interface RushingStats extends GeneralOffensiveStats {
  attemps: number;
}

interface ReceivingStats extends GeneralOffensiveStats {
  targets: number;
  receptions: number;
}

