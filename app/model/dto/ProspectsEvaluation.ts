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

  constructor(runningBackEvaluation: RunningBackEvaluation) {
    super();
    Object.assign(this, { ...runningBackEvaluation }); 
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
    Object.assign(this, { ...quarterbackEvaluation }); 

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

  constructor(wideEvaluation: WideReceiverEvaluation) {
    super();
    Object.assign(this, { ...wideEvaluation }); 

    this.calculateOverall();
  }

  routeRunning: number;
  hands: number;
  separation: number;
  release: number;
  yardsAfterCatch: number;
  bodyControl: number;

  calculateOverall(): void {
    const percentages = {
      athleticism: 15 / 100,
      hands: 15 / 100,
      separation: 12.5 / 100,
      release: 15 / 100,
      routeRunning: 20 / 100,
      yardsAfterCatch: 12.5 / 100,
      bodyControl: 10 / 100
    }


    this.overall = executeCalculation(percentages, this);
  }
}

export class TightEndEvaluation extends WideReceiverEvaluation {

  constructor(tightEndEvaluation: TightEndEvaluation) {
    super(tightEndEvaluation);
    Object.assign(this, { ...tightEndEvaluation }); 

    this.calculateOverall();
  }

  runBlocking: number;
  passBlocking: number;
  versatility: number;

  calculateOverall(): void {
    const percentages = {
      athleticism: 12.5 / 100,
      hands: 10 / 100,
      separation: 10 / 100,
      release: 10 / 100,
      routeRunning: 12.5 / 100,
      yardsAfterCatch: 10 / 100,
      bodyControl: 10 / 100,
      versatility: 10 / 100,
      passBlocking: 7.5 / 100,
      runBlocking: 7.5 / 100
    }

    this.overall = executeCalculation(percentages, this);
  }

}

export class OffensiveLinemenEvaluation extends GeneralAspects {

  constructor(OlEvaluation: OffensiveLinemenEvaluation) {
    super();
    Object.assign(this, { ...OlEvaluation }); 

    this.calculateOverall();
  }

  balance: number;
  passSet: number;
  competitiveToughness: number;
  lateralMobility: number;
  handsUsage: number;
  powerRun: number;
  zoneRun: number;
  anchor: number;

  calculateOverall(): void {
    const percentages = {
      balance: 10 / 100,
      passSet: 20 / 100,
      competitiveToughness: 10 / 100,
      lateralMobility: 10 / 100,
      handsUsage: 10 / 100,
      powerRun: 15 / 100,
      zoneRun: 15 / 100,
      anchor: 10 / 100,
    }

    this.overall = executeCalculation(percentages, this);
  }
}

export class InsideDefensiveLinemenEvaluation extends GeneralAspects {

  constructor(iDLEvaluation: InsideDefensiveLinemenEvaluation) {
    super();
    Object.assign(this, { ...iDLEvaluation }); 

    this.calculateOverall();
  }

  firstStep: number;
  flexibility: number;
  handUsage: number;
  handPower: number;
  runDefending: number;
  motor: number;
  passRushMoves: number;
  strenght: number;

  calculateOverall(): void {
    const percentages = {
      firstStep: 10 / 100,
      flexibility: 10 / 100,
      handUsage: 12.5 / 100,
      handPower: 12.5 / 100,
      runDefending: 12.5 / 100,
      motor: 7.5 / 100,
      passRushMoves: 10 / 100,
      strenght: 10 / 100,
      athleticism: 15 / 100
    }

    this.overall = executeCalculation(percentages, this);
  }
}

export class EdgeEvaluation extends InsideDefensiveLinemenEvaluation {
  constructor(edgeEvaluation: EdgeEvaluation) {
    super(edgeEvaluation);
    Object.assign(this, { ...edgeEvaluation }); 

    this.calculateOverall();
  }

  calculateOverall(): void {
    const percentages = {
      firstStep: 10 / 100,
      flexibility: 12.5 / 100,
      handUsage: 12.5 / 100,
      handPower: 12.5 / 100,
      runDefending: 10 / 100,
      motor: 7.5 / 100,
      passRushMoves: 15 / 100,
      strenght: 7.5 / 100,
      athleticism: 12.5 / 100
    }

    this.overall = executeCalculation(percentages, this);
  }

}

export class LinebackerEvaluation extends GeneralAspects {

  constructor(linebackerEvaluation: LinebackerEvaluation) {
    super()
    Object.assign(this, { ...linebackerEvaluation }); 
    this.calculateOverall();
  }

  tackling: number;
  runSupport: number;
  zoneCoverage: number;
  manCoverage: number;
  footballIQ: number;
  passRushAbility: number;

  calculateOverall(): void {
    const percentages = {
      tackling: 12.5 / 100,
      runSupport: 12.5 / 100,
      zoneCoverage: 15 / 100,
      manCoverage: 15 / 100,
      footballIQ: 17.5 / 100,
      passRushAbility: 15 / 100,
      athleticism: 12.5 / 100
    }

    this.overall = executeCalculation(percentages, this);
  }
}

export class SafetyEvaluation extends GeneralAspects {

  constructor(safetyEvaluation: SafetyEvaluation) {
    super();
    Object.assign(this, { ...safetyEvaluation }); 
    this.calculateOverall();
  }

  footballIQ: number;
  runSupport: number;
  tackling: number;
  zoneCoverage: number;
  manCoverage: number;
  ballSkills: number;

  calculateOverall(): void {
    const percentages = {
      footballIQ: 15 / 100,
      runSupport: 15 / 100,
      tackling: 10 / 100,
      zoneCoverage: 17.5 / 100,
      manCoverage: 17.5 / 100,
      ballSkills: 15 / 100,
      athleticism: 10 / 100
    }

    this.overall = executeCalculation(percentages, this);

  }
}

export class CornerbackEvaluation extends GeneralAspects {

  constructor(cornerEvaluation: CornerbackEvaluation) {
    super();
    Object.assign(this, { ...cornerEvaluation }); 

    this.calculateOverall(); 
  }

  manCoverage: number;
  zoneCoverage: number;
  ballSkills: number;
  tackling: number;
  runDefending: number;
  flexibility: number;

  calculateOverall(): void {
    const percentages = {
      manCoverage: 20 / 100,
      zoneCoverage: 20 / 100,
      ballSkills: 20 / 100,
      tackling: 7.5 / 100,
      runDefending: 5 / 100,
      flexibility: 10 / 100,
      athleticism: 17.5 / 100
    }

    this.overall = executeCalculation(percentages, this)
  }
}