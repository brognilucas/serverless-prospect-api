class GeneralOffensiveStats {
  yards: number;
  average: number;
  longest: number;
  touchdowns: number;
}

export class OffensiveStatsDTO {
  passing?: PassingStats;
  rushing?: RushingStats;
  receiving?: ReceivingStats;
}


export class PassingStats extends GeneralOffensiveStats {
  attempts: number;
  completions: number;
  interceptions: number;
  rating: number;
}


export class RushingStats extends GeneralOffensiveStats {
  attemps: number;
}

export class ReceivingStats extends GeneralOffensiveStats {
  targets: number;
  receptions: number;
}

