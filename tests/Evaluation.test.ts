import { QuarterbackEvaluation, RunningBackEvaluation } from "../app/model/dto/ProspectsEvaluation"
import { expect } from "chai";
import { mockRunningBack8585, mockRunningBackEvaluation , mockQuaterback} from "./Evaluation.mock"

describe('Unit EvaluationRunningBack', () => {
    it('Should calculation to be 10', () => {
        const evaluation = new RunningBackEvaluation(mockRunningBackEvaluation);

        expect(evaluation.getOverall()).to.eql(10);
    })

    it('Should calculation to be 8.5475', () => {
        const evaluation = new RunningBackEvaluation(mockRunningBack8585 as RunningBackEvaluation);

        expect(evaluation.getOverall()).to.eql(8.585);
    })
})

describe('Unit EvaluationQuarterback', () => {
    
    it('It should overall to eql 10', () => {
        const evaluation = new QuarterbackEvaluation(mockQuaterback);

        expect(evaluation.getOverall()).to.eql(10);
    })

    it('It should overall to eql 10', () => {
        const evaluation = new QuarterbackEvaluation({
            ...mockQuaterback,
            athleticism: 5, 
            armStrength: 8, 
            decistionMaking: 8,
            footballIQ: 8
        } as QuarterbackEvaluation);

        expect(evaluation.getOverall()).to.eql(8.75);
    })
})