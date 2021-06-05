import { GeneralAspects } from "./CommonEvaluation";
import Helper from '../../utils/helper'; 

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


        this.overall = Helper.executeCalculation(percentages, this);
    }
}