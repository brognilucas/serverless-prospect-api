import Helper from '../../utils/helper'; 
import { WideReceiverEvaluation } from "./WideReceiverEvaluation";

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

        this.overall = Helper.executeCalculation(percentages, this);
    }

}