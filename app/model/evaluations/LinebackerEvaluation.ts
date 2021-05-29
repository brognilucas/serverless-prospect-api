import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 
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

        this.overall = Helper.executeCalculation(percentages, this);
    }
}