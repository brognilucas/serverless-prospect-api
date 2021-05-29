import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 

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
  
      this.overall = Helper.executeCalculation(percentages, this);
  
    }
  }
  