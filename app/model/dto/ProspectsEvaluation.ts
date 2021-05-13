import { ProspectDTO } from "./ProspectDTO";

export class ProspectsEvaluation {
    propsect: ProspectDTO['id']; 
    evaluation: QuarterbackEvaluation | RunningBackEvaluation;
}

class GeneralAspects {
    athleticism: number;
}

export class RunningBackEvaluation extends GeneralAspects {
    vision: number;
    footwork: number;
    explosion: number;
    durability: number; 
    contactBalance: number; 
    versatility: number;
    elusiviness: number;
    ballSecutity: number; 
    bigPlayHability: number;
}

export class QuarterbackEvaluation extends GeneralAspects {
    accuracy: number; 
    decistionMaking: number; 
    poise: number;
    progressions: number;
    release: number;
    pocketManipulation: number; 
    armStrength: number;
    mobility: number;
    leadership: number;
    throwingMechanics: number;
    footballIQ: number;
}

export class WideReceiverEvaluation extends GeneralAspects {
    routeRunning: number; 
    hands: number;
    separation: number; 
    release: number;
    yardsAfterCatch: number; 
    bodyControl: number; 
}

export class TightEndEvaluation extends WideReceiverEvaluation {
    runBlocking: number; 
    passBlocking: number;
    versatility: number;
}

export class OffensiveLinemenEvaluation extends GeneralAspects {
    balance: number; 
    passSet: number;
    competitiveToughness: number;
    lateralMobility: number; 
    handsUsage: number; 
    powerRun: number;
    zoneRun: number;
    anchor: number;
}

export class InsideDefensiveLinemenEvaluation extends GeneralAspects {
    firstStep: number; 
    flexibility: number; 
    handUsage: number; 
    handPower: number; 
    runDefending: number; 
    motor: number; 
    passRushMoves: number; 
    strenght: number;
}

export class EdgeEvaluation extends InsideDefensiveLinemenEvaluation {
    constructor(){
        super();  
    }
}

export class LinebackerEvaluation extends GeneralAspects {
    tackling: number; 
    runSupport: number;
    zoneCoverage: number; 
    manCoverage: number; 
    footballIQ: number;
    passRushAbility: number; 
}

export class SafetyEvaluation extends GeneralAspects {
    footballIQ: number; 
    runSupport: number;
    tackling: number; 
    zoneCoverage: number; 
    manCoverage: number;
    ballSKills: number; 
}

export class CornerbackEvaluation  extends GeneralAspects {
    manCoverage: number; 
    zoneCoverage: number; 
    ballSkills: number; 
    tackling: number; 
    runDefending: number; 
    finalSpeed: number; 
}