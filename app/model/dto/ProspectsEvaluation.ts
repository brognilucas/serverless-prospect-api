import { ProspectDTO } from "./ProspectDTO";

export class ProspectsEvaluation {
    propsect: ProspectDTO['id'];
    evaluation: QuarterbackEvaluation | RunningBackEvaluation | TightEndEvaluation
        | OffensiveLinemenEvaluation | InsideDefensiveLinemenEvaluation | EdgeEvaluation
        | CornerbackEvaluation | LinebackerEvaluation | SafetyEvaluation | WideReceiverEvaluation;
}

class GeneralAspects {
    athleticism: number;
    protected overall: number;

    getOverall() {
        return this.overall;
    }
}

export class RunningBackEvaluation extends GeneralAspects {
    vision: number;
    footwork: number;
    explosion: number;
    contactBalance: number;
    versatility: number;
    elusiviness: number;
    ballSecutity: number;
    bigPlayHability: number;

    constructor({
        vision, footwork, explosion,
        contactBalance, versatility, elusiviness,
        ballSecutity, bigPlayHability, athleticism
    }: RunningBackEvaluation) {
        super();

        this.ballSecutity = ballSecutity;
        this.vision = vision;
        this.contactBalance = contactBalance;
        this.footwork = footwork;
        this.explosion = explosion;
        this.versatility = versatility;
        this.elusiviness = elusiviness;
        this.bigPlayHability = bigPlayHability;
        this.athleticism = athleticism;

        this.calculateOverall();
    }

    calculateOverall(): void {
        const percentages = {
            vision: 12.5 / 100,
            footwork: 7.5 / 100,
            explosion: 12.5 / 100,
            athleticism: 15 / 100,
            contactBalance: 10 / 100,
            versatility: 7.5 / 100,
            elusiviness: 10 / 100,
            ballSecutity: 15 / 100,
            bigPlayHability: 10 / 100
        }

        this.overall = this.ballSecutity * percentages.ballSecutity +
            this.bigPlayHability * percentages.bigPlayHability +
            this.contactBalance * percentages.contactBalance +
            this.elusiviness * percentages.elusiviness +
            this.explosion * percentages.explosion +
            this.footwork * percentages.footwork +
            this.athleticism * percentages.athleticism +
            this.vision * percentages.vision +
            this.versatility * percentages.versatility
    }
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
    constructor() {
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

export class CornerbackEvaluation extends GeneralAspects {
    manCoverage: number;
    zoneCoverage: number;
    ballSkills: number;
    tackling: number;
    runDefending: number;
    finalSpeed: number;
}