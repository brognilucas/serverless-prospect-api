import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 

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
  
      this.overall = Helper.executeCalculation(percentages, this)
    }
  }