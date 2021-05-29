
import Helper from '../../utils/helper'; 
import { InsideDefensiveLinemenEvaluation } from "./InsideDefensiveLinemenEvaluation";

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

        this.overall = Helper.executeCalculation(percentages, this);
    }

}
