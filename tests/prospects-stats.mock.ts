import { ProspectStats, StatType } from "../app/model/dto/ProspectsStatsDTO";
import { Position } from "../app/utils/enums/PositionsEnum";
import { PassingStats, ReceivingStats } from "app/model/dto/OffensiveStatsDTO";

export const mockDefensiveStats = {
	"year": 2019,
	"type": StatType.defensive,
	"stats": {
		"sacks": 5,
		"tackles": 109,
		"tacklesForLoss": 14,
		"passDeflections": 5,
		"tacklesSolo": 52,
		"taclesAssistance": 57,
		"forcedFumbles": 4,
		"interceptions": 0,
		"interceptionsYards": 0,
		"touchdowns": 0,
		"fumblesRecovered": 1
	}
}

export const mockRushingStats = {
	year: 2019,
	type: StatType.rushing,
	stats: {
		attemps: 300,
		average: 4.3,
		longest: 40,
		touchdowns: 8,
		yards: 100,
		fumbles: 0
	}
}

const receivingStats: ReceivingStats = {
	yards: 1000,
	targets: 200,
	receptions: 140,
	average: 14.5,
	longest: 73,
	touchdowns: 6
}

export const mockReceivingStats: ProspectStats = {
	prospect: 'randomstring',
	year: 2019,
	type: StatType.receiving,
	stats: receivingStats
}

const passingStats: PassingStats = {
	attempts: 100,
	completions: 100,
	interceptions: 100,
	rating: 100,
	average: 10,
	touchdowns: 30,
	yards: 850,
	longest: 300
}


export const passingStatsNotRelated: PassingStats = {
	attempts: 0,
	completions: 1,
	interceptions: 2,
	rating: 3,
	average: 4,
	touchdowns: 5,
	yards: 7,
	longest: 8
}

export const mockPassingStats: ProspectStats = {
	prospect: 'randomstring',
	year: 2019,
	type: StatType.passing,
	stats: passingStats
}

export const defensiveProspect = {
	_id: "someId",
	name: "Lucas Brogni",
	college: "Some College",
	position: Position.LB,
	id: 'randomstring',
	createdAt: new Date(),
	__v: 0,
};

export const offensiveProspect = {
	_id: "someId",
	name: "Lucas Brogni",
	college: "Some College",
	position: Position.QB,
	id: 'randomstring',
	createdAt: new Date().toLocaleDateString(),
	__v: 0,
};


export const getData = {
	prospect: offensiveProspect,
	stats: [mockReceivingStats]
}