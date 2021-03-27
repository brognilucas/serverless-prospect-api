class GeneralOffensiveStats {
  yards: number;
  average: number;
  longest: number;
  touchdowns: number;
}

export class OffensiveStatsDTO {
  year: number;
  passing?: PassingStats;
  rushing?: RushingStats;
  receiving?: ReceivingStats;
}


class PassingStats extends GeneralOffensiveStats {
  attempts: number;
  completions: number;
  interceptions: number;
  rating: number;
}


class RushingStats extends GeneralOffensiveStats {
  attemps: number;
}

class ReceivingStats extends GeneralOffensiveStats {
  targets: number;
  receptions: number;
}

