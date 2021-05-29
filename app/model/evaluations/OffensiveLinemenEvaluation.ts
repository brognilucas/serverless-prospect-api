import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 

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
  
      this.overall = Helper.executeCalculation(percentages, this);
    }
  }