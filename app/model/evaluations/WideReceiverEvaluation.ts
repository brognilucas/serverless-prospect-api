import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 

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
  
  
      this.overall = Helper.executeCalculation(percentages, this);
    }
  }
  