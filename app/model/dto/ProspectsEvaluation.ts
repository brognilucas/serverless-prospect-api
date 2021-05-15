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

function executeCalculation(percentages, object): number {
    const calculatedValues = Object.keys(percentages).map((key) => {
        return object[key] * percentages[key];
    })

    return calculatedValues.reduce((prev, next) => prev + next, 0);
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

        this.overall = executeCalculation(percentages, this);
    }
}

export class QuarterbackEvaluation extends GeneralAspects {

    constructor(quarterbackEvaluation: QuarterbackEvaluation) {
        super();
        this.accuracy = quarterbackEvaluation.accuracy;
        this.decistionMaking = quarterbackEvaluation.decistionMaking;
        this.armStrength = quarterbackEvaluation.armStrength;
        this.progressions = quarterbackEvaluation.progressions;
        this.poise = quarterbackEvaluation.poise;
        this.progressions = quarterbackEvaluation.progressions;
        this.footballIQ = quarterbackEvaluation.footballIQ;
        this.leadership = quarterbackEvaluation.leadership;
        this.pocketManipulation = quarterbackEvaluation.pocketManipulation;
        this.throwingMechanics = quarterbackEvaluation.throwingMechanics;
        this.athleticism = quarterbackEvaluation.athleticism;

        this.calculateOverall();
    }

    accuracy: number;
    decistionMaking: number;
    poise: number;
    progressions: number;
    release: number;
    pocketManipulation: number;
    armStrength: number;
    leadership: number;
    throwingMechanics: number;
    footballIQ: number;


    calculateOverall(): void {
        const percentages = {
            accuracy: 10 / 100,
            decistionMaking: 12.5 / 100,
            armStrength: 10 / 100,
            progressions: 10 / 100,
            poise: 7.5 / 100,
            footballIQ: 15 / 100,
            leadership: 10 / 100,
            pocketManipulation: 7.5 / 100,
            throwingMechanics: 7.5 / 100,
            athleticism: 10 / 100
        }


        this.overall = executeCalculation(percentages, this);
    }
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