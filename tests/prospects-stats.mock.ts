import { StatType } from "../app/model/dto/ProspectsStatsDTO";
import { Position } from "../app/model/dto/PositionsEnum";

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
	createdAt: new Date(),
	__v: 0,
};