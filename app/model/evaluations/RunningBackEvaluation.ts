import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 

export class RunningBackEvaluation extends GeneralAspects {
    vision: number;
    footwork: number;
    explosion: number;
    contactBalance: number;
    versatility: number;
    elusiveness: number;
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
            elusiveness: 10 / 100,
            ballSecutity: 15 / 100,
            bigPlayHability: 10 / 100
        }

        this.overall = Helper.executeCalculation(percentages, this);
    }
}