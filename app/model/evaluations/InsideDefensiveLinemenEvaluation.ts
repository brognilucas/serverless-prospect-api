import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 


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

        this.overall = Helper.executeCalculation(percentages, this);
    }
}
